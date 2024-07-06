Hi guys please remember to cd into api **AND** client and do `npm install` for both folders after you git clone to install the dependencies for both apps. They are git ignored as they should not be pushed to github.

### config.js
Ascenda api stored here with baseurl and the endpoints.
Example for api/hotels/:id
``` javascript
import { ascendaAPI } from "../config.js";

const apiUrl = `${ascendaAPI.baseUrl}${ascendaAPI.endpoints.getHotelInfo(hotelId)}`
```
