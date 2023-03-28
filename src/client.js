import createClient from "@sanity/client";

export default createClient({
  projectId: "jc0hp4e9", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
  apiVersion: "2021-03-25",
});
