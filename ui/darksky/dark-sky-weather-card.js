import { LitElement, html, } from 'https://unpkg.com/@polymer/lit-element@^0.5.2/lit-element.js?module';

// Create your custom component
class DarkSkyWeatherCard extends LitElement {
  
  // Declare properties
  static get properties() {
    return { hass: Object, config: Object, };
  }


// #####
// ##### Define Render Template
// #####

  _render( {hass, config }) {

//  Handle Configuration Flags 
    var icons = this.config.static_icons ? "static" : "animated";
    var sunLeft = this.config.entity_sun ? this.sunSet.left : "";
    var sunRight = this.config.entity_sun ? this.sunSet.right : "";
    var apparentTemp =  this.config.entity_apparent_temp ? html`<span class="apparent">${this.feelsLikeText} ${this.current.apparent} ${this.getUOM("temperature")}</span>` : ``;
    var daytimeHigh = this.config.entity_daytime_high ? html`<li><span class="ha-icon"><ha-icon icon="mdi:thermometer"></ha-icon></span>${Math.round(this.hass.states[this.config.entity_daytime_high].state)}<span> ${this.getUOM('temperature')}</span></li>` : ``;
    var pop = this.config.entity_pop ? html`<li><span class="ha-icon"><ha-icon icon="mdi:weather-rainy"></ha-icon></span>${Math.round(this.hass.states[this.config.entity_pop].state)} %</li>` : ``;
    var visibility = this.config.entity_visibility ? html`<li><span class="ha-icon"><ha-icon icon="mdi:weather-fog"></ha-icon></span>${this.current.visibility}<span class="unit"> ${this.getUOM('length')}</span></li>` : ``;
    var windBearing = this.config.entity_wind_bearing && this.config.entity_wind_speed ? html`<li><span class="ha-icon"><ha-icon icon="mdi:weather-windy"></ha-icon></span>${this.current.windBearing} ${this.current.windSpeed}<span class="unit"> ${this.getUOM('length')}/h</span></li>` : ``;
    var humidity = this.config.entity_humidity ? html`<li><span class="ha-icon"><ha-icon icon="mdi:water-percent"></ha-icon></span>${this.current.humidity}<span class="unit"> %</span></li>` : ``;
    var pressure = this.config.entity_pressure ? html`<li><span class="ha-icon"><ha-icon icon="mdi:gauge"></ha-icon></span>${this.current.pressure}<span class="unit"> ${this.getUOM('air_pressure')}</span></li>` : ``;
    var summary = this.config.entity_daily_summary ? html`<br><span class="unit">${hass.states[this.config.entity_daily_summary].state}</span></br>` : ``;

// Build HTML    
    return html`
      <style>
      ${this.style}
      </style>
      <ha-card class = "card">  
        <span class="icon bigger" style="background: none, url(/local/icons/weather_icons/${icons}/${this.weatherIcons[this.current.conditions]}.svg) no-repeat; background-size: contain;">${this.current.conditions}</span>
        <span class="temp">${this.current.temperature}</span><span class="tempc">${this.getUOM('temperature')}</span>
        ${apparentTemp}
        <span>
          <ul class="variations right">
              ${pop}
              ${humidity}
              ${pressure}
              ${sunRight}
          </ul>
          <ul class="variations">
              ${daytimeHigh} 
              ${windBearing}
              ${visibility}
              ${sunLeft}
          </ul>
        </span>
            <div class="forecast clear">
              ${this.forecast.map(daily => html`
                <div class="day fcasttooltip">
                  <span class="dayname">${(daily.date).toLocaleDateString(this.config.locale,{weekday: 'short'})}</span>
                  <br><i class="icon" style="background: none, url(/local/icons/weather_icons/${icons}/${this.weatherIcons[this.hass.states[daily.condition].state]}.svg) no-repeat; background-size: contain;"></i>
                  ${this.config.old_daily_format ? html`<br><span class="highTemp">${Math.round(this.hass.states[daily.temphigh].state)}${this.getUOM("temperature")}</span>
                                                        <br><span class="lowTemp">${Math.round(this.hass.states[daily.templow].state)}${this.getUOM("temperature")}</span>` : 
                                                   html`<br><span class="lowTemp">${Math.round(this.hass.states[daily.templow].state)}</span> / <span class="highTemp">${Math.round(this.hass.states[daily.temphigh].state)}${this.getUOM("temperature")}</span>`}
                  ${this.config.entity_pop_1 && this.config.entity_pop_2 && this.config.entity_pop_3 && this.config.entity_pop_4 && this.config.entity_pop_5 ? html`<br><span class="pop">${Math.round(this.hass.states[daily.pop].state)} %</span>` : ``}
                  <div class="fcasttooltiptext">${ this.config.tooltips ? this.hass.states[daily.summary].state : ""}</div>
                </div>`)}
              </div>
        ${summary}
      </ha-card>
    `;
  }


// #####
// ##### windDirections" returns set of possible wind directions by specified language
// #####

