# 0.10.2
  - updated LitElement source object to "home-assistant-main" as "hui-error-entity-row" is being removed in HA 0.88 update.
  
# 0.10.1
  - Added da locale translations
  - Added alt_* config entries.  These allow complete remapping of slot data to what ever format desired by using a template sensor.
  
# 0.9.4
 - Modified card refresh logic to allow an interval between card refreshes.  This should help lower cpu powered devices to not be overwhelmed by multiple hass changes / sec.
 - Added refresh_interval flag to config. Can be used to specify the number of seconds between card value refreshes. Defaults to 30.
 - (VirtualL) Modified card to allow RTL languages
 - (VirtualL) Added Hebrew language
 
# 0.9.3
 - Corrected issue where an extra UOM would show on the forecast daily temps
 
# 0.9.2
 - Corrected issue with Forecast day name not updating with hass state changes.
 
# 0.9.1
 - Card now updates all values on hass state changes
 - style getter is now a function as per suggestion from @thomasloven.  This may help with using card modder with this card.
 
# 0.8.3
 - Polish text added : @bieniu
 - Adjusted temperature top-margin due to changes in HA v 86.x
 - Corrected windy-variant icon mapping
 
# 0.8.2
 - Fixed UOM for POP Intensity
 
# 0.8.1
 - Added slots for current conditions.  Allows setting specific locations for individual conditions.
 - Added optional separator bar near top of card.
 - Added optional probability of precipitation (pop) intensity
 
# 0.7.1
 - Added several flags to control the positioning of components in the card
 
# 0.6.3
- Changed to local LitElement and html classes by using existing Lovelace class reference.
- Allow text (ESE, N, etc) wind bearing sensor to be passed in as well as normal numeric degree

# 0.6.2
- Changed URL reference for Lit and html classes

# 0.6.1
- Added "Today's High" text to current day high temp
- Added Beaufort scale to Wind. Set show_beaufort flag to true to enable
- Added current condition text to current condition icon.  Set entity_current_text to a sensor or template entity to enable.
- Corrected 'it' localization of "feels like".  Changed to "Percepito".
- Corrected 'de' localization of "feels like".  Changed to "Gefühlt".

# 0.5.3
- added **time_format** flag : Overrides locale time format with either 12 or 24 hour time.

# 0.5.2
- Corrected invalid humidity value

# 0.5.1
- Added Dutch (nl) translation for Wind Directions
- Added Feels Like to current temperature
- Added current daytime high forecast
- Added current probability of precipitation
- Added daily forecast probability of precipitation
- Altered the way daily forecast high and low appear
- Added **old_daily_format** flag. Shows old style daily forecast high and low format (values stacked on top of each other).
- Made most current condition items optional
- Removed **Sunset** flag. Adding entity_sun to the configuration will cause the sunset information to appear

# 0.4.1
- Refactored card to use LitElement instead fo HTMLElement
- Moved all CSS style entries into card .js file  .css file is no longer needed
- Added config entries for styling tooltips

# 0.3.1
- added localization for wind direction.  Currently available for en, fr, it and de locales.

# 0.2.3
- Updated dark-sky-animated-weather.css file to align the color scheme of the tooltips with the icon colors.

# 0.2.2
- Fixed bug in Sunrise / Sunset code where invalid object was calling getDate

# 0.2.1
- Added **Locale** flag.  Sets display of day name and time format by Locale specified
- Added **Sunset** flag.  Enables / disables dislay of sunset and sunrise icons and times.

# 0.1.1
- Added configuration flag capability
- Added config flag **tooltips** : Enables/Disables daily summary tooltips
- Added config flag **animated_icons** : Enables/Disables animated icons

# 0.0.1  
Initial Release
