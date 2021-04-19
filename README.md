WGS84 datum.


  N43°38'19.39"
  43°38'19.39"N
  43 38 19.39
  43.63871944444445

  W116°14'28.86"
  116°14'28.86"W
  -116 14 28.86
  -116.2413513485235

Decimal Degrees = Degrees + minutes/60 + seconds/3600

Degrees Minutes Seconds to Degrees Minutes.m
Degrees = Degrees
Minutes.m = Minutes + (Seconds / 60)

Degrees Minutes.m to Decimal Degrees
.d = M.m / 60
Decimal Degrees = Degrees + .d

Degrees Minutes Seconds (DDD° MM' SS.S")
Decimal Degrees (DDD.DDDDD°)
UTM (Universal Transverse Mercator)
Degrees and Decimal Minutes (DDD° MM.MMM')


CENTER POINT OF ARRAY OF COORDINATES


Haversine
dlon = lon2 - lon1
dlat = lat2 - lat1
a = (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon/2))^2
c = 2 * atan2( sqrt(a), sqrt(1-a) )
d = R * c (where R is the radius of the Earth)




Variation: Variation is the angular difference between True North and Magnetic North
Var W = M.N. is W T.N +
var E = M.N. is E T.N -

Deviation:  Deviation is a correction to Compass Heading to give Magnetic Heading
Dev W = C.N. is W M.N -
Dev E = C.N is E M.N + 

Convergency: Convergency is defined as the angle of inclination Between two selected meridians measured at a given Latitude.
Convergency = Ch. Long x Sine Mean Latitude

Ex 1. Calculate the value of Convergence between A (N 45:25 E 025:36) and B(N 37:53 E042:17).
A N 45:25 E 025:36
B N 37:53 E042:17
N 41:39 Mean Latitude 16:41 Change of Longitude
Convergency = Ch. Long° x Sin Mean Latitude
= 16°41' x Sin 41° 39'
= 16.6833°x Sin 41.65°
= 11.0874°
NOTE Both Mean Latitude and Change of Longitude must be changed into decimal notation.

CONVERGENCY = CHANGE OF LONGITUDE x SIN MEAN LATITUDE
CONVERGENCY = DIFFERENCE BETWEEN INITIAL AND FINAL GC TRACKS


CONVERSION ANGLE CA
CONVERSION ANGLE = DIFFERENCE BETWEEN GREAT CIRCLE AND RHUMB LINE
THE GREAT CIRCLE IS ALWAYS NEARER THE POLE
THE RHUMB LINE IS ALWAYS NEARER THE EQUATOR

CONVERSION ANGLE = ½ CONVERGENCEY
CONVERGENCY = TWICE CONVERSION ANGLE
CONVERGENCY = CHANGE OF LONGITUDE° x SIN MEAN LATITUDE
CONVERSION ANGLE = ½ CHANGE OF LONGITUDE° x SIN MEAN LATITUDE
CONVERSION ANGLE = DIFFERENCE BETWEEN GREAT CIRCLE AND RHUMB LINE
CONVERGENCY - DIFFERENCE BETWEEN INITIAL AND FINAL GREAT CIRCLES

DISTANCE
KILOMETRE (KM.) 3280 feet
STATUTE MILE (SM) 5280 feet
NAUTICAL MILE (NM)  At the Equator 1 NM is 6046.4 feet At the pole 1 NM -is 6078 feet
Standard Nautical Mile is 6080 feet (South Africa and UK)
ICAO 1 NM = 1852 metres or 6076.1 feet
Most navigational electronic calculators use 1 NM = 6076.1 feet.

CHANGE OF LONGITUDE (CH. LONG) or DEPARTURE DISTANCE
Departure is the distance in Nautical Miles along a parallel of Latitude in an East-West direction.
Where mean lat = lat A + lat B / 2
DEPARTURE = CHANGE of LONGITUDE (in minutes) x COSINE LATITUDE
DISTANCE ALONG A PARALLEL OF LATITUDE IS DEPARTURE
DISTANCE ALONG A MERIDIAN IS CHANGE OF LATITUDE

