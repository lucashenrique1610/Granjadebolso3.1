# Como Transformar o Guia de Investimento em um Sistema de Cálculo Automático por Número de Aves

## 1. Objetivo do Sistema

O objetivo é criar um sistema onde o usuário informa quantas aves deseja criar, por exemplo **100 aves**, **200 aves** ou **500 aves**, e o sistema calcula automaticamente:

* área estimada do galpão;
* área estimada dos piquetes;
* lista de materiais;
* quantidade estimada de cada item;
* custo mínimo estimado;
* custo máximo estimado;
* subtotal por categoria;
* total geral do investimento;
* reserva para imprevistos;
* observações técnicas importantes.

O sistema deve usar o documento corrigido como **base de referência para 100 aves** e aplicar fórmulas de proporcionalidade, arredondamento e regras técnicas para adaptar os valores ao número de aves informado.

---

## 2. Como o Sistema Deve Funcionar

O funcionamento básico pode ser dividido em 5 etapas:

1. **Usuário informa os dados principais.**
2. **Sistema define o fator de escala.**
3. **Sistema calcula quantidades técnicas.**
4. **Sistema multiplica quantidades pelos preços estimados.**
5. **Sistema gera o relatório final.**

Exemplo:

| Entrada do Usuário | Valor |
|---|---:|
| Quantidade de aves | 100 |
| Tipo de piquete | Recomendado |
| Incluir mão de obra | Sim |
| Incluir legalização | Sim |
| Margem de imprevistos | 10% |

Resultado esperado:

* lista de materiais;
* quantidade estimada;
* custo mínimo;
* custo máximo;
* total por categoria;
* total final.

---

## 3. Conceito Principal: Base de Referência para 100 Aves

O documento corrigido deve ser transformado em uma tabela-base. Essa tabela terá todos os itens calculados para **100 aves**.

Depois, o sistema usa a seguinte lógica:

```text
fator_escala = quantidade_de_aves_informada / 100
```

Exemplo:

| Aves Informadas | Fator de Escala |
|---:|---:|
| 50 aves | 0,5 |
| 100 aves | 1,0 |
| 200 aves | 2,0 |
| 500 aves | 5,0 |

Mas nem todos os itens podem ser multiplicados de forma simples. Alguns itens exigem arredondamento ou fórmula técnica própria.

---

## 4. Tipos de Cálculo por Item

Cada item da lista deve receber um tipo de cálculo. Isso evita erros.

### 4.1. Itens Proporcionais

São itens que aumentam quase diretamente com o número de aves.

Exemplos:

* ração;
* vacinas;
* cama aviária;
* bandejas de ovos;
* etiquetas;
* área de piquete;
* área de galpão.

Fórmula:

```text
quantidade_calculada = quantidade_base_para_100_aves x fator_escala
```

Exemplo:

Se para 100 aves são necessários 17 sacos de ração até a postura, para 200 aves:

```text
17 x 2 = 34 sacos
```

### 4.2. Itens com Arredondamento para Cima

Alguns itens não podem ser comprados em fração. O sistema deve sempre arredondar para cima.

Exemplos:

* comedouros;
* bebedouros;
* ninhos;
* lâmpadas;
* portões;
* sacos de ração;
* caixas d’água;
* rolos de tela.

Fórmula:

```text
quantidade_final = arredondar_para_cima(quantidade_calculada)
```

Exemplo:

Se o cálculo indicar 2,3 comedouros, o sistema deve entregar:

```text
3 comedouros
```

### 4.3. Itens Fixos

São itens que não mudam muito quando o número de aves muda em pequena escala.

Exemplos:

* ovoscópio;
* balança;
* kit de limpeza;
* pulverizador;
* carimbo;
* temporizador;
* consultoria inicial.

Regra:

```text
quantidade_final = quantidade_base
```

Exemplo:

Para 50, 100 ou 200 aves, normalmente 1 ovoscópio simples ainda atende.

### 4.4. Itens por Faixa

Alguns itens precisam mudar apenas quando o plantel passa de determinado limite.

Exemplos:

* caixa d’água;
* número de caixas de transporte;
* quantidade de portões;
* número de módulos de galpão;
* necessidade de segunda balança ou segundo ovoscópio.

