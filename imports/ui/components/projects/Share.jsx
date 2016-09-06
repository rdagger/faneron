// This is a pure render function
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';

export const Share = (props) => {
  const currentPath = FlowRouter.current().path;
  const media = `${Meteor.settings.public.s3}${currentPath}/cover.jpg`;
  const href = Meteor.settings.public.domain + currentPath;
  const title = props.title;

  return (
    <div style={styles.shareWrapper}>
      <IconButton
        linkButton={true}
        disableTouchRipple={true}
        tooltip="Tweet"
        tooltipPosition="bottom-center"
        href={`https://twitter.com/share?url=${href}&text=${title}`}
        target="_blank"
        rel="nofollow"
      >
        <SvgIcon color="#4099FF">
          <path
            d="M24,4.557c-0.883,0.392-1.832,0.656-2.828,0.775c1.017-0.609,1.798-1.574,
2.165-2.724   c-0.951,0.564-2.005,0.974-3.126,1.195c-0.898-0.957-2.179-1.555-3.595-1.555c-2.719,
0-4.924,2.205-4.924,4.924   c0,0.386,0.043,0.762,0.127,1.122C7.728,8.088,4.1,6.128,1.671,
3.149C1.247,3.876,1.004,4.722,1.004,5.625   c0,1.708,0.869,3.216,2.19,
4.099c-0.807-0.025-1.566-0.247-2.23-0.616c0,0.021,0,0.041,0,0.062c0,2.386,1.697,4.376,3.95,
4.828   c-0.413,0.112-0.848,0.173-1.297,0.173c-0.317,0-0.625-0.031-0.926-0.088c0.626,1.955,2.445,
3.379,4.6,3.419   c-1.685,1.321-3.808,2.108-6.115,2.108c-0.397,0-0.79-0.023-1.175-0.069c2.179,1.397,
4.768,2.212,7.548,2.212   c9.057,0,14.01-7.502,14.01-14.009c0-0.213-0.005-0.426-0.015-0.637C22.505,
6.412,23.34,5.544,24,4.557z"
          />
        </SvgIcon>
      </IconButton>

      <IconButton
        linkButton={true}
        disableTouchRipple={true}
        tooltip="Share on Facebook"
        tooltipPosition="bottom-center"
        href={`https://www.facebook.com/sharer/sharer.php?u=${href}`}
        target="_blank"
        rel="nofollow"
      >
        <SvgIcon color="#3b5998">
          <path
            d="M13.703,23V12.965h3.368l0.504-3.911h-3.872V6.556c0-1.132,0.313-1.902,
1.938-1.902l2.071-0.001V1.154 C17.354,1.106,16.124,1,14.694,1c-2.986,0-5.03,1.822-5.03,
5.17v2.884H6.288v3.911h3.376V23H13.703z"
          />
        </SvgIcon>
      </IconButton>

      <IconButton
        linkButton={true}
        disableTouchRipple={true}
        tooltip="Pin"
        tooltipPosition="bottom-center"
        href={`https://pinterest.com/pin/create/button/?url=${href}&media=${media}&description=${title}`}
        target="_blank"
        rel="nofollow"
      >
        <SvgIcon color="#CB2026">
          <path
            d="m12.489402,1.5555358c-5.7006424,0-8.5749499,4.0871165-8.5749499,7.4954011,0,
2.0636811,0.7813097,3.8996181,2.4570674,4.5837811,0.2747841,0.112338,0.5209172,0.0038,
0.6006074-0.30037,0.055436-0.210552,0.1865655-0.741732,0.2450671-0.962946,0.080356-0.300903,
0.049174-0.406446-0.1725731-0.668703-0.4832046-0.569958-0.7919705-1.307824-0.7919705-2.3529908,
0-3.032222,2.2686362-5.7467496,5.9074636-5.7467496,3.22212,0,4.99236,1.9687988,4.99236,4.5981727,
0,3.4595897-1.531037,6.3794737-3.803937,6.3794737-1.255188,0-2.194812-1.038103-1.893642-2.311281,
0.360605-1.519975,1.059161-3.1604185,1.059161-4.2575567,
0-0.982134-0.527183-1.8012897-1.618191-1.8012897-1.2831703,0-2.3139445,1.3274134-2.3139445,
3.1056488,0,1.1325856,0.3827256,1.8985706,0.3827256,1.8985706s-1.3131544,5.563782-1.5432962,
6.538187c-0.458418,1.940547-0.068897,4.31939-0.03598,4.55966,0.019322,0.142324,0.2022903,0.176172,
0.2851788,0.06863,0.1183359-0.154449,1.6465734-2.041159,2.1661583-3.926403,0.1469871-0.533844,
0.843942-3.298078,0.843942-3.298078,0.416841,0.795168,1.635247,1.495588,2.930944,1.495588,3.857108,
0,6.473955-3.516359,6.473955-8.2231395,0-3.5590029-3.014498-6.8736051-7.596147-6.8736051z"
          />
        </SvgIcon>
      </IconButton>

      <IconButton
        linkButton={true}
        disableTouchRipple={true}
        tooltip="Post to Tumblr"
        tooltipPosition="bottom-center"
        href={`http://tumblr.com/widgets/share/tool?canonicalUrl=${href}`}
        target="_blank"
        rel="nofollow"
      >
        <SvgIcon color="#35465c">
          <path
            d="m16.76238,17.946392c-0.370099,0.176511-1.07789,0.330086-1.605679,0.343301-1.593465,
0.04263-1.902734-1.119279-1.915574-1.961572v-6.195977h3.997062v-3.0136595h-3.983224v-5.0700931h
-2.914809c-0.048,0-0.131761,0.04201-0.143602,0.1485885-0.170528,1.5517058-0.896519,
4.2751682-3.916162,5.364154v2.5708851h2.0144252v6.502878c0,2.226712,1.6424538,5.390083,5.9783288,
5.315414,1.462951-0.02506,3.087703-0.637361,3.446462-1.166023l-0.957228-2.837896"
          />
        </SvgIcon>
      </IconButton>
    </div>
	);
};  // End Share

Share.propTypes = {
  title: React.PropTypes.string.isRequired,
};

const styles = {
  shareWrapper: {
    minWidth: '192px',
  },
};
