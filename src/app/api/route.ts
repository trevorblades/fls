import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

const CONTESTS = [
  // 9923, // street league rio supercrown final
  { id: 9735, final: true }, // las vegas mens final
  { id: 9416, final: false }, // street league jacksonville mens prelims
  { id: 9532, final: false }, // street league seattle mens prelims
  { id: 8565, final: false }, // street leage lake Havasu qualifiers
];

export const GET = async () => {
  const skaters = new Map();

  for (const contest of CONTESTS) {
    const res = await fetch(`https://theboardr.com/results/${contest.id}/grid`);
    const html = await res.text();

    const $ = cheerio.load(html);

    $("main table tbody tr").each((index, el) => {
      const avatarUrl = $("td", el).eq(1).find("img").attr("src");

      const skaterId = avatarUrl.slice(
        avatarUrl.lastIndexOf("/") + 1,
        avatarUrl.lastIndexOf("."),
      );

      const totalSkaters = $(el).parent().children("tr").length;

      let score = totalSkaters - index;

      if (contest.final) {
        score *= 2;
      }

      const existing = skaters.get(skaterId);
      if (!existing) {
        skaters.set(skaterId, {
          name: $("td", el).eq(3).find("a").text(),
          avatar: avatarUrl,
          score,
        });
      } else {
        skaters.set(skaterId, {
          ...existing,
          score: existing.score + score,
        });
      }
    });
  }

  return NextResponse.json({
    skaters: Array.from(skaters.entries())
      .map(([id, skater]) => {
        return {
          ...skater,
          id,
        };
      })
      .sort((a, b) => b.score - a.score),
  });
};
