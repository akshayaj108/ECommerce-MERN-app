import Title from "../components/Title";
import NewsLetter from "../components/NewsLetter";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim rem
            officiis inventore explicabo nostrum. Molestias aliquam praesentium
            non animi possimus veniam. Facilis quisquam impedit atque
            perspiciatis. Laboriosam fuga ea quisquam?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum aut,
            odit maiores earum aliquid inventore vel provident necessitatibus
            sed deleniti explicabo sunt qui temporibus officia blanditiis
            similique accusantium non iste.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            velit quasi laudantium rerum molestias, beatae veniam voluptate,
            perspiciatis quod aspernatur, assumenda aut non suscipit esse
            explicabo reiciendis? Rerum, enim recusandae.
          </p>
        </div>
      </div>
      <div className="text-2xl pt-12 pb-4 text-center">
        <Title text1={"WHY"} text2={"WE"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            incidunt et impedit aut odit necessitatibus soluta vero molestias
            vel corporis.
          </p>
        </div>
        <div className="border border-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia quis
            atque fugit inventore quo? Iusto, minus.
          </p>
        </div>
        <div className="border border-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            quod. Molestias quas voluptatum quae! Nisi, in maiores. Fuga culpa
            suscipit mollitia animi, molestiae sint quam quisquam ullam expedita
            placeat alias.
          </p>
        </div>
      </div>
      <NewsLetter />
    </>
  );
};

export default About;
