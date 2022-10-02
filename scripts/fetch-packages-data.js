import axios from "axios";
import { load } from "cheerio";
import fs from "fs-extra";

const { data } = await axios(
  "https://www.npmjs.com/search?q=keywords%3Afront-end&page=0&ranking=optimal",
  {
    headers: {
      "x-spiferack": "1",
    },
  }
);

const packages = data.objects.map((object) => ({
  name: object.package.name,
  version: object.package.version,
  description: object.package.description,
  stats: {
    lastRelease: object.package.date.ts,
    quality: object.score.detail.quality,
    popularity: object.score.detail.popularity,
    maintenance: object.score.detail.maintenance,
  },
}));

const toNumber = (text) => Number(text.replace(/,/g, ""));

for (const pkg of packages) {
  const { data } = await axios(`
    https://www.npmjs.com/package/${pkg.name}`);

  const $ = load(data);

  pkg.stats.dependencies = toNumber(
    $("#package-tab-dependencies").text().split(" ")[0]
  );
  pkg.stats.dependents = toNumber(
    $("#package-tab-dependents").text().split(" ")[0]
  );
  pkg.stats.versions = toNumber(
    $("#package-tab-versions").text().split(" ")[0]
  );
  pkg.stats.weeklyDownloads = toNumber(
    $("h3:contains('Weekly Downloads')").next().children("p").text()
  );
  pkg.stats.openIssues = toNumber($("h3:contains('Issues')").next().text());
  pkg.stats.openPullRequests = toNumber(
    $("h3:contains('Pull Requests')").next().text()
  );
}

fs.writeJSON("data/packages.json", packages, { spaces: 2 });
