```yaml
sensor:
  - platform: template
    sensors:
      bom_current_text:
        value_template: >
            {% set val = states('sensor.kariong_short_text_0').split('.')[0] %} 
            {{ val | title }}

      bom_uv_alert:
        value_template: >
            UV Today: Sun Protection 
            {{ as_timestamp(states('sensor.kariong_uv_start_time_0')) | timestamp_custom(' %I:%M%p') | lower | replace(" 0", "") }} to {{ as_timestamp(states('sensor.kariong_uv_end_time_0')) | timestamp_custom(' %I:%M%p') | lower | replace(" 0", "") }}, UV Index predicted to reach {{ states('sensor.kariong_uv_max_index_0') }} [{{ states('sensor.bom_uv_alert_summary') }}]

      bom_uv_alert_summary:
        value_template: >
            {% set uv = states('sensor.kariong_uv_category_0') %}
            {% if uv == 'extreme' %} {% set uv = 'Extreme' %}
            {% elif uv == 'veryhigh' %} {% set uv = 'Very High' %} 
            {% elif uv == 'high' %} {% set uv = 'High' %}
            {% elif uv == 'moderate' %} {% set uv = 'Moderate' %}
            {% elif uv == 'low' %} {% set uv = 'Low' %}
            {% endif %}
            {{ uv }}
          
      bom_fire_danger:
        value_template: "Fire Danger Today: {{ states('sensor.kariong_fire_danger_1') }}"

# Beaufort
# https://en.wikipedia.org/wiki/Beaufort_scale
      beaufort:
        value_template: >
            {%- if states('sensor.gosford_wind_speed') | float  >= 118 -%}
            12
            {%- elif states('sensor.gosford_wind_speed') | float  >= 103 -%}
            11
            {%- elif states('sensor.gosford_wind_speed') | float  >= 89 -%}
            10
            {%- elif states('sensor.gosford_wind_speed') | float  >= 75 -%}
            9
            {%- elif states('sensor.gosford_wind_speed') | float  >= 62 -%}
            8
            {%- elif states('sensor.gosford_wind_speed') | float  >= 50 -%}
            7
            {%- elif states('sensor.gosford_wind_speed') | float  >= 39 -%}
            6
            {%- elif states('sensor.gosford_wind_speed') | float  >= 29 -%}
            5
            {%- elif states('sensor.gosford_wind_speed') | float  >= 20 -%}
            4
            {%- elif states('sensor.gosford_wind_speed') | float  >= 12 -%}
            3
            {%- elif states('sensor.gosford_wind_speed') | float  >= 6 -%}
            2
            {%- elif states('sensor.gosford_wind_speed') | float  >= 2 -%}
            1
            {%- else -%}
            0
            {%- endif -%}

# Heatindex
# https://en.wikipedia.org/wiki/Heat_index
      heatindex:
        unit_of_measurement: °C
        device_class: temperature
        value_template: >
            {%- if states('sensor.gosford_temperature') | float > 27 and states('sensor.gosford_humidity') | float > 40 -%}
            {% set T = states('sensor.gosford_temperature') | float %}
            {% set R = states('sensor.gosford_humidity') | float %}
            {% set c1 = -8.78469475556 %}
            {% set c2 = 1.61139411 %}
            {% set c3 = 2.33854883889 %}
            {% set c4 = -0.14611605 %}
            {% set c5 = -0.012308094 %}
            {% set c6 = -0.0164248277778 %}
            {% set c7 = 0.002211732 %}
            {% set c8 = 0.00072546 %}
            {% set c9 = -0.000003582 %}
            {% set HI = c1 + (c2 * T ) + (c3 * R) + ( c4 * T * R ) + ( c5 * T**2 ) + ( c6 * R**2 ) + ( c7 * T**2 * R ) + ( c8 * T * R**2 ) + ( c9 * T**2 * R**2 ) %} 
            {{ HI | round }}
            {%- else -%}
            n/a
            {%- endif -%}
      heatindexrating:
        value_template: >
            {%- if states('sensor.heatindex') == 'n/a' -%}
            Out of range
            {%- elif states('sensor.heatindex') | float  >= 54 -%}
            Extreme danger: heat stroke imminent
            {%- elif states('sensor.heatindex') | float  >= 41 -%}
            Danger: cramps, exhaustion heat stroke probable
            {%- elif states('sensor.heatindex') | float  >= 32 -%}
            Extreme caution: cramps and exhaustion possible
            {%- elif states('sensor.heatindex') | float  >= 26 -%}
            Caution: fatigue possible
            {%- else -%}
            Normal
            {%- endif -%}

      bom_forecast_0:
        friendly_name: "Today"
        value_template: >
          {% if states('sensor.kariong_min_0') == 'unknown' %} {% set min = states('sensor.bom_today_min') %} {% else %} {% set min = states('sensor.kariong_min_0') %} {% endif %}
          {% if states('sensor.kariong_max_0') == 'unknown' %} {% set max = states('sensor.bom_today_max') %} {% else %} {% set max = states('sensor.kariong_max_0') %} {% endif %}
          {{ max|round(0)}}°/{{ min|round(0)}}°/{{states('sensor.kariong_rain_chance_0')|round(0)}}%
        entity_picture_template: >-
          {%- if states('sun.sun') == 'below_horizon' and (states('sensor.kariong_icon_0') == 'fog' or states('sensor.kariong_icon_0') == 'haze' or states('sensor.kariong_icon_0') == 'light-showers' or states('sensor.kariong_icon_0') == 'partly-cloudy' or states('sensor.kariong_icon_0') == 'showers' or states('sensor.kariong_icon_0') == 'shower' or states('sensor.kariong_icon_0') == 'light_showers' or states('sensor.kariong_icon_0') == 'partly_cloudy') -%}
          {{ '/local/icons/bom_icons/' ~ states('sensor.kariong_icon_0') ~ '-night.png' }}
          {%- else -%}
          {{ '/local/icons/bom_icons/' ~ states('sensor.kariong_icon_0') ~ '.png' }}
          {%- endif -%}

      bom_forecast_1:
        friendly_name_template: >
          {%- set date = as_timestamp(now()) + (1 * 86400 ) -%}
          {{ date | timestamp_custom('Tomorrow (%-d/%-m)') }}
        value_template: >
          {{states('sensor.kariong_max_1')|round(0)}}°/{{states('sensor.kariong_min_1')|round(0)}}°/{{states('sensor.kariong_rain_chance_1')|round(0)}}%
        entity_picture_template: >-
          {{ '/local/icons/bom_icons/' ~ states('sensor.kariong_icon_1') ~ '.png' }}

      bom_forecast_2:
        friendly_name_template: >
          {%- set date = as_timestamp(now()) + (2 * 86400 ) -%}
          {{ date | timestamp_custom('%A (%-d/%-m)') }}
        value_template: >
          {{states('sensor.kariong_max_2')|round(0)}}°/{{states('sensor.kariong_min_2')|round(0)}}°/{{states('sensor.kariong_rain_chance_2')|round(0)}}%
        entity_picture_template: >-
          {{ '/local/icons/bom_icons/' ~ states('sensor.kariong_icon_2') ~ '.png' }}

      bom_forecast_3:
        friendly_name_template: >
          {%- set date = as_timestamp(now()) + (3 * 86400 ) -%}
          {{ date | timestamp_custom('%A (%-d/%-m)') }}
        value_template: >
          {{states('sensor.kariong_max_3')|round(0)}}°/{{states('sensor.kariong_min_3')|round(0)}}°/{{states('sensor.kariong_rain_chance_3')|round(0)}}%
        entity_picture_template: >-
          {{ '/local/icons/bom_icons/' ~ states('sensor.kariong_icon_3') ~ '.png' }}

      bom_forecast_4:
        friendly_name_template: >
          {%- set date = as_timestamp(now()) + (4 * 86400 ) -%}
          {{ date | timestamp_custom('%A (%-d/%-m)') }}
        value_template: >
          {{states('sensor.kariong_max_4')|round(0)}}°/{{states('sensor.kariong_min_4')|round(0)}}°/{{states('sensor.kariong_rain_chance_4')|round(0)}}%
        entity_picture_template: >-
          {{ '/local/icons/bom_icons/' ~ states('sensor.kariong_icon_4') ~ '.png' }}

      bom_forecast_5:
        friendly_name_template: >
          {%- set date = as_timestamp(now()) + (5 * 86400 ) -%}
          {{ date | timestamp_custom('%A (%-d/%-m)') }}
        value_template: >
          {{states('sensor.kariong_max_5')|round(0)}}°/{{states('sensor.kariong_min_5')|round(0)}}°/{{states('sensor.kariong_rain_chance_5')|round(0)}}%
        entity_picture_template: >-
          {{ '/local/icons/bom_icons/' ~ states('sensor.kariong_icon_5') ~ '.png' }}

# ONLY USE ONE bom_today_max below:
      bom_today_max:
        value_template: >
          {{ state_attr('sensor.today_temp_bom', 'max_value') }}

#      bom_today_max:
#        value_template: >
#          {%- if states('sensor.kariong_max_0') == 'n/a' -%} 
#            {{ state_attr('sensor.today_temp_bom', 'max_value') }}
#          {% else %}
#            {{ states('sensor.kariong_max_0') }}
#          {% endif %}

# ONLY USE ONE bom_today_min below:
      bom_today_min:
        value_template: >
          {{ state_attr('sensor.today_temp_bom', 'min_value') }}

#      bom_today_min:
#        value_template: >
#          {%- if states('sensor.kariong_min_0') == 'n/a' -%} 
#            {{ state_attr('sensor.today_temp_bom', 'min_value') }}
#          {% else %}
#            {{ states('sensor.kariong_min_0') }}
#          {% endif %}

# IMPORTANT NOTE IF YOU USE average, you must comment out the below statistics sensor. Both cannot exist
# https://github.com/Limych/ha-average
  - platform: average
    name: today_temp_bom
    entities:
      - sensor.gosford_temperature
    start: '{{ now().replace(hour=0).replace(minute=0).replace(second=0) }}'
    end: '{{ now() }}'

# IMPORTANT NOTE IF YOU USE statistics, you must comment out the above average sensor. Both cannot exist
#  - platform: statistics
#    name: today_temp_bom
#    sampling_size: 150
#    entity_id: sensor.gosford_temperature
#    max_age:
#      hours: 24
