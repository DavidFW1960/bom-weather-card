# BOM Weather Card

## Changes
Due to the fact I have added some more entities, I am adding an extra slot, l5 and r5 that you can configure. Defaults for all slots have been changed from original to what is shown in the graphic. this is a POTENTIAL BREAKING CHANGE if you are using the default slots (by not configuring them yourself)
Added new UV_Alert and Fire_danger conditions from the BOM FTP Component. In addition to a template, they require 2-4 new lines in the lovelace config.
(the sample weather.yaml includes all templates)
Template:
```yaml
      bom_uv_alert:
        value_template: >
            {%- if states('sensor.bom_gosford_uv_alert_0') == '##' -%}
            UV Today: No Supply
            {%- elif states('sensor.bom_gosford_uv_alert_0') != 'n/a' -%} 
            UV Today: {{ states('sensor.bom_gosford_uv_alert_0') }}
            {%- elif states('sensor.bom_gosford_uv_alert_1') == '##' -%}
            UV Tomorrow: No Supply
            {%- else -%}
            UV Tomorrow: {{ states('sensor.bom_gosford_uv_alert_1') }}
            {%- endif -%}

      bom_uv_alert_summary:
        value_template: >
            {%- if states('sensor.bom_gosford_uv_alert_0') == '##' -%} 
            {% set val = 'No Supply' %}
            {%- elif states('sensor.bom_gosford_uv_alert_0') != 'n/a' -%} 
            {% set val = states('sensor.bom_gosford_uv_alert_0').split('[')[1].split(']')[0] %}
            {%- elif states('sensor.bom_gosford_uv_alert_1') == '##' -%} 
            {% set val = 'No Supply' %}
            {%- elif states('sensor.bom_gosford_uv_alert_1') != 'n/a' -%} 
            {% set val = states('sensor.bom_uv_alert_1').split('[')[1].split(']')[0] %}
            {%- else -%}
            {%- set val = 'No Supply' -%}
            {%- endif -%}
            {{ val | title }} 
          
      bom_fire_danger:
        value_template: >
            {%- if states('sensor.bom_gosford_fire_danger_0') == '##' -%}
            Fire Danger Today: No Supply
            {%- elif states('sensor.bom_gosford_fire_danger_0') != 'n/a' -%} 
            Fire Danger Today: {{ states('sensor.bom_gosford_fire_danger_0') }}
            {%- elif states('sensor.bom_gosford_fire_danger_1') == '##' -%}
            Fire Danger Tomorrow: No Supply
            {%- else -%}
            Fire Danger Tomorrow: {{ states('sensor.bom_gosford_fire_danger_1') }}
            {%- endif -%}

      bom_fire_danger_summary:
        value_template: >
            {%- if states('sensor.bom_gosford_fire_danger_0') == '##' -%}
            No Supply
            {%- elif states('sensor.bom_gosford_fire_danger_0') != 'n/a' -%} 
            {{ states('sensor.bom_gosford_fire_danger_0') }}
            {%- elif states('sensor.bom_gosford_fire_danger_1') == '##' -%}
            No Supply
            {%- else -%}
            {{ states('sensor.bom_gosford_fire_danger_1') }}
            {%- endif -%}
```

Note this example is for my Gosford sensors. You will need to examine your states to see what your names are. This is required as well as the current text and min/max templates.
Just remember, BOM zeros out some sensors during the day (like the min when the temperature starts rising is set to n/a and the max when the temp starts falling is set to n/a - using the min/max template makes sure there is a value available. With UV and Fre danger, these will switch between today and tomorrows values when BOM makes today's value unavailable.)

Add to Lovelace:
```yaml
            entity_uv_alert: sensor.bom_uv_alert
            entity_fire_danger: sensor.bom_fire_danger
            entity_uv_alert_summary: sensor.bom_uv_alert_summary
            entity_fire_danger_summary: sensor.bom_fire_danger_summary
```
To use the new slots (example - can be any slot),
```yaml
            slot_r3: uv_summary
            slot_r4: fire_summary
```
(along with the other entities in the card of course!) See example lovelace.yaml

It is important to note that if you have a non-existant entity parsed through to the card, the card won't load and will be blank. If you don't want an entity to display, don't parse it through to the card in the lovelace configuration.


## Older Changes:

Added support for new Home Assistant Cast - fixed icons not displaying
Merged some French and Russian Language PR's from original repo.

Added 2 more configuration options for the current text. See my example lovelace.yaml example but I have added lines for width and alignment as follows:
```
            current_text_left_pos: 0em      #default 5em px or em
            current_text_font_size: 1.5em   #default 1.5em em
            current_text_alignment: center  #default center
            current_text_width: 100%        #default 100%
```
Note if you set the alignment to center, set the current_text_left_pos to 0!
Effectively, these changes from the original card mean you can move the current text DOWN so that it won't run into the temperature or 'feels like' text.

![image](https://github.com/DavidFW1960/bom-weather-card/blob/master/bom-weather.png)


This card is a modification of a fork of iammexx/home-assistant-config dark-sky-weather-card


NOTE: IF using with BOM, This card REQUIRES the BOM Sensor core component and the BOM FTP Forecast Custom Component. See links below.
If using DARKSKY of some other weather component, the key is to make sure all referenced ENTITIES exist. If they are missing the card will end up blank.
This card SHOULD just work as a direct substitute for the Darksky weather card it has been forked from although I have not confirmed this.

The BOM Weather Card provides current and forecasted weather conditions using the BOM sensor platforms in core Home Assistant and a custom component for BOM Forecast from [my forecast repo here](https://github.com/DavidFW1960/bom_forecast) You configure the card by passing in sensor entities from these BOM platforms. 


The [weather package](https://github.com/DavidFW1960/bom_forecast/blob/master/weather.yaml) in the BOM Forecast component contains BOM Sensor platform configuration for this card as well. Both the core BOM Sensor and BOM Forecast custom component are REQUIRED to use this card.


The card is very customizable.  You can configure many aspects of it's look and feel as well as which specific content to show by passing in customization flags and defining optional sensors.  Content can also be rearranged if desired. 


Hovering over a forecast day will display the daily weather summary in a tooltip popup if that option has been enabled.
