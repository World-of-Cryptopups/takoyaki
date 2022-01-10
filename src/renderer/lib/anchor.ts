import AnchorLink from 'anchor-link';
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport';

const anchorTransport = new AnchorLinkBrowserTransport();
const anchorLink = (endpoint: string, chainId: string) => {
  return new AnchorLink({
    transport: anchorTransport,
    verifyProofs: true,
    chains: [{ chainId, nodeUrl: endpoint }],
  });
};

export default anchorLink;