Exemplo de regra:

```text
se aves <= 150: caixa_dagua = 1 unidade de 500 L
se aves > 150 e aves <= 300: caixa_dagua = 1 unidade de 1000 L
se aves > 300: calcular reservatório conforme consumo diário
```

---

## 5. Fórmulas Técnicas Recomendadas

## 5.1. Área do Galpão

Referência técnica: aproximadamente **7 aves por m²** no galpão.

Fórmula:

```text
area_galpao_m2 = aves / 7
```

Com margem prática:

```text
area_galpao_recomendada = area_galpao_m2 x 1,05
```

Exemplo para 100 aves:

```text
100 / 7 = 14,28 m²
com margem: 14,28 x 1,05 = 14,99 m²
resultado prático: 15 m²
```

### Tabela de referência

| Número de Aves | Área Mínima Aproximada | Área Prática Recomendada |
|---:|---:|---:|
| 50 | 7,2 m² | 8 m² |
| 100 | 14,3 m² | 15 m² |
| 200 | 28,6 m² | 30 m² |
| 500 | 71,4 m² | 75 m² |

---

## 5.2. Área de Piquete

O sistema deve permitir escolher o tipo de piquete.

| Tipo de Piquete | Fórmula | Uso |
|---|---:|---|
| Mínimo técnico | aves x 0,5 m² | menor custo, exige manejo rigoroso |
| Recomendado | aves x 2 m² | bom equilíbrio para pequeno produtor |
| Extensivo | aves x 10 m² | mais área, maior custo de cerca |

Exemplo para 100 aves:

| Tipo | Cálculo | Área |
|---|---:|---:|
| Mínimo | 100 x 0,5 | 50 m² |
| Recomendado | 100 x 2 | 200 m² |
| Extensivo | 100 x 10 | 1.000 m² |

---

## 5.3. Quantidade de Piquetes

Para manejo rotacionado, recomenda-se dividir a área externa em **3 ou 4 piquetes**.

Regra sugerida:

```text
se aves <= 100: 4 piquetes
se aves > 100: 4 a 6 piquetes
```

Fórmula:

```text
area_por_piquete = area_total_piquete / numero_de_piquetes
```

Exemplo:

```text
200 m² / 4 piquetes = 50 m² por piquete
```

---

## 5.4. Tela para Cercamento dos Piquetes

Existem duas formas de calcular.

### Forma simples

Usar a base do documento corrigido:

```text
tela_piquete = 120 m x fator_escala
```

Essa forma é simples, mas menos precisa.

### Forma técnica aproximada

Considerando uma área próxima de um quadrado:

```text
lado = raiz_quadrada(area_total_piquete)
perimetro_externo = lado x 4
margem = perimetro_externo x 0,15
tela_total = perimetro_externo + margem + divisorias_internas
```

Para 4 piquetes em grade 2 x 2:

```text
divisorias_internas = lado x 2
```

Fórmula final:

```text
tela_total = (4 x lado) + (2 x lado) + 15% de margem
```

Exemplo para 200 m²:

```text
lado = raiz_quadrada(200) = 14,14 m
perímetro externo = 14,14 x 4 = 56,56 m
divisórias internas = 14,14 x 2 = 28,28 m
subtotal = 84,84 m
margem de 15% = 12,73 m
tela total aproximada = 97,57 m
resultado prático = 100 m de tela
```

Como o documento corrigido usa 120 m para dar folga, o sistema pode usar:

```text
tela_final = máximo(tela_técnica, tela_base_proporcional)
```

---

## 5.5. Quantidade de Postes

Regra prática: 1 poste a cada 3 a 4 metros.

Fórmula:

```text
postes = arredondar_para_cima(tela_total / 3,5)
```

Exemplo:

```text
120 m / 3,5 = 34,28
resultado = 35 postes
```

---

## 5.6. Comedouros

No documento corrigido, foram usados **3 comedouros tubulares para 100 aves**.

Fórmula simples:

```text
comedouros = arredondar_para_cima(aves / 35)
```

Exemplo:

```text
100 / 35 = 2,85
resultado = 3 comedouros
```

---

## 5.7. Bebedouros

