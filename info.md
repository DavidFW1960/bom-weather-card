[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

# BOM Weather Card

## Latest Changes

This release adds new icons for light-rain and showers at night.
Download the weather_icons.zip and unzip it for the new icons.
This is only applicable if you are using the hybrid or new icon set!!!
THIS IS A BREAKING CHANGE unless you are configured to use the old icons.
I have also changed the forcast icon to never use the day icon - it will now always use night.




Added new slot popforecast so if you display a slot as popforecast it will now show the predicted instead of actual rainfall today
This card will now respect locale formatting (commas instead of decimal points etc)

Also added my illuminance sensor and history graph to display and also a more information card utilising some of the other templates.


Added this card to the card picker in Lovelace

In the latest BOM component, a number of sensors have been renamed.
This should not affect existing component however the renaming I have found is here:
~~~~
sensor.gosford_wind_speed > sensor.gosford_wind_speed_kilometre
sensor.gosford_temperature > sensor.gosford_temp
sensor.gosford_temperature_feels_like > sensor.gosford_temp_feels_like
sensor.kariong_min* > sensor.kariong_temp_max*
sensor.kariong_min* > sensor.kariong_temp_max*
sensor.kariong_icon* > sensor.kariong_icon_descriptor*
Added day 6 forecast
sensor.gosford_gust_speed > sensor.gosford_gust_speed_kilometre
sensor.gosford_wind_speed > sensor.gosford_wind_speed_kilometre
sensor.gosford_gust_speed_knots > sensor.gosford_gust_speed_knot
sensor.gosford_wind_speed_knots > sensor.gosford_wind_speed_knot
~~~~
I have amended the docs to reflect this and have also updated the ICON instructions.

This version includes the option to have maximum temperature before the minimum.
It is a new 'flag' as:
````yaml
tempformat: highlow
````

I also updated some of the docs/packages to clarify some settings etc

VERY IMPORTANT NOTE:
As of HA 0.117.x, the BOM Core Sensor component is removed as it violates ADR14 rule regarding web scraping.

I have made some changes so that this card now uses the new [BOM Component by Brendan](https://github.com/bremor/bureau_of_meteorology)

I have updated the lovelace.yaml and templates as well for this new component.

When you install Brendans new BOM Component, you will get sensors that look like this:
For the Observations, they will be named for the BOM Observation station like.. sensor.gosford_temperature as an example.
For the Forecast, they will be named by your local suburb determined from the entered Latitude and Longitude (which will default to your HA configuration) like sensor.kariong_icon_0

It MAY be that there will be some new conditions from BOM. If icons are missing or you get any errors please let me know.

IF you are using the old card as well with the 7 days forecast, note the new component only provides 6 days now and additionally I have added some icons so make sure you grab the bom_icons.zip file and extract the contents to /config/www/bom_icons The animated icons for the card itself are unchanged.

## Older
Also made an adjustment to the css to display the temperature correctly again.

Option to show the apparent and current temperature to 1 decimal place
Add to lovelace:
```
show_decimals: true
```
The default if not specified is false


I have been having a problem with the Beaufort rating not updating if using knots. This release corrects that.
Also thanks to @rudders Adrian for fixing the other issues with refreshing the card automatically.

With the variable for rainfall today. The ORIGINAL card used a rate in say mm/h. I changed this to just be an amount of rainfall today in mm.
So I added a new variable, entity_pop_intensity_rate in case you are using a mm/h rather than just blanket rainfall for the day. 
You can only use ONE of these variables. If you use both you will see an invalid message on the card where rainfall is displayed.
```
entity_pop_intensity: sensor.bom_gosford_rain_today
# entity_pop_intensity_rate: sensor.bom_gosford_rain_today #####NOTE only define entity_pop_intensity OR entity_pop_intensity_rate or you will get an invalid message!
```

Also added ability to display wind speed and wind gust in knots instead of km/h (m/h)
To do this, there is a new slot option example:
```
slot_l3: wind_kt
```
Also define 2 new (optional) variables like this:
```
entity_wind_speed_kt: sensor.bom_gosford_wind_speed_kt
entity_wind_gust_kt: sensor.bom_gosford_wind_gust_kt
```

Fix card refresh. (again!)
Remove leading zeros from 12h times
I have added an option to display the Wind Gust speed.

![image](https://raw.githubusercontent.com/DavidFW1960/bom-weather-card/master/bom-weather.png)

Add this to the lovelace configuration:
```
entity_wind_gust: sensor.bom_gosford_wind_gust_kmh
```
Obviously with whatever your wind gust sensor is. It will then display automatically if you have the wind slot showing

## Recent Changes
With version 0.109.x the alignment of the large icon and also the temperature and unit of measurement as well as the current text positions have 'moved'
I have adjusted the card with the following new defaults. These are included in the example lovelace.yaml file.

IF you are using versions of HA earlier than 0.109 and also using the card defaults for these offsets your cards will look different so make sure you adjust these values in the settings for the card:
```
temp_top_margin: 0px            #default 0px px or em Note: pre-0.109.x default was -0.3em
temp_uom_top_margin: -12px      #default -12px px or em Note: pre-0.109.x default was -9px
large_icon_top_margin: -3.2em   #default -3.2em px or em Note: pre-0.109.x default was -3.5em
current_text_top_margin: 4.5em  #default 4.5em px or em pre-0.109.x default was 39px
current_text_left_pos: 0px      #default 0px px or em pre-0.109.x default was 5em
current_data_top_margin: 10em   #default 10em px or em pre-0.109.x default was 7em
summary_top_padding: 2em        #default 2em px or em pre-0.109.x default was 1em
```
Line Height for summary text adjusted for 0.109
Also now if you open the browser console (Chrome F12) it will tell you the card version.

I am providing an additional configuration option for the icons called hybrid.
The Hybrid will use the old icons EXCEPT for dusty, windy, hazy, fog where it will use the new icons. For those conditions, the old isons used cloudy for everything.
False will use the new icons for everything
Trus will use the old icons for everything
Additionally, if you don't specify the old_icon flag as per the below, it **should** default to the old icons.

Add this flag to the lovelace file in raw or yaml
```yaml
old_icon: "true" # True is the default if not specified. Can also use False or Hybrid.
```
Note the quotes are important. MAKE sure you have all the icons from weather_icons.zip

Log an issue if you find any bugs.

Make sure you have the latest icon file. Re-Download ZIP icons and unzip again if you are unsure.
Added some new icons for conditions I found on the forum here (https://community.home-assistant.io/t/animated-weather-icons-svg-for-all-dark-sky-values/150702) These have been added to the zip file. See the readme.md file for details on installing the icons.
## IF YOU DON'T GRAB NEW ICONS you WILL get blank icons on the card! Be Warned.

Due to the fact I have added some more entities, I am adding an extra row/2 slots, l5 and r5 that you can configure. Defaults for all slots have been changed from original to what is shown in the graphic. this is a POTENTIAL BREAKING CHANGE if you are using the default slots (by not configuring them yourself)
Added new UV_Alert and Fire_danger conditions from the BOM FTP Component. In addition to a template, they require 2-4 new lines in the lovelace config.
(the sample weather.yaml includes all templates)
Template:
[Get the templates here] (https://github.com/DavidFW1960/bom-weather-card/blob/master/templates.md)
I'm not going to put them in this info.md anymore as if I change a Template I have to re-release the card for no good reason so they are in this file (and in weather package)

Note this example (in templates.md) is for my Gosford sensors. You will need to examine your states to see what your names are. This is required as well as the current text and min/max templates.
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

![image](https://raw.githubusercontent.com/DavidFW1960/bom-weather-card/master/bom-weather.png)


This card is a modification of a fork of iammexx/home-assistant-config dark-sky-weather-card


NOTE: IF using with BOM, This card REQUIRES the BOM Sensor core component and the BOM FTP Forecast Custom Component. See links below.
If using DARKSKY of some other weather component, the key is to make sure all referenced ENTITIES exist. If they are missing the card will end up blank.
This card SHOULD just work as a direct substitute for the Darksky weather card it has been forked from although I have not confirmed this.

The BOM Weather Card provides current and forecasted weather conditions using the [BOM sensor platform](https://www.home-assistant.io/integrations/bom/#sensor) in core Home Assistant and a custom component for BOM Forecast from [my forecast repo here](https://github.com/DavidFW1960/bom_forecast) You configure the card by passing in sensor entities from these BOM platforms. 


The [weather package](https://github.com/DavidFW1960/bom_forecast/blob/master/weather.yaml) in the BOM Forecast component contains BOM Sensor platform configuration for this card as well. Both the core BOM Sensor and BOM Forecast custom component are REQUIRED to use this card. This package is for HA versions > 0.115.0. For older versions of HA use the weather pre 0.115.x.yaml file instead. 0.115.0 deprecated listeners for entity_id's in template sensors.


The card is very customizable.  You can configure many aspects of it's look and feel as well as which specific content to show by passing in customization flags and defining optional sensors.  Content can also be rearranged if desired. 


Hovering over a forecast day will display the daily weather summary in a tooltip popup if that option has been enabled.
