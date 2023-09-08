import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    body: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="rich-text  md:py-6 darok:bg-black darok:text-gray-50 ">
      <Markdown children={data.body} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
