Deno.serve({ port: 5055 }, async (req) => {
  try {
    const data = JSON.parse(
      new TextDecoder().decode((await req.body?.getReader().read())?.value)
    );
    console.log(data);
    if (data.commits.length > 0) {
      const regex = /^---$\n([\w\W]+)/gm;
      for (const commit of data.commits) {
        let m: RegExpMatchArray;
        while ((m = regex.exec(commit.message)!) !== null) {
          if (m.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          console.log(m);
        }
      }
    }
  } catch {
    return new Response("Error");
  }
  return new Response("");
});