No documento corrigido, foram usados **2 bebedouros pendulares para 100 aves**.

Fórmula simples:

```text
bebedouros = arredondar_para_cima(aves / 50)
```

Exemplo:

```text
100 / 50 = 2 bebedouros
```

Se usar nipple:

```text
niples = arredondar_para_cima(aves / 12)
```

---

## 5.8. Ninhos

O documento corrigido usa **1 ninho para aproximadamente 7 aves**.

Fórmula:

```text
ninhos = arredondar_para_cima(aves / 7)
```

Exemplo:

```text
100 / 7 = 14,28
resultado = 15 ninhos
```

Observação: se quiser ser mais econômico, o sistema pode permitir ninho coletivo.

---

## 5.9. Poleiros

Referência: **15 cm lineares por ave**.

Fórmula:

```text
poleiro_metros = aves x 0,15
```

Exemplo:

```text
100 x 0,15 = 15 m lineares de poleiro
```

---

## 5.10. Ração até a Postura

Referência corrigida: **7,75 a 8,20 kg de ração por ave até a postura**, incluindo margem técnica.

Fórmulas:

```text
racao_min_kg = aves x 7,75
racao_max_kg = aves x 8,20
sacos_min = arredondar_para_cima(racao_min_kg / 50)
sacos_max = arredondar_para_cima(racao_max_kg / 50)
```

Exemplo para 100 aves:

```text
ração mínima = 100 x 7,75 = 775 kg
ração máxima = 100 x 8,20 = 820 kg
sacos mínimos = 775 / 50 = 15,5 = 16 sacos
sacos máximos = 820 / 50 = 16,4 = 17 sacos
```

---

## 5.11. Ração na Fase Adulta

Para planejamento posterior à implantação:

```text
consumo_diario_min = aves x 0,110 kg
consumo_diario_max = aves x 0,125 kg
```

Exemplo para 100 aves:

```text
mínimo = 100 x 0,110 = 11 kg/dia
máximo = 100 x 0,125 = 12,5 kg/dia
```

---

## 6. Modelo de Tabela de Dados do Sistema

O ideal é transformar o documento em uma base de dados estruturada. Cada item deve virar uma linha.

Exemplo de tabela:

| Campo | Exemplo | Explicação |
|---|---|---|
| categoria | Equipamentos | Grupo do item. |
| item | Comedouro tubular 20 kg | Nome do material. |
| unidade | un | Unidade de compra. |
| quantidade_base_100 | 3 | Quantidade usada para 100 aves. |
| preco_min | 70 | Preço mínimo unitário. |
| preco_max | 120 | Preço máximo unitário. |
| tipo_calculo | por_aves_arredondado | Regra de cálculo. |
| parametro | aves / 35 | Fórmula técnica. |
| arredondamento | cima | Sempre arredondar para cima. |
| obrigatorio | sim | Define se entra sempre no orçamento. |

---

## 7. Tipos de Regras no Banco de Dados

O sistema pode usar uma coluna chamada `tipo_calculo`.

| Tipo de Cálculo | Quando Usar | Exemplo |
|---|---|---|
| fixo | Item não muda com poucas aves | ovoscópio, balança, carimbo |
| proporcional | Multiplica pelo fator de escala | cama aviária, etiquetas |
| por_aves | Usa fórmula direta por ave | área de galpão, poleiro |
| por_aves_arredondado | Divide aves por capacidade e arredonda | comedouro, bebedouro, ninho |
| por_area | Calcula conforme área | tela, postes, cobertura |
| por_faixa | Muda por intervalo de aves | caixa d’água, módulos de galpão |
| opcional | Depende da escolha do usuário | legalização, mão de obra, piquete extensivo |

---

## 8. Exemplo de Base de Dados em Formato JSON