  get windDirections() {
    const windDirections_en = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'];
    const windDirections_fr = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSO','SO','OSO','O','ONO','NO','NNO','N'];
    const windDirections_de = ['N','NNO','NO','ONO','O','OSO','SO','SSO','S','SSW','SW','WSW','W','WNW','NW','NNW','N'];
    const windDirections_nl = ['N','NNO','NO','ONO','O','OZO','ZO','ZZO','Z','ZZW','ZW','WZW','W','WNW','NW','NNW','N'];
    
    switch (this.config.locale) {
      case "it" :
      case "fr" :
        return windDirections_fr;
      case "de" :
        return windDirections_de;
      case "nl" :
        return windDirections_nl;
      default :
        return windDirections_en;
    }
  }

// #####
// ##### feelsLikeText returns set of possible "Feels Like" text by specified language
// #####

  get feelsLikeText() {
    const feelsLike_en = "Feels like";
    const feelsLike_fr = "Se sent comme";
    const feelslike_it = "Si sente come";
    const feelsLike_de = "Fühlt sich an wie";
    const feelsLike_nl = "Voelt als";

    switch (this.config.locale) {
      case "it" :
        return feelslike_it;
      case "fr" :
        return feelsLike_fr;
      case "de" :
        return feelsLike_de;
      case "nl" :
        return feelsLike_nl;
      default :
        return feelsLike_en;
    }
  }
  
// #####
// ##### dayOrNight : returns day or night depending opn the position of the sun.
// #####

  get dayOrNight() {
    const transformDayNight = { "below_horizon": "night", "above_horizon": "day", }
    return transformDayNight[this.hass.states[this.config.entity_sun].state];
  }


// #####
// ##### weatherIcons: returns icon names based on current conditions text
// #####
  get weatherIcons() {
    return {
      'clear-day': 'day',
      'clear-night': 'night',
      'rain': 'rainy-5',
      'snow': 'snowy-6',
      'sleet': 'rainy-6',
      'wind': 'cloudy',
      'fog': 'cloudy',
      'cloudy': 'cloudy',
      'partly-cloudy-day': 'cloudy-day-3',
      'partly-cloudy-night': 'cloudy-night-3',
      'hail': 'rainy-7',
      'lightning': 'thunder',
      'thunderstorm': 'thunder',
      'windy-variant': `cloudy-day-3`,
      'exceptional': '!!',
    }
  }


// #####
// ##### forecast : returns forcasted weather information for the next 5 days
// #####

  get forecast() {
    var forecastDate1 = new Date();
    forecastDate1.setDate(forecastDate1.getDate()+1);
    var forecastDate2 = new Date();
    forecastDate2.setDate(forecastDate2.getDate()+2);
    var forecastDate3 = new Date();
    forecastDate3.setDate(forecastDate3.getDate()+3);
    var forecastDate4 = new Date();
    forecastDate4.setDate(forecastDate4.getDate()+4);
    var forecastDate5 = new Date();
    forecastDate5.setDate(forecastDate5.getDate()+5);
    

    const forecast1 = { date: forecastDate1,
  	                  condition: this.config.entity_forecast_icon_1,
  										temphigh: this.config.entity_forecast_high_temp_1,
  										templow:  this.config.entity_forecast_low_temp_1,
  										pop: this.config.entity_pop_1,
  										summary: this.config.entity_summary_1, };
    const forecast2 = { date: forecastDate2,
  	                  condition: this.config.entity_forecast_icon_2,
  										temphigh: this.config.entity_forecast_high_temp_2,
  										templow:  this.config.entity_forecast_low_temp_2,
  										pop: this.config.entity_pop_2,
  										summary: this.config.entity_summary_2,  };
    const forecast3 = { date: forecastDate3,
  	                  condition: this.config.entity_forecast_icon_3,
  										temphigh: this.config.entity_forecast_high_temp_3,
  										templow:  this.config.entity_forecast_low_temp_3,
  										pop: this.config.entity_pop_3,
  										summary: this.config.entity_summary_3, };
    const forecast4 = { date: forecastDate4,
  	                  condition: this.config.entity_forecast_icon_4,
  										temphigh: this.config.entity_forecast_high_temp_4,
  										templow:  this.config.entity_forecast_low_temp_4,
  										pop: this.config.entity_pop_4,
  										summary: this.config.entity_summary_4, };
    const forecast5 = { date: forecastDate5,
  	                  condition: this.config.entity_forecast_icon_5,
  										temphigh: this.config.entity_forecast_high_temp_5,
  										templow:  this.config.entity_forecast_low_temp_5,
  										pop: this.config.entity_pop_5,
  										summary: this.config.entity_summary_5, };

	  return [forecast1, forecast2, forecast3, forecast4, forecast5];
  }


// #####
// ##### current : Returns current weather information
// #####

