import { useEffect, useState } from 'react';
import axios from 'axios'; // Importez Axios

export const useGetGift = () => {
  const [stakedTokens, setStakedTokens] = useState<any>([
    {
      address: 'erd1tvk00qs7hkdcpf9y6rha4umnvucrrns9hpt70vjq425nf7xp552qxpzs4t',
      '100xGRAOU': '1'
    },
    {
      address: 'erd13hzpwww3cmvtwzahfcksax5mrhr46jy99cyacm4js95vm2dn08vqz2wdz3',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1w2kf924jrvznp42d4fpsjeyszjn92n0fchck6maa72zfgttugpkqt62ae0',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1kj7uuysxszsylp4j7gucw4yr6hm7fu9lmgmzarj2td8yvg76sh6scg28vt',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1fhywqev3jkuu9t9hc9y900pjpn5wm7d9faec33fp63743up6w06qrw4ee3',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1cvjqlnn7dj2arc7tnxzpuk0xyp7ytcuy7f6zrtrrdwpwuq4mleyq83u5gt',
      '100xGRAOU': '1'
    },
    {
      address: 'erd155uv4ra6avlrfze5y37nyfxmp7apvddg3z89l8aqwv98n7jq7dfqe0y5tp',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1hrtf5hn6gnjx0nrat95pwr67syhm62fxvqrp9h0f7ta0tdnrx7ksyugpkt',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1qhnwf854chqjld6mdt8jrc7mzsu0k9395kuw4udvzr7ahz34j8rsnkf8c6',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1u2ep9al998hr7lsncck5e7cr6d9g5y346cjqs0fjwfhlnjwcsv0s5tev3u',
      '100xGRAOU': '1'
    },
    {
      address: 'erd143rquus6g6gf24jpk7js9ququcvfxpqvl622x62y8euh3zyneu5q4q7q6p',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1saej79nhmdk29qfzq2l5xsxn3j2fuf3tuacdtt93d6rnvpwx3alquwhcg3',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1cz9f0078lq6ge2jll48w6r5xps9dqnp6kvuvnvhn6quh6nmfmk9s3lrhun',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1ws0f79z4ex7f8f0t4fthfxgyx473yyw334e4efjq2e6q3226m68s4qxax8',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1d8e2su2fjhpf45jntnlu065tm4mj63rj4gazz6ngv74rgx8awkdq5w8sg4',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1a7uf7x059nremqdyf6jufpeer7hkfcdjq9xz07sqc7g2j7nx905sptczaz',
      '100xGRAOU': '1'
    },
    {
      address: 'erd17nzaj5dw79hsuutlxt3q5p93c6pd2dzp9845cahj3zq6uz5a9m9scjqyrx',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1v0zlkh6htt9lchmg4c2mgxwnyk8mtvq2zxjsc07e3j9jgzd33sxsde7d5r',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1chryzw6w9cmm6dtq6544l9v04kq987ysdtt349uhj4xn5nfnl8jsqwh0e7',
      '100xGRAOU': '1'
    },
    {
      address: 'erd19lzpax67rtan9sssnj74qn6jqgjts6jjk3pt00lqzwk258v89hpsas4md7',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1f4tnp99rm684jwdf3kqry0pec4kwhapuh7lxj6sndpc8mk70vlaqdem5dk',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1tvtlnn2ddskwd4v5efq3k0j4jrcu7ykyj9rhjutwahxn26ttw4msur509v',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1jvqpjc6u9qs37gte2yh69e6r474y2d36pat5lqh9xcfttskpcwvqzy0x5y',
      '100xGRAOU': '1'
    },
    {
      address: 'erd1m2hmzv84sgn20gl3gppy09s7qz9z3ktcqa0yfcd849j88h4hw84qpeg3td',
      '100xGRAOU': '1'
    }
  ]);

  const getStakedTokens = async () => {
    try {
      const response = await axios.get('https://test.mvx.fr/gift');

      if (response.status === 200 && response.data) {
        const tokens = response.data;
        //setStakedTokens(tokens);
      }
    } catch (err) {
      console.error('Unable to call getGift', err);
    }
  };

  useEffect(() => {
    getStakedTokens();
  }, []);

  return stakedTokens;
};