```json
[
  {
    "categoria": "Equipamentos",
    "item": "Comedouro tubular 20 kg",
    "unidade": "un",
    "tipo_calculo": "por_aves_arredondado",
    "formula": "aves / 35",
    "preco_min": 70,
    "preco_max": 120,
    "obrigatorio": true
  },
  {
    "categoria": "Equipamentos",
    "item": "Bebedouro pendular automático",
    "unidade": "un",
    "tipo_calculo": "por_aves_arredondado",
    "formula": "aves / 50",
    "preco_min": 80,
    "preco_max": 130,
    "obrigatorio": true
  },
  {
    "categoria": "Equipamentos",
    "item": "Ninho individual",
    "unidade": "un",
    "tipo_calculo": "por_aves_arredondado",
    "formula": "aves / 7",
    "preco_min": 30,
    "preco_max": 70,
    "obrigatorio": true
  },
  {
    "categoria": "Alimentação",
    "item": "Ração até a postura",
    "unidade": "saco 50 kg",
    "tipo_calculo": "por_aves_arredondado",
    "formula_min": "aves * 7.75 / 50",
    "formula_max": "aves * 8.20 / 50",
    "preco_min": 130,
    "preco_max": 190,
    "obrigatorio": true
  }
]
```

---

## 9. Pseudocódigo do Motor de Cálculo

```text
entrada:
    aves
    tipo_piquete
    incluir_mao_de_obra
    incluir_legalizacao
    margem_imprevistos

processo:
    carregar tabela_base
    criar lista_resultado vazia

    para cada item na tabela_base:
        se item for opcional e usuário não selecionou:
            pular item

        se tipo_calculo = "fixo":
            quantidade = quantidade_base

        se tipo_calculo = "proporcional":
            quantidade = quantidade_base x aves / 100

        se tipo_calculo = "por_aves_arredondado":
            quantidade = arredondar_para_cima(fórmula)

        se tipo_calculo = "por_area":
            calcular área
            calcular quantidade por área

        custo_min = quantidade x preco_min
        custo_max = quantidade x preco_max

        adicionar item na lista_resultado

    subtotal_por_categoria = somar itens por categoria
    total_min = somar custos mínimos
    total_max = somar custos máximos
    reserva_min = total_min x margem_imprevistos
    reserva_max = total_max x margem_imprevistos
    total_final_min = total_min + reserva_min
    total_final_max = total_max + reserva_max

saída:
    relatório com lista de materiais, quantidades e valores
```

---

## 10. Exemplo de Código em JavaScript

```javascript
function arredondarCima(valor) {
  return Math.ceil(valor);
}

function calcularSistema(aves) {
  const resultado = [];

  const galpaoM2 = Math.ceil((aves / 7) * 1.05);
  resultado.push({
    categoria: "Infraestrutura",
    item: "Área estimada do galpão",
    quantidade: galpaoM2,
    unidade: "m²"
  });

  const piqueteM2 = aves * 2;
  resultado.push({
    categoria: "Infraestrutura",
    item: "Área recomendada de piquete",
    quantidade: piqueteM2,
    unidade: "m²"
  });

  const comedouros = arredondarCima(aves / 35);
  resultado.push({
    categoria: "Equipamentos",
    item: "Comedouro tubular 20 kg",
    quantidade: comedouros,
    unidade: "un",
    precoMin: 70,
    precoMax: 120,
    custoMin: comedouros * 70,
    custoMax: comedouros * 120
  });

  const bebedouros = arredondarCima(aves / 50);
  resultado.push({
    categoria: "Equipamentos",
    item: "Bebedouro pendular automático",
    quantidade: bebedouros,
    unidade: "un",
    precoMin: 80,
    precoMax: 130,
    custoMin: bebedouros * 80,
    custoMax: bebedouros * 130
  });

  const ninhos = arredondarCima(aves / 7);
  resultado.push({
    categoria: "Equipamentos",
    item: "Ninho individual",
    quantidade: ninhos,
    unidade: "un",
    precoMin: 30,
    precoMax: 70,
    custoMin: ninhos * 30,
    custoMax: ninhos * 70
  });

  const poleiros = aves * 0.15;
  resultado.push({
    categoria: "Equipamentos",
    item: "Poleiros",
    quantidade: poleiros,
    unidade: "m lineares",
    precoMin: 10,
    precoMax: 25,
    custoMin: poleiros * 10,
    custoMax: poleiros * 25
  });

  const sacosRacaoMin = arredondarCima((aves * 7.75) / 50);
  const sacosRacaoMax = arredondarCima((aves * 8.20) / 50);
  resultado.push({
    categoria: "Alimentação",
    item: "Ração até a postura",
    quantidadeMin: sacosRacaoMin,
    quantidadeMax: sacosRacaoMax,
    unidade: "sacos de 50 kg",
    precoMin: 130,
    precoMax: 190,
    custoMin: sacosRacaoMin * 130,
    custoMax: sacosRacaoMax * 190
  });

  return resultado;
}
```

