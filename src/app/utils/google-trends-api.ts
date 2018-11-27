export class GoogleTrendsApi {
  public isLessThan7Days(date1, date2) {
    return Math.abs(date2 - date1) / (24 * 60 * 60 * 1000) < 7;
  }

  public convertDateToString(d, shouldIncludeTime) {
    let month = (d.getUTCMonth() + 1).toString();

    month = month.length < 2 ? "0" + month : month;
    const day = d.getUTCDate().toString();
    const year = d.getUTCFullYear().toString();
    const hour = d.getUTCHours();
    const minute = d.getUTCMinutes();

    if (shouldIncludeTime) {
      return `${year}-${month}-${day}T${hour}\\:${minute}\\:00`;
    }

    return `${year}-${month}-${day}`;
  }

  public formatTime(obj) {
    if (obj.startTime && !(obj.startTime instanceof Date)) {
      return new Error("startTime must be a Date object");
    }
    if (obj.endTime && !(obj.endTime instanceof Date)) {
      return new Error("endTime must be a Date object");
    }

    if (obj.startTime && obj.endTime && obj.startTime > obj.endTime) {
      const temp = obj.startTime;

      obj.startTime = obj.endTime;
      obj.endTime = temp;
    }

    if (!obj.endTime) obj.endTime = new Date();
    if (!obj.startTime) obj.startTime = new Date("2004-01-01");

    const shouldIncludeTime = this.isLessThan7Days(obj.startTime, obj.endTime);

    const startTime = this.convertDateToString(
      obj.startTime,
      shouldIncludeTime && obj.granularTimeResolution
    );
    const endTime = this.convertDateToString(
      obj.endTime,
      shouldIncludeTime && obj.granularTimeResolution
    );

    obj.time = `${startTime} ${endTime}`;
    return obj;
  }

  public constructObj(obj, cbFunc) {
    // if (typeof obj === "") { cbFunc = obj; }

    if (!obj || (!!obj && typeof obj !== "object") || Array.isArray(obj)) {
      obj = new Error("Must supply an object");
    } else if (!obj.keyword) {
      obj = new Error("Must have a keyword field");
    }

    // if (!!cbFunc && typeof cbFunc !== "") {
    //     obj = new Error("Callback  must be a ");
    // }

    if (!obj.hl) obj.hl = "en-US";
    if (!obj.category) obj.category = 0;

    if (!cbFunc) {
      cbFunc = (err, res) => {
        if (err) return err;
        return res;
      };
    }

    obj = this.formatTime(obj);

    return {
      cbFunc,
      obj
    };
  }

  public formatResolution(resolution = "") {
    const resolutions = ["COUNTRY", "REGION", "CITY", "DMA"];
    const isResValid = resolutions.some(res => {
      return res === resolution.toUpperCase();
    });

    if (isResValid) return resolution.toUpperCase();
    return "";
  }

  /**
   * Parse the result of the google api as JSON
   * Throws an Error if the JSON is invalid
   * @param  {String} results
   * @return {Object}
   */
  public parseResults(results) {
    // If this fails, you've hit the rate limit or Google has changed something
    try {
      return JSON.parse(results.slice(4)).widgets;
    } catch (e) {
      // Throw the JSON error e.g.
      // { message: 'Unexpected token C in JSON at position 0',
      //   requestBody: '<!DOCTYPE html><html>...'}
      e.requestBody = results;
      throw e;
    }
  }

  /**
   * Create the array of keywords (comparisonItems) to be used
   * @param  {Object} obj The query obj with .keyword property
   * @return {Array}     Returns an array of comparisonItems
   */
  public formatKeywords(obj) {
    // If we are requesting an array of keywords for comparison
    if (Array.isArray(obj.keyword)) {
      // Map the keywords to the items array
      return obj.keyword.reduce((arr, keyword) => {
        // Add the keyword to the array
        arr.push({ ...obj, keyword });

        return arr;
      }, []);
    }

    return [obj];
  }

  // getResults(request) {
  //     return (searchType, obj) => {

  //         const options = {
  //             method: "GET",
  //             host: "trends.google.com",
  //             path: "/trends/api/explore",
  //             qs: {
  //                 hl: obj.hl,
  //                 req: JSON.stringify({
  //                     comparisonItem: this.formatKeywords(obj),
  //                     category: obj.category,
  //                     property: ""
  //                 }),
  //                 tz: 300
  //             }
  //         };

  //         const { path, resolution, _id } = map[searchType];

  //         return request(options)
  //             .then((results) => {
  //                 const parsedResults = this.parseResults(results);

  //                 /**
  //                  * Search for the id that matches the search result
  //                  * Auto complete does not have results on initial query
  //                  * so just pass the first available result with request
  //                 */
  //                 const resultObj = parsedResults.find(({ id = "", request }) => {
  //                     return id.indexOf(_id) > -1 ||
  //                         (searchType === "Auto complete" && request);
  //                 });

  //                 if (!resultObj) {
  //                     const errObj = {
  //                         message: "Available widgets does not contain selected api type",
  //                         requestBody: results
  //                     };

  //                     throw errObj;
  //                 }

  //                 let req = resultObj.request;
  //                 const token = resultObj.token;

  //                 if (resolution) req.resolution = resolution;
  //                 req.requestOptions.category = obj.category;
  //                 req.requestOptions.property = "";
  //                 req = JSON.stringify(req);

  //                 const nextOptions = {
  //                     path,
  //                     method: "GET",
  //                     host: "trends.google.com",
  //                     qs: {
  //                         hl: obj.hl,
  //                         req,
  //                         token,
  //                         tz: 300
  //                     }
  //                 };

  //                 return request(nextOptions);
  //             })
  //             .then((res) => {
  //                 try {
  //                     /** JSON.parse will decode unicode */
  //                     const results = JSON.stringify(JSON.parse(res.slice(5)));

  //                     return results;
  //                 } catch (e) {
  //                     /** throws if not valid JSON, so just return unaltered res string */
  //                     return res;
  //                 }
  //             });
  //     };
  // }
}
