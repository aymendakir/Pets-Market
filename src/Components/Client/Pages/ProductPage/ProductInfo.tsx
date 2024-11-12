import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/Client/UI/select";
import masterCard from "@/assets/Images/mastercard_color_card.svg";
import Visa from "@/assets/Images/visa_1_color_card.svg";
import applepay from "@/assets/Images/applepay_color_card.svg";
import american from "@/assets/Images/americanexpress_1_color_card.svg";
import mestro from "@/assets/Images/maestro_color_card.svg";
function ProductInfo() {
  return (
    <main className="w-[50%] ml-36">
      <p className="uppercase text-sm font-light">Name Store</p>
      <p className="mt-7 text-2xl capitalize text-purple-900 font-sans font-bold w-[90%] text-justify ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        voluptatibus cum expedita est et placeat magnam sunt assumenda
        voluptatem. Nihil veniam quod, omnis dolorum enim quae itaque et
        doloremque molestias!
      </p>
      <p className="mt-4">$22.00</p>
      <div className="flex gap-3 items-center mt-4">
        <span className="p-2  rounded-full bg-green-400 relative  ">
          <span className="absolute w-[80%] h-[80%] top-[10%] left-[10%]  rounded-full bg-green-400 animate-ping"></span>
        </span>
        <p className="capitalize">Article in stock</p>
      </div>
      <div className="mt-4 space-y-3">
        <p className="capitalize font-semibold text-lg">quantity</p>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="0" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(10)].map((_, index) => (
              <SelectItem key={index} value={index.toString()}>
                {index}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <button className="mt-4 w-[90%] text-sm uppercase text-white font-light bg-orange-500 p-3 rounded-md">
        add en panier
      </button>
      <div className="mt-5 text-justify w-[90%]">
        <div
          dangerouslySetInnerHTML={{
            __html: ` <div class="product__block product__description rte aos-animate" data-aos="hero" data-aos-anchor="#productTemplate--template--23395103637839__main" data-aos-order="11" style="--PBB:20px;"><div data-region="main" data-shogun-variant-id="5ea43a5c45f8d8005df9a4ee" data-shogun-platform-type="shopify" data-shogun-page-version-id="5ea43a5c45f8d8005df9a344" data-shogun-page-id="5ea35f2c2486fd005006e833" data-shogun-site-id="76547681-6945-4c46-88e1-a4941816707e" data-shogun-id="5ea35f2c2486fd005006e833" class="shogun-root">
<script async="" src="https://lib.getshogun.com/lazysizes/2.0.0/shogun-lazysizes.js" type="text/javascript"></script>
<div class="shg-c" id="s-ef0bc7b0-5d99-45a1-922e-077c72837149">
<div class="shg-rich-text shg-theme-text-content">
<p>Le&nbsp;<strong>Daisy Mat</strong> <span>🌼 </span>de&nbsp;<strong><a href="https://inooko.com%20%E2%80%BA%20collections%20%E2%80%BA%20inooko" title="inooko - Accessoires de qualité pour le bien-être des chiens et chats">inooko</a> </strong>est le nouveau jeu préféré de ton Poilu ! En effet, ce produit 2-en-1 mêle "<strong><a title="Tapis de fouille pour chien" href="https://inooko.com/collections/tapis-fouille-chien">tapis de fouille</a></strong>" et "<strong><a title="Tapis de léchage pour chien" href="https://inooko.com/collections/tapis-lechage-chien">tapis de léchage</a></strong>" pour le plus grand bonheur de ton chien ou de ton chat. Le <strong>Daisy Mat</strong> peut aussi être utilisé comme une&nbsp;<a title="Gamelle pour chien" href="https://inooko.com/collections/chien-gamelles"><strong>gamelle anti-glouton</strong></a> en remplacement de la gamelle classique afin de ralentir l'allure des&nbsp;chiens trop voraces ! Il peut aussi être utiliser durant les <strong><a title="Jeux d'occupation pour chien" href="https://inooko.com/collections/jouet-occupation-pour-chien">activités d'occupation</a>&nbsp;</strong>afin d'enrichir le quotidien de ton Poilu grâce à sa grande surface de jeu (25,5x 25,5 cm) ! On adore ce jouet d'occupation car :&nbsp;<br><br></p>
<ul>
<li>🎲 <strong>Accès plus difficile à la nourriture</strong> pour faire durer le repas ou le jeu plus longtemps grâce aux différentes&nbsp;formes</li>
<li>😋<strong> Expériences de léchage</strong> enrichissante et amusante grâce aux petits picots arrondis</li>
<li><span>👃 <strong>Activité de fouille</strong> pour répondre aux besoins naturels des chiens</span></li>
<li><span>🛝 <strong>Grande surface de jeu</strong> de 25,5x 25,5 cm (contre 20x20 cm pour la plupart des tapis de léchage)</span></li>
<li>➿ Encourage une<strong> alimentation lente</strong> pour une meilleure digestion</li>
<li>🧠<strong> Occupe ton poilu</strong> afin de que les journées passent plus vite</li>
<li>🧘 <strong>Apaise</strong> grâce au léchage répétitif qui permet la sécrétion de l'endorphine (hormone du bonheur)</li>
</ul>
<p><br>Pensez à alterner les jeux d'occupation que vous proposez à votre chien pour qu’il puisse ne jamais se lasser des jeux à sa disposition. Les&nbsp;<a href="https://inooko.com/collections/jouet-remplir-chien" title="Jouet à remplir pour chien type Sodapup Kong" data-mce-href="https://inooko.com/collections/jouet-remplir-chien"><strong>jouets à garnir</strong></a> comme les <a href="https://inooko.com/collections/kong" title="Kong - Jouets résistants pour chien" data-mce-href="https://inooko.com/collections/kong"><strong>Kong</strong></a> ou les <a href="https://inooko.com/collections/sodapup" title="Sodapup - Jouet résistant et non toxique pour chien et chiot" data-mce-href="https://inooko.com/collections/sodapup"><strong>Sodapup</strong></a> sont d’excellentes alternatives. Vous pouvez aussi lui proposer&nbsp;un <a href="https://inooko.com/collections/distributeur-friandises-chien" title="Distributeur de friandises pour chien"><strong>distributeur de friandises.</strong></a></p>
<p>Silicone alimentaire. Passe au lave-vaisselle</p>
</div>
</div>
</div></div>`,
          }}
        ></div>
        <div>
          <p className="icons"></p>
          <p className="icons"></p>
          <p className="icons"></p>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 mt-7">
          <p className="text-xl font-medium">Payment secured With</p>
          <div className="flex justify-center items-center gap-3">
            <img
              src={masterCard}
              alt="masterCard"
              title="masterCard"
              className="
            !w-[60px]"
            />
            <img
              src={Visa}
              alt="Visa"
              title="Visa"
              className="
            !w-[60px]"
            />
            <img
              src={applepay}
              alt="applepay"
              title="applepay"
              className="
            !w-[60px]"
            />
            <img
              src={american}
              alt="americanPay"
              title="americanPay"
              className="
            !w-[60px]"
            />
            <img
              src={mestro}
              alt="mestroCard"
              title="mestroCard"
              className="
            !w-[60px]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductInfo;