---

## 11. Estrutura Recomendada do Relatório Final

O relatório gerado pelo sistema deve ter o seguinte formato:

```text
Relatório de Investimento para Criação de Galinhas Poedeiras Caipiras

Quantidade de aves: 100
Sistema de piquete: recomendado
Área estimada do galpão: 15 m²
Área estimada de piquetes: 200 m²

1. Infraestrutura
- item
- quantidade
- unidade
- custo mínimo
- custo máximo

2. Equipamentos
- item
- quantidade
- unidade
- custo mínimo
- custo máximo

3. Alimentação
- item
- quantidade
- unidade
- custo mínimo
- custo máximo

Resumo:
Subtotal mínimo: R$ X
Subtotal máximo: R$ Y
Reserva de imprevistos: R$ Z
Total estimado: R$ A a R$ B

Observações técnicas:
- validar vacinação com veterinário;
- consultar inspeção sanitária;
- cotar preços locais;
- ajustar cercamento conforme formato real do terreno.
```

---

## 12. Campos que o Usuário Deve Preencher

Para o sistema funcionar bem, a tela inicial deve pedir poucos dados.

| Campo | Tipo | Exemplo | Obrigatório |
|---|---|---|---|
| Quantidade de aves | número | 100 | Sim |
| Tipo de piquete | seleção | mínimo, recomendado, extensivo | Sim |
| Incluir mão de obra | sim/não | sim | Sim |
| Incluir legalização | sim/não | sim | Sim |
| Margem de imprevistos | porcentagem | 10% | Sim |
| Região | texto/opcional | Minas Gerais | Não |
| Preços personalizados | sim/não | não | Não |

---

## 13. Recursos Extras que Podem Melhorar o Sistema

### 13.1. Edição de Preços

O sistema deve permitir que o usuário altere os preços unitários.

Exemplo:

```text
Preço estimado do saco de ração: R$ 160
Usuário encontrou na região: R$ 145
Sistema recalcula automaticamente.
```

### 13.2. Exportação

O sistema pode exportar o resultado em:

* PDF;
* Excel;
* CSV;
* Word;
* link compartilhável.

### 13.3. Cenários Comparativos

Permitir comparar:

* cenário econômico;
* cenário recomendado;
* cenário completo;
* piquete mínimo;
* piquete extensivo.

### 13.4. Memória de Orçamentos

Se virar um sistema com banco de dados, salvar:

* nome do projeto;
* quantidade de aves;
* data do orçamento;
* preços usados;
* versão da tabela técnica;
* observações.

---

## 14. Modelo de Arquitetura Simples

### Opção 1: Planilha

Mais simples para começar.

Ferramentas:

* Excel;
* Google Sheets;
* LibreOffice Calc.

Vantagens:

* fácil de editar;
* barato;
* rápido para validar as fórmulas.

Desvantagens:

* menos profissional;
* difícil controlar versões;
* menos prático para usuários leigos.

### Opção 2: Aplicativo Web Simples

Ferramentas possíveis:

* HTML, CSS e JavaScript;
* React;
* Node.js;
* banco de dados SQLite ou PostgreSQL.

Vantagens:

* mais profissional;
* pode gerar relatório automático;
* pode ser publicado na internet;
* fácil de usar no celular.

Desvantagens:

* exige desenvolvimento;
* exige manutenção;
* precisa atualizar preços e referências.

### Opção 3: Sistema Web com Banco de Dados

Indicado se o objetivo for vender ou disponibilizar para muitos usuários.

Componentes:

| Parte | Função |
|---|---|
| Frontend | Tela onde o usuário informa os dados. |
| Backend | Motor que calcula quantidades e custos. |
| Banco de dados | Guarda itens, preços, fórmulas e orçamentos. |
| Gerador de relatório | Cria PDF, Excel ou página final. |
| Painel administrativo | Permite atualizar preços e fórmulas. |

