import { useEffect, useState } from 'react';
import axios from 'axios'; // Importez Axios

export const useGetGift = () => {
  const [stakedTokens, setStakedTokens] = useState<any>([
    {
      address: 'erd1pkdwzuq5l6t65gd7t86hav6l3gs8f590pvk55l8g22hvprs2t24qddm3cf',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd18pufe5zvnsd4gr5h8qamyq6krzjc789ad46v7r33n60egeveh9asv60zsy',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1l0e9ea5r4kr5qrrnzf3z0ar0kumad8qvpad0ygca3qlmqgsdpluqgs5z4l',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd182crw4u394g52957cf853295jmmmhvdncm2ctdh3rdvaw2c52sgsxrq5fl',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1lzs68spvk0khea2k9w5ju8n8vz80h2qvd5vuktual24d8w3e955s9gx0cl',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1xx5tstw6grw6jj6ynawux9f8jhec46a306skef4w6szg37s9y4ds233n5r',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1ckk23kv7wz2a62ehmnavn8hywjzfatkrlrlnxwqrd5whpfgku5vqrgsnfj',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1nyrlkha5f3m7edysufjhf3zxdc0a60pe33zmg0spdpfgz5zpatks4cfrzz',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1zalw9d49xrxtw2hktfd59slln223d59akmrh45e8n4p3vpvkze4q2d9790',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1px9x3cx73376krf3lysgdsx6m4ms3rv00ntcd9slchlysuq6j8tsrsk4zy',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd14q80k3c4lvwrnmjq6n2l08xmsacn2hluqa23wjsp6c3g7vp6x5rq6dj99u',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1ed0nr6xj6jcqp2qn0s0y49csk8dra7s3j97z6p7sldnu6l3rezusuq527z',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1gqz76na6rhgj97v57fq5mnnmcpwhg5cguw0fg7ac3vruwrgnn6dstvlpgp',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1lxcvmel8g7upwzk76vxh50zqycxrcjj3cjxwqncwhr0373nr54tqd52jts',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1ejx64s49n4g7ysqkyd0v5rjjx8yvpth8q5dmgllc24jdymsx9s4s5ldfc6',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1vqj969kh2qtsdc8h3txgxsumd82tx2u94eztzrml6t28g7kelyvs5etfev',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1a4tuscy9avw3ylr47ejhud90wjyqfrvy6l294r3hn2hw5zkn9suqm0ctfa',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd18c04eczef8n5vxa4fq3jvt7sxqwf9t42t6chtfxqv6w7sxtsqxrs9v33cg',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1amll6lmwf62z277nqzt6sp5jaksnydn577d379u2jzcjpjfdfsssymqdqp',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1mxhcvakg32u6v8yy4t23hrftj88gwderfg6htmllcufkkz7nuqvslq2npz',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd10ap0ckk0a55t8jpzc07c2w0v3q62dcrk5f3ca93m2hpcuvg5j08qgr20jr',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1v36yskkxyc55unthjm7puk4urdh74q5ua9vnnk2w6u2emru33dnsknmgg0',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1u7u7lqlp2zzffr5w0468vkjt3mn3fph26htqesvy7dfxvmwjqzws7y4j64',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1peh2xcvhlcc4h8hf55277c0esz3j0k06ya0n0lnf5rzhh7qddt5sdrt0af',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1wpglvxkuprds3mznynf0s0n5mdc609c3le240ua8w0ffq92yq65qs937g4',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1vyx292gvzy47qfg946u8jjycs863vmrdhkptw35tq8m37zn2hgwqrvkhvv',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1f07273n8a2k685jvkx5gjyyqajvzjy2yeuac4ueqm9sm3q7al89syzj2tc',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1ge4a6eutjvtjnmwfql3permcrht8zv0qlfq6wdz7hz9zyvug93zq4mlhl0',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd165rxrcl0z2z75gh907xgk0r5ep494xkxrvt95ynf4ctqg5v4rmlsu2ywcs',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd15pwzxvykuqakmyv35fpgrpyk68qe8qy8mzev8va4pmjg73wrznsscz4v8h',
      1: 24,
      2: 12,
      3: 3
    },
    {
      address: 'erd1jn7ury9c5090a49hgh4yj9arkvq39ymvay3vyl6c5dewsa33qlgql553xl',
      1: 33,
      2: 18,
      3: 4
    },
    {
      address: 'erd1ve2jekzgdeg2mvss8su56p0huuqkr7rjp9cl94xy65y9k3mxlp9s5uxtfe',
      1: 33,
      2: 18,
      3: 4
    },
    {
      address: 'erd12r43w8nfxkm8za420akhfshyjaw4c0y866au443dyyhgyaez3mfq639vqm',
      1: 33,
      2: 18,
      3: 4
    },
    {
      address: 'erd13hqp9p30058aem4ryr09urca5lsjnz54kjsgqwptsxadwsyk9a5qnngl3v',
      1: 33,
      2: 18,
      3: 4
    },
    {
      address: 'erd17z7afv2lkj7cqwaje48kx7g5cdlmgsxxu85f89rsvkch94mc8czqu0en8p',
      1: 33,
      2: 18,
      3: 4
    },
    {
      address: 'erd1mu209ylyt3q830kyslzryqa4w7t3ajvan3gv9qwaq0leza9gcepqx8u6rz',
      1: 33,
      2: 18,
      3: 4
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
