QvTicker
========

- a news ticker-like display of one dimension and one measure


Visit http://blog.dijit.de‎ for more details and demo stuff.

Usage
=====

- Drag the *QvTicker*-Extension on your QlikView document
- don't wonder about missing caption and frame - they are de-activated by default
- right-click the control and open the properties
- set the dimension, the measure and a second measure that returns -1,0 or 1 
   < 0 = indicates a decrease and makes use of the "negative color"
   > 0 = indicates an increase and makes use of the "positive color"
   0 or null = indicates no change and uses default font color for displaying the 1st measure
- set the scroll speed


 
