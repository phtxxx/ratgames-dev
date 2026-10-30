# Preciva — MVP demonstrativo

Protótipo funcional de inteligência comercial para supermercados. Dados 100% fictícios, sem conexão com lojas reais.

## Executar
Abra `index.html` no navegador ou sirva a pasta com `python -m http.server 8000` e acesse `http://localhost:8000/preciva-saas/` a partir da raiz do repositório.

## Funcionalidades
- Três lojas simuladas (Balneário Camboriú, Camboriú e Itajaí)
- Catálogo determinístico de 500 produtos e 12 meses de vendas por loja
- KPIs, ranking de produtos, estoque e oportunidades
- Simulação de descontos e aumento hipotético de demanda com impacto na margem bruta
- Importação CSV de vendas (somente na sessão do navegador), exportação CSV e aprovação local de cenários
- Modelo SQL PostgreSQL em `schema.sql` para a futura aplicação multiempresa

## Limites
Os resultados são demonstrações e não recomendações comerciais validadas. Não existe IA preditiva, autenticação, backend, persistência em nuvem nem integração com ERP. O fluxo de aprovação é local. Não inserir dados reais/confidenciais nesta demo pública.

## Próximos passos
Migrar interface para aplicação com backend, implementar autenticação e isolamento por supermercado, importar dados reais autorizados, testar modelos de previsão e fazer auditoria de segurança antes da produção.