---

## 15. Banco de Dados Sugerido

### Tabela: itens_orcamento

| Campo | Tipo | Exemplo |
|---|---|---|
| id | número | 1 |
| categoria | texto | Equipamentos |
| item | texto | Comedouro tubular 20 kg |
| unidade | texto | un |
| tipo_calculo | texto | por_aves_arredondado |
| formula | texto | aves / 35 |
| quantidade_base_100 | número | 3 |
| preco_min | número | 70 |
| preco_max | número | 120 |
| obrigatorio | booleano | true |
| observacao | texto | Usar no mínimo 3 para 100 aves |

### Tabela: orcamentos

| Campo | Tipo | Exemplo |
|---|---|---|
| id | número | 1 |
| nome | texto | Projeto 100 aves |
| quantidade_aves | número | 100 |
| tipo_piquete | texto | recomendado |
| margem_imprevistos | número | 0,10 |
| total_min | número | 20304,90 |
| total_max | número | 43645,95 |
| data_criacao | data | 2026-06-28 |

### Tabela: orcamento_itens

| Campo | Tipo | Exemplo |
|---|---|---|
| id | número | 1 |
| orcamento_id | número | 1 |
| item_id | número | 5 |
| quantidade | número | 3 |
| custo_min | número | 210 |
| custo_max | número | 360 |

---

## 16. Exemplo de Saída para 100 Aves

| Item | Quantidade Calculada | Unidade | Custo Mínimo | Custo Máximo |
|---|---:|---|---:|---:|
| Área do galpão | 15 | m² | variável | variável |
| Área de piquete recomendado | 200 | m² | variável | variável |
| Comedouros tubulares | 3 | un | R$ 210 | R$ 360 |
| Bebedouros pendulares | 2 | un | R$ 160 | R$ 260 |
| Ninhos individuais | 15 | un | R$ 450 | R$ 1.050 |
| Poleiros | 15 | m | R$ 150 | R$ 375 |
| Ração até postura | 16 a 17 | sacos 50 kg | R$ 2.080 | R$ 3.230 |

Observação: este é apenas um exemplo parcial. O sistema completo deve incluir todas as categorias do documento corrigido.

---

## 17. Regras de Segurança Técnica

O sistema deve mostrar alertas automáticos quando necessário.

Exemplos:

| Situação | Alerta |
|---|---|
| Área de galpão abaixo de 7 aves/m² | “Atenção: densidade acima da recomendada.” |
| Piquete mínimo selecionado | “Exige rotação rigorosa e manejo intensivo da vegetação.” |
| Usuário desmarca legalização | “Venda formal pode exigir registro sanitário.” |
| Usuário usa ração abaixo do recomendado | “Risco de queda de postura e problemas nutricionais.” |
| Quantidade de ninhos insuficiente | “Pode aumentar ovos no chão, ovos sujos e perdas.” |

---

## 18. Melhor Forma de Começar

A melhor forma é desenvolver em etapas.

### Etapa 1 — Planilha

Criar uma planilha com:

* aba de entrada;
* aba de parâmetros;
* aba de cálculo;
* aba de relatório.

### Etapa 2 — Validação

Testar com:

* 50 aves;
* 100 aves;
* 200 aves;
* 500 aves.

Verificar se as quantidades fazem sentido.

### Etapa 3 — Aplicativo Web

Depois que as fórmulas estiverem validadas, transformar em sistema web.

### Etapa 4 — Atualização de Preços

Criar painel para alterar preços sem mexer no código.

---

## 19. Conclusão

Para transformar o guia em um sistema automático, o mais importante é não deixar o texto solto. O conteúdo precisa virar uma **base estruturada de itens, preços e fórmulas**.

A lógica principal é:

```text
usuário informa número de aves
sistema calcula fator de escala
sistema aplica fórmulas técnicas por item
sistema arredonda quantidades de compra
sistema calcula custos mínimo e máximo
sistema gera lista de materiais e relatório final
```

Com essa estrutura, o mesmo documento pode virar:

* uma planilha automática;
* uma calculadora online;
* um aplicativo de orçamento;
* um sistema comercial para produtores rurais.
