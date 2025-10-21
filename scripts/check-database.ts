#!/usr/bin/env tsx

/**
 * Script de diagnóstico do banco de dados Serenamente
 *
 * Verifica a conectividade e status do banco de dados PostgreSQL (Supabase)
 *
 * Uso: npm run db:check
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Carregar variáveis de ambiente do .env
config({ path: resolve(process.cwd(), '.env') });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

interface DatabaseStatus {
  connected: boolean;
  version?: string;
  error?: string;
  latency?: number;
  tables?: string[];
  userCount?: number;
}

async function checkDatabaseConnection(): Promise<DatabaseStatus> {
  const status: DatabaseStatus = {
    connected: false,
  };

  try {
    console.log('🔍 Verificando conexão com o banco de dados Supabase...\n');

    // Testar conexão básica
    const startTime = Date.now();
    await prisma.$connect();
    const endTime = Date.now();

    status.connected = true;
    status.latency = endTime - startTime;

    console.log('✅ Conexão estabelecida com sucesso!');
    console.log(`⏱️  Latência: ${status.latency}ms\n`);

    // Obter versão do PostgreSQL
    try {
      const result: any[] = await prisma.$queryRaw`SELECT version()`;
      if (result && result[0]) {
        status.version = result[0].version;
        console.log('📊 Versão do PostgreSQL:');
        console.log(`   ${status.version}\n`);
      }
    } catch (error) {
      console.warn('⚠️  Não foi possível obter a versão do banco');
    }

    // Verificar tabelas existentes
    try {
      const tables: any[] = await prisma.$queryRaw`
        SELECT tablename
        FROM pg_catalog.pg_tables
        WHERE schemaname = 'public'
        ORDER BY tablename
      `;

      status.tables = tables.map((t) => t.tablename);
      console.log('📋 Tabelas encontradas no schema público:');

      if (status.tables.length === 0) {
        console.log('   ⚠️  Nenhuma tabela encontrada!');
        console.log('   Execute: npm run db:push\n');
      } else {
        status.tables.forEach((table) => console.log(`   - ${table}`));
        console.log('');

        // Verificar se a tabela users existe
        if (status.tables.includes('users')) {
          console.log('✅ Tabela users encontrada');

          // Contar usuários
          try {
            const count = await prisma.user.count();
            status.userCount = count;
            console.log(`📊 Total de usuários: ${count}`);

            // Contar usuários que completaram onboarding
            const onboardedCount = await prisma.user.count({
              where: { onboardingCompleted: true }
            });
            console.log(`✨ Usuários com onboarding completo: ${onboardedCount}`);

            // Mostrar alguns usuários
            const users = await prisma.user.findMany({
              take: 3,
              orderBy: { createdAt: 'desc' },
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                diagnosisType: true,
                onboardingCompleted: true,
                createdAt: true,
              },
            });

            if (users.length > 0) {
              console.log('\n📝 Últimos usuários (máx. 3):');
              users.forEach((user, index) => {
                const diagnosis = user.diagnosisType || 'N/A';
                const onboarded = user.onboardingCompleted ? '✓' : '✗';
                console.log(`   ${index + 1}. [${onboarded}] ${user.firstName} ${user.lastName} - ${diagnosis}`);
              });
            }
          } catch (error) {
            console.error('❌ Erro ao consultar usuários:', error);
          }
        } else {
          console.log('⚠️  Tabela users NÃO encontrada');
          console.log('   Execute: npm run db:push');
        }
      }

    } catch (error) {
      console.warn('⚠️  Não foi possível listar as tabelas');
    }

  } catch (error) {
    status.connected = false;
    status.error = error instanceof Error ? error.message : 'Erro desconhecido';

    console.error('\n❌ Falha ao conectar ao banco de dados\n');
    console.error('Detalhes do erro:');
    console.error(`   ${status.error}\n`);

    // Diagnóstico específico por tipo de erro
    const errorMsg = status.error.toLowerCase();

    if (errorMsg.includes('enotfound') || errorMsg.includes('econnrefused')) {
      console.log('💡 Possíveis causas:');
      console.log('   1. Problema de DNS no WSL2');
      console.log('   2. O servidor do banco está offline ou inacessível');
      console.log('   3. Firewall bloqueando a conexão');
      console.log('   4. URL de conexão incorreta no .env');
      console.log('   5. Projeto Supabase pausado por inatividade\n');
      console.log('🔧 Soluções:');
      console.log('   - Execute: ./fix-wsl-dns.sh');
      console.log('   - Verifique https://supabase.com/dashboard');
      console.log('   - Reative o projeto se estiver pausado');
      console.log('   - Verifique a DATABASE_URL no arquivo .env');
    } else if (errorMsg.includes('authentication') || errorMsg.includes('password')) {
      console.log('💡 Possíveis causas:');
      console.log('   1. Senha incorreta na DATABASE_URL');
      console.log('   2. Usuário não existe ou sem permissões\n');
      console.log('🔧 Soluções:');
      console.log('   - Verifique as credenciais no Supabase Dashboard');
      console.log('   - Atualize a DATABASE_URL no arquivo .env');
    } else if (errorMsg.includes('timeout')) {
      console.log('💡 Possíveis causas:');
      console.log('   1. Servidor respondendo muito lentamente');
      console.log('   2. Problemas de rede');
      console.log('   3. Servidor sobrecarregado\n');
      console.log('🔧 Soluções:');
      console.log('   - Tente novamente em alguns minutos');
      console.log('   - Verifique sua conexão com a internet');
    }

    console.log('\n📚 Documentação:');
    console.log('   - Supabase: https://supabase.com/docs');
    console.log('   - Prisma: https://www.prisma.io/docs/reference/api-reference/error-reference');
  } finally {
    await prisma.$disconnect();
  }

  return status;
}

// Executar diagnóstico
checkDatabaseConnection()
  .then((status) => {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMO DO DIAGNÓSTICO');
    console.log('='.repeat(60));
    console.log(`Status: ${status.connected ? '✅ CONECTADO' : '❌ DESCONECTADO'}`);
    if (status.latency) console.log(`Latência: ${status.latency}ms`);
    if (status.tables) console.log(`Tabelas: ${status.tables.length}`);
    if (status.userCount !== undefined) console.log(`Usuários cadastrados: ${status.userCount}`);
    if (status.error) console.log(`Erro: ${status.error}`);
    console.log('='.repeat(60) + '\n');

    process.exit(status.connected ? 0 : 1);
  })
  .catch((error) => {
    console.error('❌ Erro fatal no diagnóstico:', error);
    process.exit(1);
  });
