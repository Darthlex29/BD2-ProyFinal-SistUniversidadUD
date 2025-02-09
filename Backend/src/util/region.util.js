// region.config.js
// Este módulo mantiene la configuración de la región con métodos getter y setter.
class RegionConfig {
    constructor() {
      // Se inicializa con la variable de entorno DEFAULT_REGION o un valor por defecto (ej. "chapinero")
      this._region = process.env.DEFAULT_REGION || "chapinero";
    }
    
    // Método para obtener la región actual
    getRegion() {
      return this._region;
    }
    
    // Método para establecer una nueva región
    setRegion(newRegion) {
      // Aquí podrías agregar validaciones si es necesario
      this._region = newRegion;
    }
    
    // También se pueden definir propiedades getter y setter si prefieres usar la sintaxis de propiedades
    get region() {
      return this._region;
    }
    
    set region(newRegion) {
      this._region = newRegion;
    }
  }
  
  // Exporta una única instancia (singleton) de RegionConfig para usar en toda la aplicación
  export default new RegionConfig();
  