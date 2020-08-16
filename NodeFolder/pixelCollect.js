const http = require("http");
const url = require("url");
const port = 3030;

const server = http.createServer((req, res) => {
  try {
    if (req.method === "GET") {
      return handleGetReq(req, res);
    }
  } catch (error) {
    return handleError(res, 500);
  }
});

function handleGetReq(req, res) {
  try {
    const {
      event,
      customer,
      operating_system_name,
      utm_source,
      utm_medium,
      utm_campaign,
      campaign_url,
    } = url.parse(req.url, true).query;

    if (
      !event ||
      !customer ||
      !operating_system_name ||
      !utm_source ||
      !utm_medium ||
      !utm_campaign ||
      !campaign_url
    ) {
      return handleError(res, 400);
    }

    const response = {
      success: true,
      data: {
        buttonId: campaign_url,
      },
    };

    //Set response
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
  } catch (error) {
    return handleError(res, 500);
  }
}

function handleError(res, code) {
  res.statusCode = code;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(`{"error": "${http.STATUS_CODES[code]}"}`);
}

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
