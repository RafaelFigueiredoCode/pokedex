export const  vantagens = {
  fogo: ['planta', 'gelo', 'inseto', 'aco'],
  agua: ['fogo', 'terra', 'pedra'],
  planta: ['agua', 'terra', 'pedra'],
  eletrico: ['agua', 'voador'],

  gelo: ['planta', 'terra', 'voador', 'dragao'],
  lutador: ['normal', 'gelo', 'pedra', 'noturno', 'aco'],
  veneno: ['planta', 'fada'],
  terra: ['fogo', 'eletrico', 'veneno', 'pedra', 'aco'],

  voador: ['planta', 'lutador', 'inseto'],
  psiquico: ['lutador', 'veneno'],
  inseto: ['planta', 'psiquico', 'noturno'],
  pedra: ['fogo', 'gelo', 'voador', 'inseto'],

  fantasma: ['psiquico', 'fantasma'],
  dragao: ['dragao'],
  noturno: ['psiquico', 'fantasma'],
  aco: ['gelo', 'pedra', 'fada'],

  fada: ['lutador', 'dragao', 'noturno'],
  }