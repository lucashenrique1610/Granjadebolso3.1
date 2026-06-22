import { fundamentosCriacaoCaipira } from './fundamentos-criacao-caipira';
import { instalacoes } from './instalacoes';
import { escolhaDaLinhagem } from './escolha-da-linhagem';
import { cria } from './cria';
import { recria } from './recria';
import { prePostura } from './pre-postura';
import { postura } from './postura';
import { nutricao } from './nutricao';
import { manejoDaAgua } from './manejo-da-agua';
import { sanidade } from './sanidade';
import { vacinacao } from './vacinacao';
import { biosseguridade } from './biosseguridade';
import { producaoDeOvos } from './producao-de-ovos';
import { classificacaoDeOvos } from './classificacao-de-ovos';
import { comercializacao } from './comercializacao';
import { custos } from './custos';
import { indicadoresZootecnicos } from './indicadores-zootecnicos';
import { bemEstarAnimal } from './bem-estar-animal';
import { manejoDePiquetes } from './manejo-de-piquetes';
import { reproducao } from './reproducao';
import { incubacao } from './incubacao';
import { gestaoDaPropriedade } from './gestao-da-propriedade';
import { solucaoDeProblemas } from './solucao-de-problemas';
import { KnowledgeModule } from '@/types';

export const KNOWLEDGE_MODULES: KnowledgeModule[] = [
  fundamentosCriacaoCaipira,
  instalacoes,
  escolhaDaLinhagem,
  cria,
  recria,
  prePostura,
  postura,
  nutricao,
  manejoDaAgua,
  sanidade,
  vacinacao,
  biosseguridade,
  producaoDeOvos,
  classificacaoDeOvos,
  comercializacao,
  custos,
  indicadoresZootecnicos,
  bemEstarAnimal,
  manejoDePiquetes,
  reproducao,
  incubacao,
  gestaoDaPropriedade,
  solucaoDeProblemas,
];

export {
  fundamentosCriacaoCaipira,
  instalacoes,
  escolhaDaLinhagem,
  cria,
  recria,
  prePostura,
  postura,
  nutricao,
  manejoDaAgua,
  sanidade,
  vacinacao,
  biosseguridade,
  producaoDeOvos,
  classificacaoDeOvos,
  comercializacao,
  custos,
  indicadoresZootecnicos,
  bemEstarAnimal,
  manejoDePiquetes,
  reproducao,
  incubacao,
  gestaoDaPropriedade,
  solucaoDeProblemas,
};

export function getKnowledgeModule(id: string): KnowledgeModule | undefined {
  return KNOWLEDGE_MODULES.find((module) => module.id === id);
}