  get current() {
    var conditions = this.hass.states[this.config.entity_current_conditions].state;
    var humidity = this.config.entity_apparent_humidity ? this.hass.states[this.config.entity_humidity].state : 0;
    var pressure = this.config.entity_pressure ? Math.round(this.hass.states[this.config.entity_pressure].state) : 0;
    var temperature = Math.round(this.hass.states[this.config.entity_temperature].state);
    var visibility = this.config.entity_visibility ? this.hass.states[this.config.entity_visibility].state : 0;
    var windBearing = this.config.entity_wind_bearing ? this.windDirections[(Math.round((this.hass.states[this.config.entity_wind_bearing].state / 360) * 16))] : 0;
    var windSpeed = this.config.entity_wind_speed ? Math.round(this.hass.states[this.config.entity_wind_speed].state) : 0;
    var apparent = this.config.entity_apparent_temp ? Math.round(this.hass.states[this.config.entity_apparent_temp].state) : 0;
    
    return {
      'conditions': conditions,
      'humidity': humidity,
      'pressure': pressure,
      'temperature': temperature,
      'visibility': visibility,
      'windBearing': windBearing,
      'windSpeed': windSpeed,
      'apparent' : apparent,
    }
  }

// #####
// ##### sunSetAndRise: returns set and rise information
// #####

get sunSet() {
    var nextSunSet = new Date(this.hass.states[this.config.entity_sun].attributes.next_setting).toLocaleTimeString(this.config.locale, {hour: '2-digit', minute:'2-digit'});
    var nextSunRise = new Date(this.hass.states[this.config.entity_sun].attributes.next_rising).toLocaleTimeString(this.config.locale, {hour: '2-digit', minute:'2-digit'});
    var sunLeft;
    var sunRight;
    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    if (this.hass.states[this.config.entity_sun].state == "above_horizon" ) {
      nextSunRise = nextDate.toLocaleDateString(this.config.locale,{weekday: 'short'}) + " " + nextSunRise;
      return {
      'left': html`<li><span class="ha-icon"><ha-icon icon="mdi:weather-sunset-down"></ha-icon></span>${nextSunSet}</li>`,
      'right': html`<li><span class="ha-icon"><ha-icon icon="mdi:weather-sunset-up"></ha-icon></span>${nextSunRise}</li>`,
      };
    } else {
      if (new Date().getDate() != new Date(this.hass.states[this.config.entity_sun].attributes.next_rising).getDate()) {
        nextSunRise = nextDate.toLocaleDateString(this.config.locale,{weekday: 'short'}) + " " + nextSunRise;
        nextSunSet = nextDate.toLocaleDateString(this.config.locale,{weekday: 'short'}) + " " + nextSunSet;
      } 
      return {
      'left': html`<li><span class="ha-icon"><ha-icon icon="mdi:weather-sunset-up"></ha-icon></span>${nextSunRise}</li>`,
      'right': html`<li><span class="ha-icon"><ha-icon icon="mdi:weather-sunset-down"></ha-icon></span>${nextSunSet}</li>`,
      };
    }
}


// #####
// ##### style: returns the CSS style classes for the card
// ####

get style() {
  
  // Get config flags or set defaults if not configured
  var tooltipBGColor = this.config.tooltip_bg_color || "rgb( 75,155,239)";
  var tooltipFGColor = this.config.tooltip_fg_color || "#fff";
  var tooltipBorderColor = this.config.tooltip_border_color || "rgb(255,161,0)";
  var tooltipBorderWidth = this.config.tooltip_border_width || "1";
  var tooltipCaretSize = this.config.tooltip_caret_size || "5";
  var tooltipWidth = this.config.tooltip_width || "110"
  var tooltipLeftOffset = this.config.tooltip_left_offset || "-12"
  var tooltipVisible = this.config.tooltips ? "visible" : "hidden"
  
  return html`
        .clear {
        clear: both;
      }

      .card {
        margin: auto;
        padding-top: 2em;
        padding-bottom: 1em;
        padding-left: 1em;
        padding-right:1em;
        position: relative;
      }

      .ha-icon {
        height: 18px;
        margin-right: 5px;
        color: var(--paper-item-icon-color);
      }

      .temp {
        font-weight: 300;
        font-size: 4em;
        color: var(--primary-text-color);
        position: absolute;
        right: 1em;
      }

      .tempc {
        font-weight: 300;
        font-size: 1.5em;
        vertical-align: super;
        color: var(--primary-text-color);
        position: absolute;
        right: 1em;
        margin-top: -14px;
        margin-right: 7px;
      }

      .apparent {
        color: var(--primary-text-color);
        position: absolute;
        right: 1em;
        margin-top: 35px;
        margin-right: 1em;
      }
      
      .pop {
        font-weight: 400;
        color: var(--primary-text-color);
      }

      .variations {
        display: inline-block;
        font-weight: 300;
        color: var(--primary-text-color);
        list-style: none;
        margin-left: -2em;
        margin-top: 5em;
      }

      .variations.right {
        position: absolute;
        right: 1em;
        margin-left: 0;
        margin-right: 1em;
      }

      .unit {
        font-size: .8em;
      }

      .forecast {
        width: 100%;
        margin: 0 auto;
        height: 9em;
      }

      .day {
        display: block;
        width: 20%;
        float: left;
        text-align: center;
        color: var(--primary-text-color);
        border-right: .1em solid #d9d9d9;
        line-height: 1.5;
        box-sizing: border-box;
        margin-top: 1em;
      }

      .dayname {
        text-transform: uppercase;
      }

      .forecast .day:first-child {
        margin-left: 20;
      }

      .forecast .day:nth-last-child(1) {
        border-right: none;
        margin-right: 0;
      }

      .highTemp {
        font-weight: bold;
      }

      .lowTemp {
        color: var(--secondary-text-color);
      }

      .icon.bigger {
        width: 10em;
        height: 10em;
        margin-top: -4em;
        position: absolute;
        left: 0em;
      }

      .icon {
        width: 50px;
        height: 50px;
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        text-indent: -9999px;
      }

      .weather {
        font-weight: 300;
        font-size: 1.5em;
        color: var(--primary-text-color);
        text-align: left;
        position: absolute;
        top: -0.5em;
        left: 6em;
        word-wrap: break-word;
        width: 30%;
      }
  
      .fcasttooltip {
        position: relative;
        display: inline-block;
      }

      .fcasttooltip .fcasttooltiptext {
        visibility: hidden;
        width: ${tooltipWidth}px;
        background-color: ${tooltipBGColor};
        color: ${tooltipFGColor};
        text-align: center; 
        border-radius: 6px;
        border-style: solid;
        border-color: ${tooltipBorderColor};
        border-width: ${tooltipBorderWidth}px;
        padding: 5px 0;

        /* Position the tooltip */
        position: absolute;
        z-index: 1;
        bottom: 50%;
        left: 0%; 
        margin-left: ${tooltipLeftOffset}px;
      }

      .fcasttooltip .fcasttooltiptext:after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -${tooltipCaretSize}px;
        border-width: ${tooltipCaretSize}px;
        border-style: solid;
        border-color: ${tooltipBorderColor} transparent transparent transparent;
      }

      .fcasttooltip:hover .fcasttooltiptext {
        visibility: ${tooltipVisible};
      }
      `
}

// #####
// ##### getUOM: gets UOM for specified measure in either metric or imperial
// #####

  getUOM(measure) {
    
    const lengthUnit = this.hass.config.unit_system.length;
    
    switch (measure) {
      case 'air_pressure':
        return lengthUnit === 'km' ? 'hPa' : 'mbar';
      case 'length':
        return lengthUnit;
      case 'precipitation':
        return lengthUnit === 'km' ? 'mm' : 'in';
      default:
        return this.hass.config.unit_system[measure] || '';
    }
  }


  setConfig(config) {
//    if (!config.entity) {
//      throw new Error('You need to define an entity');
//    }
    this.config = config;
  }
  
  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3 //this.config.entities.length + 1;
  }
  
}

customElements.define('dark-sky-weather-card', DarkSkyWeatherCard);

