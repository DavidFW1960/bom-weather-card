# BOM Weather Card

## Changes

Some BOM conditions present in BOM were missing from the card. This resulted in some icons not showing at times.

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
