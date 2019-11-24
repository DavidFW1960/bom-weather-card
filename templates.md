```yaml
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
            {% set val = states('sensor.bom_gosford_uv_alert_1').split('[')[1].split(']')[0] %}
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
```
Note for users in Perth IDW12300
Perth (and maybe some other cities) have 2 areas they report fire danger for...
![image](https://github.com/DavidFW1960/bom-weather-card/blob/master/perth.PNG)

The FTP component will read both of these but you will need to edit the templates above to select the fire area you are interested in.
Perth Coastal Plain
```
      {% set val = states('sensor.bom_fire_danger_summary').split('Perth Coastal Plain: ')[1] .split(':')[1] %}
      {{ val | title }}
```
Perth Hills
```
      {% set val = states('sensor.bom_fire_danger_summary').split('Perth Hills: ')[1] .split(':')[1] %}
      {{ val | title }}
```