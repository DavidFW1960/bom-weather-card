# BOM Weather Card

From the release yesterday, I finally tracked down a bug where the style was being applied twice to the summary text. If you used px units you would never have noticed but if you used the default or say 0.8em, what it did was multiply 14px x 0.8 x 0.8 = 8.96px instead of just once for 11.2px
This correction may mean that your text size has changed but now I have fixed this, using an em text size will be much easier to control and more predictable.

# Breaking Change

I have changed the summary font margin to padding. The key name has changed as follows:
```
            summary_top_padding: 1em        #default 1em px or em
            summary_font_size: 0.8em        #default 0.8em px or em
```
I found that the summary_top_margin was not working when the possibility of rainfall was wrapping down to a second line. This seems to be fixed in this new release.
I have also changed the default for the padding to 1em instead of 0.2 previously.
I hope these changes make the card more consistent particularly when the possible rainfall wraps to a second line.

![image](https://github.com/DavidFW1960/bom-weather-card/blob/master/bom-weather.png)


This card is a modification of a fork of iammexx/home-assistant-config dark-sky-weather-card


NOTE: This card REQUIRES the BOM Sensor core component and the BOM FTP Forecast Custom Component. See links below.


The BOM Weather Card provides current and forecasted weather conditions using the BOM sensor platforms in core Home Assistant and a custom component for BOM Forecast from [my forecast repo here](https://github.com/DavidFW1960/bom_forecast) You configure the card by passing in sensor entities from these BOM platforms. 


The [weather package](https://github.com/DavidFW1960/bom_forecast/blob/master/weather.yaml) in the BOM Forecast component contains BOM Sensor platform configuration for this card as well. Both the core BOM Sensor and BOM Forecast custom component are REQUIRED to use this card.


The card is very customizable.  You can configure many aspects of it's look and feel as well as which specific content to show by passing in customization flags and defining optional sensors.  Content can also be rearranged if desired. 


Hovering over a forecast day will display the daily weather summary in a tooltip popup if that option has been enabled.
