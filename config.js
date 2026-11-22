/* Configuração pública do site — preencha os IDs quando estiverem disponíveis.
   Nenhum segredo deve ser colocado aqui: este arquivo é servido ao navegador. */
window.PROSPECT_CONFIG = {
  // Hotmart
  checkoutParcelado: "https://pay.hotmart.com/O108604594H",      // oferta com parcelamento em até 12x
  checkoutAVista: "https://pay.hotmart.com/O108604594H",         // oferta de pagamento único
  checkoutAtivo: "https://pay.hotmart.com/O108604594H",          // usado pelos botões da página

  // Rastreamento — deixe vazio para não carregar nenhum script de terceiros
  metaPixelId: "",   // ex.: "123456789012345"
  ga4Id: "",         // ex.: "G-XXXXXXXXXX"

  // Eventos de conversão
  eventoCheckout: "InitiateCheckout",
  eventoLead: "ViewContent",

  // Versão publicada (aparece no console, útil para conferir o deploy)
  versao: "1.0.0"
};
