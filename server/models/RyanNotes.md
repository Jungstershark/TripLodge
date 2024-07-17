When fetching hotel prices by destination and room prices for specific hotel, the response object has a `completed` attribute which indicates whether the poll is complete or not.

If `completed` is `false`, means that the resulting array in the response (either hotels or rooms) is not the complete list.

According to FAQ, we should keep polling the mock API multiple times at fixed intervals until the `completed` flag turns `true`. 

My proposal for implementation:
*See `repollDemo.js` for example*
- Model's fetch functions will return results and a boolean indicating `completed` flag
- Controller will call the model's fetch function. If the function returns and indicates that polling is not complete yet (`completed` is `false`), controller will call fetch function again after a fixed interval.
- The fetch functions will always obtain the full JSON response. However, during the re-poll, we should not convert every hotel/room into the corresponding class objects again. 
    - Fetch functions can each have a `poll_idx` parameter, which indicates at which point of the result list it should start converting the objects into corresponding class objects. Naturally, default value of `poll_idx` would be `0` (during first poll)
    - Let's say first fetch call returns a hotel list of length `n` and `completed=false`. We append the resulting list into an overall list and then call fetch function again after a fixed interval, this time passing in `poll_idx = n`. This will mean that the next fetch call will only start constructing the class objects starting from index n. 
- Thus, controller (calling the fetch function) should append results from each fetch function call into a greater overall list. 