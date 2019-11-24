# BOM Weather Card

![image](bom-weather.png)

This card is a modification of a fork of iammexx/home-assistant-config dark-sky-weather-card

# NOTE: This card REQUIRES the BOM Sensor core component and the BOM FTP Forecast Custom Component. See links below.

The BOM Weather Card provides current and forecasted weather conditions using the BOM sensor platforms in core Home Assistant and a custom component for BOM Forecast from [my forecast repo here](https://github.com/DavidFW1960/bom_forecast) You configure the card by passing in sensor entities from these BOM platforms. 

The [weather package](https://github.com/DavidFW1960/bom_forecast/blob/master/weather.yaml) in the BOM Forecast component contains BOM Sensor platform configuration for this card as well. Both the core BOM Sensor and BOM Forecast custom component are REQUIRED to use this card.

The card is very customizable.  You can configure many aspects of it's look and feel as well as which specific content to show by passing in customization flags and defining optional sensors.  Content can also be rearranged if desired. 

Hovering over a forecast day will display the daily weather summary in a tooltip popup if that option has been enabled.


## **Installation**
------------------------------
# EASY Way? use HACS
This plugin is now part of the default HACS store. You should not need to add it manually. Add this repo https://github.com/DavidFW1960/bom-weather-card

1. Install card from HACS as per other plugins. Note that you must add this card as a module to the resources section as per the instructions when you install the card.

2. Download the amcharts icons from https://www.amcharts.com/dl/svg-weather-icons/ and put them in ```<config-dir>/www/icons/weather_icons```.  Create the directories if necessary. NOTE: I have found a few more svg icons (from here https://github.com/SouthernWolf95/amCharts-SVG-Icons-Additions ) to use in this component so [ALL icons required are in this file here](https://github.com/DavidFW1960/bom-weather-card/blob/master/weather_icons.zip)

# HARD Way? manual installation as follows:
1. Add ```bom-weather-card.js``` to your ```<config-dir>/www/custom_ui/``` directory.  If you don't have this directory (this is your first custom card), you will need to create it.

2. Download the amcharts icons from https://www.amcharts.com/dl/svg-weather-icons/ and put them in ```<config-dir>/www/icons/weather_icons```.  Create the directories if necessary. NOTE: I have found a few more svg icons to use in this component so [ALL icons required are in this file here](https://github.com/DavidFW1960/bom-weather-card/blob/master/weather_icons.zip)

You should end up with the following folders:

```<config-dir>/www/custom_ui/bom-weather-card.js```
OR HACS
```<config-dir>/www/community/bom-weather-card/bom-weather-card.js```

```<config-dir>/www/icons/weather_icons/animated/```

```<config-dir>/www/icons/weather_icons/static/```

## **Configuration**
------------------------------
1. IF You don't use the package weather.yaml, Add the BOM sensor platform to your configuration.yaml or sensors.yaml or wherever you keep your sensor configuration.

~~~~  
  - platform: bom
    station: !secret my_bom_station
    name: !secret my_bom_name
    monitored_conditions:
      - apparent_t
      - delta_t
      - gust_kmh
      - gust_kt
      - air_temp
      - dewpt
      - rain_trace
      - rel_hum
      - wind_dir
      - wind_spd_kmh
      - wind_spd_kt
~~~~
Note that different weather stations have different monitored conditions available. Some include pressure for example. See the BOM Sensor docs to see other options and try them with your weather station. I am also using secrets.yaml to set station and name.

YOU MUST also install and configure the Custom Component BOM FTP Forecast for this card.

The next two steps are completed differently based on the version of HA you are using:
- Pre 0.84 or if using yaml mode in 0.84 or above : Add to your ui-lovelace.yaml file.
- Using storage mode in 0.84 or above use the "Raw Config Editor" to add the reference and definition to the config.

2. Add the card reference at the top of the configuration

   **Note: Ensure type is set to module and not js**  
   **Note: /local/ points to the ```<config-dir>/www/``` dir.**
   **Note: /community_plugin/ points to the ```<config-dir>/www/community/``` dir.**

For a HACS Installation:
~~~~
resources:
  - url: /community_plugin/bom-weather-card/bom-weather-card.js
    type: module
~~~~

For the manual installation:
~~~~
resources:
  - url: /local/custom_ui/bom-weather-card.js?v=0.1
    type: module
~~~~

3. Add the card definition:  There are required / optional and flag entries.
NOTE: My entries show a mix of the FTP Component sensors and this platform's sensors. **All my values refer to Gosford entities.. You will need to edit these to match your sensors names.**

Required entries must be present 
in your configuration.  The card will not work at all if any of these lines are missing. **EDIT gosford to match your observations/forecasts**
~~~~
          - type: custom:bom-weather-card
            title: BOM Weather
            entity_current_conditions: sensor.bom_gosford_icon_0
            entity_temperature: sensor.bom_gosford_air_temp_c
            entity_forecast_high_temp_1: sensor.bom_gosford_max_temp_c_1
            entity_forecast_high_temp_2: sensor.bom_gosford_max_temp_c_2
            entity_forecast_high_temp_3: sensor.bom_gosford_max_temp_c_3
            entity_forecast_high_temp_4: sensor.bom_gosford_max_temp_c_4
            entity_forecast_high_temp_5: sensor.bom_gosford_max_temp_c_5
            entity_forecast_icon_1: sensor.bom_gosford_icon_1
            entity_forecast_icon_2: sensor.bom_gosford_icon_2
            entity_forecast_icon_3: sensor.bom_gosford_icon_3
            entity_forecast_icon_4: sensor.bom_gosford_icon_4
            entity_forecast_icon_5: sensor.bom_gosford_icon_5
            entity_forecast_low_temp_1: sensor.bom_gosford_min_temp_c_1
            entity_forecast_low_temp_2: sensor.bom_gosford_min_temp_c_2
            entity_forecast_low_temp_3: sensor.bom_gosford_min_temp_c_3
            entity_forecast_low_temp_4: sensor.bom_gosford_min_temp_c_4
            entity_forecast_low_temp_5: sensor.bom_gosford_min_temp_c_5
            entity_summary_1: sensor.bom_gosford_summary_1
            entity_summary_2: sensor.bom_gosford_summary_2
            entity_summary_3: sensor.bom_gosford_summary_3
            entity_summary_4: sensor.bom_gosford_summary_4
            entity_summary_5: sensor.bom_gosford_summary_5
~~~~

Optional entries add components to the card. My BOM area (Gosford) does not include visibility or pressure. Edit entities to your correct sensor names. Replace Gosford with your name.

***Please note entity_pop_1 to 5 lines must all be included for daily pop (probability of precip) to show in forecast

***Also note that for daily possible rainfall to show, entity_possible_today as well as the 5 entity_pos_1 to 5 lines are needed.

***Also note that the name for tomorrow's possible rainfall has changed!

~~~~
            entity_sun: sun.sun
#           entity_visibility: sensor.???? - Not available in my area
            entity_daytime_high: sensor.bom_today_max
            entity_daytime_low: sensor.bom_today_min
            entity_wind_bearing: sensor.bom_gosford_wind_direction
            entity_wind_speed: sensor.bom_gosford_wind_speed_kmh
            entity_humidity: sensor.bom_gosford_relative_humidity
#           entity_pressure: sensor.???? - Not available in my area
            entity_apparent_temp: sensor.bom_gosford_feels_like_c
            entity_daily_summary: sensor.bom_gosford_detailed_summary_0
            entity_pop: sensor.bom_gosford_chance_of_rain_0
            entity_pop_intensity: sensor.bom_gosford_rain_today
            entity_possible_today: sensor.bom_gosford_possible_rainfall_0
            entity_pos_1: sensor.bom_gosford_possible_rainfall_1
            entity_pos_2: sensor.bom_gosford_possible_rainfall_2
            entity_pos_3: sensor.bom_gosford_possible_rainfall_3
            entity_pos_4: sensor.bom_gosford_possible_rainfall_4
            entity_pos_5: sensor.bom_gosford_possible_rainfall_5
            entity_pop_1: sensor.bom_gosford_chance_of_rain_1
            entity_pop_2: sensor.bom_gosford_chance_of_rain_2
            entity_pop_3: sensor.bom_gosford_chance_of_rain_3
            entity_pop_4: sensor.bom_gosford_chance_of_rain_4
            entity_pop_5: sensor.bom_gosford_chance_of_rain_5
~~~~

**Note:** The following entries require template sensors.  
~~~~
            entity_current_text: sensor.dark_sky_current_text
            entity_uv_alert: sensor.bom_uv_alert
            entity_fire_danger: sensor.bom_fire_danger
            entity_uv_alert_summary: sensor.bom_uv_alert_summary
            entity_fire_danger_summary: sensor.bom_fire_danger_summary
~~~~

**Example template sensors:** You can call template sensors whatever you want so long as you use the same name in the card config. (Included in weather.yaml) 
~~~~~
      bom_current_text:
        value_template: >
            {% set val = states('sensor.bom_gosford_summary_0').split('.')[0] %} 
            {{ val | title }}

      bom_uv_alert:
        value_template: >
            {%- if states('sensor.bom_gosford_uv_alert_0') == '##' -%}
            UV Today: No Data
            {%- elif states('sensor.bom_gosford_uv_alert_0') != 'n/a' -%} 
            UV Today: {{ states('sensor.bom_gosford_uv_alert_0') }}
            {%- elif states('sensor.bom_gosford_uv_alert_1') == '##' -%}
            UV Tomorrow: No Data
            {%- else -%}
            UV Tomorrow: {{ states('sensor.bom_gosford_uv_alert_1') }}
            {%- endif -%}

      bom_uv_alert_summary:
        value_template: >
            {%- if states('sensor.bom_gosford_uv_alert_0') == '##' -%} 
            {% set val = 'No Data' %}
            {%- elif states('sensor.bom_gosford_uv_alert_0') != 'n/a' -%} 
            {% set val = states('sensor.bom_gosford_uv_alert_0').split('[')[1].split(']')[0] %}
            {%- elif states('sensor.bom_gosford_uv_alert_1') == '##' -%} 
            {% set val = 'No Data' %}
            {%- elif states('sensor.bom_gosford_uv_alert_1') != 'n/a' -%} 
            {% set val = states('sensor.bom_uv_alert_1').split('[')[1].split(']')[0] %}
            {%- else -%}
            {%- set val = 'No Data' -%}
            {%- endif -%}
            {{ val | title }} 
          
      bom_fire_danger:
        value_template: >
            {%- if states('sensor.bom_gosford_fire_danger_0') == '##' -%}
            Fire Danger Today: No Data
            {%- elif states('sensor.bom_gosford_fire_danger_0') != 'n/a' -%} 
            Fire Danger Today: {{ states('sensor.bom_gosford_fire_danger_0') }}
            {%- elif states('sensor.bom_gosford_fire_danger_1') == '##' -%}
            Fire Danger Tomorrow: No Data
            {%- else -%}
            Fire Danger Tomorrow: {{ states('sensor.bom_gosford_fire_danger_1') }}
            {%- endif -%}

      bom_fire_danger_summary:
        value_template: >
            {%- if states('sensor.bom_gosford_fire_danger_0') == '##' -%}
            No Data
            {%- elif states('sensor.bom_gosford_fire_danger_0') != 'n/a' -%} 
            {{ states('sensor.bom_gosford_fire_danger_0') }}
            {%- elif states('sensor.bom_gosford_fire_danger_1') == '##' -%}
            No Data
            {%- else -%}
            {{ states('sensor.bom_gosford_fire_danger_1') }}
            {%- endif -%}

~~~~~

Flags are used to control the look and feel of the card (See below for details)
~~~~
locale: en
static_icons: false
tooltip_bg_color: 'rgb( 75,155,239)'
tooltip_border_color: orange
tooltip_border_width: 3
tooltip_caret_size: 10
tooltip_fg_color: '#fff'
tooltip_left_offset: -12
tooltip_width: 100
tooltips: true
old_daily_format: false
time_format: 24
show_beaufort: true
~~~~

**Flags**
--------------------------
| Flag                     | Values                             | Usage                                                                       |
|--------------------------|------------------------------------|-----------------------------------------------------------------------------|
| locale                   | **en** / fr / de / etc.            | Sets locale display of day names and time formats                           |
| static_icons             | true / **false**                   | Switches between static (true) and animated (false) icons                   |
| tooltips                 | true / **false**                   | Enables tooltips that show daily forecast summary                           |
| tooltip_width            | **110**                            | Sets the width of the tooltip in px                                         |
| tooltip_bg_color         | **rgb( 75,155,239)**               | Sets the background color of the tooltip (rgb / # / color)                  |
| tooltip_fg_color         | **#fff**                           | Sets the foreground color of the tooltip (rgb / # / color)                  |
| tooltip_border_color     | **rgb(255,161,0)**                 | Sets the color of the tooltip border including the caret (rgb / # / color)  |
| tooltip_border_width     | **1**                              | Sets the width of the tooltip border in px                                  |
| tooltip_caret_size       | **5**                              | Sets the size of the caret (the little arrow pointing down) in px           |
| tooltip_left_offset      | **-12**                            | Sets the offset of the left edge of the tooltip. In negative (-)x           |
| refresh_interval         | **30** / Integer value             | Sets the nuber of seconds between card value refreshes                      |
| old_daily_format         | true / **false**                   | Sets the format of the daily high & low temps to be stacked (old format)    |
| show_beaufort            | true / **false**                   | Shows Beaufort Scale wind information                                       |
| show_separator           | true / **false**                   | Shows separator between current conditions columns and current temp / Icon  |
| time_format              | **locale** / 12 / 24               | Sets the format sunset and sunrise times. locale format is the default.     |
| temp_top_margin          | **-.3em** / px or em value         | Sets the top margin of the Temperature.                                     |
| temp_font_weight         | **300** / numeric value            | Sets the font weight of the Temperature.                                    |
| temp_font_size           | **4em** / em value                 | Sets the font size of the Temperature.                                      |
| temp_right_pos           | **.85em** / px or em value         | Sets the right position of the Temperature.                                 |
| temp_uom_top_margin      | **-9px** / px or em value          | Sets the top margin of the Temperature Unit of Meaure.                      |
| temp_uom_right_margin    | **7px** / px or em value           | Sets the right margin of the Temperature Unit of Measure.                   |
| apparent_top_margin      | **39px** / px or em value          | Sets the top margin of the apparent (feels Like) temperature                |
| apparent_right_pos       | **1em** / px or em value           | Sets the right position of the apparent (feels Like) temperature            |
| apparent_right_margin    | **1em** / px or em value           | Sets the right margin of the apparent (feels Like) temperature              |
| current_text_top_margin  | **39px** / px or em value          | Sets the top margin of the current temperature text                         |
| current_text_left_pos    | **5em** / px or em value           | Sets the left position of the current temperature text                      |
| current_text_font_size   | **1.5em** / em value               | Sets the font size of the current temperature text                          |
| current_text_alignment   | **center** / left, right or center | Sets the alignment of current text                                          |
| current_text_width       | **100%** / px, em or %             | Sets the width of current text                                              |
| current_data_top_margin  | **6em** / px or em value           | Sets the top margin of the current data blocks                              |
| large_icon_top_margin    | **-3.5em** / px or em value        | Sets the top margin of the current conditions icon                          |
| large_icon_left_position | **0em** / px or em value           | Sets the left position of the current conditions icon                       |
| separator_top_margin     | **5em** / px or em value           | Sets the top margin of the separator line                                   |
| summary_top_padding      | **1em** / px or em                 | Sets the gap between the forecast and summary text                          |
| summary_font_size        | **0.8em** / px or em               | Sets the font size for the summary text                                     |
| slot_l1                  | **daytime_high**                   | Sets the value used in current conditions slot l1 : See slots for more info |
| slot_l2                  | **daytime_low**                    | Sets the value used in current conditions slot l2 : See slots for more info |
| slot_l3                  | **wind**                           | Sets the value used in current conditions slot l3 : See slots for more info |
| slot_l4                  | **pressure**                       | Sets the value used in current conditions slot l4 : See slots for more info |
| slot_l5                  | **sun_next**                       | Sets the value used in current conditions slot l4 : See slots for more info |
| slot_r1                  | **pop**                            | Sets the value used in current conditions slot r1 : See slots for more info |
| slot_r2                  | **humidity**                       | Sets the value used in current conditions slot r2 : See slots for more info |
| slot_r3                  | **uv_summary**                     | Sets the value used in current conditions slot r3 : See slots for more info |
| slot_r4                  | **fire_summary**                   | Sets the value used in current conditions slot r4 : See slots for more info |
| slot_r5                  | **sun_following**                  | Sets the value used in current conditions slot r4 : See slots for more info |


**Slots**
--------------------------
The current condition columns are specified by 'slots'.  There are 5 left column slots (designated l1 - l5) and 5 right column
slots (designated r1 - r5).  There are currently 10 possible values that can be assigned to a slot.  These are:
- daytime_high
- daytime_low
- wind
- visibility
- sun_next (the next sun event ... sunset or sunrise)
- sun_following (The following sun event ... if sun_next is a sunset then this will be the following sunrise and vice versa)
- pop (probability of precipitation)
- humidity
- pressure
- uv_summary
- fire_summary
- possible_today (possible rainfall today)
- possible_tomorrow (possible rainfall tomorrow)
- empty (empty slot... the slot below does not rise to fill the space)
- remove (same as empty but the slot below rises to take the place of the slot)

[My FULL Lovelace configuration for this card is here](https://github.com/DavidFW1960/bom-weather-card/blob/master/lovelace.yaml) Cut and paste it into your lovelace.
