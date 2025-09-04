import { metaAiken } from "./links-aiken";
import { metaHydra } from "./links-hydra";
import { metaMidnight } from "./links-midnight";
import { metaProviders } from "./links-providers";
import { metaReact } from "./links-react";
import { metaSmartContract } from "./links-smart-contracts";
import { metaSvelte } from "./links-svelte";
import { metaTxbuilder } from "./links-txbuilders";
import { metaTxParser } from "./links-txparser";
import { metaUtilities } from "./links-utilities";
import { metaWallets } from "./links-wallets";
import { metaYaci } from "./links-yaci";

export const metaPolkadot = {
  title: "Polkadot",
  desc: "Tools and resources for developers to build on Polkadot",
  link: "https://polkadot.meshjs.dev/",
  icon: "icons/polkadot.svg",
  items: [
    {
      title: "Polkadot",
      link: "https://polkadot.meshjs.dev/",
    }
  ]
};

export const metaWeb3Wallet = {
  title: "Wallet as a Service",
  desc: "Access self-custodial wallet using social logins",
  link: "https://utxos.dev/",
  icon: "icons/mesh.svg",
  items: [
    {
      title: "Wallet as a Service",
      link: "https://utxos.dev/",
    }
  ]
};

export const linksApi = [
  metaWallets,
  metaTxbuilder,
  metaTxParser,
  metaProviders,
  metaUtilities,
  metaReact,
  metaSvelte,
  metaSmartContract,
  metaAiken,
  metaHydra,
  metaYaci,
  metaMidnight,
  metaPolkadot,
  metaWeb3Wallet,
];
