import { GatsbySSR } from "gatsby";

export const onPreRenderHTML: GatsbySSR["onPreRenderHTML"] = () => {
  return Promise.resolve();
};
