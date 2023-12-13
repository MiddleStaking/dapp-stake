import { useEffect, useState } from 'react';
import axios from 'axios'; // Importez Axios

export const useGetGift = () => {
  const [stakedTokens, setStakedTokens] = useState<any>([
    {
      address: 'erd1z2fejeltfmpjagt5z6uamvypey96v839tk38dt3yrq8lkngcfzmqs0932z',
      rewards: '2159457443084696428647',
      mid_rewards: '162993151921219666357828'
    },
    {
      address: 'erd1zplu5tr5crsjj3n96ja2kqlv2785frwtlcl4xz48ze7s9whaar9qf36qm6',
      rewards: '600266313796455157882',
      mid_rewards: '45385331131962153112089'
    },
    {
      address: 'erd1ge2u2a0xh6ta6wpkjdvq6lhp3mz3wdpdc4fq0z0vc8546v3fu6csd2wjsj',
      rewards: '331625519613508616074',
      mid_rewards: '25122094774675843709071'
    },
    {
      address: 'erd13vr66sdu9zh9cluwenky2uy46hr0tdxy5wq52szvqr8jwpp8tlgqadzm4m',
      rewards: '275203124818882305324',
      mid_rewards: '20857224682254076393285'
    },
    {
      address: 'erd1d2s3svdqsaz5kx5kcwqk3r9rqyf30tsknxeqqe79k9tgvzclgxpq82k4x0',
      rewards: '237517653452949654371',
      mid_rewards: '18023657097363746076207'
    },
    {
      address: 'erd13thhy4287ksrjdu0gctuttzkpsvl5wg5zutmgcmkkfpkcs4nzdesud0kzn',
      rewards: '213707806058155729326',
      mid_rewards: '16227710331873376331132'
    },
    {
      address: 'erd1d90vcq7c65qrcmn0vs8clc554mrz9st5ypt20jfhf0sjwx5mm8ased6wx6',
      rewards: '194174978515946579530',
      mid_rewards: '14754373780670531086879'
    },
    {
      address: 'erd1mjs476wp05drsk4mdqnhjl0c62seyu04f537a8c4hczgjmkswptsfm6f68',
      rewards: '154255512343528198635',
      mid_rewards: '11743298784527006707531'
    },
    {
      address: 'erd1cx4a9x9g3kx26j7dapleh49a5fw329ld57pet3nkzmawefzgxg2qcdkv0a',
      rewards: '130199163214623386939',
      mid_rewards: '9901758704063899580861'
    },
    {
      address: 'erd1r6txv5sykcl8ruptccsnsm8hva6mpw5eusp2p4d57m6z9x863azs8c6r9r',
      rewards: '121251836941438752179',
      mid_rewards: '9253873165585964865161'
    },
    {
      address: 'erd105kysyugnspafs79lr749fqry6pudse468wya7xy4fjkdlskx7ms2kuzcv',
      rewards: '119359147795168063640',
      mid_rewards: '9075110009906655132190'
    },
    {
      address: 'erd1we446ujy4m4v468tf4sy6q6ddy5e3jw3hdr28ejmurt45yc52sgqqzvp0w',
      rewards: '87986394493062939296',
      mid_rewards: '6744702788423887117320'
    },
    {
      address: 'erd12l6sk3ceklpf5jx6atut5mydqh3dqfpt73h2gxqh7zzmqxwx2jwqf5yj8e',
      rewards: '86178477806383152185',
      mid_rewards: '6599333912476006137311'
    },
    {
      address: 'erd1dwdfe229asrmd6e79ektparkly6rd9y3nh2susz5c90w6j6rmyaqfvgm4n',
      rewards: '79506589569771056332',
      mid_rewards: '6105081795838051184215'
    },
    {
      address: 'erd1wjsr96dya9jt2hlw9sgk9ul837laszt4h4r8v669g2jndy6t0tnqf62tzw',
      rewards: '74150586640464138908',
      mid_rewards: '5683085248638469378533'
    },
    {
      address: 'erd1d23ny3trh0jyj5g8e8x5lljt8v9kew77knjc940g4awl0w4pe02qujjjfu',
      rewards: '70415650725641497243',
      mid_rewards: '5419363742224858273312'
    },
    {
      address: 'erd175482k3apznfspf3y5yrfxdvj2gx6axeh9dqnldsyrf8m9lueh8quktpvj',
      rewards: '61993965188116474237',
      mid_rewards: '4784126621620625294130'
    },
    {
      address: 'erd1v9vh606wwu9djegrtnxgf9ssy6v02dnpd20ul89zn50n5qywwvpsfht053',
      rewards: '62228020472348374368',
      mid_rewards: '4765781116573588361174'
    },
    {
      address: 'erd1ftn2cu364luya86m7f57jzcjnuvksapnnhlp8v0gnec2lcmu482qgf7h0x',
      rewards: '61945175068619818892',
      mid_rewards: '4762446444429860683353'
    },
    {
      address: 'erd1kp7ktjjkc3w6x5e9sv92sedmpfk5983wrnqk9ds24ws90syp2z4svma76x',
      rewards: '61122966856619756263',
      mid_rewards: '4700428315778435403071'
    },
    {
      address: 'erd1k2v9jja7ccestvjx3js2g92euhdzawj9ykgzd6wlw82n6fyuv4uq6ss7fz',
      rewards: '59211563226986893514',
      mid_rewards: '4574253550217515548605'
    },
    {
      address: 'erd1yy2gqfks6s5yrdt35nc6zznt55ldxrjku90sy7es92xgawx368kqvunp6j',
      rewards: '58529799497223955875',
      mid_rewards: '4522828971764983400668'
    },
    {
      address: 'erd1uv32khhl2r276afpc2zuwfu3qyp4ukgrhu3wf2mu4tcj3edqzclqlntkxx',
      rewards: '59112227643032476132',
      mid_rewards: '4485760792379007065406'
    },
    {
      address: 'erd1x9c0gvlkjmsls7urfhxgj9zm5tv3arkyhax2f6xsks23dl0pfx9s079dhs',
      rewards: '58653863929894568282',
      mid_rewards: '4460186995479822609592'
    },
    {
      address: 'erd19plvjt2kfh0z6e26tue52f48rd4kupu4sjf56wpwdkej84ne9a5sz2rf07',
      rewards: '56367905207066561955',
      mid_rewards: '4332760011541860772290'
    },
    {
      address: 'erd14xxf8lrf5xv86xu2t2vzh56uc2rl4lj047duyya4jayvvhey70kquq5smm',
      rewards: '54576374692470526815',
      mid_rewards: '4224627123891788773289'
    },
    {
      address: 'erd1rr33j3aazthu0m90jwj4cfmtgae6uh50s8jcdg6rwhyskjrwhwvqe96y3l',
      rewards: '51938768676834454029',
      mid_rewards: '4025675828073937295365'
    },
    {
      address: 'erd1gtllxep98sh7ht8tedd0yq8nly8ew8q28uez7szs5kx5757kzerq08nr2x',
      rewards: '48658873048375095655',
      mid_rewards: '3778277436668641570607'
    },
    {
      address: 'erd176kdulkkq9rr5s7wjp9702d6g4nry8mjyt8vpeq7vtt62ds5qkpqkvqszm',
      rewards: '45503680499409959300',
      mid_rewards: '3540285241302775558873'
    },
    {
      address: 'erd1ha5p8p8mk0pvzfgh7tgh55wta6cmprn2vxcyrysf0dcffp4p926q3png9g',
      rewards: '45618031228249088274',
      mid_rewards: '3530910572586293324938'
    },
    {
      address: 'erd1dp5xjsf28gen455md2tz24w4svh45vxuddauq3k24wcxkkemwazqh6u50c',
      rewards: '45168517209517978675',
      mid_rewards: '3461004296977016115701'
    },
    {
      address: 'erd1rlnuhlxqmpvcr0qk9k2dkq6dfjps3han504s7l0hrxflnfw546fqat03yc',
      rewards: '42330179214890240970',
      mid_rewards: '3300912041100790368837'
    },
    {
      address: 'erd19p2sa50hj4a3rvw262l0p8x0lnjz2zeys8m9xdeuxxad870446zswe9qau',
      rewards: '42757679642650700376',
      mid_rewards: '3234157859301625233802'
    },
    {
      address: 'erd1zvqekvl29d3pgk2hz0sga09p20p4tdr5z92fmuhpmqgkkkqf5g0s77gmut',
      rewards: '41676694841361793038',
      mid_rewards: '3215620538829611095337'
    },
    {
      address: 'erd1j2aya5658vgylj6ku004j374w8y0rq0zdwsj4zlh5y0l930gyv6s2aca7y',
      rewards: '40472777564282445674',
      mid_rewards: '3160810576722865689470'
    },
    {
      address: 'erd1ge4a6eutjvtjnmwfql3permcrht8zv0qlfq6wdz7hz9zyvug93zq4mlhl0',
      rewards: '39952102109060200034',
      mid_rewards: '3121536683691485709508'
    },
    {
      address: 'erd1m9wre748ptuz289yr5fvlqee5mm49qvk7anhxjasqrs2xcll9kysxddpvt',
      rewards: '39016604299833976192',
      mid_rewards: '3050973263576053884496'
    },
    {
      address: 'erd1m29lw5zfh6u9zwayf5kxm5xxp6yz4nvfs3nh2m6al6jr0lvnutvs5as2qu',
      rewards: '38734091892234928291',
      mid_rewards: '3020663708910476894236'
    },
    {
      address: 'erd1jqfm46wyp8stk76n493jd5399ck6zt8kyuzljcgunmwyjp258crqt2mz6p',
      rewards: '38481315293478450397',
      mid_rewards: '3010597088809937495307'
    },
    {
      address: 'erd18kyh4l0ev8qwkgqr9humrsstycq8ledts0rf4l33gqf8yxxvrz7q655dke',
      rewards: '35238447254490406291',
      mid_rewards: '2765991641787790249162'
    },
    {
      address: 'erd1z0fpztacaulh6axsux5ylw7hsh42cd7pvufw9egp5qqyylzszavq4r59tj',
      rewards: '35110748440562685338',
      mid_rewards: '2756359481277572414932'
    },
    {
      address: 'erd1e73xz92vrz7c00q863qs8kl0rqh9sy6a3fcdmku4xwde47jajzxqn64fjt',
      rewards: '35572382707493401222',
      mid_rewards: '2728179971925278759874'
    },
    {
      address: 'erd1chwmx4rtd3arq3hlwau065hr6x65t4nhfte7cz45xumxkfa4ajtqtz2y8p',
      rewards: '32812188380187664013',
      mid_rewards: '2573981994338345549547'
    },
    {
      address: 'erd1hqxltk6vemwc33zug26k0gurejr33zh258r4ejx04vh4qrgplm8sf3vvh9',
      rewards: '32719696811491142531',
      mid_rewards: '2567005471940643479947'
    },
    {
      address: 'erd13my28tqjfac7k2tsm7l08c905rpcrdc7ljzkgq6w3wdd7c4da2ls727vpr',
      rewards: '31993132100882205445',
      mid_rewards: '2521201611995582257324'
    },
    {
      address: 'erd1h3glk4c0vrw4nghltv827efk4et3zee9c38hzw8f546juvzkf2wsjyydtj',
      rewards: '31800643659672774972',
      mid_rewards: '2479682451597269595704'
    },
    {
      address: 'erd1x867j8qenv0xepzv6qk0acpnvyt56qn2slskh6g3qzvl97y4hf0szcddg5',
      rewards: '31774942420786646367',
      mid_rewards: '2477743839556575435645'
    },
    {
      address: 'erd13nx56z8j09m8p4s9cwqx6jkcrv6fawkkz78hat8mxgk2txspqzksvcukxg',
      rewards: '30843836763810586351',
      mid_rewards: '2434511713947002044511'
    },
    {
      address: 'erd1km5w5sgqj96m74sjctwsnnw4nylwk8732vlz9dt6hnmqgz4sh38q2rtgcq',
      rewards: '30893369797043346799',
      mid_rewards: '2429247928184089264602'
    },
    {
      address: 'erd1g77gdm6pancagyduxjsy30wnaf05x5afmhgh7y2z8e3y0p86e9usnkevf7',
      rewards: '31120002306611167108',
      mid_rewards: '2401342532604035607892'
    },
    {
      address: 'erd1xhm2ercqjpgy89cc434puq2rxsw3hy6an52a70rpfmdsx8pq4raqpte8g5',
      rewards: '30033874758556619837',
      mid_rewards: '2373417301228337702370'
    },
    {
      address: 'erd13j80zlnr4juxeq2w05vrvqyvxydrqrvhxe8gqv6c6vw0xemzjjqqkpcnfe',
      rewards: '29862580782999678577',
      mid_rewards: '2360496812648610805660'
    },
    {
      address: 'erd12ap73tmlsa7etkaql89v2qhc8vv2s2whswdtvggwxkzc2vy0dfmq9xlmwy',
      rewards: '29637878458121202532',
      mid_rewards: '2343547799625877063775'
    },
    {
      address: 'erd1hyjf0z7y3qxtlqw3cjder90442udpr63wgxksk0q6ugezv7rns5qlsw2qn',
      rewards: '28802257310428862029',
      mid_rewards: '2271517950148490342195'
    },
    {
      address: 'erd1zc2pcfq30kl8lrs8geg8djhdwu24gjlxc45gvgc54g0hg8q2qexqp77s5v',
      rewards: '28680004091368950399',
      mid_rewards: '2271296543992420595835'
    },
    {
      address: 'erd1myxljua92nzkze362dmrtc3mprgs2nyxkhflw7rp2mz9whvlfrvqes6y0t',
      rewards: '28900460218758713912',
      mid_rewards: '2242925271692907625966'
    },
    {
      address: 'erd18ken978k30vy3fmn55shh29g3xtucvx05tp7jfkwan2mxucnujpqq5szns',
      rewards: '27593030797472122444',
      mid_rewards: '2189307519074299439133'
    },
    {
      address: 'erd1u0wyar22pgude0gn7ajw5n5c6su7k5dgyz5l3ardy63c5y7wqmnqt7luq0',
      rewards: '27440546768715869950',
      mid_rewards: '2150805841062973302189'
    },
    {
      address: 'erd1j6ychz6px65x5vzcflpl92sutdlu3lseuthqldh8r3myk9u604rqhclcr4',
      rewards: '26220744905558421954',
      mid_rewards: '2085797724658340381559'
    },
    {
      address: 'erd1y6husmjd4y3e4dfaa90mqrdzc250ejc6xf6ruacl6592fwr7eq3qxvm07e',
      rewards: '25733739888542395263',
      mid_rewards: '2049063550323449160043'
    },
    {
      address: 'erd1j74jtnlj7ll56p2zz68w3u4ds3j0r9vg3gjpetxpefvs8rcdlv0stqhcae',
      rewards: '25516565163073456635',
      mid_rewards: '2032682334632101168101'
    },
    {
      address: 'erd16u0nu0eqn76z9ge8xn76vsjlh9ftt0gwslsk0xc8du27kw3m70nqdzlqck',
      rewards: '25016659166882496710',
      mid_rewards: '1994975055705790094981'
    },
    {
      address: 'erd18ymd3xt9xy5hx9d44jwzgmckfyt3nu44kzdcy38vfac30l3v32usntttcc',
      rewards: '24866054262116748024',
      mid_rewards: '1974615117647549023970'
    },
    {
      address: 'erd1vfvpdpucn6nd8rlj64fust0fxzfl6xu7ur7vz22r5hx7pyszucvshjrx35',
      rewards: '25684922788002871607',
      mid_rewards: '1973381337986643273282'
    },
    {
      address: 'erd1r87mvp7weghlpldw596xhe2kn03dhndc7tykvl9ctycdmpd2ulrsnqgx2t',
      rewards: '24639016719294279512',
      mid_rewards: '1966489962079939276125'
    },
    {
      address: 'erd1fx9qc9lgj7npupz8u8nxr6f0wsh3dmkjepndgqrv6j5eq43s0uaszuq67j',
      rewards: '25224696463141091197',
      mid_rewards: '1920667046633824276724'
    },
    {
      address: 'erd1gy0x087as37k58g5qvf42xnl98zs4dnde4073vaneeu8y983ldasduqa5q',
      rewards: '23881347848511192648',
      mid_rewards: '1900339954554349129588'
    },
    {
      address: 'erd18erw69jqk4w7lj0kwttuyen7sgxn36elh08amevgage2v5r9evxqz84uu9',
      rewards: '23699680607604139468',
      mid_rewards: '1895637023649637811350'
    },
    {
      address: 'erd1h64s2jh6qv4cxl7v5mdj4xtna9jr9ln64n0hhh62m2s05afjzawqq8lcj5',
      rewards: '24063904839374446708',
      mid_rewards: '1887109998176308839869'
    },
    {
      address: 'erd1zd7z53qcyn0pe9zxr4jmur4rkkrd4ey90jvhfxzx35zz624dzems9jthna',
      rewards: '23583837145495663611',
      mid_rewards: '1886899097377904808871'
    },
    {
      address: 'erd1f8hyvsnzp983jj4t5zjw5rd6e8latl8k8f30x7ave43tnk9r9yqqn70t5g',
      rewards: '24202734932182603201',
      mid_rewards: '1852581777016271222911'
    },
    {
      address: 'erd1xsayfjacqpae7ekc5c7mda9clurntk9whd3ukr8kzhftew7hvtvspla30k',
      rewards: '23185707890289195114',
      mid_rewards: '1847868709686655368318'
    },
    {
      address: 'erd1kf6hjjywgzw7szmh2lt9ge9q4jjmaygrwvxn8klezphea95xj38sxxlnqm',
      rewards: '23418678245150031752',
      mid_rewards: '1847441369785222307658'
    },
    {
      address: 'erd1j7dz6stqdzd78v85dl58a62mvwszsljt4n293ehl3jwfjcwlslqsajmxnc',
      rewards: '23412679919250932639',
      mid_rewards: '1837988923626361178856'
    },
    {
      address: 'erd1srkffmz4fxr6qcsy5h0qhgxuafvzmylvez8yyh9mnsr257denzxq37zl6h',
      rewards: '22408936339984699214',
      mid_rewards: '1780277811132667657619'
    },
    {
      address: 'erd1s6qamgj47reyzjkhrclc7sj46u6tcgk5z7agt4dx7jcfwd4f804qmfcgvz',
      rewards: '23331905158017955993',
      mid_rewards: '1777896185241093721388'
    },
    {
      address: 'erd1xvut8ytpqefg95fyejdfngsv3qf2l4jtf69pc506slu7s7vcav7s6s4kwc',
      rewards: '23277315147505489803',
      mid_rewards: '1764778529584494017199'
    },
    {
      address: 'erd1rrfktnk2zvlmtv3u7mcmstrdm55ms2y39sgf60d60ucyh66w8p9qpyvwsr',
      rewards: '21946491403178749896',
      mid_rewards: '1763396172678502699782'
    },
    {
      address: 'erd1z33cd8f8gesrepw3ae0ugwy6u8693dp4p4naa63ga6qfqxxjwjws00wf6r',
      rewards: '21860167353306648519',
      mid_rewards: '1756884858448671549161'
    },
    {
      address: 'erd14l9ph2wjqvw5hy8alrjs3jraq0776qwv6jdzeup9u3p7m3nkeutqygnyh8',
      rewards: '22463654166474611129',
      mid_rewards: '1712405107787274003028'
    },
    {
      address: 'erd1wtqp5jp5t6fk7r7nj98ultc9gqal2njq3tqp45c9v7zv4pfkla2s409dkw',
      rewards: '21874904263892082036',
      mid_rewards: '1694996445031331340552'
    },
    {
      address: 'erd1xy5y9xxrkfscc676zj8e0mpfjcspt96wgdncexemf0u7vqzr9qusqs5df5',
      rewards: '21138606861620793787',
      mid_rewards: '1675458460426809403829'
    },
    {
      address: 'erd1sx8sngns9hdq2gzshaw3k3vwact6xkxu2henx9fyv8sdngny366sjls6t3',
      rewards: '20667064466524040596',
      mid_rewards: '1630890612165389435069'
    },
    {
      address: 'erd1nagwvm6zqxey5y3fwttnhskcsll4q6rlhluhntd4khm3phzawt5sfl8zfz',
      rewards: '20303729001513952188',
      mid_rewards: '1621484676194733653170'
    },
    {
      address: 'erd16rnzeszv3rl4w3fmgt5rjrpvs6t3zksm269nsjt0pen8fkun5fnqcy5rw9',
      rewards: '19952563942571197677',
      mid_rewards: '1612996738607222143410'
    },
    {
      address: 'erd1d4mytvvhfxddhxgkr325cdmwcj5wtlkdukq5lja2ym2jegych6xq248my5',
      rewards: '19722598421702457993',
      mid_rewards: '1595650729347674105176'
    },
    {
      address: 'erd14h9ak4r8ryj3rfh7dgkh9htfgxnx2fegekx9htvn72mm3j0jskpqegh82t',
      rewards: '19727699993180823332',
      mid_rewards: '1587035534451359544108'
    },
    {
      address: 'erd17r849gfhs3tvuq99ae9jhmru837l6pgzcl4g43508a8k58ej9lnqyg22tk',
      rewards: '18869963487376304402',
      mid_rewards: '1531337551398370297499'
    },
    {
      address: 'erd1u2hdr3s49jxy8anas4kz6pudrcmt0wzjv0ya3rtyydx2578zrntqn4hh6p',
      rewards: '18766154939257002209',
      mid_rewards: '1523507403513177361921'
    },
    {
      address: 'erd18uu8htscncqkf49hs884cl3q2s2xrt79zke8t8v4fhdnnz5kefzq2yrn59',
      rewards: '18678927441576419974',
      mid_rewards: '1516927943354372918814'
    },
    {
      address: 'erd1jkjmsnsm7l8cavtpsrl7a05607zlrm3crx4je8vxa2mc4ztzdjfq8e67e7',
      rewards: '19453868361635817213',
      mid_rewards: '1512380759777342324501'
    },
    {
      address: 'erd164s3es36gx26wet5hge33trfdhhrj8l0vewc6tghrlee7fjytaysh8s844',
      rewards: '19305885884009921949',
      mid_rewards: '1510218628091458923852'
    },
    {
      address: 'erd1yglrys853f3kq7xdfrjqd9sg2usfwg8nyttwn0d032kca77u3s4qqkzted',
      rewards: '18508806819507182845',
      mid_rewards: '1495095959348660210867'
    },
    {
      address: 'erd1fljyc6rwfj4n2q28cusdj8d0hxpz60qrz407xdfsxavusv2rx59qwj8yn5',
      rewards: '19272587913517302695',
      mid_rewards: '1480707004164936445370'
    },
    {
      address: 'erd10urqpmp77ke5uhh7ctck38e69j9pj9qgaj0mlfus9sqhdapttelsv8deg2',
      rewards: '18031998392393669530',
      mid_rewards: '1468130900932523459709'
    },
    {
      address: 'erd10z6vdht9ugfa59vgjxvmkwmulje59dykvq54f657j80v6745r4kq8tyyu8',
      rewards: '18499024964954587098',
      mid_rewards: '1467358126394381268560'
    },
    {
      address: 'erd1zq53v8zhmycv8fvamjz5lgzmsphqandztgc8zgncg3wlnnuq7zhqe4t0fa',
      rewards: '17930252261976143646',
      mid_rewards: '1460456318613929037071'
    },
    {
      address: 'erd1ztxh0pdzdlxty0stchydqxmsqu3kzy8trdc0kw5p4czs9pex2q8qnz7he4',
      rewards: '17685162324897625914',
      mid_rewards: '1432969493711109796076'
    },
    {
      address: 'erd1e9vqcfhpzh88lhwclfewudd0lada8d7scs2g7xd5a8grewrpquzs6apmfw',
      rewards: '17338184553273008803',
      mid_rewards: '1415797397925962462933'
    },
    {
      address: 'erd1gea5ja6qr06jr2zcnwplgu5rxdyxsjmk6v7e3ld6zql93f8h7fwq36zph0',
      rewards: '18319581192119086526',
      mid_rewards: '1408822908882581034028'
    },
    {
      address: 'erd1raaq46lladv8p0d4z50s90f42g0q0dwjr3p82k7v07mm38upa5vqaytn6d',
      rewards: '17185317271815722513',
      mid_rewards: '1404266811646667435427'
    },
    {
      address: 'erd1nedsfyy2nmazk0as27gz0wn6dkrumvu6ndvjutl28d6lgk9hp2rqf5d0lk',
      rewards: '16890468306055344258',
      mid_rewards: '1382026725955008796005'
    },
    {
      address: 'erd1xc5qzhd0r9cypm823t60tlxaplh2f0gf9q3s76ggq9qxm9550q4qf96pac',
      rewards: '16865601197147042117',
      mid_rewards: '1380151031286729359797'
    },
    {
      address: 'erd1j855kz8avdqjg63nwgpke32xnwul8pdmdxke5wxtfwxjxw5vcjhqgkyv0e',
      rewards: '16739092586038575776',
      mid_rewards: '1370608646274358068571'
    },
    {
      address: 'erd1eeppwn2vyundyuz7v4eufz2tg5d6w43nv23867qt8ywrwskt800q7j9ld9',
      rewards: '16789245622953892836',
      mid_rewards: '1365391626607414603152'
    },
    {
      address: 'erd1a78ex6cqydg3ec9tte872e9ht8qwtc7rgh2vej20xp396qses20s726e3a',
      rewards: '16722335712453700557',
      mid_rewards: '1342344696429762765371'
    },
    {
      address: 'erd1c3nfhvj5jgulw62yndr6fgh0fcmut34fful733tl998zpt9s2k5qrxumhs',
      rewards: '16413523567574232226',
      mid_rewards: '1328051385744298594016'
    },
    {
      address: 'erd1l97k3twwr6th905tna8445kqpqk68tlj0c200pf0tgsqczq6l6cs562a8q',
      rewards: '15982696461982897133',
      mid_rewards: '1313554640429521114924'
    },
    {
      address: 'erd1eef9yguh4w73prftkwywextw9rupnw7mkz663xw4kw3859ey0t4sk3rrja',
      rewards: '16292617290261268619',
      mid_rewards: '1300931577705748247526'
    },
    {
      address: 'erd1uvyyz3usc024rkzsdy6f2q0cu246qaym5hjm59vn0fausl3q0qhqa8hm2f',
      rewards: '15780624180596913974',
      mid_rewards: '1298312583051624287369'
    },
    {
      address: 'erd1z342nn8mmc067w692qjvj8aqxlkk0kg89pkmpm7xlate8j0puk5q0e3ljz',
      rewards: '16496490839666385016',
      mid_rewards: '1298309502458983688968'
    },
    {
      address: 'erd13txawsuyk5lfj5skpekkw365vqfpq7akru7s54jsanxl8l784ppsz47nwk',
      rewards: '16129705105389104723',
      mid_rewards: '1297643317028189033085'
    },
    {
      address: 'erd1r5huktn8wpqdz3j90ndz7gjh90x5zvk89fqm87wxay9kv0mnxk8s0czpge',
      rewards: '15768475714739767096',
      mid_rewards: '1288396239590868479227'
    },
    {
      address: 'erd1rlxrn6xedc9vgvl8n382a0fsu8775wc6k24n99hw69w8ntqwx90qnkufrv',
      rewards: '16012939532276463436',
      mid_rewards: '1270835837086165977320'
    },
    {
      address: 'erd1wct5m70yr8n9dcwkx8vclgs3383gtnmuwy5s7hljnlmh4v7t48zst3z0pd',
      rewards: '15654940431429063755',
      mid_rewards: '1270832416335307659091'
    },
    {
      address: 'erd1ekx2n2hvdhq970x2c3thn9wqnggs2g9xrwsxlvrwyyyzxcqn7jzs67vfqm',
      rewards: '15194455468255296724',
      mid_rewards: '1254098616220750616905'
    },
    {
      address: 'erd1764fqy5pmyjk47lxpv5u555kg3cyuedrgpnzgp0wnj45ya7gydfshg42wr',
      rewards: '15113276064308468722',
      mid_rewards: '1247975356145819600894'
    },
    {
      address: 'erd122rx56rp9flkwe9nvct537whkwwzpkqhumn93tmyt9re23cq069sereey8',
      rewards: '15356231538827525001',
      mid_rewards: '1230301181229271529621'
    },
    {
      address: 'erd17kkph9y42klrzqzqypel8jkd0d6cawtl8c6kttpps5r4lycc82zssmgkzp',
      rewards: '14801713363252611393',
      mid_rewards: '1224474574476338728560'
    },
    {
      address: 'erd1aws77jknfywzr8cjujpgzpm57e53y2jnr4w2pudjrshad2mnkq9s7svhe4',
      rewards: '14783082444533587064',
      mid_rewards: '1223069267770388909725'
    },
    {
      address: 'erd16etwd9rjvxvk65e9v8xqffykww4qxnl3u5tmtv9wyvf6y554xfgsn2760t',
      rewards: '15258527945491008488',
      mid_rewards: '1222931522385180396538'
    },
    {
      address: 'erd1eudapq39r87xu868gy7fz99c9lmny8tt2vtatvgz7cnldj36388qwfszkj',
      rewards: '15011945141864905203',
      mid_rewards: '1222332092441136436088'
    },
    {
      address: 'erd1yhx0zn0ferj0ttp2ykvf8p9t2fanfplqpfr83zh0mp2sj4rqkpwqn9hz9c',
      rewards: '14713814826203729178',
      mid_rewards: '1217844498664143808078'
    },
    {
      address: 'erd1g3jrmu8gpycy4z44jle39mpmv0x3mulflul78jxhyxypzks33sassrtp9m',
      rewards: '14904847984615260964',
      mid_rewards: '1214253888916078656542'
    },
    {
      address: 'erd1duahw05cmhc6lkvlze3plqhvn89ts978nzrwutymy8qjwrld4j6q65s6v9',
      rewards: '15546871157369508165',
      mid_rewards: '1208680887265088223207'
    },
    {
      address: 'erd1zk5hyzpsdhqsx3s8x26znnuqas9n2mv3msakv7zf3242hq8ugd6q0f0gl5',
      rewards: '14590855690015227333',
      mid_rewards: '1208569846069204694962'
    },
    {
      address: 'erd10ks4g7zfmx2pqazayemp48qs79rr4hf60vcf0r5mkp2vtz2e84aqplk7mu',
      rewards: '14482966428495173459',
      mid_rewards: '1200431895117849494343'
    },
    {
      address: 'erd1gyptc3c84cx28n7kq0yhp9prhmh40kkguzfkqps8lx03f07c9llq0k44dt',
      rewards: '14438193163276612277',
      mid_rewards: '1197054704180149518300'
    },
    {
      address: 'erd1ger6murmrf4az3lg7ssvaumlku00493nyxnjjewhmm789fq36k7qsd3wkm',
      rewards: '14216196359099646325',
      mid_rewards: '1180309765172350736151'
    },
    {
      address: 'erd1d526wazjqphcmqthdxdv6pl6qh37n70e03y0arg34rqcgknq9l8qprdecz',
      rewards: '14645108989727451233',
      mid_rewards: '1167662104054724279717'
    },
    {
      address: 'erd160p9vp5lnjf7dvur0hal6mggdl25vw0qr3fpn8edsew30q7dhu5q442fwm',
      rewards: '13967712662412178080',
      mid_rewards: '1161566953261656794394'
    },
    {
      address: 'erd1cfyj8kuy3p49wae9sx53p0x8sf96h8xfnkdgd0zgfvlcmmkql9vqm09t5h',
      rewards: '14432301568081393419',
      mid_rewards: '1151610308583697880885'
    },
    {
      address: 'erd1ve2jekzgdeg2mvss8su56p0huuqkr7rjp9cl94xy65y9k3mxlp9s5uxtfe',
      rewards: '13891050839412279857',
      mid_rewards: '1146784448621019467163'
    },
    {
      address: 'erd1xfverc390tx4up7y2h2w64v04a3nuurrxvl2c9dhtzpvl7m6qvtsstkdam',
      rewards: '13761498097799870118',
      mid_rewards: '1146012448683292412952'
    },
    {
      address: 'erd15th4hkvtnrxdffxwmj0jdnwh6f30advmf4rs7lhx0jjs9epcmvzslqk79e',
      rewards: '13640805456044647157',
      mid_rewards: '1118908754905474453026'
    },
    {
      address: 'erd10cwaavvd32zv7hgegpj0fe5tgkqpru78d9fe3pp2j3m7e997je9qd5dkes',
      rewards: '13082171590729234898',
      mid_rewards: '1094771706865176381742'
    },
    {
      address: 'erd1p98x64g8642n6sykjcs64fm69ll92tj7a204tadcn3d92a8gqx7sgn6hks',
      rewards: '12863456656259011043',
      mid_rewards: '1078274315151018509159'
    },
    {
      address: 'erd1v93zxu40djh9cnj4eclesw72j3xdtg5fnllmgpqng487pm2ztx3qq85av0',
      rewards: '12686641544168269003',
      mid_rewards: '1064937374204533549795'
    },
    {
      address: 'erd1jadwfhk3wgevl0n3wu7pvnf7wlxvj6s9r5cmxt78uhjc4uweuccss7zwsr',
      rewards: '12625337959579380940',
      mid_rewards: '1060313322120963625000'
    },
    {
      address: 'erd1s00r9npq7uly5yzvtscls0ekga45xyuz2hyscpm4mmj94thhgjfqcgj8wt',
      rewards: '12969604137168666634',
      mid_rewards: '1059280885787264146582'
    },
    {
      address: 'erd1m3lfecjw6qsv085y22a0ajylf339wtsgjlzqvnvk3gw5v8e9ecuszf846y',
      rewards: '12801739492036681302',
      mid_rewards: '1046619067277209513703'
    },
    {
      address: 'erd1lp9tclqyrvu7ewalfxa7asj4227x437e66p3w59mp88x8h6lc6hs7vgamg',
      rewards: '12430056880158473534',
      mid_rewards: '1045583516543791755591'
    },
    {
      address: 'erd10arq0a6vfxlt2nwhw4n9894u52kl69uhj3697aqpmq9yljmkjg0qlw4sg2',
      rewards: '12447171645491757183',
      mid_rewards: '1037874461711678813812'
    },
    {
      address: 'erd1nr6vw9mq5az55a4sqtkpseyrm43jqjxs0a9sgelj6wvlt9779x7sa2a5lf',
      rewards: '12412579591690308610',
      mid_rewards: '1035265226712971334209'
    },
    {
      address: 'erd12a3lg4han953jxlxs9eclpp3737rk67nhcnzv0dm645tmej5a7jqsf7n39',
      rewards: '12593479360350416041',
      mid_rewards: '1030910268153854874152'
    },
    {
      address: 'erd1vh8jtzdrqnlfrjgpa90hsu8sav9z3j6sww8x3g9rwx7y5n9x65vqsxe7w6',
      rewards: '12316059490262809478',
      mid_rewards: '1018984837171229805057'
    },
    {
      address: 'erd1xsl8uf772qua0za32ez5vuvvvalyeqhje84r74pah737zar3g2nq6k5tnq',
      rewards: '11965849659578387575',
      mid_rewards: '1010568951246730320860'
    },
    {
      address: 'erd1047pjrlllg05qfq290fk80djduwrrjkxf4ts4stn5lr93aydsaxq8pmp57',
      rewards: '11774951643323282465',
      mid_rewards: '996169754597244556174'
    },
    {
      address: 'erd1n98dhv0lc05hprrxc8aquv26eda087536r4lew7szx92jchws3hq4rhfvr',
      rewards: '12324911969270579722',
      mid_rewards: '992652568500077071285'
    },
    {
      address: 'erd1evpspar23t54g8dwn85u6pasljgk47rj93ccwpgu3namekcvnwyqnh862g',
      rewards: '11832949539597726376',
      mid_rewards: '991544462779629150812'
    },
    {
      address: 'erd10lfmw9hq8k4vvlu0cl8nc3dxcwcfkn3hymvq2f0sh9vnxha5558s8els08',
      rewards: '12376622606105655105',
      mid_rewards: '987553036630994488836'
    },
    {
      address: 'erd1wnswrg0gz39npk3k7m860qrrd5dfll5hnxxer8gfq9u3r3qwasnqafyerl',
      rewards: '11729139118136892175',
      mid_rewards: '974714173590646683002'
    },
    {
      address: 'erd1qgwqgghknxnvgksd9sd3jtpdhudevdh5sfv0turkrd7xkep8fwrst4pevg',
      rewards: '11821747766540212489',
      mid_rewards: '972699527162998611927'
    },
    {
      address: 'erd15khchjtc3z6xft7emm59cke7ar8nuxfvjk4kmdz28ulmzykvckmqvqftxu',
      rewards: '12162414498734032244',
      mid_rewards: '962395589201911142951'
    },
    {
      address: 'erd1hfwcny4gqrjpyt2295dcx39jwf7syld0hnajz46xv5ect7esyvts66248n',
      rewards: '11324501534221316886',
      mid_rewards: '962192870871675384936'
    },
    {
      address: 'erd1zct46tdmz8ddayk9f0e8cltxgxv5pymwes5vy8ud2r8ufds2ed5q3tfepw',
      rewards: '11280774782113050022',
      mid_rewards: '958894617098263463077'
    },
    {
      address: 'erd1ydjz2pq7utp64rp3dl6v74xgdlmhpgyahpqgep4pspvvsp5fv68ssgasmw',
      rewards: '12213535870742985564',
      mid_rewards: '957251609830039333838'
    },
    {
      address: 'erd149aktzx5n5mkq46k42e39qkgmylp7ksjdl83a73yy2vvj55lcqfs059qjg',
      rewards: '11797273303299651011',
      mid_rewards: '952853449262322517739'
    },
    {
      address: 'erd102vuxukj9v5kcmjg42mrhxjg7xtdv824asrhlmdmljsu4rt70xrqqel5qu',
      rewards: '11414875931683572386',
      mid_rewards: '942009697712865797461'
    },
    {
      address: 'erd1xnuswaahm7pxxl6aysxzze98al4lehcxv8cjfnszx58drzqv77ds4pw7kz',
      rewards: '11454066696473244323',
      mid_rewards: '935965807682579207555'
    },
    {
      address: 'erd1p3t48n7vzvgv867vzytlfrn0xel0zzqkf3jk7svz5er3q405a5fsu6u9ns',
      rewards: '10921595919576258314',
      mid_rewards: '931802208410818187007'
    },
    {
      address: 'erd1jsv35lz2jpru4sgevfdsykjyz9mtvwma7dfa9t6wjcvm4q5lpf6spqzjj5',
      rewards: '11500460500403413054',
      mid_rewards: '930465233811845336782'
    },
    {
      address: 'erd1tn5wtaefy2u2rqnuc6c44yk3umzqtnwjepg7zhn65r4kwn40ad3splktv2',
      rewards: '10866336582233187142',
      mid_rewards: '927634066275386880797'
    },
    {
      address: 'erd1afy0ly08phah08xsm8uka2xsdyds4v88xsrxxwrqaq58xzw5v7jq5amrpv',
      rewards: '11303207203123091658',
      mid_rewards: '924586666328445065349'
    },
    {
      address: 'erd1f3c6jcdru3trpp4klcm2up5sgwn4e9c9c93w6cyjcef0eqtrsvksuz0ncj',
      rewards: '10788287660212131800',
      mid_rewards: '921746934504673672336'
    },
    {
      address: 'erd1a8qv8354zuaearv9sz3hf6vw8anph5nvae5hc9j4tla5qg8xq6dsfqm8ny',
      rewards: '11989837702405161767',
      mid_rewards: '913378339068955900709'
    },
    {
      address: 'erd1kkmtmld5kk5kgyzz7uhgyz47lukf9jreedrqte3xvkfpj9m64gqsjt3w07',
      rewards: '11950348998924849179',
      mid_rewards: '910399755959499162822'
    },
    {
      address: 'erd155xlkeyqatck0qay99qk7qwerxc0efergug9k588uql4efm7yhwqqwkcsq',
      rewards: '11048978328630765634',
      mid_rewards: '905410502900426512291'
    },
    {
      address: 'erd10dq9mcyk9nmq0l4ssyczmkh6tgfv59rpzpx80wjspe3tkgamt0zqyvvtnr',
      rewards: '10800140850947788338',
      mid_rewards: '904641005735348480337'
    },
    {
      address: 'erd1u8zj0sv8hkr4a8hxl9wgfylqqvq0kn8d40g76nzd0yfpxx8hg5csq3paq7',
      rewards: '10472527396327623367',
      mid_rewards: '897929535964027683315'
    },
    {
      address: 'erd1u9quy4ywagnsdz2m9u7a5lzpuhllv35xlqryn4q8wle853jvwkxq5krnn3',
      rewards: '10530514601020228444',
      mid_rewards: '893303437693875936710'
    },
    {
      address: 'erd1ss05j3t9ah8rs580rqcwhghjthefxsxnqyr6krfcwgegk2c8r0nqgarjqz',
      rewards: '10428116077521571617',
      mid_rewards: '885579646187819791820'
    },
    {
      address: 'erd1ed09djpv664nhp7yk2nv58fy0zxv2xxv4cd2lncw3lcugvrv62fqas2hc2',
      rewards: '10154918789136958525',
      mid_rewards: '873972719218503438729'
    },
    {
      address: 'erd1y54uy552667lzr5tdj3ccmac39x0724lc5yjuycy33mexyhn505qfh0kpr',
      rewards: '10129346151324169487',
      mid_rewards: '872043807394609210165'
    },
    {
      address: 'erd15exx9f25uwsgw7j9ra520546vu70nu6p6rkjkjqcxl26rtd2zfts7zhcyg',
      rewards: '11361104381069500388',
      mid_rewards: '865953777454348738056'
    },
    {
      address: 'erd1qd7lsq3nvgrc39jxfu9hwa8g8pd9522m8fyv9c7vus6kr34x45ksweskn7',
      rewards: '10434557618814234757',
      mid_rewards: '859065523524936221021'
    },
    {
      address: 'erd1g9wykejkk9awsautwtx87zf46590aj4spyhvwqagvlrrgcylhfjsthfvya',
      rewards: '10289503718713102287',
      mid_rewards: '857124290748897809524'
    },
    {
      address: 'erd1z3pn4vl9jn3732wnjt9l783uz54tc8424hpq9glr7my946axc89qnsmke2',
      rewards: '10745331249243059030',
      mid_rewards: '855506786592014234900'
    },
    {
      address: 'erd1mu05q24ddz3yk6mrzz2wejvkmq4v2k45t3rc5lg6z9venug4qgaq3cu738',
      rewards: '10253751021798169548',
      mid_rewards: '854427509903676154853'
    },
    {
      address: 'erd1rjxxd6w9x5y94x6ugfdetpjtq8wsgkvnec7xrudtdk2wwx9vsvqq2mfjt9',
      rewards: '9879743791401021702',
      mid_rewards: '853216616126648537405'
    },
    {
      address: 'erd14lnnrkz5wk4glecsr96suwmzxmkp8j6nqf4te0lmhga8yk9kk4cqaukf4j',
      rewards: '10461807418065948784',
      mid_rewards: '852120941521318607107'
    },
    {
      address: 'erd1dpvzcutt3p85g5aeevskjwncvqnjk5x2959jl2uvzuq8yh56l9pqwmh6wa',
      rewards: '9852393787322404407',
      mid_rewards: '851153639806528100157'
    },
    {
      address: 'erd1qq873zl3fdtqvz9f5fvmmkkc89t2k9y93jca6rdrrv4hge39k7vsh30rxe',
      rewards: '9876155434754944742',
      mid_rewards: '834945950909644379235'
    },
    {
      address: 'erd1mm5jpvdrgdp3qeya5q5erdwwcq7xxvply8gxrw53jfcvggju727ql2ntzk',
      rewards: '9875249704755103934',
      mid_rewards: '825877632837854580144'
    },
    {
      address: 'erd1lfr0aeu9xmwrtxg4x3wef37sd002965wy26sh4385h7mk8hpqlmqdpw9tx',
      rewards: '9778710301990130229',
      mid_rewards: '818595787420565747953'
    },
    {
      address: 'erd132th05slxkdqzt979mka6x49kk6w0p8yat2pnpywdmc0600sejvqn4mpul',
      rewards: '9358595858167074394',
      mid_rewards: '813907084674626413049'
    },
    {
      address: 'erd1284st2j0kn6at2ckm84uhmp0fp96rg607cghy8rqhygrhwkj6uxswdg5p4',
      rewards: '9353060253485558999',
      mid_rewards: '813489540993730134575'
    },
    {
      address: 'erd1qqsnkfedr3dyavw236h35kpe7mkfxy7d0jcufzprx3flqdtpezxq8kk4hg',
      rewards: '9384271496822865575',
      mid_rewards: '806843765722227339005'
    },
    {
      address: 'erd1lu8xvzx34kxygrrgflan80d4l50wk2xw0zcm6940c7dj2aax08qqqqk5w8',
      rewards: '9250314439600075023',
      mid_rewards: '805739553811718313706'
    },
    {
      address: 'erd1guuzurrwn8z4qm4r3cvgvzrxkqqdmgaveuh5k0xnazgusscg59lsrur335',
      rewards: '9813894822247971732',
      mid_rewards: '803249711416996626577'
    },
    {
      address: 'erd1uhregejn7v3pz80r9huadln57tvp5cp9y84lqvvak73y92uzzguszkaz2d',
      rewards: '10009915961299926949',
      mid_rewards: '800035338758945574099'
    },
    {
      address: 'erd1e553hqtwqn6cvx57t4v374mwrl3hq5xzul0ludanl25n52eqyyuqlly57m',
      rewards: '9757974892697698426',
      mid_rewards: '799031741644362898686'
    },
    {
      address: 'erd1lhzu8qxee6zjwfxcunuc2l0l6zx8g93c4lqm6csflcqjjha335vsz7zl3f',
      rewards: '9090330217692505176',
      mid_rewards: '793672145688505501807'
    },
    {
      address: 'erd1jxwee5vha8edmnrz65gxkmxmfkx3cqt7mu8nelntn35tfw3x2zpss6nn8t',
      rewards: '9206337164354984508',
      mid_rewards: '793422403393997898097'
    },
    {
      address: 'erd1shrfqatyvl2vum6ddg4h49tvn8w8xt9g46x90uzq7y49jvq4vykqy3aj9g',
      rewards: '9194009411951862179',
      mid_rewards: '792492536575154084935'
    },
    {
      address: 'erd1cgnh4qvymheuuvytm37vxkyajegqk52fjhdwp3twgp45nl9g932s9qvj8v',
      rewards: '9142655728593113231',
      mid_rewards: '788618992994848410298'
    },
    {
      address: 'erd1lhkt76vau3cvgxwy2pal3ndnxmgszes7qyx2dk5hgnwj5ugtfpcqpqac5j',
      rewards: '8988640355024129659',
      mid_rewards: '786001807575277557946'
    },
    {
      address: 'erd1rdjdzz6jxk622nl23lvvcvjgrnclymasc8rs7lr8axcnfnfmj6ds9mcpuy',
      rewards: '9679369006768196441',
      mid_rewards: '775102598788350238211'
    },
    {
      address: 'erd1vtkkje57ut9muznpkdxfmx0uv9gxzwrhr882ffd7fh82zzafes4q523knd',
      rewards: '8946259316478785470',
      mid_rewards: '773805059279012706943'
    },
    {
      address: 'erd1vpjrhlyhcvlkajw9lecczuw43qaqk4e5hfdalv5vurngqkgzcnrspad3ed',
      rewards: '8742504282100946173',
      mid_rewards: '767436073964840904778'
    },
    {
      address: 'erd1wn7pdv8uty0pfg2luhu9w6hqtwns8pqpd5lznaphv2xejypqry2s695w25',
      rewards: '9905021001827515418',
      mid_rewards: '765123244235319527359'
    },
    {
      address: 'erd15l5egu7x9kzn035v8s8hdzdhg4r66g8lhxmvtfnt39xcdv7vv3psehc68u',
      rewards: '9336940027192451613',
      mid_rewards: '758273612651559859387'
    },
    {
      address: 'erd1qcacdfp0n7e4rzhe0devh94yslzganpc30tjc8n47v2wv6gk700sln7m80',
      rewards: '8569544697226977112',
      mid_rewards: '754389950574613678391'
    },
    {
      address: 'erd199u4n7syqn0zfv3gx8ghqgq8qgef0shvv7rjvwzfkpjjd92qyuqs7pscv5',
      rewards: '8548008073177613221',
      mid_rewards: '752765470179603067954'
    },
    {
      address: 'erd1lkf2jwpex4ht20l46uggdfgm67le5g524mhg3hfd9emlt700ctvqtuu7d4',
      rewards: '8866285732217075323',
      mid_rewards: '749772752662427901851'
    },
    {
      address: 'erd152kf6p68t49exnw8mv96p0czxsz83md7huthlry68hl0wtjrgnps0a6xjs',
      rewards: '8703027374680241884',
      mid_rewards: '746458380617285945747'
    },
    {
      address: 'erd18um8pz7j5rjhdhtwk2xtg6cs2w2pupnagk8rykqzf7n3glq06svs9uaehp',
      rewards: '8442725880674477834',
      mid_rewards: '735824167156758685032'
    },
    {
      address: 'erd1q4gsjqsdeq4rhca6uu3xsauqf6h6ukqwtzcu5sdac6c4t9gul5ps9ke5ac',
      rewards: '9627154876674857449',
      mid_rewards: '735164152795851798870'
    },
    {
      address: 'erd1a0atlknr2q4xcdnnnynqqa5vagyadcrpxxvzxpvre35ptcsen4mskavc3h',
      rewards: '9364831365600076709',
      mid_rewards: '733377421137511104739'
    },
    {
      address: 'erd1wrhx0332vd7xsnjwl06r04xu6qvtyr4tkp3eve5x38x5u59gm0mqrhskw5',
      rewards: '8182445570465391593',
      mid_rewards: '725191551563302703208'
    },
    {
      address: 'erd1thxzy58gtu9h395qu0kn5pz2kaxs6txyyavprk5hurjkajnw30vq9nal72',
      rewards: '8776404649293652063',
      mid_rewards: '724993135914846860941'
    },
    {
      address: 'erd1nxlcz9m2a5hnnqd2kcnwmxd8c4p9a6jrq0cx6k8v7tnnamwk7jfqpk4h6t',
      rewards: '8124393813704512218',
      mid_rewards: '720812780752342729299'
    },
    {
      address: 'erd1af7lmtyzqt2dhcawmfekfm7vt3sukcsgau64hvw3uutqxs7e7dfq7n9z0j',
      rewards: '7855892873616647803',
      mid_rewards: '700560093413096671898'
    },
    {
      address: 'erd10qz35qvdt0mul8p4g7rymv8fgadpf37x63c55hvq2swhtn6eyues5cjwsz',
      rewards: '7850321292300004221',
      mid_rewards: '700139836059978125328'
    },
    {
      address: 'erd16a8hr86gftwu2zps3rnhtgf2rgg759wlhp3r255se28agf4yc3xqtrzz2h',
      rewards: '8629507414176418232',
      mid_rewards: '695912862702933743551'
    },
    {
      address: 'erd1sxmwhc7sycynupysj45rr8fjeajzar4yeph0q58dla9ghy6yjhmqktcrea',
      rewards: '7933336708568047189',
      mid_rewards: '688401584229142263696'
    },
    {
      address: 'erd1raqtkqa0q5vppjc6xnc0vj5xrmryx7r435sdx57x3lcwms3mfgyqx3luwx',
      rewards: '8377495831738516602',
      mid_rewards: '676903946818642064212'
    },
    {
      address: 'erd1yg0dqlcq74qsfrule4jmwl2murlgre6xx2y274hs57vqrsutxxdsgrxns8',
      rewards: '7508770826572280354',
      mid_rewards: '674377115114964520544'
    },
    {
      address: 'erd1hygr9pjsad58en64xvjeu00npqj4rjsg3464zx9ame0m38nc6tlspg228d',
      rewards: '7608970552714655768',
      mid_rewards: '672935054109053460621'
    },
    {
      address: 'erd1p6lgavpc4m937avwn6wm96ksqvtk0sz8eag42mm4ztc9jwy06rksdr9jnh',
      rewards: '7958758929642142548',
      mid_rewards: '672319150308107795668'
    },
    {
      address: 'erd1e78ds3nnxdsr5su6yhwcue5tr2egjm3tus79gzvgj637rajgqszs8ktygr',
      rewards: '8786038603496904314',
      mid_rewards: '671719812932272699939'
    },
    {
      address: 'erd1r5z2vy38xwu3ml2ftr7cmsex3egusj932fwmys9gj3qld8qu5xks2cf566',
      rewards: '7818209651791871403',
      mid_rewards: '670717695508259154088'
    },
    {
      address: 'erd16vnjwjeyr9hurz5t2z99jwllcqms08u7c0vf2www9e4ve7ed6u2qjjtn0r',
      rewards: '7558454638215518864',
      mid_rewards: '669124702377427076032'
    },
    {
      address: 'erd1kv0m0yrq0k9m8382hglh7gx76uvnfmvj6xneetph94vrrw0dqnaqzckfze',
      rewards: '7631344200258634458',
      mid_rewards: '665622670130801501681'
    },
    {
      address: 'erd1esf0ezh8x509ua2y5f2w6pcykwmhkf9csyd5tka85scy577tnaxs59tvqp',
      rewards: '8680021364609903370',
      mid_rewards: '663723066287564642937'
    },
    {
      address: 'erd13lkhvrc207svnqv4wj3rsuma2pkddkyxd77tu6wjfgmfpgw0cvjquzn6jh',
      rewards: '7893175472459904375',
      mid_rewards: '658372272831611637176'
    },
    {
      address: 'erd14dnxnv9guhadwzs8p5hdg3gk7wlf4y4jtsktk56eent92yq74m9q2auy26',
      rewards: '7795799554543535663',
      mid_rewards: '651027330131273437816'
    },
    {
      address: 'erd13d8wukkhsjtn8u576qtxc09jgmxzm5yuj6hgyfdaq8tnx6082urqhyt9uj',
      rewards: '7196463457107166355',
      mid_rewards: '650820164046377806083'
    },
    {
      address: 'erd13lay783jpd7rxh5rrmxenay95gpwuf42ccxvvplgcukwadhf9n0q94nmqr',
      rewards: '7904567320924190091',
      mid_rewards: '650231545596495624040'
    },
    {
      address: 'erd1ac22mscr6zh6jsdd53ln93mnwdtfqh2ah6ssp27yrxy7cucf7gdsjgh5y5',
      rewards: '7055353998523590212',
      mid_rewards: '640176455520186965827'
    },
    {
      address: 'erd13xcdxlrk6f83j2pr7lagjjzg3swmrtq4tzlkzuy0dzm3hm0t8egq92yvll',
      rewards: '6985576720279800075',
      mid_rewards: '634913243409299723400'
    },
    {
      address: 'erd17nqqsmecky8xavxs9cvmc8cx7sms249slm5ex80znwvm3qxjsfqq3f7tzq',
      rewards: '6965669583887473626',
      mid_rewards: '633411673213524692885'
    },
    {
      address: 'erd1rdr9k7gchzyn99h4lf3sdl75kad7yapt58c3rwggyucv25fhnmhsxam8fp',
      rewards: '7084346946274471416',
      mid_rewards: '633363357009803886332'
    },
    {
      address: 'erd1xpk8rzmtw9ze964p8p2zdq8q03l8wj659df38pqwulrw6j9ztfcsemfjny',
      rewards: '7916015306694906810',
      mid_rewards: '633095052727616252387'
    },
    {
      address: 'erd1qvd9x4vzgj9nwjsyy2mxnzwf5u8xevfwaxvvtpeerjhng65hvp8sxh0w0c',
      rewards: '7183780435895064125',
      mid_rewards: '631863499749255884389'
    },
    {
      address: 'erd1ask2ctczezzalj993p4aqardekue6ghx4qmc4aherps2ec45pm4q5txxr5',
      rewards: '7229058950064695631',
      mid_rewards: '626278800978231417095'
    },
    {
      address: 'erd1cflg9mxkqtzwjvmawvq05luy0vx58x9ugtrfpnn4c87ws3kah9qqxg8ehd',
      rewards: '7560616514467132185',
      mid_rewards: '624287769977025565300'
    },
    {
      address: 'erd1eveauzqpdn3rc6scvew4qhse6v3ytc9zkakn8lez5a767tyk8pcsptual2',
      rewards: '7311856677507412660',
      mid_rewards: '623524129153800258336'
    },
    {
      address: 'erd189zr3a9efjmj85zvg0mv4a5g09804f6remlkdr6ha529zwjk2yysf9lv3d',
      rewards: '7235296282416516367',
      mid_rewards: '617749275092441414731'
    },
    {
      address: 'erd1ftj3vcwd7swy5wp7e40la0n2dh0gwhxw4xy0sycxpvkf9gwps4rqrwxyun',
      rewards: '7827899693939857986',
      mid_rewards: '617448603168631098285'
    },
    {
      address: 'erd19g3an9aer6tfpzkmy3y6p85qzwhkgy355ckmhx6mk39csx2uw3wskeme6e',
      rewards: '7588641121161005546',
      mid_rewards: '617401630721761230625'
    },
    {
      address: 'erd12ece9nhsmcg5avxzrafde56fv848mwnywddwuzz80s5rhxeu5sdsr3wtvz',
      rewards: '6830938396805820314',
      mid_rewards: '614249069663916036837'
    },
    {
      address: 'erd1qrr2fr83ykefmhujacw6utxut8cvs62qrespmsyhl094n3entp8s8a3gpn',
      rewards: '7416112994907463250',
      mid_rewards: '613388051711216497048'
    },
    {
      address: 'erd1apr95u0dmmccrc3tt326f46zqmykllmkhjjxzzfcf8gw7pst5zfq0u268g',
      rewards: '7289739143397645724',
      mid_rewards: '612855831445443499356'
    },
    {
      address: 'erd1xqwv5t2aj89x0dxypy3wgqgenepk4664k8e5me5v668qgk8chkqsj22hhg',
      rewards: '7737079924357637102',
      mid_rewards: '610598182470032497900'
    },
    {
      address: 'erd1p8qsq8zxg3vw4l3hehdqqd40czntjwyl6q3zcsh7pp3md8jpz98qdrtn32',
      rewards: '7783160049914914664',
      mid_rewards: '605073948235170407024'
    },
    {
      address: 'erd17lm73s8vfshnm73q2fxtz94crtp86w9zr452u745337vdsnv6gls5a5ra7',
      rewards: '7405197745101508277',
      mid_rewards: '603564728182153874674'
    },
    {
      address: 'erd1hexx2fdr66x2g2rrqz55rrs9jxq95tqzj76mzn3f6zf83rkfyemqsuplpp',
      rewards: '6562216613297850581',
      mid_rewards: '602979724383968322557'
    },
    {
      address: 'erd1r7uyt3d4wulcu6lxtwk0r4j2ffe5gwsmm43sz43judt9g48shd4sudzfaj',
      rewards: '6515477919389393023',
      mid_rewards: '599454283638535720263'
    },
    {
      address: 'erd1tc83fzp0dzcdxgntml34ra72py6m277t8nmcecasqyklcfvfz5pshgrksy',
      rewards: '7465013304579702333',
      mid_rewards: '599076540407978903532'
    },
    {
      address: 'erd1789r297jtj33gsj85en3wpm5t26amdkfed7pqn3eqjjagu5yt24qw6fm5v',
      rewards: '6500806760230008660',
      mid_rewards: '598347656603032252820'
    },
    {
      address: 'erd1qqf0z2dm37da3eww66gnwlngeuqrrxy6g80p9eknrxgrwg4cx2vqtqwdsl',
      rewards: '6469869751623544119',
      mid_rewards: '596014117054480744450'
    },
    {
      address: 'erd1hmfwpvsqn8ktzw3dqd0ltpcyfyasgv8mr9w0qecnmpexyp280y8q47ca9d',
      rewards: '7418881105505261804',
      mid_rewards: '595596846803104525266'
    },
    {
      address: 'erd1ny0f7xvh4thv2zvttye0h6klt9umyv6tjlj8dqgg965pqhffm7gsugq2yk',
      rewards: '6816387917036540189',
      mid_rewards: '595151545322635063491'
    },
    {
      address: 'erd18kvhxf6a7zek9use56v55x7q655la5vmmrtz5zze90s539uf6jeqlvqj5x',
      rewards: '6406170590375808927',
      mid_rewards: '591209369644283844227'
    },
    {
      address: 'erd1ckvas5stadx2jl80n9rr5v8atwm0d85y06dkugzzat8ar84yem8sscgdmv',
      rewards: '6503729897221647950',
      mid_rewards: '589568145140324084128'
    },
    {
      address: 'erd1kwz9g8vcuhusm3tz8js27tnrxj66u2l9r85434kw3rcm4t0ufr2srhjz4q',
      rewards: '6497517730681213308',
      mid_rewards: '589099569251533610959'
    },
    {
      address: 'erd1qfmglt6ntfk2xzgcevhd732eat7p4l8lwljhkmrym22kfmvuskhq9lv20c',
      rewards: '6330512765127126779',
      mid_rewards: '585502595288009883910'
    },
    {
      address: 'erd1ehtxfsvc50ye6hyenx236xa27lpjcmr8e5auh3zxfjal63nem76sjd939r',
      rewards: '6299485824993545036',
      mid_rewards: '583162272317768866375'
    },
    {
      address: 'erd1c0n9we2muaddftjf3nr2kjz49uzatukz5mw7u5r77w7knlm5l9ts2clet9',
      rewards: '6386102808683735968',
      mid_rewards: '580695682176117808846'
    },
    {
      address: 'erd1ujcyw5zleluutmeagputfd4ry6nqztz8c4f56vvk46qhrp7zg8mqaddfx0',
      rewards: '6678637685704132855',
      mid_rewards: '575761219072115710971'
    },
    {
      address: 'erd1ktqtvtkarrevnx8z8p9qv9a6t5zegdevjgph3gf73jqvdmptlr0sr2k8h3',
      rewards: '6312052222262390835',
      mid_rewards: '575110139817910227981'
    },
    {
      address: 'erd15zta5d5jw3lul0wykke46t3r0yqpk2kv7kz0wks4n355kdtfmdrqythzyy',
      rewards: '6407640084861118509',
      mid_rewards: '573320211760322552304'
    },
    {
      address: 'erd1v4jkdq8ewtwcnhrfx60fv0dkj3aywd674g30vdhm0gq2t079a77q3a7yx5',
      rewards: '6640171573066786459',
      mid_rewards: '572859768700487723802'
    },
    {
      address: 'erd12qqs9gca6yhxdnpw85n3gfrhfkyxgtq7h478dvc66ggck78uas6qvdcadl',
      rewards: '6266180546709636727',
      mid_rewards: '571650097173764358726'
    },
    {
      address: 'erd1heup4vls0d4j4s6a6mztf67atral4ew37vdgnrvvw2mwp806t3css3xkf7',
      rewards: '6144968212904614358',
      mid_rewards: '571507203679946018907'
    },
    {
      address: 'erd1w6ewn7uh6p7vg0kcw2m6jv5a5n9c3qfeur58q5g27wjkxy2kc47shp6mwn',
      rewards: '6472967681766147193',
      mid_rewards: '569247790018740886227'
    },
    {
      address: 'erd1stm6w8esw6yv7e2wadqtj0tk0qc439jk23d7uevutynutj67kyvqxue0ns',
      rewards: '6827951878530657495',
      mid_rewards: '569023800356329911286'
    },
    {
      address: 'erd1mkrjv0cvwt56e6jdt24epx8zh3tpxdsv3w4m5knjrajd07qs9j6ql2wmnp',
      rewards: '7156405033308696407',
      mid_rewards: '566798607651722584429'
    },
    {
      address: 'erd1ptkfndm7mvpmxle5u6pkcjk7cmuezp99qwapmza95xwh7a0f004qgjhrnj',
      rewards: '6676920881928877005',
      mid_rewards: '566631722728185906231'
    },
    {
      address: 'erd17l3k9nw0n22ayhc50vdktvfj6fke8z4ge0jg0myj89q7wskt0mwqzyaymp',
      rewards: '6077561362497620729',
      mid_rewards: '566422789951750379131'
    },
    {
      address: 'erd1z42zqdplyuuv7dacez047s0cfffezyke0ujms22z4zm938mlyvfq0rl8gy',
      rewards: '6120905198765226621',
      mid_rewards: '560692160866146561780'
    },
    {
      address: 'erd1zsur4au2gcquvqyx7f3pq00efgn2ql9q3476rrez64cscd3jqpqqwyyq42',
      rewards: '5990813149990209520',
      mid_rewards: '559879481669194088932'
    },
    {
      address: 'erd1lf3vwcyak37w55gdkcc4lfzkq6rey4lu00t6pt3cqw2usplg3p4s83qgm2',
      rewards: '6042809079386692312',
      mid_rewards: '554801469058273158109'
    },
    {
      address: 'erd1x2avtcjdvvgpszwm8fxujlnxmsy6gcch43vk8uzrj3nswud0cjjsas0d08',
      rewards: '6696353189359131916',
      mid_rewards: '550097477174096870519'
    },
    {
      address: 'erd16erh0xz8cr268akzrlsg500r0laml9c78u4097qts8rqm36jphtqhl320z',
      rewards: '5813899533971629366',
      mid_rewards: '546535110695642780587'
    },
    {
      address: 'erd1w453v336hyl6sg0klujhkxrvddxl8zyeya2maqzu5y9vrjr7h4ssszpavl',
      rewards: '5704515695539331021',
      mid_rewards: '538284425692413356540'
    },
    {
      address: 'erd147jw9gfwq7v769dxnpdqukmssndt0rwxntvrtc8g3arm52flepnsml6ycl',
      rewards: '6640286534083248597',
      mid_rewards: '536868440064997090866'
    },
    {
      address: 'erd19zryhju6f0hsh75vk2w9dtff4capm3cfgkrf0jrfurw7wa83900sxpjunc',
      rewards: '5743701456548409367',
      mid_rewards: '532240158233266208370'
    },
    {
      address: 'erd1kwngw6mvdha0a5654fccpyrheg9k2e9jsg29hstu9fydp5g4c3nsjrhx29',
      rewards: '5623577479598180942',
      mid_rewards: '532179358124619830638'
    },
    {
      address: 'erd19dttkywftm5hc2ljew90fegshsssmjnw2rp20um5ck8v8emtsagqpnpn94',
      rewards: '5580332780082524467',
      mid_rewards: '528917464970414740450'
    },
    {
      address: 'erd1rk4f6g2fsj7tnkuwzxh9mg5ze0lkcqcr2spssattrvtr0tjrha2s50xcn8',
      rewards: '6174093979930702510',
      mid_rewards: '528704123560010702215'
    },
    {
      address: 'erd1mwae6y6gzlspnsuucjz3y5l84zx75phegszwkxzcvvk0yn0vmxxqvm95qc',
      rewards: '5561675117312290230',
      mid_rewards: '527510140994405599641'
    },
    {
      address: 'erd1pstvuv5mcemevt9f03lsw45wjfk0702rqrq3vkwmemrpycewme3qn5m430',
      rewards: '6598075571153311171',
      mid_rewards: '524684520357942154191'
    },
    {
      address: 'erd123a2rqt8mwzu8ffyv624mt548acwln25jfqkpr5z3736vjng3fcqxep6qn',
      rewards: '5479153489492591766',
      mid_rewards: '521285638665247757371'
    },
    {
      address: 'erd1ghnu9fzladhc398mz029tahmnqm5fhrwv6al6y59t8m5fy8qzlxs9hn4ea',
      rewards: '5584340933123866708',
      mid_rewards: '520219794900163174632'
    },
    {
      address: 'erd1m68tnjhlgxuzf7jq7q3pu6u7laa7jfput25l094tpq2f4wulzk2qe6lscg',
      rewards: '6493472715696733779',
      mid_rewards: '516794458871896128873'
    },
    {
      address: 'erd1m9k8k87k4uf3l5q0pxa05pjsmcszhzel6vp0j0hes8lrctvgmd2qk9a7sn',
      rewards: '6004496591086383324',
      mid_rewards: '515911606376672250312'
    },
    {
      address: 'erd19u8txrfce0cn8q4qfduqx7faf2ncgpw42tfxmcen0qphspz6z3jsegsncq',
      rewards: '5500005709166301753',
      mid_rewards: '513858495301216054836'
    },
    {
      address: 'erd18mp8tuath2a3x8m2tyxg5use5sead7g89fhhteh6qsrkyl65lejsqruamm',
      rewards: '6326235733952270906',
      mid_rewards: '513179984219697727548'
    },
    {
      address: 'erd1gjcvaa9zkm0yc55fx7umr67u0q4kd7t9qj0tpv93maatfjsq2v3q265adm',
      rewards: '5365676439092425371',
      mid_rewards: '512726207844698796470'
    },
    {
      address: 'erd14j2wvvrvugp04tntdatf429xxj70a96htldjdextwxw37yt60susgzf6kr',
      rewards: '5361863301823130563',
      mid_rewards: '512438587708726897575'
    },
    {
      address: 'erd1qyme4jt5sjuld4e4yx2rlg84rfd7j2tvu5dyt8fvnuual7ca3egs32fyn0',
      rewards: '5353402510270096474',
      mid_rewards: '511800400870684321007'
    },
    {
      address: 'erd1rkeywuk8kxgn0c0dujtld2u2scak9m7uxgm3ve023t8zvpxmrxlsqwg9r7',
      rewards: '5756010837438916557',
      mid_rewards: '506168639312079384516'
    },
    {
      address: 'erd1t2tgpnzvxuh0kl4ewdg9tk2rr6a53z85rar2zrqd7ps7t37dthqqap3qq9',
      rewards: '5278178765894097797',
      mid_rewards: '506126368687273995882'
    },
    {
      address: 'erd19nj6c2p8nnzu2nc6dx36jw9ymypvqamrx87nlkqnjua4a7933x5sqa0x2d',
      rewards: '5821087134985606421',
      mid_rewards: '502077262376779127394'
    },
    {
      address: 'erd15cppx98gmgm28lzwvujeqpc7h5vhcrujqd2jc4evdgake6mthgcq7dc9fd',
      rewards: '5436621286322677076',
      mid_rewards: '500077488211965582610'
    },
    {
      address: 'erd1uuvxx42lq0decgca0td6hpd2exxla794kutsxn9tk3ulaxymptxs9hz4rj',
      rewards: '5777331188672675910',
      mid_rewards: '498776806521322437583'
    },
    {
      address: 'erd1pv5p0mgahc6unw7lsc7yhcheq5weu48fpuj8alx366p3zy6qvdtsjx0fpv',
      rewards: '5158946388027426580',
      mid_rewards: '497132820773220804227'
    },
    {
      address: 'erd1yj7v97shwcjs7jrd3lx6majwscau3u9z85g2qfr8ayc840a9ffusqrycqu',
      rewards: '5261295485832577366',
      mid_rewards: '495852884161540096190'
    },
    {
      address: 'erd14jnv7lgw5zzunph4a0em6aqdj3pkrxg6gthxgvzvzjpzu5jt645s0sawwm',
      rewards: '5141317416412839850',
      mid_rewards: '495803089673933655556'
    },
    {
      address: 'erd1k0a90c6uny3alzlnxj2xnuv0tfyssdk022nytn5yykvx008vnz0sx58a2d',
      rewards: '5363289708658160127',
      mid_rewards: '494546179777637210426'
    },
    {
      address: 'erd1pmtanyegdy06akrj3dlwsnvcg83c29qexh0xtycuhnl6rhnkd8dsqkzpvu',
      rewards: '5714388699540587461',
      mid_rewards: '494029133934668071231'
    },
    {
      address: 'erd1g20heyyk58kp0afm2v27wpjyeetw487kf2tuf9w9t4hfrf7v0t6qf4twqc',
      rewards: '5110360611924194258',
      mid_rewards: '493468056946951240461'
    },
    {
      address: 'erd1t87fw6lh2mrpw82kxs3234nkqny65nwrhen8le7k83stky60qa3qzn9jef',
      rewards: '5931843487103780770',
      mid_rewards: '492431474356635845741'
    },
    {
      address: 'erd16p8dgvdlnx9gmdvwdgdahtc4jm0um7t2rgtcwuzxsfjrrrpwl60swxqxf4',
      rewards: '5005764261308810774',
      mid_rewards: '485578486112874063207'
    },
    {
      address: 'erd1yz5nhheyggfa7lpv6l7lp9zk2kwv0n494nnh84ze9mhzvurc9e4szqnch3',
      rewards: '5194401412234014567',
      mid_rewards: '481807148541408315120'
    },
    {
      address: 'erd1q8nygrj2ak6g9ajs8k5gpfxlavteupsqzv4vvp8jmp464ds0ktzsyls3x6',
      rewards: '6028985188905548578',
      mid_rewards: '481758750430789150313'
    },
    {
      address: 'erd1jzr348wwyr4qjr0naj8rk62c3p00cee5hj5smslm4uj4pp4ntnfsnsmd8y',
      rewards: '5875435590989581183',
      mid_rewards: '479176697881396267779'
    },
    {
      address: 'erd15glxr4jfn6h6ryyhqysyf25j0dsja4a8pgzdzlw0e40ggldjgsvs3xx7fq',
      rewards: '4876165462139779046',
      mid_rewards: '475803012111728201156'
    },
    {
      address: 'erd1n5fgsqfq3rd97wxmlp25v3cf48qafqjvdsf565tv8pz3fhxn2p5qhekhpu',
      rewards: '5464322837214360740',
      mid_rewards: '475166981264905695182'
    },
    {
      address: 'erd1mxnv5n5j8vhrf0uhwd496wcrqrukvfqy0leus9cnuw3nwcysc2vq352mgz',
      rewards: '5184815860070772981',
      mid_rewards: '472084122428826969000'
    },
    {
      address: 'erd1tvg2s00fdry0s2gp56hl39nravt69aksmya93tlrv44d6cmcj4tqnzww2y',
      rewards: '4925624006500373972',
      mid_rewards: '470533607747116195500'
    },
    {
      address: 'erd1yw8c56s2sm4fpsxf47dfu8yz9aqyr57h9hqxmff58erqe9vasnlsnjanj2',
      rewards: '4755834348095663406',
      mid_rewards: '466726587913283534377'
    },
    {
      address: 'erd1sx9pa6jqj4dsz338mrkcf5wm0ev80vcwkw6ml33hcruecyfqwg0qr3aprw',
      rewards: '5327068261808839581',
      mid_rewards: '464814041715944202926'
    },
    {
      address: 'erd19kqtegz0l7yfxvyh00q00kgd0vhtwa8x9tmy46r6ny84xhefpxtshwvvff',
      rewards: '4716767598381873928',
      mid_rewards: '463779832244364670500'
    },
    {
      address: 'erd1fzuuyhmtkkzquled5cfl7k3pmcc2359au40k69kd7mql9afp334spkkv95',
      rewards: '5158739851005232741',
      mid_rewards: '461117241946073674238'
    },
    {
      address: 'erd1ge59yy9z7kscvldtx3njyg5qw64rf5cm0ruqw3sk8fn0x7wsq46q6e3hh4',
      rewards: '4655669999895418206',
      mid_rewards: '459171317432758959093'
    },
    {
      address: 'erd12au8t83mhhycfevllz4nw4gt6cxhs4kq78ma2sxy5s3q4gujhdfq285nts',
      rewards: '4620983481263714500',
      mid_rewards: '456554957071022634622'
    },
    {
      address: 'erd16845ct8kmwmvjkyx4adhkm50p3f9j6d84g828snh3vs9u0xdmzhqhgj2w9',
      rewards: '5216798858195844405',
      mid_rewards: '456496559647805781647'
    },
    {
      address: 'erd178qxg3eng85cetlw9235gms5ry38jhel86439nzzkp7z4um4q35s0ark75',
      rewards: '4609247571148357643',
      mid_rewards: '455669732169649709124'
    },
    {
      address: 'erd1hfqj7gz00ls3vv7u0yv3vpjkms2yt33vk56nj240nycntlh5anfqmdvsu5',
      rewards: '4829978434144560757',
      mid_rewards: '454319182830497170708'
    },
    {
      address: 'erd1allqvsjw0k2fvnx47sntmknkea7r4uutu4yqae7vjzaj0henn6kscdls9e',
      rewards: '5299738527482929513',
      mid_rewards: '453752594317710925427'
    },
    {
      address: 'erd1l3plyrtcr26tq274pzdqc7xt3chqjs7dc2cfu7xs42ehv3qu5f7szz7e3j',
      rewards: '4692691297536483606',
      mid_rewards: '452963787231085573636'
    },
    {
      address: 'erd1u7lcrt5gve8w0mrqhvguj9tu393jsnwyu33zm0y2ad0ca6tlvw3srs4mry',
      rewards: '4525082162618957658',
      mid_rewards: '449321241534316943469'
    },
    {
      address: 'erd1yja2s73la7jtgtly32djrxx2mx0k53wlcadqgy6pxrfmq9y95qqscg86xg',
      rewards: '5588826698809066565',
      mid_rewards: '448558150549382660188'
    },
    {
      address: 'erd1apqndvnz3amy8c7nlawvld0dltqh8jtndshtcvrx9tmrmk3dafwqzrlauk',
      rewards: '5348897898808628452',
      mid_rewards: '448460623708324882835'
    },
    {
      address: 'erd160npj4zak2me5hjsxsfuq9dy2jrmazalz0pww0zsk7psrp5xnecs565jda',
      rewards: '4952209822468128698',
      mid_rewards: '445538942321652412241'
    },
    {
      address: 'erd15pcw7ce9tsk0ahc4ufypeclc8anr8fsv5nhl044k6xv8n6sr8d5s9nt0z9',
      rewards: '4474862025998908884',
      mid_rewards: '445533199955143198164'
    },
    {
      address: 'erd15x0wqy7wfpky2fcu47afpz2dnqgz9l5znqedq3k92ajqhmanepqq7plql2',
      rewards: '5170229275151376498',
      mid_rewards: '443983874721600223340'
    },
    {
      address: 'erd1rqqyqpmvzjs8e0q2v2gccc8hunzsaq2ffx5cq3dnmgn5klpf58fslqn4uu',
      rewards: '4403674164203040715',
      mid_rewards: '440163589305625994722'
    },
    {
      address: 'erd1tlf0fxyw8m7sd6t42nnp5zy6xpr7xp2xrsresm0tps7ku3ca7ahqk4mj90',
      rewards: '4642159100636167664',
      mid_rewards: '440152207338469870663'
    },
    {
      address: 'erd139583gn3cq3kzuwj8z20s63rxr0nmuqgzkfet39vckutyq0lwphqkhnxkd',
      rewards: '5316601852921975136',
      mid_rewards: '437024573691433727022'
    },
    {
      address: 'erd15z6wnl43d6j0pknrtmsru556sz0eadvkrm5dd38sagrftgepp3wsptprvl',
      rewards: '4353061876204307861',
      mid_rewards: '436345968242449161870'
    },
    {
      address: 'erd1jau3eu8m3shmj99z8ae5g040k2xye4pr684mmhnha4n569j477dsgglunw',
      rewards: '5642715156893907507',
      mid_rewards: '434622888991003028901'
    },
    {
      address: 'erd1p8wv49r844yfl5wkkzck0t8h8tlkcu59tzvcfu547uhjdg2en8xq0gxfqk',
      rewards: '4328841672428916711',
      mid_rewards: '434519068812617354004'
    },
    {
      address: 'erd1mfna28g63day249jac2tl24ra4rt4e2ryszwtuqp3rsk4k73gaxsucju36',
      rewards: '4408122953904272647',
      mid_rewards: '431499155903000379470'
    },
    {
      address: 'erd1nxsg8u2968ukvp7hz8dlz5ljdfnfphg66x5csh6x5lh9hw8l843sal8sgu',
      rewards: '5360071765027935922',
      mid_rewards: '431303454347339192381'
    },
    {
      address: 'erd1qsucrdzy3w3ltrdne45x938gguea96ggj490qj4dunrf84x7ek8skcmnge',
      rewards: '4264215457057316070',
      mid_rewards: '429644394878844552809'
    },
    {
      address: 'erd1nhzl2hxv9ytpgj93whlf223maq9q6glawwqe20r2806g3swt7tfsknqxle',
      rewards: '4250011361526788145',
      mid_rewards: '428572997863912587411'
    },
    {
      address: 'erd10mh34v9q9vd422xery4tu2x7m6ckz48essxpal8xexyv0ypkzurse09squ',
      rewards: '4721965074146650750',
      mid_rewards: '428171871287441717013'
    },
    {
      address: 'erd1vzh64fvgtl6ung23ltmngt6ygs7g2sfvea0spt6845nzlg3prmnsxke56j',
      rewards: '4715333479833337557',
      mid_rewards: '427671658490628777174'
    },
    {
      address: 'erd1edzpdlpyyyhnqqugsf8am9wnhcy9vwpjkugn7eyyvu7wynq8jkdqyc5yym',
      rewards: '4475091293661582281',
      mid_rewards: '427550493325839049625'
    },
    {
      address: 'erd1ak2y7f4emw5skk79u4xvkdv55prvggx9364wz5eu6fj2t9hzgedqyxzjg9',
      rewards: '5522473647428747430',
      mid_rewards: '425553223552960310621'
    },
    {
      address: 'erd1m7vhgyrqzu3he2ff8uch0wp8c4ywevawd76rc2sartrjnf3vh29qgq86kz',
      rewards: '4787045521070067587',
      mid_rewards: '424080807334395736649'
    },
    {
      address: 'erd1y69vx20hl9yzrpwxlsun96q7s3q9xfyngwmv7vw5nqm2dyj9ukysrj37zl',
      rewards: '4159687328626718889',
      mid_rewards: '421759969958139690457'
    },
    {
      address: 'erd1venqjldx5wmw0clkakju9r42h98qjwretcakeuj6dgvl7v6v8yssp0sfhm',
      rewards: '5220953640411890841',
      mid_rewards: '420809949631307189517'
    },
    {
      address: 'erd1w34908gj8tvdjdaukhy4n0wrhgu4da0xcqtywa7qv9snsjnz0gdqxlkr8w',
      rewards: '4247461271338625340',
      mid_rewards: '419380647776606227481'
    },
    {
      address: 'erd1pjpnydpay0wac2df0z30xtwgmt42neahccxqfdgputd0yxzhkh3sjvnqu3',
      rewards: '4102733968467040037',
      mid_rewards: '417464049817763309689'
    },
    {
      address: 'erd19kzpas4533kjtyqk2ytyse0awf2ay42t48lhs0rvdeld5fnzfx8s6tc7q2',
      rewards: '4101275857894966288',
      mid_rewards: '417354066375945209494'
    },
    {
      address: 'erd15n9q87nzjtyj0jh9f4x48rcdn70gc2q36j22kw9yft6q969vfsnsjw0d3j',
      rewards: '4812619079461125040',
      mid_rewards: '417009788596347930344'
    },
    {
      address: 'erd1xkdcxwdrfx08tf0rsx87nzsudu06fatzy4spp5yrlf44y5lrpchq3wyy7h',
      rewards: '4093533190875151441',
      mid_rewards: '416770046765909998395'
    },
    {
      address: 'erd1dqggpgp63sqlnqqtuv6lptqjpfvrhw0c5eqznlxjhexq68x9ztqq26krr2',
      rewards: '4089239783499782832',
      mid_rewards: '416446200461443060937'
    },
    {
      address: 'erd134pg5grt7ytunpnde9wvjucmgp3g2fxs25xaecnja09x6xhmvlmqh66v58',
      rewards: '4207101699815072454',
      mid_rewards: '416336376188786191902'
    },
    {
      address: 'erd1yfn6vel3mxecjg5uyqfn7gns6dcutazcksr7wxph8fnsunklgwxs9yx2me',
      rewards: '4436346823289810520',
      mid_rewards: '415628046781304058893'
    },
    {
      address: 'erd1skxpexsygpyg8ascaffc66qct9lw6nla0elpffhvcj4mjup8nmdsz7dpz8',
      rewards: '4432210812363054633',
      mid_rewards: '415316072692483807894'
    },
    {
      address: 'erd1m62vygd7h4dtgvrstmyhxqm2ddpq6rt9vxuz74uxuqypjyt2jpeqky4wwh',
      rewards: '4823790670450306940',
      mid_rewards: '408852447617622864662'
    },
    {
      address: 'erd1rwgdamh7crkmw0fqjwp30hl7fyzqukw23cfsle0vr3v9zhf2qyyqpywq8h',
      rewards: '3957688402511046007',
      mid_rewards: '406523445675783585243'
    },
    {
      address: 'erd1gngr2hg7r6e9u9e3c33hq2hhl09znxvvxk75fndepxacsm4tdsls33zf3q',
      rewards: '3936852215689127252',
      mid_rewards: '404951798377608958202'
    },
    {
      address: 'erd10z2rkck7jh5mqkz4402fv8x4vv5lgxwpzsxkat4sjxewxqrjmvgqj9a9ma',
      rewards: '4143882745655445132',
      mid_rewards: '402567850193718623819'
    },
    {
      address: 'erd15thtg3v0lwy4h7tnwz4wzz7xnpqc2dc25z29t7tzvk60qklz2dssywz8mz',
      rewards: '4381946906989540018',
      mid_rewards: '402524729691427211294'
    },
    {
      address: 'erd1hrqzuj3tgcdvwrkzqa546umkzev2gtx5k8re3ckfrt4fyep5hrvqh5mrnq',
      rewards: '4134455342486717138',
      mid_rewards: '401856753060372329115'
    },
    {
      address: 'erd10la09ud0vcj5m52tucs0u58zju4fa7u5easuk632d6zjp8dhsfrqzrs0j9',
      rewards: '3837764006173689187',
      mid_rewards: '397477699681100983587'
    },
    {
      address: 'erd1ap46alvaeg5vklcrz3ms0ztum6jec2s8x89h5ku4wak453j8l3kswq9xk6',
      rewards: '4431714011973003416',
      mid_rewards: '397278599665512542020'
    },
    {
      address: 'erd139gqtc7yy746lvmuudpgmmdydm0l8vpp24ztsz2utagwhgyq3z5q2xrhy7',
      rewards: '3790338578943347550',
      mid_rewards: '393900459507148657124'
    },
    {
      address: 'erd1as0xssx822ts6xltad6l0yjgs54v6qq5t6200pxc36g0r0tm45vqslkaft',
      rewards: '3889196340425914963',
      mid_rewards: '392357175799125212527'
    },
    {
      address: 'erd1d9qvkx7l6lmcljmn5vnunqaecky4qrlnzcepaw33yjy97uvj9cls5wtysf',
      rewards: '3882085912244043990',
      mid_rewards: '391820845167402015429'
    },
    {
      address: 'erd19m33e0khj66gmzjw7sx38v8n64sv8gsvw7duc2r2a3f9y9dk5zjsxq87gx',
      rewards: '3750679000336362645',
      mid_rewards: '390908987502355403747'
    },
    {
      address: 'erd1s7pg34ftdmdqr4y8000fc2fulx7h3t7lfp0u5nrdrcsjfx9hswvqv7vn7v',
      rewards: '4204857392803033826',
      mid_rewards: '389167090940871522699'
    },
    {
      address: 'erd1yfl4scasrkgvr3x64dg0avpzg5as000szvqxxhlxyjfkz2xthcgsar4xa2',
      rewards: '3719743819329785703',
      mid_rewards: '388575585807358868672'
    },
    {
      address: 'erd1guqlmn9m49g546qrssr4806vejklmumj925jajs5uvxu4rnr6jksepqau8',
      rewards: '4308045871740456497',
      mid_rewards: '387950467789563809353'
    },
    {
      address: 'erd1429yfjxwt4mvydtctanaxwg72vl7slu7tdz9mklwryflsqvyl0dssxkcn0',
      rewards: '4184407865619098453',
      mid_rewards: '387624608891623848826'
    },
    {
      address: 'erd1ww5mqmxq8v9w2x2f5g850tja04euf0ujql72g0sl7rcp2evgw3ps7k8qe3',
      rewards: '5000053626983919931',
      mid_rewards: '386147740166685072241'
    },
    {
      address: 'erd1x0g78vsyps7h5w5d74gahjx4rs67k84q7v89csyv4jmtylvwvl8say5ycz',
      rewards: '3681829643019153087',
      mid_rewards: '385715767296879852485'
    },
    {
      address: 'erd18zcht4j2t8jpyl03lt66d0djw9y0c8shsdd6xr24fgls2g7ad54suvltg3',
      rewards: '3680462727923672033',
      mid_rewards: '385612662614866395752'
    },
    {
      address: 'erd1xhra6j4x2safj28e89m54ttzqwv2ryeh3npxkzx9p3lkpauvkassjp9qf9',
      rewards: '3679944167485504939',
      mid_rewards: '385573548254904513190'
    },
    {
      address: 'erd1yca5ehtws03w5huap2l55yly967jxp7hy3uwgzz3ssjae3w42clqllynxz',
      rewards: '3791941991283985543',
      mid_rewards: '385021402878148413583'
    },
    {
      address: 'erd1rhkqxmzhv3wr6jaeaefhdz90ya4a7q0v2x6phn463788h9hj60wqzp475g',
      rewards: '4383922433396260636',
      mid_rewards: '384673741157206973973'
    },
    {
      address: 'erd1rfaungpfymjx3srvg380v9nvx7cghc0xv6ummhvgjd9vvv479dqqmv47rs',
      rewards: '3664928133548811310',
      mid_rewards: '384440907749825292989'
    },
    {
      address: 'erd1q5ehg4wkvmxyjcmtvxt7fh5l8spn4r3tm3sgw2j2y3skssncpuksdpxz8z',
      rewards: '4239887772257896511',
      mid_rewards: '382809388290900609359'
    },
    {
      address: 'erd1vjdfehkdywpqx76mkxlwkzyxvlq5wptjvltytt6d33eaf5j0qe9svcqmsg',
      rewards: '3614570965201835890',
      mid_rewards: '380642530040282342539'
    },
    {
      address: 'erd1lm25msa3tqyu7m5m983xhl743hdfu2up4vn05r3e3254uugkypnq2kfda7',
      rewards: '3850335814720405461',
      mid_rewards: '380425975347108657051'
    },
    {
      address: 'erd1ymq0d2ttkmsjxy5gftrlqyn2ank6lurs3f7pjdc9psszpfm2n74st6m63c',
      rewards: '3843418777933557980',
      mid_rewards: '379904231984451369770'
    },
    {
      address: 'erd106getyy4hr72kngavk42w94tppfaq8p9gk5tcs9ghd3nw9cwgjkqd5s3jn',
      rewards: '4186983770827661220',
      mid_rewards: '378818906173367016314'
    },
    {
      address: 'erd1aek2ufshw8jyt70dcgtvnhaxc44rghkwrgz7v4zyu5umr36ckkmqy7y8qj',
      rewards: '3588855163291540489',
      mid_rewards: '378702819529038814991'
    },
    {
      address: 'erd13jsz4vxgwvmntu3g0dv6ktrjmraga5e5fzj0gnrn4vzs5cafc8vsf4zjf9',
      rewards: '3564457063550002557',
      mid_rewards: '376862501630801999413'
    },
    {
      address: 'erd1a8gr7dwzlc55p0lk83k97t2gsmh6ugdexz82f6k456jw5jfkpnuq8l25xa',
      rewards: '3550728788177767035',
      mid_rewards: '375826995130415171570'
    },
    {
      address: 'erd1hw3addge5w9q5p33cuva94uctaclt588lm7exg3j8mqljme56e6qhvxkqt',
      rewards: '4501892815669336545',
      mid_rewards: '375572098334973625518'
    },
    {
      address: 'erd1qm6hw5qm5htjvnm7dtu8as9h3d6dkgllf9akdavwcs20jtkjg3es05aqcz',
      rewards: '3542780135569260134',
      mid_rewards: '375227438287166529122'
    },
    {
      address: 'erd1m39zr94ycj6mwu9mfpgsexrey2a8ngj8atlu7vx4mp4yy3uua87sn2gavp',
      rewards: '4573202909738119966',
      mid_rewards: '371950928810705619487'
    },
    {
      address: 'erd1qs8wukyx7e7rwgvyfx5klwqn3ez3dd48x2cnxy4qj4xzr8479d8suh4x2f',
      rewards: '3404869579184163666',
      mid_rewards: '364825018920087887734'
    },
    {
      address: 'erd1ehdgmua3ma6jrydzdtgu6rp2jkvuwtht9qwt9j8ee6rwut0sy57s80fefl',
      rewards: '4087865850796275441',
      mid_rewards: '362342566450105169520'
    },
    {
      address: 'erd1zrtf6z38wxt8cjn4rluqfemweqfyvtx3p6hfdgvzrses2dr2zghsyhpzqy',
      rewards: '4203152894555559233',
      mid_rewards: '362038522787385359048'
    },
    {
      address: 'erd15t7kdfedj49pvpw8wdgjmdzdpyy9v30nn9xwsy8kmh70v2sll4us697jq5',
      rewards: '3342086500272284070',
      mid_rewards: '360089370445332398801'
    },
    {
      address: 'erd1gs00u8lmdfycfnp3564jg8pq0tmtacmksvpzj92284fqpfmqfw4qgfnug9',
      rewards: '4400861560083850359',
      mid_rewards: '358951438123524370450'
    },
    {
      address: 'erd14548ptn5828w9fnjnsfpnm9pgt55fvagw0vc3arp6qdltkd7f7vsyp836r',
      rewards: '3311588155467234217',
      mid_rewards: '357788918754179786514'
    },
    {
      address: 'erd1uz0xee0rqa38wyprrmmlsl9rw9a0262hn0rwfyt2gl55tcmygveswa9t64',
      rewards: '3307478312553369051',
      mid_rewards: '357478918485574808148'
    },
    {
      address: 'erd1j9uyf8kpzazgfkfld0xesm9j7vasgyey0d97v7qc4hd9rg3x6lsqkh7ppv',
      rewards: '3770426055247398521',
      mid_rewards: '356398482953854602668'
    },
    {
      address: 'erd1n6ynhhv3zxfdrzpvjrzmksyd8vnrdxkg4pptjlytn9ygj8nvyhmqcdjang',
      rewards: '3277900820200637597',
      mid_rewards: '355247925533733423492'
    },
    {
      address: 'erd1mpycud6g6an8j0y25th8dj8yzxvmqgv78gr3hfxfen4jl7zcjf8samn0n5',
      rewards: '3275387371510147726',
      mid_rewards: '355058339268392710322'
    },
    {
      address: 'erd1tev8xfyj288cku6q2c4d32t458xznjycargw0azp06cd8clnjdvsu8syc9',
      rewards: '4466802201843711937',
      mid_rewards: '354925257582311690543'
    },
    {
      address: 'erd192zzzcmu9dkddw8cu0rnvgfzgn0qwvazye653ve6l8pj9u7xapgsgn0gex',
      rewards: '3866671578038015325',
      mid_rewards: '354658161375251471595'
    },
    {
      address: 'erd1rzavtmhejs7ffwhln4xvdtxw6mjvh35quj884ghkcxacm88xfwxqlqz6lw',
      rewards: '3857273671219314238',
      mid_rewards: '353949289114393699361'
    },
    {
      address: 'erd1qekpwr5n42e8d0hzexehglkef0s5hj8swsm50r2z3d44xjjx674qeesqkx',
      rewards: '3259829916787941541',
      mid_rewards: '353884860076177547391'
    },
    {
      address: 'erd1ekean2ctzdgjjk76fusc5u3s8em34p4uz034yglpuk38xdxd0u4qjqzjxr',
      rewards: '4207172089974476544',
      mid_rewards: '353341685629750175918'
    },
    {
      address: 'erd1jxhrvhc79vfa03yn2pg7t4ffryn529xnacatu4zwr3jumfn2wr7sc3eyq0',
      rewards: '3604493062846220474',
      mid_rewards: '352882366573528970892'
    },
    {
      address: 'erd1h3yv2lcmsqa8wlfjpacdnxa0fnc43mldtzyh25hnnhx905th5ynqdeeqjz',
      rewards: '3357827960691236494',
      mid_rewards: '352276728955227500602'
    },
    {
      address: 'erd1y3g3ahj5ymd5u0m2t3qtkh9adgfgu5qzkhwmyftztzp2dju755qqgtuyxp',
      rewards: '3227908598331847324',
      mid_rewards: '351477075276853484504'
    },
    {
      address: 'erd159zd3vjy8qnelvgadfhdlflgt58c7a8j8e0zhp8cl7d9k3kgcevsst0etf',
      rewards: '3912768522328276930',
      mid_rewards: '349135195756210452413'
    },
    {
      address: 'erd1nupldq572uj07h46gjas2y7peq835gape9s6yjht5k0d7e23mfws7xdjqx',
      rewards: '3178359226531277877',
      mid_rewards: '347739628642198872495'
    },
    {
      address: 'erd1p3d6uuezwglha2kaqay89pqdqua0gcrur2ky6nx6v7n4cxdp8e5qkufa9e',
      rewards: '3530958925401585601',
      mid_rewards: '347335779310408072770'
    },
    {
      address: 'erd1catsfgfgqzuzdnuz3jf06hs5re7pgsfkeu83j3jxgu0gktlkm4dsqu5scx',
      rewards: '3167292208654431773',
      mid_rewards: '346904857438923888840'
    },
    {
      address: 'erd12vke3nl643jwhgj6mete3z0duzulr26u3elhuq462pwwf4vtupvscj8tlw',
      rewards: '3509837514028721983',
      mid_rewards: '345742617884015224807'
    },
    {
      address: 'erd15vv3gmaj0znvevsqqxtvctl5hhszhujlqc0vhm62fglm7hx3p4rqnm0h9a',
      rewards: '3151238444515927444',
      mid_rewards: '345693942253268551248'
    },
    {
      address: 'erd19ghj6kdvtq2pm0kwp3fs48m400x8j5zv4z377jzrpzdlywtwn66q08jxx0',
      rewards: '3141699282044949167',
      mid_rewards: '344974415256678624716'
    },
    {
      address: 'erd1exaqpvtg5dkmmal0gj7wkgtdkfeev7lqahug52jl2lf7vkkufd6spms46s',
      rewards: '3132821056037716838',
      mid_rewards: '344304741864128122642'
    },
    {
      address: 'erd1vy8qm0e487amhguvphdwhgnkhpzx4eqn04uqaehwq56tcte6s4zspnv6f6',
      rewards: '4414296532919607917',
      mid_rewards: '341964821183430311510'
    },
    {
      address: 'erd10687rzngz02nrr43g2rql5kwemzuwpk7wtzw9fgzqvnc8p6pffhqtetm0c',
      rewards: '3695224063732941805',
      mid_rewards: '341726091561360685803'
    },
    {
      address: 'erd1zgrapdmpr7ffkqw4v782trug583wjgf3av8yssrvlxp6ehnrug5qgsd4x0',
      rewards: '3914562296877843682',
      mid_rewards: '340270497908588705216'
    },
    {
      address: 'erd1wva6qvpkjqh29dvzy3s8nv3qnvkqk37lj0jevn7rw8mpejyx2y4q727ysz',
      rewards: '4014317722294538124',
      mid_rewards: '338794923859189334775'
    },
    {
      address: 'erd1e8p60ta2px29jqx40k9ukzac3px6gw5xztdal2szxaptwd778qfqve8fgg',
      rewards: '4366713506834028639',
      mid_rewards: '338375693526554809592'
    },
    {
      address: 'erd1qyh8w39stl52jxduut9q0d0tnp5ees8mxntzxwq2rezsk4d0405syed230',
      rewards: '3049747968320224861',
      mid_rewards: '338038643610254002641'
    },
    {
      address: 'erd1gqz95sv3h9lr4xpyg04js5jzqeu29c9v70ydneezm2g62aa8n96qgpvue0',
      rewards: '3641535222280103515',
      mid_rewards: '337676409950581729004'
    },
    {
      address: 'erd1vuywpn6fhn87lj4w8m5fzhn88kqehumrk0d0cgr5c9c73wj724ssuw89ay',
      rewards: '3977421736241886245',
      mid_rewards: '336011906155962621285'
    },
    {
      address: 'erd1cjnz5qecchsqzyhvt35f6vzhfr9865cy4ueerjc9eq4uvl9c7sqs3mlw5j',
      rewards: '3018138311574663360',
      mid_rewards: '335654367060759412114'
    },
    {
      address: 'erd1kvrgs8fcsxlsnag8268khuw5mplczvt68jgphfs5se3sfzwghyhsx2hvny',
      rewards: '3234045353709417020',
      mid_rewards: '333939962996720255109'
    },
    {
      address: 'erd1lq99vcpggrvhrp30jdwjw6d77zmf6kuuqrwtz9hn2h4az29lhwnsu49kwy',
      rewards: '2987788342847105812',
      mid_rewards: '333365107190034288962'
    },
    {
      address: 'erd1mggahlsyulhgt7wt2ym3u96xn8kk64t4n9ar5y8h4y88ugqtm6rqyj6yy8',
      rewards: '2981487446146524257',
      mid_rewards: '332889838497149988038'
    },
    {
      address: 'erd1c5hnqfdt347xtumt2hw9llcn9sgqzkv4au0wqe092e6ltxp4fn2qgaf6jw',
      rewards: '4284582620455652925',
      mid_rewards: '332180664331602778205'
    },
    {
      address: 'erd10h5hzjgepn38hzdu6xg98fcppuz60gkfxvxv2shkkacguhwsr88spum650',
      rewards: '4040704549192872198',
      mid_rewards: '331785248939138362387'
    },
    {
      address: 'erd15zzz4dkf7dsqn4z052pnltks5z3cyfcksu4g327n7adkrn2zqjcsal9zja',
      rewards: '3084526150912379049',
      mid_rewards: '331661918068941619442'
    },
    {
      address: 'erd188xfpqt5gu5llvue3fm8m9u4z3m72s9444v2ywptauk6sucn94yq07dxt2',
      rewards: '2964097382864065825',
      mid_rewards: '331578127952099080802'
    },
    {
      address: 'erd1mvst5dv3xnw0ecu342xhmsxsslw02t9su7w95hnvdalxqaachwmqle9vxd',
      rewards: '3559162984008904460',
      mid_rewards: '331463175886691485372'
    },
    {
      address: 'erd1jv32ksg2m67kzzfy5xkfqqesjjmu5q8qes6spg9hfparag3w4jsslck8ez',
      rewards: '3070685435234623317',
      mid_rewards: '330617930338093233747'
    },
    {
      address: 'erd17fvxhgmt5pt2x2vvtnvuu2690gg3wduzpt30v747zwxply02g6kqheyffh',
      rewards: '3887232530652885343',
      mid_rewards: '329209048104250440374'
    },
    {
      address: 'erd1zkeme22n9jscycschetc9a8jnxecwp0p0lrya87ldpvcphf4hepqnlm7kc',
      rewards: '2928601796584131343',
      mid_rewards: '328900740637866594037'
    },
    {
      address: 'erd16japrxqpycwptrcjzzcsu6rfcf8ghka2t3anjp37srw85yedjzfq9z9vhu',
      rewards: '3863295240698853704',
      mid_rewards: '327403488507217990592'
    },
    {
      address: 'erd17n6yu97gmp08fs5fv0lurmgrdrjasjtgnujxphz2caznqg2q7z2skqen4a',
      rewards: '2900092881320474670',
      mid_rewards: '326750349108410662583'
    },
    {
      address: 'erd1h50qd59lfg3z33l8nfh3fdpq7e3tudyyg65fsnspzk7y7m253yhqa64grq',
      rewards: '3122590831832214623',
      mid_rewards: '325533088952311045076'
    },
    {
      address: 'erd1n3jn29ndm6994tkfr4r34w57sx5mtd88sxyxeq28mudk4nynzkdquntwtp',
      rewards: '3361049519209275447',
      mid_rewards: '325519727051955120659'
    },
    {
      address: 'erd13tecy403m48eywml8jqpqvw6pyvsue4l4agqveunfn655dwne3lsmg2tst',
      rewards: '3122109922365210847',
      mid_rewards: '325496814557627273335'
    },
    {
      address: 'erd1v6lkdguzda27keky06xr0g33fgsmyaryxyvjr8v2dlnxtprmulhsxq5egh',
      rewards: '3002132491007173645',
      mid_rewards: '325447068198210310839'
    },
    {
      address: 'erd1qefhh64lzmy8a6us6kw7q8lej8gp9wmz3688j7mvjg8djacvm9zqxcv8qx',
      rewards: '3832406404587424633',
      mid_rewards: '325073582549222945427'
    },
    {
      address: 'erd19ptt85x9da7q5rsq7y7qtdaq9pkxg0uxndzd94h9fxp0x47qnhssdp2lzw',
      rewards: '3951089042669863449',
      mid_rewards: '325025664284556762746'
    },
    {
      address: 'erd1aztvz0z90yfr3grevyzssxjrf62fc299mk5uq5tc5s22mjlcssuqg5t43g',
      rewards: '3229284994078432219',
      mid_rewards: '324580895072424889067'
    },
    {
      address: 'erd1yaa3kzk6f9e6xuzm0xlz3jxl9pkq5e60vhufdmxgec9an84rk43sstc49d',
      rewards: '3099161777594178395',
      mid_rewards: '323765864934466230847'
    },
    {
      address: 'erd1yz4a0lsttn8j0tqvsqz6gjqx8kmgtaz9t9u2pn6r8xdl9ldshgrqnj59rw',
      rewards: '2856184237626742120',
      mid_rewards: '323438375482066863449'
    },
    {
      address: 'erd1ptrdyx7rna5vrv9uexchgq4a6eyxdda6l5pgrlh5ahdvq8zngqjssduaek',
      rewards: '2968215274378133305',
      mid_rewards: '322888735316468277781'
    },
    {
      address: 'erd1zlwa0d4jd8ah8s24l6c3zxv4rq4qju0mqlvz9pfvex83ey9l09sqzsxg40',
      rewards: '3682397653783785177',
      mid_rewards: '322758611632611620534'
    },
    {
      address: 'erd1n3u9hfxf5fxz07ppu397qrqsf94j2pehwch3gpj2jwgagxzd7haq4c44uf',
      rewards: '3799790672360511261',
      mid_rewards: '322613418994800799885'
    },
    {
      address: 'erd1n9kr3edm3wpxej49jr7gzh9lzpslzcfcdsyqnr8qpw8d2mfgwmtqa4j2a5',
      rewards: '3062518876971721050',
      mid_rewards: '321001937146106002206'
    },
    {
      address: 'erd1fcaxhyyz9qzdumaws5w2k060xccy838uuyex2ukpnrmpqapqjqtqayr2t6',
      rewards: '3408279646719223438',
      mid_rewards: '320082236014265207284'
    },
    {
      address: 'erd1me68mfg6mux7r97nqzvqk3s22jhg770npdnfuvwwjx2r4537rfqsysgpre',
      rewards: '2810336211429622173',
      mid_rewards: '319980116678995355289'
    },
    {
      address: 'erd1ftyahfll7zky6q8m8g2vg97up2ajcuccfnladk0h933rs0eql9zsfd5ue3',
      rewards: '3522989632162171138',
      mid_rewards: '319734665570397285519'
    },
    {
      address: 'erd1drj8knu39uhrfmvp8hu3rn8t9es0x5kwgaywqke0sg5ap8yg7f3st2d8eu',
      rewards: '3267868371654316462',
      mid_rewards: '318491190590499237828'
    },
    {
      address: 'erd1l7xucshy0vu6rahru4qpazwcr92xd2u2wyjazc6tec27qf87pausnyn630',
      rewards: '3499619729009360977',
      mid_rewards: '317971903244323340351'
    },
    {
      address: 'erd1yywsj3y7rmzxuleu66encched7l5s5czsg0k6mpgmfl0qjdq0zfquayukk',
      rewards: '3136040838375101428',
      mid_rewards: '317547605985788694294'
    },
    {
      address: 'erd1sdp4tfv4j9h2eh0rcc6tu4yakwlz2hgxp775438ptxgy0t7lfpxqgvaw4z',
      rewards: '3015067118764252865',
      mid_rewards: '317422710859751587662'
    },
    {
      address: 'erd1qnzwyk35c8dnwhgte73yptffayc0ctxf2syg2a535yxjuy4ypxasx5d5w8',
      rewards: '3609788582893974425',
      mid_rewards: '317281800973240100584'
    },
    {
      address: 'erd1e4fhtp4lwu4uj03t64gnqkn5axq6gmy4g9t8xuajpvscu5sqmynsch6n85',
      rewards: '3960845975280824100',
      mid_rewards: '316761617408203985969'
    },
    {
      address: 'erd1h3lynmp434uvh5lehw9psvml4ql448p7tlqguudedfq78jlcncwqgkehqz',
      rewards: '3243967509153495578',
      mid_rewards: '316688378670328556251'
    },
    {
      address: 'erd1sfzyncv0jpd64ptljnya77lmqk5jyrl94qkq9ga96crgrz5pdsxqmu973f',
      rewards: '4064398059567996321',
      mid_rewards: '315572420549932509483'
    },
    {
      address: 'erd1rh7e38srxrvaz3hejq5g7zrj2l7z4kq6lwzel2mrtxp6fq768lmshkgr4e',
      rewards: '3455903569114074587',
      mid_rewards: '314674448428180074772'
    },
    {
      address: 'erd1aqjskylsr94ldeacv6zuu7cwkwgkmxdaumth5v7pkfs8de4vt4nqnzqm4m',
      rewards: '3208291733920211593',
      mid_rewards: '313997399930557748186'
    },
    {
      address: 'erd12egsf8d58yqylqvhtpj2azzcpx48cl2sk9jrarcv93n8lma7yr7sp6f6a8',
      rewards: '3202743297147408109',
      mid_rewards: '313578888341196488974'
    },
    {
      address: 'erd1syhgp54awwgzhuv2mtsr5mru59c4xj0xc37ems96skda453xc6sq8kxxeq',
      rewards: '2928200511472763976',
      mid_rewards: '310870472207924567391'
    },
    {
      address: 'erd13gq7s9phwcj6ps3w6wl3wdu3yejpxyqqk2hpy628vshgnvr8q0fsuxwkmx',
      rewards: '3035712821420658175',
      mid_rewards: '309979990177516319066'
    },
    {
      address: 'erd12cu23prwq84u8xdtly4pj64mysmmj2zkat3wrfxfzs4luwc6r2jqt36p22',
      rewards: '2888082557165234557',
      mid_rewards: '307844425502037165014'
    },
    {
      address: 'erd167nnc27jdlfzgdslvl7g9fx26curuge87hsthkjhajsyye4e47qsmkj0gv',
      rewards: '3337284721389485489',
      mid_rewards: '305727178319101145755'
    },
    {
      address: 'erd1gp2gvd3ghyfw4y3zlazlghhhrc5t8sdl6pd7cvm0swcp53awusqq43dfgv',
      rewards: '2856180769950322145',
      mid_rewards: '305438113919607140039'
    },
    {
      address: 'erd1g80glttpke74msnnrtzreu6ukudplrymqsxz85kqch5yfk0klp4qzp5auk',
      rewards: '2853151029489660900',
      mid_rewards: '305209584417070739596'
    },
    {
      address: 'erd1yl053dyqar504zlflpgdqkew0yxyxvf30x5lzgun203mdy7wh8hqpm4a5z',
      rewards: '3679967394108002503',
      mid_rewards: '304575300209751434499'
    },
    {
      address: 'erd1ra2hf0snq7f9ar8y7zphzc0j5kx7y38sq6upzre4awjd764k3j8slm9fy2',
      rewards: '2598065249448650767',
      mid_rewards: '303968785684046977965'
    },
    {
      address: 'erd10e7tea0xzgdtmu4e7sxvwjseukh7lm5zrmfjeawdmsz5vmw5p4jqgpprmq',
      rewards: '3186752195617553327',
      mid_rewards: '303372699717095928488'
    },
    {
      address: 'erd19xf9657j7a4yqmyuh36gxs95p4e3aks55aw6xt8v80qz7mth6pfses4gsl',
      rewards: '2817515852501341179',
      mid_rewards: '302521667951724424400'
    },
    {
      address: 'erd1trwl6fqqr7yaxft0cd60ha5n8gefycac593xwy35v6k2jlphf0cq5swu3k',
      rewards: '3172156229222457458',
      mid_rewards: '302271744376986935848'
    },
    {
      address: 'erd1z4m203sl8yjkyughgpdq0jy8zm9uhnleu7kcy695x5582nqxeevqrttqy3',
      rewards: '2554052058178224893',
      mid_rewards: '300648926165824540157'
    },
    {
      address: 'erd1jcu76qlrcndxafrlr83xetss7sqedsm8rk9jxjtucv0j43pll8fqcxe6ax',
      rewards: '3027534043512461597',
      mid_rewards: '300363075273093141548'
    },
    {
      address: 'erd1z4mdkrt5watm82vjs0x0jp6tnt5dr8qs85zjjmjx7ld8ngpxjnjs53r9s5',
      rewards: '2546002992223633067',
      mid_rewards: '300041795270498910553'
    },
    {
      address: 'erd1ku0rdcme77hl0ahknw37dt2tpdwtgfqx6ws2lrh425cy2pac2vvsy5mmfd',
      rewards: '2654053657165480657',
      mid_rewards: '299191920678435167766'
    },
    {
      address: 'erd1qnwqm35ft9a4tjjpmlqa4kkw87g3mm9nz32m4p9czke3wy6zm0es6z2cdv',
      rewards: '3002733570969361681',
      mid_rewards: '298492406901814463871'
    },
    {
      address: 'erd1gkrx95kxfegc2lewzdhwdz0y3zxqtu8lvu7kfnvjg5y2k8r3mk2q9jj42t',
      rewards: '3216493470821024610',
      mid_rewards: '296616046602843386956'
    },
    {
      address: 'erd1kfwjchd3cycj093rat4r080pl47dmpue250ysnhxgw8593vulkuspsy338',
      rewards: '2737112573507244028',
      mid_rewards: '296456950003307756090'
    },
    {
      address: 'erd1w4dzm4jlmvtzvmvcey2v9xjhckcgf2py8qy2e357w0q50gtep2vssrmhay',
      rewards: '2973791104982458228',
      mid_rewards: '296309313187998404388'
    },
    {
      address: 'erd198snh08f4g2276pw0g96ymunqsqalzp4u5mmq0sew9dsndgxfa8q9klun9',
      rewards: '3085738372235383538',
      mid_rewards: '295753354394761347003'
    },
    {
      address: 'erd1wjsqysuecpsecsan87cfgyles5drg3w6e8yhlecjq7r4x4renvuq63vgcn',
      rewards: '2477900034350931052',
      mid_rewards: '294904875033935391565'
    },
    {
      address: 'erd12kzwpmz0nkyv6c28r9f6ek7yv2asvlev5acpkncw72gkfqq9gecqpkmhsg',
      rewards: '3189999498592334552',
      mid_rewards: '294617639685732635190'
    },
    {
      address: 'erd1leehlmwzjypyr2zgt7hn2c8673dxkpr3ff4ly8p0vxkm93epf7gsjw4pv3',
      rewards: '3658884575409975044',
      mid_rewards: '293985049780157279845'
    },
    {
      address: 'erd1z3z0cgxsvkjukh9mevx5awgmacv4u76dnj7020pz3mf670exdmhsy44ky3',
      rewards: '3178628037909242292',
      mid_rewards: '293759904745475693971'
    },
    {
      address: 'erd12fx7tr7u8qljln6zfzcyzmedmy0h7hysk7yn7us32tz2wx8p0ahqvtp8ah',
      rewards: '3533077422235749553',
      mid_rewards: '293495574855248492260'
    },
    {
      address: 'erd1j5jx48fut9gvj9sss7da4wyey3rs89h29gjw6wm06x4gtex6mgcqkren6x',
      rewards: '2441826763260994576',
      mid_rewards: '292183913682927564122'
    },
    {
      address: 'erd14ae0z9uu64e4hk9da0qhmes2rcvcu9ry55qv0e0vyj8jaehjaktsltepm3',
      rewards: '3751745385106565537',
      mid_rewards: '291989423560892798290'
    },
    {
      address: 'erd18kvnkflx42g5mnfkydpvj2armcjnj8zvze66cl8n8ecv6rq6zn9qffrzxj',
      rewards: '2676478132519017971',
      mid_rewards: '291883370577765882066'
    },
    {
      address: 'erd1s6hzt48g0nu2f8qcl76h29alan37nht2d36krac960pvev94yuksa66jzy',
      rewards: '3263997166201810087',
      mid_rewards: '291199190444689916850'
    },
    {
      address: 'erd10x4zykvnayynajvvt9a5urlmp0w8y4qvngtehqujk75guvjruxsskaqhma',
      rewards: '2545996216472282162',
      mid_rewards: '291041284184118529737'
    },
    {
      address: 'erd1hmzqex8gkezed0jv8k4gmwy9qdfn7p80c3u39vjthc3mfsydqpnqjmxt0e',
      rewards: '2540333841286190964',
      mid_rewards: '290614178363915878525'
    },
    {
      address: 'erd1a9xlfuxcns592s7xm4gx9jnhzfp8eh658ac0sxxz39vdfc37s7gq66xh7q',
      rewards: '3612684417241357383',
      mid_rewards: '290500230106503487129'
    },
    {
      address: 'erd162uhm0qxsakqvddgzumufkdv27jyarkqv0atg86pnhyesv29495qhh04hw',
      rewards: '3355472050678583886',
      mid_rewards: '289099025633704534260'
    },
    {
      address: 'erd1ujw7mk04xjlhwrfuryvm70azmfrvqflwvwj6al7248vzk6ltejtqnyx26w',
      rewards: '2515026270935975703',
      mid_rewards: '288705260244481519921'
    },
    {
      address: 'erd1suyzjm34rn4n5967th497yfakfpkqjxtrfr02vgjrvha2q3g8yzq60qj09',
      rewards: '3465380324463586323',
      mid_rewards: '288389268134291276714'
    },
    {
      address: 'erd1e3s4wjur2e6ela0n72jxqvzvw4scnz664sus4qgzzmj3k0sr9zes9j6gd4',
      rewards: '2501989488020232327',
      mid_rewards: '287721912148136777640'
    },
    {
      address: 'erd1yf8qwndddxgf2qgkqz5kmmwax4amhpxr5wgcjqqz8hs7ulrm20sqpagv4h',
      rewards: '2501749333175168893',
      mid_rewards: '287703797571001654084'
    },
    {
      address: 'erd177apzqsh783x7p3p29xf6sac8h7n57gcl4wlcwlqtzp6qvuhdlnqycdqxd',
      rewards: '2374682609586361731',
      mid_rewards: '287119314838001247489'
    },
    {
      address: 'erd1yd0l9jwa8pddtfkls3j2m0vd9kktmfhjk6lpg2dekllmnpne30vqx75vnm',
      rewards: '2591321973386350574',
      mid_rewards: '285460148873735263409'
    },
    {
      address: 'erd17g05ymjcryhlua3vjzz05y5ju40jxmfgaq5qgep77nszqppymh3s0ulas4',
      rewards: '2468034044104087578',
      mid_rewards: '285160695830331914273'
    },
    {
      address: 'erd16au2p8xzgy5y7msf8p0q9u0pxllkafynf5jgqk62ftmwptx0g78qghdygv',
      rewards: '3178624193148344189',
      mid_rewards: '284759614740009277511'
    },
    {
      address: 'erd1xywa6m9j7fwh0epe2l8cjp26yetnvys670x8fhvvk9uxz88nfagqkjmhrz',
      rewards: '2929660540448734319',
      mid_rewards: '283980600352529538260'
    },
    {
      address: 'erd18u96pff4azpe0rndknggujt6nazsyrygavrly20q0hwyfmegp6qsyezsku',
      rewards: '2806287909175305869',
      mid_rewards: '283674758344739233312'
    },
    {
      address: 'erd1rqs2vgt0nhv28g44l697hz89qnweqqjk27tq6yfslcl7ghtxnets7x70f5',
      rewards: '3638733260543922085',
      mid_rewards: '283465061510010744255'
    },
    {
      address: 'erd1wfyesyr8udhlg6weunq0ssm7uvfusygykaq4g6ws8t9rzfuuzwhs9h0v7u',
      rewards: '2318577235093246331',
      mid_rewards: '282887357187169416273'
    },
    {
      address: 'erd1lzd3v8x4x2u0xq9fqt9naexgxmlw2nlz50zufzrclh59qkmprkwqk38vam',
      rewards: '3147025452812756244',
      mid_rewards: '282376161601553728816'
    },
    {
      address: 'erd1zrj62sjjpl5ueqdc3lex59rl8nanlgquglr8f2dhee96e7nmpggszkzxxm',
      rewards: '3027363550796646699',
      mid_rewards: '282350215222525392624'
    },
    {
      address: 'erd17mn9xkfufac28r8xayhnx04rs34wzsrh24klenhkej46pmlnrnjq548rdf',
      rewards: '2785604892964622969',
      mid_rewards: '282114664512626609041'
    },
    {
      address: 'erd1rft69lwj5fjha2849r4jmutgz6gynsraerhvrt3wrpfk09ayzedq2qch8e',
      rewards: '2303215714812224177',
      mid_rewards: '281728657082785348160'
    },
    {
      address: 'erd1gqv3c00qzyu2e9dglcy52nt6e488cglj8ae4jfdgxyrw9xpnl4csz5r8c9',
      rewards: '2302448881808613818',
      mid_rewards: '281670815836276291780'
    },
    {
      address: 'erd1w4zlz692j527ahr09wclh2dtkwu06gkx8xprq36c3uzv7t0yjjasrjfzr3',
      rewards: '2776064284884796595',
      mid_rewards: '281395028475584139678'
    },
    {
      address: 'erd14ewfzsyfewj9n93zuk5w0mxvpntg0rtkkgwu8w2rgxhpwjjukqfqj379hl',
      rewards: '2408651236583065345',
      mid_rewards: '280681525538949199350'
    },
    {
      address: 'erd1js9nzhtnl5lwtjehls4l4zrlqgyyz9gt3t4qnv6lzfs4hp6cu2tqedf8um',
      rewards: '2640842739569017285',
      mid_rewards: '280195437822702292842'
    },
    {
      address: 'erd1gkd6f8wm79v3fsyyklp2qkhq0eek28cnr4jhj9h87zwqxwdz7uwstdzj3m',
      rewards: '2992142782944310434',
      mid_rewards: '279693557115748896735'
    },
    {
      address: 'erd143p5ulvmc7t3ztjhqgfftda9vdzpfr8f3fvk9nncp5766m48nxusa9lve7',
      rewards: '3216335103068735160',
      mid_rewards: '278604101122985149524'
    },
    {
      address: 'erd1f5l8rvj0nzeqemw2znydke8qdlumph7exh9mmpe7d83y8t5ce5ustnxn2h',
      rewards: '2380273726434217267',
      mid_rewards: '278541045731605396513'
    },
    {
      address: 'erd18gzhtxwrhvzxyvnt6qdnxxzg3kh6uawuu2hjjnkadlp0eacl973qgspg3p',
      rewards: '2856796068653041497',
      mid_rewards: '278484525124880167577'
    },
    {
      address: 'erd1cylclllupk9vpet5cpctnrdkd9m2wscfte7zl0c903jm4d5yrnpqltrwxq',
      rewards: '2614894956885448889',
      mid_rewards: '278238229294251536734'
    },
    {
      address: 'erd1dz7z2s924pzsu6vqygax367r3y6dagnkmvg3v4mg04nr6n6d2lysk2kvk0',
      rewards: '2968300870614776801',
      mid_rewards: '277895191732664025742'
    },
    {
      address: 'erd1hll06ku5wdnjgfvzucj5a5ngchnlcxpta6c3frwsgrkefg3gxn3qu68rhy',
      rewards: '2365987924569594973',
      mid_rewards: '277463485710921914093'
    },
    {
      address: 'erd1jhsuzuclpzvmvpdr42ev8cvxfhae7t6220slsqsxlg097g6sm22s9eze6x',
      rewards: '3184251739064136135',
      mid_rewards: '276184093432271914775'
    },
    {
      address: 'erd1hmmr5e2enqla8nqjcn7gnkdtfht4u9c9jtjv82ans3jpndtcg5ls7tw7ls',
      rewards: '2466635074936059738',
      mid_rewards: '276055173350045471497'
    },
    {
      address: 'erd1zwj45rgqgy2m2q6r6sw2ms7dwunlq5jutvhs8u0s6kqp5z0ppnvsgn9f77',
      rewards: '2343763362895969312',
      mid_rewards: '275787115048381819205'
    },
    {
      address: 'erd1fpnngxjhtqpfmfgff2a2zv29f575h37869g6935zetnj0w7a9twsf4m3j5',
      rewards: '2815745506659873172',
      mid_rewards: '275388132997255166145'
    },
    {
      address: 'erd1h32499upwha3kg66nda8rtscsv3w0f69qgrtxhh85vfashxr4wvsl8kz9g',
      rewards: '3531394372053863864',
      mid_rewards: '275368624502304336276'
    },
    {
      address: 'erd1et00cs43wr70xvvjra735fnqlvtldq5gg77t90zpw64d9t44qqvq50crrp',
      rewards: '2208367365106697709',
      mid_rewards: '274574365665403752457'
    },
    {
      address: 'erd1xm62n2gm64dkte7xtr38ta30ju29ugrhfzhf9frv38kp0y24xx6q3ldgy5',
      rewards: '2910007456618932307',
      mid_rewards: '273498193021193112499'
    },
    {
      address: 'erd1tkkjs22jfzdw3zqqv7cp5lq7pd37zztzxsnt56da6mw269xh8nmsnyx2ex',
      rewards: '3375329414070158096',
      mid_rewards: '272596841514795075087'
    },
    {
      address: 'erd1nx0avdq7hv0ujwr3vwwpx4upgkqz9662gd45a9h3f4jkcr33ht2qc3p8yj',
      rewards: '3135721374452354470',
      mid_rewards: '272523509224930255776'
    },
    {
      address: 'erd18p77ydmudhgt6cjpf22x3wrmwzzwadvr5tkxepvarkqplpcmr0ws0ratue',
      rewards: '3246841377137525018',
      mid_rewards: '271905150908503108133'
    },
    {
      address: 'erd1tt53uwx7g7c5tydw4gu75l6whvhelzf6jrjalc7c7hy4wj8daxcsydryp9',
      rewards: '2279382818850653837',
      mid_rewards: '270930971792966580488'
    },
    {
      address: 'erd1yhwr3azw0vu7urxkefpv5c2350sya7hwtxemlw2nlffllfh8h5pstqu8sa',
      rewards: '2990098104806467747',
      mid_rewards: '270539329622088842199'
    },
    {
      address: 'erd1xxkr8l848zwk5gz3uwmspar227c98uqjxznr245hns4a8686v4dqrjyyf8',
      rewards: '2266777943592560147',
      mid_rewards: '269980201946615833563'
    },
    {
      address: 'erd1slxelw8h7arcmsdugmdc8jqq8s32spg8xyqd7t69m83aqfyj879sqg5zkz',
      rewards: '2505398728166474564',
      mid_rewards: '269979066833418902851'
    },
    {
      address: 'erd1lusgm4jtjhe37qyqrjr6ev90n75gspd2d2xphwefk63p0n8lfcnqua549h',
      rewards: '3445409464405196550',
      mid_rewards: '268882891342738709268'
    },
    {
      address: 'erd1fz9k52k90elg7tjwk0w0k8xecw2zkqzrd6q3sf8kfnypv73wf3sqw3s0cl',
      rewards: '2845362039050961761',
      mid_rewards: '268622070689961519432'
    },
    {
      address: 'erd1h8tdhrfze48mv5ecgt3rmc2v49ycrfx27hsy0rd5l4kd3tkgpsusmg273q',
      rewards: '2606004271373295910',
      mid_rewards: '268567616096955929683'
    },
    {
      address: 'erd1x6sq3h6eg9n0cvh5jf0aphaa9ky4advezgjn04jv9qcknnlqn56sxq5fqz',
      rewards: '3314670051548251163',
      mid_rewards: '268021382289392954376'
    },
    {
      address: 'erd1yw2eahz4xcnrhhj6d7fvjnh0st5l939evqt7g24d0l08l340dl6qwww9ag',
      rewards: '3188556224755378881',
      mid_rewards: '267508775360135816436'
    },
    {
      address: 'erd195dar65ejnaz0rfjdurxvl80m49s3vwgeqj2ckm23afy4h9ahv6s7y29f6',
      rewards: '2113513479501712201',
      mid_rewards: '267419656682106563500'
    },
    {
      address: 'erd12awvn8j5uffe5ecre32hw3nrs9qcmxfcxzzfjeek800tdfd5rh0sfc92a6',
      rewards: '2110258462231922936',
      mid_rewards: '267174134833924893514'
    },
    {
      address: 'erd13skqhaf43lzz2s7f0c3px06kvd56nur8zsp05t8fgzn5z5jdg4mqqvfhnx',
      rewards: '2700290285916157693',
      mid_rewards: '266679491282105395917'
    },
    {
      address: 'erd1srzjdwvn0n82zccd6qrwl9amg3jawn9xq7lz20nu8rgvx7e36qssjltpg2',
      rewards: '2908446376015448054',
      mid_rewards: '264380442679747819754'
    },
    {
      address: 'erd1lpdy7wy2zq0t524kj7chvp5c5v3s0nk8c7hem9rhmm4glus9lk0qnqar8q',
      rewards: '2181297475554232420',
      mid_rewards: '263532518030774997960'
    },
    {
      address: 'erd1z08t9wkh82d2yzh3a8zk66f4963ly3lpcv4sqa2l77zsa8d2mmzs88vq02',
      rewards: '2057983719683918452',
      mid_rewards: '263231116920401512040'
    },
    {
      address: 'erd1s23zwqcpq7t7jlhcccupjw3u793v6r92ygz0pcg6k7wqxjq2jyks76znk9',
      rewards: '2651137414614259762',
      mid_rewards: '262971952180090414713'
    },
    {
      address: 'erd1cj8p3p3vgjj0htv6ksxkxyl8d8vjl3z0xphkvp00y5jl944p7pksuqzpte',
      rewards: '2049009616396064314',
      mid_rewards: '262554211625472064009'
    },
    {
      address: 'erd1ugd8ejmre2t7khnvxagnm2s7nqr8md9q4p0nkyjuq947g8peeqjqkkulps',
      rewards: '2406513529258626426',
      mid_rewards: '262520280971051187525'
    },
    {
      address: 'erd1t5jwexst4hyjfw0g8sqpmg6r5sexw56pw8fpnterc3m6x8h9talqsx96mh',
      rewards: '2280793559204171123',
      mid_rewards: '262037382158931382552'
    },
    {
      address: 'erd1rr7lamrmxj7ckzr6af0t23ez3ad5pncgtx7ntsy9cj9ntcqxd8dqahqrrd',
      rewards: '2515450321818347568',
      mid_rewards: '261737245867823465731'
    },
    {
      address: 'erd1xxml2fcvg49udfy3v8sepxyvc3ng2qq0payz2ea5thqqfpjxcpvs9cy426',
      rewards: '2252705807427782115',
      mid_rewards: '259918758460245605180'
    },
    {
      address: 'erd1q78wthn2x4y7usxlc7jpxfz2zlcwm32v9flwgrhfz5366kt90v6snh7g2v',
      rewards: '2355382627964314590',
      mid_rewards: '258663541560944545000'
    },
    {
      address: 'erd109v66ug4eklvcr4hlw3u44rjc2sugvgcstvcvmxnawqw6d4xjlpqvvzylu',
      rewards: '2354877757865690289',
      mid_rewards: '258625459846031270351'
    },
    {
      address: 'erd1mcxssspk8h0dm02ugrl3mzp2ndcxdzmrznjp6j4vjtf2jysmen0sjlt46y',
      rewards: '2354842845135392243',
      mid_rewards: '258622826422808787911'
    },
    {
      address: 'erd1ffynr7lqcac35mjw5phe5hsgcvvw0gn2wg7q9upq3y3ushh07s4sxnsk42',
      rewards: '2466696854853955538',
      mid_rewards: '258059833331349739866'
    },
    {
      address: 'erd19d5jlvwfvynjec28paa46hflqulgurgv6kv2l2htpn3ad9etzkdsjs7yh6',
      rewards: '1986789317966943323',
      mid_rewards: '257861012972881853733'
    },
    {
      address: 'erd19gzru43acq6t8d9lvekj47pgefdsr2mdl9mytl3r4zr0wujnx2dqq0weuq',
      rewards: '3059921301993586649',
      mid_rewards: '257806005340968971758'
    },
    {
      address: 'erd14h5ckerwqehqnjlxa9qtmkgpjl70k69qgh6xlpqe5e8ayvcrrx7skzra7g',
      rewards: '2343429709306606375',
      mid_rewards: '257761947978863278721'
    },
    {
      address: 'erd1sfpakj6v9hu3d9p0phyypaup5k5jvupk6n6vavjxyt6vqzwhap4qnp26qp',
      rewards: '2803241967119255245',
      mid_rewards: '256445006776292334801'
    },
    {
      address: 'erd16pemn4sda99etegfzyvr7vzducq4td03jf7yz6j2che7zfuu02nsqeem2s',
      rewards: '2919627417054179412',
      mid_rewards: '256223814506344042428'
    },
    {
      address: 'erd1trc0tjn7m9vr5xne39egmll9svcuxkq6wjr7tvxs42hxaltuuldqlx7sku',
      rewards: '2073664227982322596',
      mid_rewards: '255413877888702441436'
    },
    {
      address: 'erd1keghmzvreaydmuev648hnhr55hg3gnup8prtw9mny378xhxuav6sk940y0',
      rewards: '1949088316705727477',
      mid_rewards: '255017273987573041242'
    },
    {
      address: 'erd1qwnef276dj9nqv98jzdvnnzknlehl0edkzqwsqnfh4rhrd2uwh0qs5t8qs',
      rewards: '2659529828398212338',
      mid_rewards: '254604981369233475790'
    },
    {
      address: 'erd1xgmvj6y304dc760tcwqmy7uqhextl260n5s67ck2h8gxfvepnl2s0vgd0d',
      rewards: '2170294829375332086',
      mid_rewards: '253702602303505295493'
    },
    {
      address: 'erd1vm63p6t20uycaaz6jhvygnfg5xe4sh7y3f04zp87h60u94hezf5swlwq0t',
      rewards: '2759715820620233324',
      mid_rewards: '253161884431028140413'
    },
    {
      address: 'erd1rge2s6g4htdmsvj924y3t4hdyfjrys5df03kjjmnzmlc7ffnsd0szg5589',
      rewards: '2145127939953033719',
      mid_rewards: '251804295569069304132'
    },
    {
      address: 'erd1akctk60yrvtvq8q7ct6nhp4qd06daeglhma9cy65kj5c5h6x88eqj7yhzl',
      rewards: '1901988040081227766',
      mid_rewards: '251464559513814270986'
    },
    {
      address: 'erd1l4cqrrxewnkxjytqukal64um8ptyc8zk8ehe2gmsp2fv9dy8jlnsjz5pp3',
      rewards: '1899754778554312208',
      mid_rewards: '251296107412914411588'
    },
    {
      address: 'erd1nxtfzlwgpexrqay9n9sr593wmlnqc20lj23k6tdggm0ahr0rnugs00nfsz',
      rewards: '2130677609155621710',
      mid_rewards: '250714325338451511945'
    },
    {
      address: 'erd1cr456kvfdnzzq44v0f44amf8jksgf9eyj4xqa5tfe8pv62hg82xsyx3z60',
      rewards: '2249943873131115675',
      mid_rewards: '250710429238963843007'
    },
    {
      address: 'erd1vt3ctv8d88dttzd8xdlmg54k8r0833lcnp88dhyqh5m6gzze9n7sc2pvyf',
      rewards: '1891449161179052175',
      mid_rewards: '250669625167431377358'
    },
    {
      address: 'erd10p0fdtvn4apvhwelfqnrp6cvuq42sr38mvrwnepnrwlrv9a44a4s3q6hh0',
      rewards: '2951301139621993266',
      mid_rewards: '249612923460026059716'
    },
    {
      address: 'erd189pfcepx9lekxph3q606t9a8yurhde3djtkw3ceq5l9p22g685rskgv0ug',
      rewards: '2823755299732943515',
      mid_rewards: '248992301588649548551'
    },
    {
      address: 'erd1d45n93nftapt3hta4mhwm9dke6uutt793ejvrddtp2azgh3az49qrc7gqk',
      rewards: '3062335042045197783',
      mid_rewards: '248988070709408646016'
    },
    {
      address: 'erd1ze6urj8wxdlpg8xfhkwffvhmtcpkm3h745u334xx5y2zq0e8tkeq8greq3',
      rewards: '2220553032839034250',
      mid_rewards: '248493515216694675092'
    },
    {
      address: 'erd1gdakyrm5u5ahmu0m789fdzge20ac73e8ftlah4dgcvmr8rrcfrqs9wen94',
      rewards: '1855308091026286757',
      mid_rewards: '247943549818606934736'
    },
    {
      address: 'erd1rtsa4ndes2zzr8pex7cjy2ud8qcz72v3ra4esgsdg3fkr2x3cxcsdnypdq',
      rewards: '2926886987592891141',
      mid_rewards: '247771394757979727189'
    },
    {
      address: 'erd1rp2ntnta6hgflxgrtjc2fv9tsvun4ykks6l3mme56qy2wr0xyc0qec35zh',
      rewards: '2081459794926354249',
      mid_rewards: '247001887673316118399'
    },
    {
      address: 'erd1wlm4ez5sv0ksuqj7ceduklhjj57da2d4ke5d68s8nenlkp5598fqzepgzr',
      rewards: '2676235588319525508',
      mid_rewards: '246865075774639080673'
    },
    {
      address: 'erd19qsphj3g8snrejlsg7xw597st4cc5spxjjermc03tc9qtnpzfses2hsp7m',
      rewards: '2914295763075020239',
      mid_rewards: '246821654569750813748'
    },
    {
      address: 'erd1yxfvyuzsygur73c9k5fstzxs4ll0pzvqpk4k8r7u74yqmlcekwfqs9uvh9',
      rewards: '1836860204601827791',
      mid_rewards: '246552049007837982065'
    },
    {
      address: 'erd1x44d8m2qmw3f9d3s2hjg96qh8022yusstxc9lnyspmdcsyn6v2fstqmu89',
      rewards: '2074633743534962626',
      mid_rewards: '246487007224308228938'
    },
    {
      address: 'erd1fw8p3sph599zkmnspnwhq7fwa6qhkvyjqxzd9sksz8j3tm3wdsyq4kkkqu',
      rewards: '2192221082150670693',
      mid_rewards: '246356471902006115078'
    },
    {
      address: 'erd1e5vs6dswldkyv79tpekevj0xq4axyu66hmkp9syqn4gqf9y9yhlsauymtp',
      rewards: '3019030877869973330',
      mid_rewards: '245721692210915484201'
    },
    {
      address: 'erd148pzwvkecd8cy24g5kf9yvm46xcq6jprfj4scw8ekhexc7xtsw6s77nrfl',
      rewards: '2655403851232054653',
      mid_rewards: '245293764114322877892'
    },
    {
      address: 'erd15c6m5unjexzrtuqa972yu9zuqa64ptt7jxkx442zdc0v9fpcyf6s8d8k00',
      rewards: '1819931898874482433',
      mid_rewards: '245275168252906913770'
    },
    {
      address: 'erd12qmhjxjkxkfz0t66ppjura00wxjfqutwr8jugr3swmu52z29nq6qefegll',
      rewards: '2774192025570829064',
      mid_rewards: '245253806316394055197'
    },
    {
      address: 'erd1lhrhe52g2yvfyvfzfrrl7gx0crfemyy5czglx47r44zns4q7jjvqyp7udf',
      rewards: '2296297255314373183',
      mid_rewards: '245206806406831061529'
    },
    {
      address: 'erd1znm5rvaeg0984yf8p29nz7xxrz37y2jh0wdxscm4kw95977mtcdqjupmy5',
      rewards: '1934416216666571041',
      mid_rewards: '244910575982694787327'
    },
    {
      address: 'erd1z9ghf63x7hclfc880h7w8slqjt3xf2ql797666muceygr5duxaeskgjevl',
      rewards: '2522499179416679823',
      mid_rewards: '244268932308068984848'
    },
    {
      address: 'erd1hgzgrqsj2xk0ncsyvu9224e2c3rk67t682kzj6xcft54x98dg9lq3u37pp',
      rewards: '2163275962323005986',
      mid_rewards: '244173178012327847308'
    },
    {
      address: 'erd13u0fr2fetmjnw68mfwc82nhaygpvw954rp4h82ajdhf9e3c7669qynxf95',
      rewards: '2752329879270122780',
      mid_rewards: '243604772188438422086'
    },
    {
      address: 'erd1s6zykchytv536a4j04yq30t9dp6fqwrw8mvpjpvs4c4u0pcugpzslhfqaj',
      rewards: '2386515083505875672',
      mid_rewards: '243011823425357699280'
    },
    {
      address: 'erd19mdq9fsg8kfawmftau450r7msla9dfl9sr2nhdlk2nt87xypdcps3uz7af',
      rewards: '2623569992528759105',
      mid_rewards: '242892576293868310039'
    },
    {
      address: 'erd1j3rwjs68see07g8qufns4plg8hvjagwy7klyruc3k9w6retn4e9qsyfz02',
      rewards: '2144901139076094722',
      mid_rewards: '242787188264910856104'
    },
    {
      address: 'erd1z6wldpc3tftfvvxxqkdyeuyz2hvqh50rj2t9hr506ggw530ac83s8w74w4',
      rewards: '1785248249915102365',
      mid_rewards: '242659024346935391126'
    },
    {
      address: 'erd1n5w3jh335827y6uws5tpt480f8j5lr36yyruva0ke6zmr7swacrqcw2mvp',
      rewards: '2016318147710871710',
      mid_rewards: '242088335365503304010'
    },
    {
      address: 'erd12paum54u4xnek4heetvg63uj7q6ffyxku73vs8vnznhtdr8tw8psw3h60e',
      rewards: '2486206712484380879',
      mid_rewards: '241531437291071097894'
    },
    {
      address: 'erd1s3qnhx6h2cdg6nrdscuczcj9a2ff7sc4jaaflnnfyaagzg7ay3lsre3y0y',
      rewards: '2600532970691353218',
      mid_rewards: '241154922785662017558'
    },
    {
      address: 'erd1myaua03z0fuksetrqypsrfarqhrupa4n7shwv2fpd8lcduvkzu4s42qc4j',
      rewards: '1757393764726943221',
      mid_rewards: '240557995652857665091'
    },
    {
      address: 'erd164j2qnh3v5xsn84e9phfuarvf3h3zj243je8hlm9n2v95wdd7xjseffpv7',
      rewards: '2466520969506345225',
      mid_rewards: '240046566521365608722'
    },
    {
      address: 'erd1sj04q877pycwrtv2qscppwahdkaxcf97zgdwq34a7p4lgzhqzl4qelfulx',
      rewards: '3062853945562422833',
      mid_rewards: '240027210947391257862'
    },
    {
      address: 'erd1rm93hv2zknrz7a6jt0h8eakfg8megu9ttk43v5s8zu0g50a7506qwtk92l',
      rewards: '1982908682674604859',
      mid_rewards: '239568301546144741698'
    },
    {
      address: 'erd1r4xe8m0x4hhutaygc7w8dws226zapfm970uv9cr3sdctc32qrqdsyv32sq',
      rewards: '1862584953789536947',
      mid_rewards: '239492434400934582381'
    },
    {
      address: 'erd1ytvcxy4x27dfvngds7xmf9jk6k5gf360heugc5gfwtlgurpha2sqkprdkk',
      rewards: '1743072892874226241',
      mid_rewards: '239477790347194397012'
    },
    {
      address: 'erd1t704jt9er5vw2n748qrxuew6tuvrkqf95f03023k8jm2epfhdq2seu0f63',
      rewards: '2933895987722510871',
      mid_rewards: '239300074799619325614'
    },
    {
      address: 'erd12xgajl004r4jcpv7kjljtr3axmn9aqq3lnnjsummxagrgmuk2auqc6d3rs',
      rewards: '2925239809517635877',
      mid_rewards: '238647150192805060394'
    },
    {
      address: 'erd1k5r5ans75ehsc95nycthnf0v8hl02qjakrsddlgvnvmjf5rhz2nq0zc9fy',
      rewards: '2089612418680043164',
      mid_rewards: '238616829802844382346'
    },
    {
      address: 'erd1p8zmfg7zygv4t88yhvt40hrt3cc5r94dud4rzy8xvvq973f8cp9sxu80xf',
      rewards: '1728689940110781182',
      mid_rewards: '238392902356717064635'
    },
    {
      address: 'erd1pj6rlx9puv6246a658wvfs9vrmnvp8fg2p6jl84335z6c2c94qvq0jlape',
      rewards: '1846012967149833951',
      mid_rewards: '238242430345476762357'
    },
    {
      address: 'erd14k24rhgtp7e5cpr6uj3pprwdtd0d2tljxspevkvh0f80u5reth7q57fdrl',
      rewards: '1844210639269544401',
      mid_rewards: '238106483026147580786'
    },
    {
      address: 'erd1nsjm9p8nkr52t6xzu5zrv4d29l7hzxr6u2f36xyeqcympzku68rqugkzrw',
      rewards: '2555867609091767002',
      mid_rewards: '237785870881878116420'
    },
    {
      address: 'erd140sudqahfwahnxt2l6ltzle4n5cwkjvnqsraadfyqdjt3m858xvs9kmrk3',
      rewards: '2546894371914379634',
      mid_rewards: '237109030916569037693'
    },
    {
      address: 'erd14lzwe649xnvfe0dv57jd6wennx2q956xccfuzr3pqq9lwlc3u57sm4hke3',
      rewards: '1704955295544403026',
      mid_rewards: '236602628045745599489'
    },
    {
      address: 'erd1per3fh0gml7cfq0q6judpdf3yrhs97gn94gvefh0u2755jymzy6qeu9snv',
      rewards: '2540074592876778943',
      mid_rewards: '236594623583298349414'
    },
    {
      address: 'erd1rugkes0jtz5z9cvcdc5ygdashqmrcrks0q0ylt3sv0wuw0axkfas8j4u08',
      rewards: '2419075331486997628',
      mid_rewards: '236467801873083757630'
    },
    {
      address: 'erd1m4xa2a5t3ccm3amh4dy6h9gmxdmqz8h76kwu2slv2vy3aeu6zrss8ljlr7',
      rewards: '2776707806404081007',
      mid_rewards: '236443568492322549824'
    },
    {
      address: 'erd1y97n0qxf0p2f6w9dps33p8v2fu2r4rdf9dvv5ckm3tn8eju3zedqyunsna',
      rewards: '2893259260301607781',
      mid_rewards: '236234897691947385587'
    },
    {
      address: 'erd1fnhjh6jm9pjzf6f9x7zy9nkfhfcq07695e8hr2e2tdlnu3u9lnpquxcqg6',
      rewards: '2534535484758034679',
      mid_rewards: '236176815642549625956'
    },
    {
      address: 'erd1vsph7yzarnkqxq85mnt9jp06629hgrlwsa64hkzynu0xc6n2jufszpx42m',
      rewards: '1815395211796430300',
      mid_rewards: '235932971667234920512'
    },
    {
      address: 'erd1a5xlxg364snkz3a83pyr8t7vu0zhr03wl7j2q4q7cmhlaw0y3rtsl2wjx2',
      rewards: '1695119076736575100',
      mid_rewards: '235860694464246178945'
    },
    {
      address: 'erd19jr85gyy95ws9hpxv8epn9632es2jmqqxawlccj498h42395t5aqecm45e',
      rewards: '1687015402854453360',
      mid_rewards: '235249444561805916368'
    },
    {
      address: 'erd1j5jgja5ng0426tnlgslm60vgvxy26k8q3llf20f4p4cd0q43tr5szv7ttw',
      rewards: '2402415785510947913',
      mid_rewards: '235211193327294985010'
    },
    {
      address: 'erd1y7edvehl00xsel0pwkl2meegf7x5p58jl9wlvg8xkygdxpqw9cesp26hzh',
      rewards: '2160597501285712252',
      mid_rewards: '234971145073743307669'
    },
    {
      address: 'erd1e4x52acav2tw4v0qs4sef8cdwxs6z5fj97j0rt6ezydcw7emw5nsz7pw6h',
      rewards: '1683313527309728297',
      mid_rewards: '234970216757420636756'
    },
    {
      address: 'erd1a9r83ptx0rlxyyndxd0nq5mltjjzgjfc3dunkfs8dr5gxp5ka3aq8660zz',
      rewards: '1921484710311830895',
      mid_rewards: '234935168764595952717'
    },
    {
      address: 'erd1r28t68jttq3lnjqfeg7en3sas7xfz48yxdcucpna7hf3xk7lda6s95c46e',
      rewards: '2039740805776254393',
      mid_rewards: '234855076928110242007'
    },
    {
      address: 'erd12877fnex6uadzh3ddnt2klx5tmnhl292yu7mtr8c39ff9zhdqq9qrlt4wc',
      rewards: '2027805201102521375',
      mid_rewards: '233954789318007813616'
    },
    {
      address: 'erd1q6a3643smkzssk0w6um87049s8w87nhjp79ud98h6qcehkj7cdhsrnrl9x',
      rewards: '1662866621126107020',
      mid_rewards: '233427932406921652856'
    },
    {
      address: 'erd1vy9qsn9xzpmznpc7vvnrjsjd36wm879pfsj22artll7srd95cncsy9mpf4',
      rewards: '1996975516194872629',
      mid_rewards: '231629345060726035700'
    },
    {
      address: 'erd175f5khy03nuctjfxre29kza4je8e48xsfu56fzwgmwqtty33txfqse8h4k',
      rewards: '2831352994804642743',
      mid_rewards: '231565386147443649539'
    },
    {
      address: 'erd1c7g7ctgtp79wjdage0500xm2xa93w43w2gen5xje2c5tqcua478sgt8axv',
      rewards: '1749309378976715714',
      mid_rewards: '230948200629884432344'
    },
    {
      address: 'erd17y42rtw4twdg9dtk6fd6rz78rsmh0fu9av4kah3r0fh9y3xsj78qmrt2gz',
      rewards: '2462269433193589795',
      mid_rewards: '230725878498353437152'
    },
    {
      address: 'erd1krqdw6xvsnrwmh3nklvdmjtsnu53wx8k60hn6ntv0adjtqwjlyss40lcrj',
      rewards: '1844803925531268028',
      mid_rewards: '229151233860753324503'
    },
    {
      address: 'erd1znzur693laut85ca4hg7p4n7ywlkpk6h6xc3jlkz75923mnzuansauz7kd',
      rewards: '1605696467692608953',
      mid_rewards: '229115659823270863732'
    },
    {
      address: 'erd1c0sw2juwyq6kla3hkne3uge64mgl09fv3pe6nxk654d25s204phsvlgzh9',
      rewards: '1588762363510168449',
      mid_rewards: '227838341698183645441'
    },
    {
      address: 'erd1zslccpkpw7c7hx2rpg6l6xm3g48rfca068lqhdyvzwygmpjz0vlss7pvje',
      rewards: '2297030396855877356',
      mid_rewards: '227262106348837365139'
    },
    {
      address: 'erd1xe3gkchay307l549uk56hcyedkqk06d279kqhc9k9czu2w4rgl6s4vlygq',
      rewards: '1578748942441382185',
      mid_rewards: '227083041973586840212'
    },
    {
      address: 'erd1gv2529v30tgaqrppk3kfp3s32k6xdqr78m8wsu5pcr8avd2pxnqqrd5rft',
      rewards: '2766964961600457964',
      mid_rewards: '226708677994218502518'
    },
    {
      address: 'erd1r3cn3lvm9as7tax0mq3mejpyns3xzs46k5punqu5z7tllf7ca9jq4jtwyc',
      rewards: '1927606661902366929',
      mid_rewards: '226396939853473902839'
    },
    {
      address: 'erd1nfw5mrn75qafajfnf3xf5lm6wq3ngpe57hjwkjhqsmw4tmrlej2qpsx4yy',
      rewards: '2038705413510788170',
      mid_rewards: '225776978595124521349'
    },
    {
      address: 'erd17uvl0w388jy0npvfsd05kcz2vttqqpqrwjwmu5qejnkdppp748pqc787tw',
      rewards: '1550135202637975810',
      mid_rewards: '224924743661278169546'
    },
    {
      address: 'erd1ysykuctynnfd03lnuuae2tvl0t4x4y7wg7lqdfp0llwlr0tvjvvs0v5hnl',
      rewards: '1547228892557691599',
      mid_rewards: '224705524356691624498'
    },
    {
      address: 'erd172avu5v3nmh97zkc4hwsv9yy2f34ss8c8temvhjx3jagqhgrujrs24uzxk',
      rewards: '2619134766239686195',
      mid_rewards: '224558032767570026959'
    },
    {
      address: 'erd1ddwwagtyfn0zl66qmtxgry98zd03zk56tws5nlkl6vfunaw0fnyq7cvhma',
      rewards: '1777917998439870364',
      mid_rewards: '224106112721384509908'
    },
    {
      address: 'erd1x2zh9qfj86duwuvj8eq9ckl99jwug7r7480xrgpaw6ar8fp96uusc2qpeg',
      rewards: '1772148432263687833',
      mid_rewards: '223670921619963872715'
    },
    {
      address: 'erd1cn56wjpte7fvddmyw7nw8f2m8jm6m9xyk325eqzqf0294f86nyvqptufah',
      rewards: '2486030924367565565',
      mid_rewards: '223518177815083228427'
    },
    {
      address: 'erd1jzc69g6yps8p44egp83qejzuwlvkn863pczzp7z9ll5rhgy08h4qt3vzn8',
      rewards: '2121360339005087992',
      mid_rewards: '223011535399793199572'
    },
    {
      address: 'erd1y8jm2342j4jcyy4kz7hv823lr36wd9ur2mmlq4ea5wn6jndhpnjqh5shcg',
      rewards: '2340572942197669912',
      mid_rewards: '221546465638133302741'
    },
    {
      address: 'erd1hhgnltr75lj7uc406t7u3dlcjj59utrpkes60mwl5c9uh6jy9mjql0d5kf',
      rewards: '2697015473645583521',
      mid_rewards: '221432476321975418933'
    },
    {
      address: 'erd17eynrlyv5wsnucw2jzxrmf5vtqz78c8undz7uye7lmdkc3j2qpnsdf8888',
      rewards: '1619320867334414987',
      mid_rewards: '221143331108295556189'
    },
    {
      address: 'erd1d7pud3mg4pw6lqr467auf5mm6luxvf7687g0smleyyqqquwsdm0s9fkh2t',
      rewards: '1489088730654144756',
      mid_rewards: '220320085257296460137'
    },
    {
      address: 'erd1muy7fsclcsfmfvylqemzkx9yrsaq46t0rqshvskp89dnvw29u6zqnqkjnu',
      rewards: '2082709039876472116',
      mid_rewards: '220096116644643331720'
    },
    {
      address: 'erd1l9zg0xvs05pt369sv5kzu7g7lzxuzfe9l2mjc3e2v9eu6av903psque49m',
      rewards: '2674726616587677476',
      mid_rewards: '219751255939673593695'
    },
    {
      address: 'erd1s2x6caj2y6jffkqar34aezprvvf57g6gvz0qknhk5hqyltx6rlpqtdn7pk',
      rewards: '1468224075610137629',
      mid_rewards: '218746290637027276021'
    },
    {
      address: 'erd1fndrslz4aerk2crx6jug7ekg47pmeult9gt7jxv6rvmczn7uatlsucwjee',
      rewards: '2652598110844207911',
      mid_rewards: '218082130654821544362'
    },
    {
      address: 'erd1na8slu2cmzs26gfcsc0nqqut082jqqekdt09qr3lr8dqwstrndmsfu2k5g',
      rewards: '2287038745192024433',
      mid_rewards: '217508448663004119245'
    },
    {
      address: 'erd1zs96tnhf4sn22055nx2nmn5lvhkm246a7e95ydswquu642efsxcskpnm8a',
      rewards: '2523345058782351875',
      mid_rewards: '217332735921993277949'
    },
    {
      address: 'erd1h5nmtuhv3e56c680344qx8j2005wprmnuqz4sa9zgtfrx93wkl0q7mfqaa',
      rewards: '2403335125638298319',
      mid_rewards: '217280537993840873070'
    },
    {
      address: 'erd1l8gwe0dntqmq7w0rx6cddlcdjrtgttv4wwza5q04lyqsy3swxw2s8mdcha',
      rewards: '2755737261953952821',
      mid_rewards: '216861786767672999393'
    },
    {
      address: 'erd1k7x8jx6qg38pta093hppds47uqa0lfr0je43v3ef3h58qelfu3xqm3qre0',
      rewards: '2753916583518849917',
      mid_rewards: '216724455289133742293'
    },
    {
      address: 'erd1nwv8f86l4yu9krd3r58ngpg2jh5rxzp6e4yqnwalezfsf3396e4su97qzt',
      rewards: '2255012960269980312',
      mid_rewards: '215092784089882515655'
    },
    {
      address: 'erd1n9dacwekqzhun5kr6kf69aa7k27g3stj2wr5dswmwgqheda8dfpsm4x8jz',
      rewards: '2482504642786125069',
      mid_rewards: '214252194841929815779'
    },
    {
      address: 'erd1n7c0ql86r8h9mgqqcahuvdp3lhlpvzfu3vqd6pfdghr7e7qn5gcs62us4q',
      rewards: '2123401253973763950',
      mid_rewards: '214165479042348250479'
    },
    {
      address: 'erd1enke5xp7wt5fx2euwva3t76t5gtezkup9cfq8tt2nk5c49psqd3sz20w5r',
      rewards: '2591108726880308196',
      mid_rewards: '213444063958681894750'
    },
    {
      address: 'erd1lqe2zt00zj3cgf6d25d05gurl4ejzdrhprd6x99cxme3zrnt6v3q8y6hk3',
      rewards: '2691422111383365697',
      mid_rewards: '212010576059597322266'
    },
    {
      address: 'erd1de0dfvef7s7hn7jd8khq7dd2722evh3spj3gs8g4ds8yg483usaqlex9sa',
      rewards: '2691422111383365697',
      mid_rewards: '212010576059597322266'
    },
    {
      address: 'erd1gs2ll0d24wddtw6mxxynaqh2n8wa7j4tmtzcjz3fc70j2fr3gu3svpqmzy',
      rewards: '1734435156229735126',
      mid_rewards: '211826256764025636743'
    },
    {
      address: 'erd1kufmqya02nj3fkx88m3r3au02z473gsr28mppqy6cufw4xrwjefsa7g90t',
      rewards: '1373005607746547892',
      mid_rewards: '211564081673690794349'
    },
    {
      address: 'erd1vl86dv747ut7l99ltpth8g5njk4366xtpn9tdhk5h380vl9vqp9q2uznp3',
      rewards: '2325582635300445426',
      mid_rewards: '211415765691200219720'
    },
    {
      address: 'erd1y6rx2gjwjlrqxfmhjc44krwwhmzgqzxhz5wylup7y0p35h0r0rgsajynhl',
      rewards: '1365961287395829326',
      mid_rewards: '211032737472311443495'
    },
    {
      address: 'erd180l8t0yk8w74ggv6d8eqnp8c054gk3kcp47lgq34jq82ksvfwxyqg9un4u',
      rewards: '1595583473126823402',
      mid_rewards: '210352849395354576674'
    },
    {
      address: 'erd1ywvr2mfm0u0v0rpjuktwnggplv7ge5krn4pmjtn7guw7gft3l7fs3fvu6e',
      rewards: '1827684488178085380',
      mid_rewards: '209859936288296560869'
    },
    {
      address: 'erd1kfcfejulc4cekm0aqz5wske42hhwt8ge6xtp78ak06pfpta7wgdq87yvyx',
      rewards: '1704513724780432217',
      mid_rewards: '209569320919826687244'
    },
    {
      address: 'erd1gqfqmclsyf7pjzxzlldaret3s5jve9sj3fn0ty6d3cpqwryj7prsw47a5p',
      rewards: '1818581098284663516',
      mid_rewards: '209173279067735646759'
    },
    {
      address: 'erd1lyp6vsmv2stk9encxld9884kma87cq8afkx5xmagzlcsaek02hqqmlgmgr',
      rewards: '2056449653071304541',
      mid_rewards: '209115404210223742041'
    },
    {
      address: 'erd1cqu67xgfd85vmrym5altgqaz7zyqdar0jh3mhz3p9gx5je69m96s0t4anu',
      rewards: '1930704201913747076',
      mid_rewards: '208630583390627842929'
    },
    {
      address: 'erd1875sa62zt8mexmsmpltdnudyh7z5ndt2t6752mf3qql9uqxdmynqmj90pq',
      rewards: '1333540164125056604',
      mid_rewards: '208587253026054967176'
    },
    {
      address: 'erd17hcx3fzd0gzjju3efwg4vql64rhs4mt7hqsdygs3dkv58s3vuzjs20ap7z',
      rewards: '1331661617686286522',
      mid_rewards: '208445556636968900892'
    },
    {
      address: 'erd19tr2dc2hwuj0r2tj6y9s40zua4qfmdda6z02aar7vurufh4dql7qtzfcqe',
      rewards: '1330468522443299316',
      mid_rewards: '208355562967247467349'
    },
    {
      address: 'erd15z8fu0sjtakrmy6ftdyshznccl3d3vsfdcckf29vr7hgekze7jnq54xnle',
      rewards: '1922120781467554704',
      mid_rewards: '207983146809805670162'
    },
    {
      address: 'erd12yzavg5tl2qcw8pk8ll5ealt5zf2409xp84fm020scrlvhqp47nq37v9my',
      rewards: '1324185576293522108',
      mid_rewards: '207881648261775235538'
    },
    {
      address: 'erd122sgzjkgq4ruq4a0zt3ysrk7fuud4pm7jhpkgkexpt83hepdthlqh656g8',
      rewards: '2621068652217777961',
      mid_rewards: '206703903348325639041'
    },
    {
      address: 'erd16237tg63jwa2j5y3sez02j3t3t0ethtqlttgyvcm5768l28a4shsfy3zh2',
      rewards: '1307853099102389987',
      mid_rewards: '206649710102008930842'
    },
    {
      address: 'erd14nluef5vct3mmqt03ec34y0uu9825kdrugfvfe9fcj407sa75saqnd6jvx',
      rewards: '1664640626233717076',
      mid_rewards: '206561743375221781706'
    },
    {
      address: 'erd1w0l3espsvd0wt0yt4tvj4am343cly0yqeue6hty3sccuhyrzjvjsvssmvk',
      rewards: '1899115913803121812',
      mid_rewards: '206247918650321289052'
    },
    {
      address: 'erd1vshmc6l82j8gpzjjxnxwqj7yvm2zpyecj47lrptwspr5sf9j59rszng5gh',
      rewards: '2373641435387070702',
      mid_rewards: '206040780381037965758'
    },
    {
      address: 'erd16rv8zdgegx52843h6y39mkke6n6hwq0mg6qd499t8p5urjznh0vsyfpau8',
      rewards: '2012148584331638192',
      mid_rewards: '205773830457501295199'
    },
    {
      address: 'erd1lhue6uhkxerdzlyfwwhyfd5kwgxr56xhgyz5fz2rmsum9pd8386q7770nt',
      rewards: '2485422060156570464',
      mid_rewards: '205472251955407261283'
    },
    {
      address: 'erd19f8mw7ygen6kefnrf8upcxf3lmycwnxpjcy6haxptq5u0nexppfqpdu4sx',
      rewards: '1527590471175904596',
      mid_rewards: '205224222995320066461'
    },
    {
      address: 'erd1mnwe323vfv329gs000qdt88yq8pzadwlnkrmck3tqjlduvczrrasjq0jlm',
      rewards: '1288253000134594558',
      mid_rewards: '205171299352001349836'
    },
    {
      address: 'erd1aupaw5hgs0342vctslj278hqyuqxhvyp3nja90qgg0xw2lzqjwqqw9etka',
      rewards: '1280961748173253131',
      mid_rewards: '204621329410606024682'
    },
    {
      address: 'erd1eaghaj065p69ax7f6unw7s5rgdmc2lsdy82ha3y2ewv7eqlcl3sqdhm9ya',
      rewards: '1874021101890196123',
      mid_rewards: '204355048631529714917'
    },
    {
      address: 'erd1gu452wqze2yryrx5gvsfpcu3lg2gxu29svg4fv6rvu337s3r6hzqtf509v',
      rewards: '1634378751417434985',
      mid_rewards: '204279128317140403008'
    },
    {
      address: 'erd1paux4uwzx555cqvchhmujzehx3nymjzvrft77nakmx54slcctw9splgfcu',
      rewards: '1394409088668064851',
      mid_rewards: '204178519250457376395'
    },
    {
      address: 'erd1f8fuwg8paaw7pcw6xdr8ev4yjxmrs5n4qx8s46wdeean6kw2x0pqnffehe',
      rewards: '1274930789871888310',
      mid_rewards: '204166421830790467872'
    },
    {
      address: 'erd1ek56yp8razkt2y0ulsnl503e3ua556274q7jvwkgcl6qqzwdzjvq8c3g2s',
      rewards: '1271042355824532808',
      mid_rewards: '203873122153796415355'
    },
    {
      address: 'erd10rx0z6mapt7c07f0mr0gtav3rj3negj52ru42efpl2w5uqjkyhpq9yhq9k',
      rewards: '1865912453923961636',
      mid_rewards: '203743423540196997772'
    },
    {
      address: 'erd18mzmlwp4g7zex4kdjpzuyzmqu02u566jemqhjs53ws70sl0qdxxqqqhr2u',
      rewards: '2222797890698687397',
      mid_rewards: '203662842014350305247'
    },
    {
      address: 'erd1gg9sfqavxm6y0cw44ddh5xsd7xf4ksg7hmwg7f7vm8yg0rp8zczslxm86m',
      rewards: '1615324201598566981',
      mid_rewards: '202841867651515406636'
    },
    {
      address: 'erd1szmxupw5vsnl9md87ktgslk6tpwy4ph940pfnm05vtju5ldpq56q68z5q2',
      rewards: '2208934594121497960',
      mid_rewards: '202617151034731467833'
    },
    {
      address: 'erd1vp2e8dxw8qyetenplfrcmvkxe3h8kqxd85tahvr95agfs664x6nsuj2ke3',
      rewards: '2207848485557802039',
      mid_rewards: '202535227235322002404'
    },
    {
      address: 'erd16wtzc8led8ugjhly5leq5qg6kdydjkh409akhn8pcnv22s968y5qwqz3rd',
      rewards: '2207329948286254144',
      mid_rewards: '202496114622788993614'
    },
    {
      address: 'erd1vetyz420q0sue8a8t4lvu0nhqwr98fef0kqv2m4w3cfgwtkwwwnsh2ltdt',
      rewards: '1240675246760369237',
      mid_rewards: '201582569409094547019'
    },
    {
      address: 'erd1cnfznd6ac2cncrxc4c4y2djfzmxr68mda040d49fxeqjz28cu43sav2ku9',
      rewards: '1238858579219035373',
      mid_rewards: '201445540467214672619'
    },
    {
      address: 'erd1xj425p9dgle5pwmuhe6ed5wuywyrv4k9e29yy4pjxl884fjpfflsk7saum',
      rewards: '2193300266565529543',
      mid_rewards: '201437873421599942941'
    },
    {
      address: 'erd1rcnkx6jejffzgd974a43jfn3y2kjhrmurxwe8yenuecrk5pkx50s2kg0ds',
      rewards: '1945568915399539864',
      mid_rewards: '200751809984906134126'
    },
    {
      address: 'erd1etrcay9v4azn0h62hm00282tpgdre9d2vc78cpdv68tfaq7weq8qcqpxxl',
      rewards: '1467191780852763861',
      mid_rewards: '200668425945171105029'
    },
    {
      address: 'erd17gj4mp79ysfwdqch5m4j4yveunyqf9q96mmxddc5kwm6wpvlghxsdckhwg',
      rewards: '2181173122175045371',
      mid_rewards: '200523138212188776775'
    },
    {
      address: 'erd13lt3sp32g7u5yws29kvulemkh56688qtq7zt86mnwwnaj5e6k20qezyl23',
      rewards: '1341272597192464905',
      mid_rewards: '200170500701964857614'
    },
    {
      address: 'erd1u0x80kr9j9w4968g2g3c7x030tz46qfzc7ysqmhtuvwj573hznns4payjg',
      rewards: '1694851591419982393',
      mid_rewards: '199840518384106502038'
    },
    {
      address: 'erd1vcrc9gc2c0yrx3k07vxw7242h6sym2hwcgqm5tw264k2zp742cvqhef0w5',
      rewards: '1214177768288256086',
      mid_rewards: '199583898020463658478'
    },
    {
      address: 'erd1k87kv0d6nctw906v0pajm438hpzwqzynf6u4u7ka8shp2rmhf8xqnldxg0',
      rewards: '1810716224466765068',
      mid_rewards: '199580041553020073575'
    },
    {
      address: 'erd19k5w8xejw2qu4ff2gcj24jqfn58zawnfmdzytuaj6u6z8nl58fvqdpu7fe',
      rewards: '1205983255821125823',
      mid_rewards: '198965796278100917016'
    },
    {
      address: 'erd16f5w2sx70smfkruwfzwv4e0mh58jz5w5fmjfrjn8gsjwykh253yq2f8yww',
      rewards: '1194741194463103341',
      mid_rewards: '198117821765765345769'
    },
    {
      address: 'erd1xxkkqvg2rfa67km3qeapqdsukq8d7t8xejdyahxd8y96un8mluusdv6qr3',
      rewards: '2268238005063723792',
      mid_rewards: '198090332542292259743'
    },
    {
      address: 'erd13x2xn6y2e67nra2nnu63uhuvhdmzm3fum9wxx355046r6jt68vds0ekvjx',
      rewards: '1194267178584436777',
      mid_rewards: '198082067345757243098'
    },
    {
      address: 'erd1eyhaajk9qwgwyf0wczcnzxqul8s8wvapkqpjggf87t94zy5x2pfqxa32xn',
      rewards: '1432313868048046596',
      mid_rewards: '198037628962306643314'
    },
    {
      address: 'erd1fxyk4jy3srxqxgtnc8fz3mfm4qzksy99a8y8vxlclae48mzy9quszrktnx',
      rewards: '1430762464778535827',
      mid_rewards: '197920608569960144408'
    },
    {
      address: 'erd1ml68nuy9h2ttxqume57ye9nmeyn8c34l52vshujr9907mr5kl4ss5x7k4q',
      rewards: '1430271972603535027',
      mid_rewards: '197883611363695662706'
    },
    {
      address: 'erd18alz4t855s0375a2yrmuafvx3z8kruwr7v73qsty49glwapy9luqws6q08',
      rewards: '1429332780430833220',
      mid_rewards: '197812769282401748482'
    },
    {
      address: 'erd1jvqpjc6u9qs37gte2yh69e6r474y2d36pat5lqh9xcfttskpcwvqzy0x5y',
      rewards: '1544233592527997173',
      mid_rewards: '197479592652434707244'
    },
    {
      address: 'erd1zm0fkd052rkdxupxl0n6q42mjheszttc8h4t7ukyeefjhl7p6h2sxkzk9s',
      rewards: '2494454070532470271',
      mid_rewards: '197153525108968903853'
    },
    {
      address: 'erd1uk4mt2h6ds6je6hw9r5tfyhzsj20m4zhnwvknl4m9s3t459d7mys9hm4qg',
      rewards: '1295814734726114292',
      mid_rewards: '196741671457120591738'
    },
    {
      address: 'erd1j6s8wws4fjzdgsvxyguv6rnek3h4n8q6e8r5nzslvy37atf8gzwqqcq0ct',
      rewards: '2010030566177045656',
      mid_rewards: '196614071018857347125'
    },
    {
      address: 'erd1el79kzl9krvfkm4wh37rdmhe6h0pvjzpd4krh08nse2hxrglu5uqr6wzx0',
      rewards: '2009784652545880641',
      mid_rewards: '196595522063748236778'
    },
    {
      address: 'erd12cf9thngadl2zmh9ktywck77evgh8n2kdfn39w37490mlxqs8xwsc8fxnj',
      rewards: '1651726706181669548',
      mid_rewards: '196587662669759254366'
    },
    {
      address: 'erd1pytccva2u558nenje3yc55j8qfy3xc00ag9q0t7qfnjjklzp4has7ks93r',
      rewards: '1159820925714106412',
      mid_rewards: '195483829927433436348'
    },
    {
      address: 'erd1aqr5qak6avks6dmn7gkj6v8pvn6s90nk0hkela68rdexfr56a00qvcj3a8',
      rewards: '1988944658437656291',
      mid_rewards: '195023587586768451826'
    },
    {
      address: 'erd1m55stgnl36hcwnwfhrycka82rrnp7p3wxvcxzz8nr2erqp0qmd2qwgr0fj',
      rewards: '1857866659255112353',
      mid_rewards: '194136539393829935599'
    },
    {
      address: 'erd1ng5fes4g2rekwud9ns62885smhffa56xk5shzw2ykxclar4m6zaspunw65',
      rewards: '1975707247636820502',
      mid_rewards: '194025106382036896583'
    },
    {
      address: 'erd1e93n6h4d4lpux04fpq9cwt7lzustlf608e8fgmw9ecl06ur0h0zsxyps0r',
      rewards: '1258166466323729934',
      mid_rewards: '193901910044858894984'
    },
    {
      address: 'erd1nzxr807xzn03lylkhujkz49lf4mqurlsfqngu2strseer6euya2s07waxv',
      rewards: '2092819800492138668',
      mid_rewards: '193858758568519086358'
    },
    {
      address: 'erd1twrx8f4qa0qsu8ynhgqjn6vm6n4sn58n2nxwqhdskq3fupzmtgtqct6jp9',
      rewards: '1965527204008014783',
      mid_rewards: '193257238527843843046'
    },
    {
      address: 'erd18l4jszmcfy0xqt559lme3n0p6q8zrchpptjjgelpg58fcn9sce9qrt7smg',
      rewards: '1954852795181772059',
      mid_rewards: '192452081330187709259'
    },
    {
      address: 'erd196jndgmwvk3e506sdztaqhf5v8sl05gaqmvkf7h7ww8p2yey24esyfyxzd',
      rewards: '1233509209885924323',
      mid_rewards: '192042044283811380506'
    },
    {
      address: 'erd1808x0kankph3dfngj6wwq42yqtej33tek5wzpuqjrswnglm6x43qp25mex',
      rewards: '1948717782101027167',
      mid_rewards: '191989325029573449910'
    },
    {
      address: 'erd13jrqju5kw6fytcl05sk6dkp4u2nmhss85h8ujkwl40842luztfzq2vxgwn',
      rewards: '1465489672550415717',
      mid_rewards: '191540038062232180756'
    },
    {
      address: 'erd1d2s3r55lrsw5qgnv33x038gsckzqewaknw6wfkfvqfn2qzvqsnfq3n8pcy',
      rewards: '1817399234349049312',
      mid_rewards: '191084132561367019144'
    },
    {
      address: 'erd1tz77thc253wnnkhfzjurpj5zdk5uqx3kvt8fctxpk59s333kalqsn6aktt',
      rewards: '1217972818676978005',
      mid_rewards: '190870153885840954861'
    },
    {
      address: 'erd12727qtfx7c0mxyz6sccuux5s5f6ajt8yppg3a5d374jx9kj5aj0sz2k6pg',
      rewards: '2044476391199437980',
      mid_rewards: '190212276165150690779'
    },
    {
      address: 'erd1l4r0rt2erq3m4tedq32emqnf3j38j6rsxfc8y2p08dt3vjfzqqss3twq5z',
      rewards: '1088492206028960642',
      mid_rewards: '190103594544945570469'
    },
    {
      address: 'erd1507v7hy29d9uhxm75tx2uq5wgzpcppzgdwn8tgqz74wjzlpx7wwqdpmuut',
      rewards: '1085629902173794207',
      mid_rewards: '189887694574429137586'
    },
    {
      address: 'erd1rfgca6pptlckxk8emj6pe0g5s5unh46m8k59ls4jll6w56409jqq06mq96',
      rewards: '1321190905407770145',
      mid_rewards: '189655764013052566746'
    },
    {
      address: 'erd1cjm25x2djnj33nqcm90mntzgjqrt9zmjs5rwruaqqfslh3rt53eqq6fxjn',
      rewards: '1201332666270982542',
      mid_rewards: '189615008172586667967'
    },
    {
      address: 'erd1zfs7x923dk9yfftye0c6asm9tv5shluxfh9k5lj8dvvqcxphveasrccvu7',
      rewards: '1076289785533485510',
      mid_rewards: '189183181353855832601'
    },
    {
      address: 'erd1qw4c9wlzwkd7w2ja5u22ynckaq7j5r2mrl6e590vra37y77hsedqk82sxs',
      rewards: '2145856971442504460',
      mid_rewards: '188859285495033377531'
    },
    {
      address: 'erd1ljd7crzfxm6xjnjmygkp3jsw599ml9vfm06cj95px7f6e8pf2azsw4h8ss',
      rewards: '1902977857541755964',
      mid_rewards: '188539220196731969906'
    },
    {
      address: 'erd10aecqxvka388uty6maraw8tnm2j62286md8dj5x4jn6p7c82ktpqrejzxf',
      rewards: '1063215103123894891',
      mid_rewards: '188196974546480310639'
    },
    {
      address: 'erd1qw4qnrx2zpxya06qd7emx07949qtg9yvu3hmv26z0yjhjvpzf2jsr0ar62',
      rewards: '1898319549488697527',
      mid_rewards: '188187849894275629856'
    },
    {
      address: 'erd18le6gluac5c2cjjup07d0p6f7kg43qqeu4g28t908sjwk28k3j6syc24ck',
      rewards: '1059644878502953408',
      mid_rewards: '187927677005268185064'
    },
    {
      address: 'erd1x7zzw7yc47dll5xfawr0gy7vx5gljml9exlk7dwhezwcdv4ycxqqjs2ca8',
      rewards: '1892369639836736739',
      mid_rewards: '187739055711884718567'
    },
    {
      address: 'erd1rkczj442r0fgzxwdmztsy2zy935m53wwpuqwjwyhtgufxtlmanxqcyzyk0',
      rewards: '1175648852779556384',
      mid_rewards: '187677710507442016699'
    },
    {
      address: 'erd1xcktwy87fqx6jx843rh4d7z34edyejqg8zzmzm0jfll3auhj0g5s46g8d5',
      rewards: '2127811840721153152',
      mid_rewards: '187498164039087049857'
    },
    {
      address: 'erd1vmmcnnhcae0d4ap233qexrz45up2a9xy3qn2e5xrv28a8jy42wwsqnrmqj',
      rewards: '1170255712844063171',
      mid_rewards: '187270912762694446549'
    },
    {
      address: 'erd18d5zar4mwml5zk0wy93yu7mpv6prreknqqtq5z2ktssmtw4w55ystkkeeh',
      rewards: '2241434263662602136',
      mid_rewards: '187068560127114569523'
    },
    {
      address: 'erd19skm5sgu53vm8n2m4qw3rjaxl89tjsuxk5wnkf3yn7vpk26q9ncsuf4zgv',
      rewards: '2001940890312409723',
      mid_rewards: '187003876969224961408'
    },
    {
      address: 'erd1lmdlnje75cf3vrh2xxhrj35uwnedxyuca9ejzdx6rp548pncp3jqds66kf',
      rewards: '1521289999610548360',
      mid_rewards: '186748986369849728661'
    },
    {
      address: 'erd1zym9mae72nn0w8e6ct7allvym5ven87ul0mexrlzyw4mk62ktg5stpcjr0',
      rewards: '1040708837295170298',
      mid_rewards: '186499355294741540495'
    },
    {
      address: 'erd1q8wd6rudmep200x490k26nzmge0zdvycv4r7mjf82hufscdfcafs6sntw9',
      rewards: '2229579299605261168',
      mid_rewards: '186174355137021210088'
    },
    {
      address: 'erd1xmuxf76hp3vkpj8v3vsx4gzedgt47gpkg9derr0t6xr5ckurn3eqv0xyrr',
      rewards: '1748870684164455912',
      mid_rewards: '185915110433376593052'
    },
    {
      address: 'erd12gax60g45enx957f6arc8l8la93tp9v4km4l3jtla6sft6ajlj8sr3kduy',
      rewards: '1031161150150950254',
      mid_rewards: '185779185292798343144'
    },
    {
      address: 'erd1g6qy63hcw4mm82xemzpp404j6p9exw49whppcq7h5mdzwu7g7zts9uleuf',
      rewards: '1378853964197578924',
      mid_rewards: '185005215826191095437'
    },
    {
      address: 'erd1hus7mwd9e8gp7reprlmqq26j8hqwvflxzs288mpw9w2ce0kr0lyqgc34mk',
      rewards: '1497155730095207818',
      mid_rewards: '184928568852893029900'
    },
    {
      address: 'erd198pu89j3pnxuvdezv3lu3z84d6h29wf9z229dc500w8wggpentgszn8afu',
      rewards: '1018036837667134173',
      mid_rewards: '184789234951506020247'
    },
    {
      address: 'erd1zezlyl6sa7a45r0u3gchu66xyzrcd2njpgmqcajf77xz6qn95vystq7zy4',
      rewards: '2326728544242126683',
      mid_rewards: '184502200157714647299'
    },
    {
      address: 'erd1ztp7zzremfylksp90f6ea8lzg6v40yefjm3j2h0yftym9afe8uvqt2egtk',
      rewards: '1489009826289267786',
      mid_rewards: '184314133600549812908'
    },
    {
      address: 'erd17kdelflp2w7nap4hwutg7ekjgzh07vdzu9s53kxv5clj5eca70uqmcmcwy',
      rewards: '1844604241694906997',
      mid_rewards: '184136171960771902728'
    },
    {
      address: 'erd1fz7dutacffw0ef4rpdff30ketd2a2ttd5u79d3du5s3xkexzy4rqmjnd8x',
      rewards: '1599513992660704609',
      mid_rewards: '183649323527528734834'
    },
    {
      address: 'erd16ken3zhz5r4g78n42h69vnk4fh8w586qp5gywa9kv9hzukw9gcuq0uwvx9',
      rewards: '1354159906781019613',
      mid_rewards: '183142574213721112849'
    },
    {
      address: 'erd1r86nxtpc764wxmwkk87v5l70sajllx4w7rwcl7p0e6ffamg9z0gqelk255',
      rewards: '1709594317619784929',
      mid_rewards: '182952543631224834340'
    },
    {
      address: 'erd1elfg5a7y7n7dmqcntfjgcuhf7ve3f88uwaypeyfqucvkf5qs9lssg8w902',
      rewards: '1826851334808695469',
      mid_rewards: '182797092580224732448'
    },
    {
      address: 'erd1ryd5zcvjczrm6xzl8tm3jlcw7c6mfjwcf93gpkqhn0cqy3rgajlszwwaln',
      rewards: '988345703949895051',
      mid_rewards: '182549670174838152915'
    },
    {
      address: 'erd1tnqp282pkmm9z57qyrx95q8nxa07lnv5k30rt7rd85xl9ts29e8qsgz5ut',
      rewards: '1461607937076282898',
      mid_rewards: '182247243650169616560'
    },
    {
      address: 'erd1v033hkydgqppj55f9wh3kfn8f3ulkjgx02u27ztrlzehy0t20x6st0dfz9',
      rewards: '2170719801063601413',
      mid_rewards: '181734657382074978416'
    },
    {
      address: 'erd1t4krdc2873rdxvcgvm9ahpdh5vtwqkh0w7myss29umkxp3y2klwsmmu867',
      rewards: '1094826910438128447',
      mid_rewards: '181581413310658032088'
    },
    {
      address: 'erd1j3felzpmlcah02smlc8elqqmgykeektxnkhpp0jmegtwlnf3m24qrksgx5',
      rewards: '962736408885852674',
      mid_rewards: '180617993340705572432'
    },
    {
      address: 'erd1tzkvnkvhc45zmqza02gqkuktvsd7ryywgsx62l5gjuf34y9tlksq0tacy5',
      rewards: '1558408690819842717',
      mid_rewards: '180548802442217503427'
    },
    {
      address: 'erd1lsxgnkuwm9wrp47sz42nah9934jcxe8q07hvqj4eahm8hv68z8zsmku72j',
      rewards: '2273698116823629888',
      mid_rewards: '180502181887305844416'
    },
    {
      address: 'erd1s3cv6kfzfy3k0rzrrfvrxzjnahz2kr6jxwlkg2m0a7sqcs0klymqza3hns',
      rewards: '1555000339092571998',
      mid_rewards: '180291714769258130310'
    },
    {
      address: 'erd1dy42vea5fnapj54yh7scv3af6djugf7y9jdknrv55zgyjm5dqkjq0d849p',
      rewards: '956587037605740264',
      mid_rewards: '180154154019218277244'
    },
    {
      address: 'erd1s4qp05jqf2vlngxkdqg90cx26ydpujjgalkuqg6jggamnxdvsszsptg35y',
      rewards: '951704588924130686',
      mid_rewards: '179785877071784892219'
    },
    {
      address: 'erd1ns5y3uw5vk0llm3ynfwwmcahukzd0m6uj2vwdhl52fk54u5ef6lqclfa3d',
      rewards: '950879620935135399',
      mid_rewards: '179723650776634712659'
    },
    {
      address: 'erd1nh9rc959x07aqmzqwj7pwxze5autfjrp5fujhyxz78urp0lx3kvs7zq5ne',
      rewards: '1423983286261593812',
      mid_rewards: '179409263682766708915'
    },
    {
      address: 'erd1sds3fkgxk42lysfh5wntvdy8r7gexlkxepw325hwgffa6wkrcknqq9wg7a',
      rewards: '1417897050812486112',
      mid_rewards: '178950186617399721670'
    },
    {
      address: 'erd12zn9tzqc2ezunaepuwtzzv3hdqpjvuezmcc3l23c5ycyk0277pwq8g6keg',
      rewards: '1176212122733926002',
      mid_rewards: '178720197249833705138'
    },
    {
      address: 'erd18r6dvam3qkmnatxv9myc5ggtyydl67s67rr32n75xnw0aqxj92uqa3jedh',
      rewards: '936721749162261268',
      mid_rewards: '178655740361455809666'
    },
    {
      address: 'erd1lt4utcrjs5c593mzlk6cx4747r25u5hzwt3alfcd5n0cy695e79qdtdxlt',
      rewards: '932903735600370553',
      mid_rewards: '178367752412882259293'
    },
    {
      address: 'erd17ptxnfm46dglk0c5ellrnquhff4q5paa60mg0r7qsk4szyhz2srqth8pav',
      rewards: '1762104512140749859',
      mid_rewards: '177913321390170790764'
    },
    {
      address: 'erd1csn2p8ul9lhs6lyvw9pcc660nge9u2tqxwx64s2ws72u27c0kftq3nnv39',
      rewards: '1280849735504466600',
      mid_rewards: '177612880436244051222'
    },
    {
      address: 'erd1hhsrgt5gzqxklfj6e4qmxl6phnrdkkmmuvcryr5jgcae745spusqznjpzn',
      rewards: '1993818146852202972',
      mid_rewards: '177391188672555908858'
    },
    {
      address: 'erd14tddx2dukun33h5klcrvlsvr8ylelkdxa5ql4n26wlazyck2xw9slnrrg6',
      rewards: '1396869105742847753',
      mid_rewards: '177364075236400967627'
    },
    {
      address: 'erd1el5up4y6snjpaxlf99uqvl9lh0kr74ktf8nk2dem7snjc8ud2vcqr60s9d',
      rewards: '1276958427966151281',
      mid_rewards: '177319364015450285081'
    },
    {
      address: 'erd1afmk2kedt73g2puh04tkthn377wd0snua3xe8fpmrn4hnty7w23s5al3ly',
      rewards: '1272394925081503109',
      mid_rewards: '176975144747300675365'
    },
    {
      address: 'erd1mhfzfd88nw9s8jmhvx45tyglm9jutuapd9hj5szmzqfjg56cuz3sq9e8vq',
      rewards: '1027429600387469747',
      mid_rewards: '176497719199510634615'
    },
    {
      address: 'erd15kq3mqjzmqqdnd5x8t3lrgtpmzaag5rkteh0dh6kvrfr8nsw80xqdz0uqk',
      rewards: '1623368703378221679',
      mid_rewards: '176448654276880815514'
    },
    {
      address: 'erd16ce5j7zhpjeuptv0que4rzqjndhd2lcl9kphvd24q2xl3jmscc9q4qkthv',
      rewards: '1620176092023204601',
      mid_rewards: '176207839628158436601'
    },
    {
      address: 'erd18fwz2elqqnzp9tq36zdkdjkndas3hfg2lzsrl6spv5m8aykv5efqjg9w0l',
      rewards: '1374531502844221938',
      mid_rewards: '175679178016800684038'
    },
    {
      address: 'erd13jmka82lyyw3jzwkxke3vg9a8am8ts2hmq07jnm8k9tr2tufpuqq72yfxk',
      rewards: '1836330960509409425',
      mid_rewards: '174512128793307691612'
    },
    {
      address: 'erd1vltqc0qp4uxhfwekpvp9qf849hmj9crt630gvyf4hktgcneltklqx0x6vl',
      rewards: '1227717297330500830',
      mid_rewards: '173605167623182707313'
    },
    {
      address: 'erd1nccm4j6tm6cfpdh6ddw67ew66ud8c938jk3fn8u4kgnw09f4zpaq0e2x8s',
      rewards: '1332645632326521468',
      mid_rewards: '172519779620469061062'
    },
    {
      address: 'erd13ejcgw5p09pdphy7qjyvmldwl6hd5d86zssp88v7fkfn4kskt3rq040wf7',
      rewards: '1210286034661046965',
      mid_rewards: '172290349460321918087'
    },
    {
      address: 'erd1w89pesxj0eldtqlcjcznd8kuswat6xjuf5sqs9y5qfplv5v69els5ct4zl',
      rewards: '1329107000360594844',
      mid_rewards: '172252865073387321857'
    },
    {
      address: 'erd1gn83fkplrwn5x4knkeum8jx333k3twrsw5xs3z22e3qdk9zmmmgsprdp0m',
      rewards: '969584974412175084',
      mid_rewards: '172134572002521646531'
    },
    {
      address: 'erd17htx2yhr7hxu57cdttrfeu439t7nhmmmzghh6n3929z938prq57s2m0pv5',
      rewards: '845102048774531187',
      mid_rewards: '171744981890886252787'
    },
    {
      address: 'erd17ey0qj3jr2wktceptfn50ry78842474dk5avecyl047ezxvuvwtsvne5hu',
      rewards: '842466177403031954',
      mid_rewards: '171546161437088309233'
    },
    {
      address: 'erd17q63v63s49h8hrvnf7fjse38zmgeda0arpw2g9egn5w607cwd4vs2ghcl6',
      rewards: '1793852178112010960',
      mid_rewards: '171308007801534433906'
    },
    {
      address: 'erd1vg8pdr8a2zsf2t48vupnjaz32wcqyzxrel7g80me7ls3697f38aseuzl3a',
      rewards: '954371285388797654',
      mid_rewards: '170987022623490965902'
    },
    {
      address: 'erd1xwyc2zzrsygz7y0xkr6nf5pqlvksr2yx3e2h0ask3hxfq4ds9lesk4k86r',
      rewards: '1660172103909965281',
      mid_rewards: '170224688371012965119'
    },
    {
      address: 'erd1avsdspuexjhluzjdzydcch4g0l2ke6ts3ttn0mj9d4d3xmghdszqc7t6e3',
      rewards: '822013564473430665',
      mid_rewards: '170003446633936087467'
    },
    {
      address: 'erd1phjk3ktvztcc85gq2h77wws440ctxqwulydgnlrd5cghl56uyfpshthj6k',
      rewards: '930123290622363235',
      mid_rewards: '169158026954248365173'
    },
    {
      address: 'erd1vmf2jygtvmgdnzuwlgc8e2r4hgu5hqvs6ezycg07rg9z88pxtvmshetsvt',
      rewards: '1515846979359219786',
      mid_rewards: '168338426215776270012'
    },
    {
      address: 'erd1edu0esw3x8h4xy6k698g5vv60r3qf0dvezzqtt4224hkeamszt5sy6ewfs',
      rewards: '1276860956349118991',
      mid_rewards: '168312011854286306636'
    },
    {
      address: 'erd1a3lfl4xrhmdgj7rejkpsjjtpzax762fg3etu5gk8k59egz7602tqsnqpt0',
      rewards: '1396036609821049023',
      mid_rewards: '168301281118771920419'
    },
    {
      address: 'erd1h4uhy73dev6qrfj7wxsguapzs8632mfwqjswjpsj6kzm2jfrnslqsuduqu',
      rewards: '1992365247373774018',
      mid_rewards: '168281598296960403744'
    },
    {
      address: 'erd16wx7fmqtmnr5wdsfmmg9hh8t25lu6uvwg6eegx60e2qkkgddwxvsg0lvzf',
      rewards: '1512969129723346071',
      mid_rewards: '168121353646623847269'
    },
    {
      address: 'erd1eekp3n84ujf33gnepyyydgw07plxc5nvm74lfl4mzh8thrlz05wqr0epf7',
      rewards: '1985234933748972207',
      mid_rewards: '167743767731351876890'
    },
    {
      address: 'erd1dt9qupe28p648s0q8n8te7nqs8g7aq7e5z7v5h2nwjdg0ffdtzxsu0x3rk',
      rewards: '1625936449538498365',
      mid_rewards: '167642336131900077545'
    },
    {
      address: 'erd1p457ct7r894jn42uww2u7vsa4mjjwtyxtv5phanvd8d5heeph8hq06asgy',
      rewards: '1265228802287076644',
      mid_rewards: '167434613141181642963'
    },
    {
      address: 'erd1ze6j3694rtduy06pw9u3fuaa98wjueeagffa8rnkczht8j7tnx4sc92u56',
      rewards: '1619875287101720751',
      mid_rewards: '167185150292236836893'
    },
    {
      address: 'erd1x5wjqw5cupjk6cyfrqjm2lhgau6sggt9qrw3d6vpks5vqhvx7c8qt5vtw5',
      rewards: '1380711593760707710',
      mid_rewards: '167145334481723087635'
    },
    {
      address: 'erd1y3tjywm2z7n6app2ydwnrlssqs8xydsean2va5qms4kv8hq82gqqcgrk3w',
      rewards: '1021934375639011145',
      mid_rewards: '167083221326046953199'
    },
    {
      address: 'erd1zhetzgf09p4mknlquagcc05aap3d58gv53ymtcrruchww4zlgn9q65f4e8',
      rewards: '901866727847783255',
      mid_rewards: '167026670054834616449'
    },
    {
      address: 'erd1njrcgmaaw89mvs6p8mp3tf8qs96c2xglcvzdg2624l4re02ddq8qwj7myc',
      rewards: '1855447944450102957',
      mid_rewards: '166954098786014444326'
    },
    {
      address: 'erd1wfj4sj5nfy7e7kdrldrh9vmgh2gheymt8r0hc0mhfhlfnkcnw50qs5u3wz',
      rewards: '1139044637374404808',
      mid_rewards: '166916700696242270788'
    },
    {
      address: 'erd1jucm84ukrz6eg5favvxs9deefexk4gyql3gxahzzr8kgn48vk8zsgen8he',
      rewards: '1614018838061672697',
      mid_rewards: '166743405725951492335'
    },
    {
      address: 'erd18a63302p4ztamekqyr3glue7j7vn2vd7ffz20ztqf94atryynr8swlep93',
      rewards: '1133619165229923388',
      mid_rewards: '166507464173740659868'
    },
    {
      address: 'erd1n6q0cddd4jv570n0t7n3ue9jnuug32xvttfagxakn59f4h7q3cmq2z37va',
      rewards: '894258228415049342',
      mid_rewards: '166452770536711642339'
    },
    {
      address: 'erd1akar9lsg2ydh4uu68ecv8qfpr4fpa4fu7ajka4wrls0z56qfdkasx5gmqf',
      rewards: '773719407113027180',
      mid_rewards: '166360679241715669805'
    },
    {
      address: 'erd1m8cxqjcweaqryz2r8qhsz9n37fknq25rex7catn95k86qyse0xvsa4393l',
      rewards: '1012353914538692676',
      mid_rewards: '166360579225922221107'
    },
    {
      address: 'erd1fw7l5wxhccrfv7sdx8lgm7tzu952aw6f69ga74ejul0gdfy9yavqu099xz',
      rewards: '1129942359499032669',
      mid_rewards: '166230127353800626236'
    },
    {
      address: 'erd1h8tzzz4c7y3zq2ags2ux9sa3lsvt5p2e3vzffdw5q5qa62qqnq6s4r4343',
      rewards: '890872817314285873',
      mid_rewards: '166197413246282273458'
    },
    {
      address: 'erd10gx3uwvmjj6d50djh7j5jq0r3pcxnmfndrgc7r5h6uffezdhw6yq7tnufw',
      rewards: '1008314628766124191',
      mid_rewards: '166055900993514825769'
    },
    {
      address: 'erd1sfwtsmp8g9kuudaskg99cjlqceujnn802h5v2sep5gj8c9wm0shsh92y0m',
      rewards: '1127543807009856390',
      mid_rewards: '166049207564044355251'
    },
    {
      address: 'erd18frd98t4fdwu3cydynqf7f3a7jwg8a3p37x9mu0sska7036f6c8qjvpnyj',
      rewards: '1363202786508041250',
      mid_rewards: '165824667228731951349'
    },
    {
      address: 'erd1qgey7gjn98hgtt4tg2pmgqkw0ujspe3dx2nxasaq373zwawqt3vqalfn06',
      rewards: '1119567483620608841',
      mid_rewards: '165447563548696465079'
    },
    {
      address: 'erd1ps0une824hwqz68lp8ectzphttlh79n6v682k8skh7xmw8v45pqqqs3gsv',
      rewards: '759925480325312088',
      mid_rewards: '165320220737843671426'
    },
    {
      address: 'erd1w4v3enr9dh9fl9gpw3g4ud8xh069knxd42ae74lnjtyujg29zmxsqjkaee',
      rewards: '1114640358852572598',
      mid_rewards: '165075916740399113283'
    },
    {
      address: 'erd13p0sgg8cww04hxw0gmftw278q6sazywu745kc50mst8wmgt67ygsal67mt',
      rewards: '1113070384216359491',
      mid_rewards: '164957495533280189913'
    },
    {
      address: 'erd1ve8fhl58tyw20s5dg42htgtgnw7wj28lu3khspfeydw5vpr6f2rspdzlhz',
      rewards: '1708790088445109505',
      mid_rewards: '164891881638687783128'
    },
    {
      address: 'erd1hc4ny7d4a99xn6np3nccyy0atx2m5za5pmjfsjns7x38dzvk8f5stds7zl',
      rewards: '750691874844916427',
      mid_rewards: '164623741519755248815'
    },
    {
      address: 'erd1nqrh5euajktwvx55nj08hdw9mkjsv9aa6n20773aurhjqepudststm69y7',
      rewards: '867921893539568269',
      mid_rewards: '164466254006377499725'
    },
    {
      address: 'erd1dwamtuc4pu0tfznx5rvu559fjdvyyrua7tn72pdp4gmk8k60knxq83ha7k',
      rewards: '865609120541745428',
      mid_rewards: '164291804455488668969'
    },
    {
      address: 'erd1zuu7yynwrgdgg50fkvyem6pdhn64guulakzdp9w65vcg7gjne27qxsvl68',
      rewards: '1936690749142776292',
      mid_rewards: '164082141099258146855'
    },
    {
      address: 'erd1fcftn8xrjv5vzd9psk4kt7s4cgv93pl2py4g3ut77ukq53fx0e2q36uh6y',
      rewards: '980870384194335973',
      mid_rewards: '163985816231828923321'
    },
    {
      address: 'erd1703zdrekxerd8eytnw09fdzszn2tpcusxrypempdlw0npet2yaps35pmfu',
      rewards: '741180974691109718',
      mid_rewards: '163906346314111644717'
    },
    {
      address: 'erd1g3spqyy5hj7fttunn0kaak99qzsma3rn9gm6jg99jspq854zfvcst53fsr',
      rewards: '740869751640075419',
      mid_rewards: '163882871151815001564'
    },
    {
      address: 'erd1994af3uwfetfgx8lw9twah0vczv5ymaqj08cs2m52hfxq3dqmcnsldfhgf',
      rewards: '1336812768118213437',
      mid_rewards: '163834101418603925453'
    },
    {
      address: 'erd1xzt030t0udlxct4lye0zl2unxkwalca8cj468nv3vy923pu73gnqmpxwdd',
      rewards: '1933218556752846100',
      mid_rewards: '163820238005615518463'
    },
    {
      address: 'erd1dnnwdx4tevfy3ct9fefe9uakcugkt3758u7z0wml8zx0h5mh63ksch899p',
      rewards: '738670691929784361',
      mid_rewards: '163716998850815669715'
    },
    {
      address: 'erd1z78tgrfhak54q0al6j345kdxsjqred4l4ggm9dse7vzdp2ljdnts0ly80j',
      rewards: '737742192080139843',
      mid_rewards: '163646963277967270142'
    },
    {
      address: 'erd1uz9wnfndnxh640nv79xffw52zmsmh4n9wpzrulj4m920k85qjjwseuejyx',
      rewards: '2049866551743528448',
      mid_rewards: '163618849178161674507'
    },
    {
      address: 'erd1txe8y6klpfy3xjqt3z5lvr77w36cq7r4eguztzz8vhvj0s6gc2jsnlwwfp',
      rewards: '1211898524684886236',
      mid_rewards: '163411977549518862411'
    },
    {
      address: 'erd1satqrsxyekcfhzf53anjny9usuxydvszn9tnd35n20tx9r75aczsjq5gf9',
      rewards: '967640874063526717',
      mid_rewards: '162987930964674963017'
    },
    {
      address: 'erd1xkhm67flh8f49l78g7ws5xgh07ta0a2w3amq7myvumh407kdamxq0mxw6r',
      rewards: '1324236519769161241',
      mid_rewards: '162885490863904510135'
    },
    {
      address: 'erd106dj7gq2hvfg6rrptduhdzxat6fhul2x6nnz6r4jd0jgtuughezqnz77t2',
      rewards: '1204825786331901461',
      mid_rewards: '162878489814062814558'
    },
    {
      address: 'erd1ahxkwpgwzmxcc8rz5afkqgsl4t9wh2apxg6y2r8sqe7999u6y5jshgsatf',
      rewards: '726946498609981736',
      mid_rewards: '162832657732556874380'
    },
    {
      address: 'erd1r8ktxe5z723u5ps4rc203n8xajk03ag5fp5xyklf0c2qhc62k6ksuvsuz4',
      rewards: '1678451215932211376',
      mid_rewards: '162603458741442428172'
    },
    {
      address: 'erd17qyv26ghxnmspgde6d2la2jy09wqfqpclutncl9mdj7a7sm425qs26khyw',
      rewards: '1079839251887320876',
      mid_rewards: '162450913125155692065'
    },
    {
      address: 'erd1pjevp7lh5cacrjaw9pyk6www9a5hs7er9gll8k5vpn86r9xpalwqr5qksy',
      rewards: '1671659391503637243',
      mid_rewards: '162091159989080694907'
    },
    {
      address: 'erd1aaac4f6c3jse9sv50am0jca89sz8ek7xm2rhzak37y02wfsqkp4qz7vdhy',
      rewards: '836339090294772202',
      mid_rewards: '162084002982584191912'
    },
    {
      address: 'erd1a9chyyuj4f02kum3mx6ae5m3j5df32a7y09uqj295v478680vunsg0qa6n',
      rewards: '1426773251526772075',
      mid_rewards: '161619707244657112635'
    },
    {
      address: 'erd1ej02rywa4486hs09exhxcg27vltmsgld7k3slmz48gp5wu8exj5scc9srx',
      rewards: '1542204673701020711',
      mid_rewards: '161326553863721276705'
    },
    {
      address: 'erd14l6xwrw5h6840kvve2uwj4gk00zss3tcx4a0a5kvkcurxl4r2kys3mwpz7',
      rewards: '944869570609621867',
      mid_rewards: '161270320259073292074'
    },
    {
      address: 'erd1lz3xqlk0tfu307tc3wjn6fj60xps9yy82nn5l989luc7fvxxc78q6farrh',
      rewards: '1178735968149026934',
      mid_rewards: '160910567727001874699'
    },
    {
      address: 'erd1s4nv2frw0gkg2exa68kgdh4vs3zgz087l6clwex4mkun2gvvduqqs4d52p',
      rewards: '1294027779170813794',
      mid_rewards: '160606883652881296516'
    },
    {
      address: 'erd17nzaj5dw79hsuutlxt3q5p93c6pd2dzp9845cahj3zq6uz5a9m9scjqyrx',
      rewards: '693214788127639153',
      mid_rewards: '160288317345542601093'
    },
    {
      address: 'erd1r5c6np3v8ufczd4cld774myzn654eersfrl73j5tjjwrw2w2upzqslk52e',
      rewards: '692704557928838839',
      mid_rewards: '160249831325031974327'
    },
    {
      address: 'erd1k0lr5y9vdrxpuagw09vh4hdsh5vu97p9qdkanvewj39649wa9l8q67srp4',
      rewards: '691685372799653193',
      mid_rewards: '160172955475899187907'
    },
    {
      address: 'erd1gkdx909l66e80uzc45kjy86h8kc2qrw3derk363le722geu8lsgsnt93zf',
      rewards: '690355024805567652',
      mid_rewards: '160072609004233983528'
    },
    {
      address: 'erd1unusxzgn7p967p7ufnjrg3l3m5f9ph6ce96mlvhqf6xjsna4ru7qw7ppsw',
      rewards: '808935956495744238',
      mid_rewards: '160017019154648151777'
    },
    {
      address: 'erd16592q9c9anenpc0fzae7xz2fgstxakwd7dqwkuq465f9rf6r6gwstxesla',
      rewards: '1999873944147574572',
      mid_rewards: '159847969826368175256'
    },
    {
      address: 'erd1ranmuwjk83f22qy6yn0dyvc0u0esf4nyrk7wlrev4nladyjqxqqq03wdes',
      rewards: '685352057057443723',
      mid_rewards: '159695241455584326375'
    },
    {
      address: 'erd18qkst84nc3ngy94968dy5vmzvklj2k42w3gpq2ratjecq6hh4tzq5perac',
      rewards: '1039000632951819842',
      mid_rewards: '159370507595116735540'
    },
    {
      address: 'erd1zzv9ak6prvg47jqftgvam3q4me3a5ue4udz4r4a6gh04t9p0u08qtpuk88',
      rewards: '680120581153700004',
      mid_rewards: '159300637824898155866'
    },
    {
      address: 'erd1h9wdt2ful8ch2krszgqx650asq83vc3ez8jkfp7jrd264qg7lefsdq68qg',
      rewards: '1153321846350479779',
      mid_rewards: '158993612566178001741'
    },
    {
      address: 'erd15794udfs0cgat7ecyl7xn3wv5evze8g9h7q50emwvz5rphsfpl3q6nh3ce',
      rewards: '671006552298168782',
      mid_rewards: '158613178120840742996'
    },
    {
      address: 'erd1lyrdgv528wcmj65dczx33vpn8mzxjrq05ksqpx6slzr6j532hymqgn3xca',
      rewards: '1027021894665600811',
      mid_rewards: '158466966471014670675'
    },
    {
      address: 'erd16a8ktqzdlds8wq4kugvcl8jeaqqqlakx7xearff36rss6saqs5kq8s4vpw',
      rewards: '1382761588873365074',
      mid_rewards: '158299963028088868493'
    },
    {
      address: 'erd12kaqj5nltf2nhz096euu74vrqstsnm6xhwp56gunucghajckwlas294kx3',
      rewards: '1618860983398056346',
      mid_rewards: '158108642642875787430'
    },
    {
      address: 'erd1pdzzsnhvdlydsgu8czqxtt5j5s80l7cwzgufla25xyqdrgq9eeyqj6t78y',
      rewards: '1258923893827701154',
      mid_rewards: '157959041846390222278'
    },
    {
      address: 'erd1tr4g2002urjhfwt3jt8rkvp8saeuzgnz05vlqmj0f9um2rdvcddse89cgy',
      rewards: '778959824494424580',
      mid_rewards: '157755957316786324022'
    },
    {
      address: 'erd1vwjdkaz5077307mtnc9l0nznd0nsxtxn9upwdj6q4ymfpwn5qeyqcq97al',
      rewards: '1136555157636712437',
      mid_rewards: '157728922378786946996'
    },
    {
      address: 'erd1lsmfmj94vh3d3uht7u5df5yk6gxhqm6n5dlw36usvp0ru7ut6q7sn3yj3a',
      rewards: '653556885064205538',
      mid_rewards: '157296971724886611673'
    },
    {
      address: 'erd1m7c2khzvj4h5gfdrx7gj58smc37htnzejpsrslzkp7ltammly29qle5rtz',
      rewards: '1485443996297528824',
      mid_rewards: '157045167540676938706'
    },
    {
      address: 'erd1jxwy2gv6zkx8rq3ct6nqjkdgjmwg7dtld0w3qzvj6d3ae7xhzz9qlus42r',
      rewards: '647085301702570652',
      mid_rewards: '156808828352389785914'
    },
    {
      address: 'erd1fg0at59v37xy5j40jka2dwytg0zvjxsl7aaukg5phmq0lx2h40zq5eqpvp',
      rewards: '645848946218265241',
      mid_rewards: '156715571617215578790'
    },
    {
      address: 'erd1n0kvceh0k3jnvjrrhms3884n6rx88ysqrtv6rg9p6fd89qhr8efs4h5ndq',
      rewards: '636666864681288049',
      mid_rewards: '156022978785209073741'
    },
    {
      address: 'erd1w9el7dgnj20g0svyg6xzhg9ls4jjlef5xjwdzn9k464vfvy9l6dqceh4uz',
      rewards: '1707518952584468696',
      mid_rewards: '155796001463583601751'
    },
    {
      address: 'erd1pw9kngz2zpfqpuh2sp33dxtgl4qkrmqmpns6wzmurqqfuhjnlr6s2x392e',
      rewards: '990025483699722776',
      mid_rewards: '155676373843216092792'
    },
    {
      address: 'erd1age6lkky4hc36d83xf2ja22pewtn957v328emx3w4a4ezdla383sz0aaym',
      rewards: '630447240642434731',
      mid_rewards: '155553840386716560266'
    },
    {
      address: 'erd1r8stusnqg5fx324d2y7vggp7fe47dhjhtlqgm5zlaes80nr7kxfqd453nj',
      rewards: '868307288790820746',
      mid_rewards: '155495323884207694236'
    },
    {
      address: 'erd1n3s5kal04mmhmcg4gatddla82jsljggl7ammsj5kch4awsk4qv0qf3x080',
      rewards: '1464196664492569956',
      mid_rewards: '155442508094873010378'
    },
    {
      address: 'erd15ejj2ks2c7shx2nwla8n3fteu6a45r9qk2g9nf66ace4c4dhlr0qfadlrm',
      rewards: '985001312984653638',
      mid_rewards: '155297406981506059894'
    },
    {
      address: 'erd1l9sgjvwpjc47a43vf73jt86jgvhseevvx89avhcedahe64jg8lcqrj7max',
      rewards: '743219688898400956',
      mid_rewards: '155060123956010539877'
    },
    {
      address: 'erd1v2vz270qxt4r90mep868x5klf4c7v7nsexje7kmy7eawfuyn887qgvfrzz',
      rewards: '1935534499427851279',
      mid_rewards: '154994926641257345716'
    },
    {
      address: 'erd1d0rsxh5f95gtjr4g5lf5fplpntjk55tk3f0thexfgk5at8h7kt4q26rh46',
      rewards: '741567758085790969',
      mid_rewards: '154935520897850264683'
    },
    {
      address: 'erd1xtsvzzz950gc37udg79gz2n88s6mmy9552mvl2fdph7ydzpr6nhqz6a2rn',
      rewards: '741493335357992727',
      mid_rewards: '154929907285337256816'
    },
    {
      address: 'erd1rf3yrcuzk0mf20glr29353hqtkyz7tgkxhvhmnz2ywsjndmasm5s0j3njx',
      rewards: '977633965986876313',
      mid_rewards: '154741697287465919199'
    },
    {
      address: 'erd1ttcvwpvuk3tfcrcddqknag449ml7halv0zr99jtj8cfjr0lkw77snxxu86',
      rewards: '1931935624599092768',
      mid_rewards: '154723468050996629055'
    },
    {
      address: 'erd1yk7pj8w84ttv55n62yxyal535v3wpzdh99qw6y8aavp7euxjhekse49qx6',
      rewards: '852187908961327523',
      mid_rewards: '154279459389720470294'
    },
    {
      address: 'erd1vs94pv76llgqzyrge4t240p7jrxtstnc8t270p0vaz7d3ucfvqsqmrxrpd',
      rewards: '1805132025629832485',
      mid_rewards: '154158832476256439922'
    },
    {
      address: 'erd1mdhk3726tsxtmpcftunnc6709asd7kaguud3xg38zksnqv7p6nwqk8a8fk',
      rewards: '610830713033754687',
      mid_rewards: '154074190445043073056'
    },
    {
      address: 'erd1d0gm6h0k9wzh7d3lsmscrrvy0edhd2a8ae2dj4cpmdhvv4ffnhlq890gws',
      rewards: '1200596570966925048',
      mid_rewards: '153559485431995572783'
    },
    {
      address: 'erd1dwp6wts9k7vl5jsrnk030gszlk0pz0mz043s3lv4cj9km7thjvjs54gfw0',
      rewards: '603158901051694022',
      mid_rewards: '153495515341159595844'
    },
    {
      address: 'erd15r8c2vth9fk2p7x50wd4peute4t78z3u4lhdqrlf9nal7lm3wzmq5t04y2',
      rewards: '722320230022177280',
      mid_rewards: '153483704126563843447'
    },
    {
      address: 'erd1npf38z89n4zx7s52lmhd0aqy43ck8u8g6zyl2wukngw55c4hys9sa4szm8',
      rewards: '588467282866025379',
      mid_rewards: '152387345107101719811'
    },
    {
      address: 'erd1c9ndfehsh5fajt8mml2g2atpvt8gxl8ku5dcene2g4g3rm28dx5sjtvl7q',
      rewards: '587633669399290165',
      mid_rewards: '152324466694467304050'
    },
    {
      address: 'erd13he6sk94hd2uw744ta8dzfvxu02ercn9fmdy4yuam6xfqg9p8wps660l3p',
      rewards: '940917798079016712',
      mid_rewards: '151972243040155633927'
    },
    {
      address: 'erd12hurcun2sa9etne5ex5xpj5swvjwd8jksgql6erlf9ny97thqdqsgyrnc8',
      rewards: '1298318113891235065',
      mid_rewards: '151930498190860081418'
    },
    {
      address: 'erd18tl4td3a2542rzp9aw9fp49g05jmjypykd59ndjan7u8utqy8jpsygzpjr',
      rewards: '580978487594331602',
      mid_rewards: '151822474722902668999'
    },
    {
      address: 'erd150xtr9vx3d4n4h8kmuest3knjakk79egcdutu9jlv0zvukg34p6qev5y6l',
      rewards: '578888456952794917',
      mid_rewards: '151664826347077114522'
    },
    {
      address: 'erd14rgjx495cdyvekv3stmkgdkjz8cfm2l3f4k523mrxseezayjtzyq8lvtxf',
      rewards: '813289427231994924',
      mid_rewards: '151345395962688339064'
    },
    {
      address: 'erd195snguyqswsdsh5evumqpls05tntdznma83xgzk5560fg6yyflws2n5dp3',
      rewards: '1288470002097647696',
      mid_rewards: '151187667536441522178'
    },
    {
      address: 'erd1fk29gsk5sl2qvfmsgxfnrjzkjnjmhzwkc4qr875rt040m34p3ensatjauw',
      rewards: '570479589872529955',
      mid_rewards: '151030556106540320226'
    },
    {
      address: 'erd13w3jklhtvnut76uszf37axmv9hl9myzsgyvwjje3q5g4w0d0sh6symx2a8',
      rewards: '808442338549652905',
      mid_rewards: '150979786175411814173'
    },
    {
      address: 'erd1296mq59n5m862wg2kkjgkyhuzga50hmjj6dhfjdyqz9ad95xs9sqank0e6',
      rewards: '1882196027829517069',
      mid_rewards: '150971672986797820005'
    },
    {
      address: 'erd1cs7cd9xvmvjhl3z43cshlrh49aclepqgwhxnr5c2dqc9t9j3es9s8dp4z7',
      rewards: '927069198502931378',
      mid_rewards: '150927660636797604195'
    },
    {
      address: 'erd1788w225fcrtwrvakaa78y2vy0p88ynj926n0vakkp7glmfaquv9s8jka95',
      rewards: '687520475844548580',
      mid_rewards: '150858802550385002415'
    },
    {
      address: 'erd1y88ghnhhd9ny2f9tfwz0xrcarccgsehehp792ljgcupuu9ld8zeqh0n9jt',
      rewards: '567644371316237977',
      mid_rewards: '150816699145964243244'
    },
    {
      address: 'erd1748l0rvu736w0wh9vge5htgar6fh7v65j62jws5hfdmn8dwtktrqs5af7h',
      rewards: '1640551264067749454',
      mid_rewards: '150744713163001470135'
    },
    {
      address: 'erd1lnc4k2hzdlywrvagkspv0ul9ypvqe8t76gzcfcg9gflxz6f6jyuqa7u4x7',
      rewards: '562374743452705205',
      mid_rewards: '150419217761059654258'
    },
    {
      address: 'erd1sccpqcn5teu6g7dkcqzjh7fc8lhd8rrnumfjythcuh5v95z3rrvsl05cqk',
      rewards: '561741858383427619',
      mid_rewards: '150371480038333016568'
    },
    {
      address: 'erd1ypt7pdcapn73qcy573sl076u6uklxm757j9lw605udk9eevv6j2sethxkl',
      rewards: '1874201750587835255',
      mid_rewards: '150368674735000079260'
    },
    {
      address: 'erd1g60n900g2gcmelpn90hpd9s5j67ra5lfuu753xuhd432xwejvs4s9j9ma0',
      rewards: '559172270314713948',
      mid_rewards: '150177659250482943705'
    },
    {
      address: 'erd10pes2mf82q05ppvgvs5lydllw0ra8j077cxc0f7keh57f9zpnfxsm98gfh',
      rewards: '1632807303847462405',
      mid_rewards: '150160596008485327603'
    },
    {
      address: 'erd172gxp69wy6arhydyymfeapt0qp0xp4j57332hctsw5jm3jryl5ls0vgec4',
      rewards: '677283408818513999',
      mid_rewards: '150086633493243758643'
    },
    {
      address: 'erd1qnmu7fpuu7m6uvmsy3ptqx4vgkwqdgqlr0wc8navzu29d6d9yujqqpwm9d',
      rewards: '554854053572510603',
      mid_rewards: '149851941606759524893'
    },
    {
      address: 'erd1zkye2g9fe6wcypjqndcd5scxuvycac6s7jpszjdef22aypp325as4lec47',
      rewards: '1627120889215172820',
      mid_rewards: '149731676923168948157'
    },
    {
      address: 'erd1kjjp86zx8mesm8mj5gcz9krlc83zsg44m9njwfayk2gpppfu6l0qeuslg0',
      rewards: '1030352526354027009',
      mid_rewards: '149718191819446624811'
    },
    {
      address: 'erd104a0cnfnavxu2h9fumur83mjsjvs6f8tkljrrkg6347gfk5kjt5sx4kfz3',
      rewards: '1268429541945084437',
      mid_rewards: '149676040897549066766'
    },
    {
      address: 'erd10ymdmu9x8mpn2j5katugkxyaqwxsflqa3wwamchq9dngz6ry2ylq5r907d',
      rewards: '1148445255813937246',
      mid_rewards: '149625777491240079801'
    },
    {
      address: 'erd1h8a7tmhwegu8nrzdgrptczlzw94s9sqyef4xp024f9hjeaq3xqzsc5yc5e',
      rewards: '1028653367983150316',
      mid_rewards: '149590026446118817535'
    },
    {
      address: 'erd13t6knn8e7qy47fkfn7tapf7smpmwzgap8fvrs85xua7xs2my5yjsqtwa4s',
      rewards: '1624034539549684674',
      mid_rewards: '149498877459694953280'
    },
    {
      address: 'erd1a6258qa96lpsw4a97mfs9nm2s0p6p4y9f24e96uyqse9ja3z9lxszf8z79',
      rewards: '1146720756733420690',
      mid_rewards: '149495700700138007682'
    },
    {
      address: 'erd1mqrqq7tyz4ue3rjkn42a5xygcgzgrpt5x4kc3ul34p6h7anhvnasg6greg',
      rewards: '1622078514363323954',
      mid_rewards: '149351336946376487419'
    },
    {
      address: 'erd137x5ke4uvdz539f85cazexnsy9r049mfv50rq948ryc7zeqjs6hs0znntq',
      rewards: '665989870201906368',
      mid_rewards: '149234776116204378996'
    },
    {
      address: 'erd1ezp5ppmglluetpjf32hlupuv0j6ez9ctl93udmzcv8jdn9k6s82qju0qd6',
      rewards: '544583541440956685',
      mid_rewards: '149077249827482226150'
    },
    {
      address: 'erd1qkj0ag3devtl72su0sx03vwn3vmxdyp9l4z6g7lzlz8ygecvcu2s6k3xn8',
      rewards: '901580033003933802',
      mid_rewards: '149005045024276597280'
    },
    {
      address: 'erd1dw8aghuwrvwmtgr908u0p489d7lfjfkpeapt0gngxfjvxdcxw8wqafdypd',
      rewards: '1257710554491591272',
      mid_rewards: '148867521190251735706'
    },
    {
      address: 'erd1y4ccndwe4p8hyeyus74rpnm7e4m8kupnuafngu2kec4qjjg8dyjsa5xu46',
      rewards: '1252524041609496094',
      mid_rewards: '148476309063591501419'
    },
    {
      address: 'erd1ytzg2gz3kvxacc73hzesvvv92ahv4as7zpr2rl79fchfmpmnk9as5qc4y3',
      rewards: '1250928064743429117',
      mid_rewards: '148355926541062727681'
    },
    {
      address: 'erd1d6dmhpy7wvu0hgadlgzdl8qcl68cck6w43f8vsxm3ecrdwjf9nmq6f78pz',
      rewards: '888756363974550815',
      mid_rewards: '148037771839649840644'
    },
    {
      address: 'erd174n7ju9u7l07t0x7fzy43k6z7m0dm45zm32g052cly6gfd4d3xuq2fg874',
      rewards: '1365658184971846028',
      mid_rewards: '148009874838673391733'
    },
    {
      address: 'erd17dcfpf2uz3lmywkzdl2huqwapmnw3t2emj7ksng7ezpdu84lj88qfwdrwh',
      rewards: '1841936604808231330',
      mid_rewards: '147934955474219556648'
    },
    {
      address: 'erd1kvv4wzww50v3usqagrcnv95zcj2qthsfm9hek3zeyt25s2s2705slxdemc',
      rewards: '764662278417219876',
      mid_rewards: '147677511444956848019'
    },
    {
      address: 'erd199k7lh5kq9y7tdh67yj7z68cxzthv8cjwg9dl9kaner7h098l2nq2n2ya2',
      rewards: '520801838679864931',
      mid_rewards: '147283425976222477530'
    },
    {
      address: 'erd19qzfm03v8d4plf4nua2d0lq3ceczfpmtzut2wykdh2jylcyfr6ksrqmg84',
      rewards: '1113452925893170359',
      mid_rewards: '146986350169588525100'
    },
    {
      address: 'erd1nv3sz3sx8hvk6alzljv3zx0t8g4rv609ckr5cxhxut2n0je4ev8qn9sutj',
      rewards: '1109876380217935408',
      mid_rewards: '146716575839221701916'
    },
    {
      address: 'erd185qtt7c8z8xy7x97gpuktvsc2zzc3txe5wjn0dtdmdnsutshn62qymw9y0',
      rewards: '750240858474901737',
      mid_rewards: '146589721923683070761'
    },
    {
      address: 'erd1lug3ywxcvpu72cja84eq3may9th79ug6dnvdgzfeqyvv7djlegtqgp8sae',
      rewards: '867413572674872131',
      mid_rewards: '146427912004530738278'
    },
    {
      address: 'erd12qekl9jxxlm64psce9zee8hztrfjavzfcpkk2lq3jnm60pv3tzkqx4axqe',
      rewards: '1100422736820724792',
      mid_rewards: '146003499438529099169'
    },
    {
      address: 'erd1dcueqh3k28mxvfkcj2nahee2zjjecdyj4y3ze93pz7d5lkz0zmlswphurm',
      rewards: '977913604410073263',
      mid_rewards: '145762790061112053534'
    },
    {
      address: 'erd1ywlm59ejf6xxh2gtu90cvm2fh3fku3emhaz9x6aqddxdz4mcfl9qt8q8jk',
      rewards: '1453695024400772007',
      mid_rewards: '145650382624999886340'
    },
    {
      address: 'erd1x238gywrmyeqys3natrenz957was8k5vcwlee62vs6hyppf4eqrq7stese',
      rewards: '1568836855997242122',
      mid_rewards: '145335385791947194727'
    },
    {
      address: 'erd1yyyf9lfy4a347ce6e327048dznzta2mx66ch2hzqjkjgplr2p73skaexhd',
      rewards: '971582245681098026',
      mid_rewards: '145285223655837715575'
    },
    {
      address: 'erd1k9uvpnaxfh60pdmp2f6dpp86uhpph4h9esrau4van75mlpet00aqmv759m',
      rewards: '493801999763171656',
      mid_rewards: '145246862172718268609'
    },
    {
      address: 'erd1qegh4jpquzw6emfe96lx7a83a8646dfru03866t7qqu8ype7rnjsre5sdc',
      rewards: '850239296209411652',
      mid_rewards: '145132477986985323280'
    },
    {
      address: 'erd1xl337gs2v9wmkvfmg7tk92xrhdat476kaxnn0ahlmyu84063hzjqxwed6r',
      rewards: '489137476620074376',
      mid_rewards: '144895023073857339587'
    },
    {
      address: 'erd1kyyepw297mmu4u48az9tl2pryed7kmz3m2c5huseczg4u8elpa2q9m2czv',
      rewards: '1085355785785708142',
      mid_rewards: '144867018320928297699'
    },
    {
      address: 'erd1m8vejf2yxvsxwvwr4jrprsk867nc3dencf4mw3ercms3je4r2jdqfayst7',
      rewards: '488294247514860160',
      mid_rewards: '144831419365737482608'
    },
    {
      address: 'erd1ffn7fpyxxx7kvqc4gda9twxy5z4ec7ywujux5ah8ghmpjqzkvnnqxfsw9v',
      rewards: '1676543305840991813',
      mid_rewards: '144459547489078777020'
    },
    {
      address: 'erd1cunvc9afrav77ty8ww7dj7esm2rcnpf353dhzntxtps7yl75lw3s7gs3uq',
      rewards: '836842315631704686',
      mid_rewards: '144121960635197047655'
    },
    {
      address: 'erd1an8nwah0x0knyany47taepxy8ahnkv706mkxqwygakh76nvmqenqstrtzp',
      rewards: '835821157492432104',
      mid_rewards: '144044935964401309823'
    },
    {
      address: 'erd1ztetvcd5hvftd8pjnkfk2sk3zvgwcs62399tvls8efuu6k2v7shs3ewnvf',
      rewards: '1193118504326848247',
      mid_rewards: '143995424294950909813'
    },
    {
      address: 'erd1shqmkp0ya0sy0kcmqfr6sm8evc4yqfn2g60gxukj5ev22u8ntx9qpvnm3g',
      rewards: '833926416947708679',
      mid_rewards: '143902018074323461712'
    },
    {
      address: 'erd1xarcfkpvntse43zy9qek43hve476kujl68942yyw5mvdfyj0plcqtt4pt3',
      rewards: '1424644698301223123',
      mid_rewards: '143459153158895328609'
    },
    {
      address: 'erd1fl7gxa2qd30sqfpfg7mc9vhz66ua27gpg7wsvhnklarwrdp5dvxq29wkr6',
      rewards: '1422865131914462261',
      mid_rewards: '143324922710321459621'
    },
    {
      address: 'erd1t9ey8ewwyjg63vtg5x7tmgfunzjyuqkcdwvm8x5xaptwmlp25zzqhcptne',
      rewards: '1183384572831027023',
      mid_rewards: '143261206116414941597'
    },
    {
      address: 'erd15kmdrk9mzyavgs3rjy4mjdhuqac7xq30ysgzguw35d228qctv66qmd5tdp',
      rewards: '585471104530802423',
      mid_rewards: '143161347153366302301'
    },
    {
      address: 'erd1tthew0rlhs5y3zfpwfvhugd0cfgph667lq7r9r9g8y3k6her3mpqu9te08',
      rewards: '463330069247064283',
      mid_rewards: '142948402878072966468'
    },
    {
      address: 'erd180n8tpnk5hjnede3psu9zw3dc9gvda5pm2dvckr4q454ks9eztrsnfqcgx',
      rewards: '699820744032185498',
      mid_rewards: '142786596269511517224'
    },
    {
      address: 'erd1g4d9mfdrnkhe5zvdp00tm6jqnzpvz896gs5mgc0rfmalk3k2vqnszg2xq5',
      rewards: '461043234175865642',
      mid_rewards: '142775909792282456503'
    },
    {
      address: 'erd17uk6e37u87pnzxc0sunyl82s85yj09v4sak0m8fjs8r4n53tzphq9fqjk4',
      rewards: '696836857464504224',
      mid_rewards: '142561525468302220908'
    },
    {
      address: 'erd186946n0s406qe6tzcdqqf9e3vpfejqudwv9t83flvcv8kejeruwqzw2w7h',
      rewards: '457426442883175223',
      mid_rewards: '142503099785739476286'
    },
    {
      address: 'erd1mmjzxh8k970n59p5tdfle4h0atc6pcg0azagahzemr79m3g4hvrsjfaqlk',
      rewards: '456942092796959385',
      mid_rewards: '142466565869487055689'
    },
    {
      address: 'erd1lx5zk67uxfkzeugh7eysr82v02qk0r5skcckkxmtutgjhwvgr0cs45rvql',
      rewards: '1408343109172732866',
      mid_rewards: '142229544846745184987'
    },
    {
      address: 'erd1ln4wx43kcrmmc78fvnukz0k7zw4d3azm4y8zkl4974eqmd6kln9ssvavjk',
      rewards: '1045873862445722918',
      mid_rewards: '141888946628906900564'
    },
    {
      address: 'erd1rrpyavmsjqvthfvhsuyhq83n68yplmcw89eh3twrcqt62kd57hks9ml7qc',
      rewards: '447040211899026470',
      mid_rewards: '141719679479328929635'
    },
    {
      address: 'erd1ntrmev4pcme0kheyuke6zdwgdtn8zdqnpaapd3k9h89v9mvjkwpsmh3ql2',
      rewards: '804964088323279669',
      mid_rewards: '141717426146805035890'
    },
    {
      address: 'erd14afp2pgxc3g9l274ggq92u5a02egzt3fkzctzk964xdvz8g8t37q97le4x',
      rewards: '802723886992436937',
      mid_rewards: '141548450585245833052'
    },
    {
      address: 'erd1854pxlpva4v9s4fxgu4c62772twqywmsmq8afes5a2pzuws2x7ms3x0dh0',
      rewards: '920695987001614184',
      mid_rewards: '141446937329680595143'
    },
    {
      address: 'erd1ve22gfj06jjjw4pvl6udfcvygjgzrqm3lv3wpqy2qgy63cu9er3qdpulz9',
      rewards: '681485507677251882',
      mid_rewards: '141403592511438524037'
    },
    {
      address: 'erd1stevtqwnqxc0wjxxuwzz6dvhxt66qp3qc2xqknkqfer9vgzczlastnnuw0',
      rewards: '670371810718798911',
      mid_rewards: '140565300363898847442'
    },
    {
      address: 'erd12al7puhyc0pjd4d78a0jw2egjjqm2ergtdtl6upfyv07h70xqxcsz3m8cu',
      rewards: '666784458958124050',
      mid_rewards: '140294710944133439437'
    },
    {
      address: 'erd1c8fm09jz9dvw9hjgtdq4sys2z7n0axg75umj9v9syqwsmdl5pftqelexsm',
      rewards: '1739535500637693627',
      mid_rewards: '140210969311337586633'
    },
    {
      address: 'erd14nysqcfhjcvujsxq98m9ytjxj60w4x6tv9stsfcg6ps6a3jyay8qceqj9t',
      rewards: '1141291264798345246',
      mid_rewards: '140086160969900724146'
    },
    {
      address: 'erd1yzg8ffujg99609felfvr8lt5lm54aw73lw93vjswqy0hgvvcktyqcvafsq',
      rewards: '543978793110301297',
      mid_rewards: '140031634423470282676'
    },
    {
      address: 'erd15r8ttfw2qga6mpsgnxkvg4wvx0kqnpt3a6wxhezl6aaffxqra9kqz5ltvu',
      rewards: '423849147348519804',
      mid_rewards: '139970406723516657297'
    },
    {
      address: 'erd1e8yc509rt6p4pl90jvd9rs6h0c99jvrzwu43kees2834hx22z0zqryese5',
      rewards: '1137576690702623876',
      mid_rewards: '139805975329826282636'
    },
    {
      address: 'erd1phwyapqae3cccudhc7jc9tgj7cr4ldhrxgkp6dz75wnetcj6cg7qgmcaeq',
      rewards: '1014285424451776924',
      mid_rewards: '139506270583090462367'
    },
    {
      address: 'erd1wgfs5yxxzx3kf32aankeafgan8240vartcnvd3d5k2rlsetqadcsmve5ya',
      rewards: '892318909145164283',
      mid_rewards: '139306490129607279130'
    },
    {
      address: 'erd1uux3d229xp2yz4phlz96t09uyspvyr4r7a0u3vdm36ncc25454qs57y0tm',
      rewards: '414568912999344684',
      mid_rewards: '139270410348653796272'
    },
    {
      address: 'erd1v7q6jq70r0enm9952x87l2ymuvj5mu58npxrgm7dnfayvk2tkf3sqgkfp6',
      rewards: '1248894589949179846',
      mid_rewards: '139202544101482846381'
    },
    {
      address: 'erd1a6skrhs6gvr3vw4265ku9xxdh4fguhezvkfqw4avvrj8vq3mzp7q0dnlvj',
      rewards: '1364624600683494953',
      mid_rewards: '138931912879121662115'
    },
    {
      address: 'erd1v68naykd6stqmj9f07jusrppvvxkld6crjapxemkrplgymd4wjmqm6unq6',
      rewards: '767729256166336245',
      mid_rewards: '138908849709206321619'
    },
    {
      address: 'erd104lcufgtsm4ej0l5884v672vzmpjp0kg7vdtlmdzemffx5dkskqqf2twxs',
      rewards: '1482013712746210347',
      mid_rewards: '138786425577885011381'
    },
    {
      address: 'erd1qz9sfs7f9nfg5h0rf3l058ll6qm05tc2r334sk75h9ug0u5f8n6sha2zsk',
      rewards: '643736537184543700',
      mid_rewards: '138556235267485997746'
    },
    {
      address: 'erd1us3ger4duyxv0u4ssl4zyje5m60x5y5hx036qwur5tz8nagq8xmqmv27z0',
      rewards: '762937313727076985',
      mid_rewards: '138547399533507781137'
    },
    {
      address: 'erd1t0vn66acyvpvm73c9upuz9lvdhf0pdsp3fysddhs4z7m70ftapxs3j8xvc',
      rewards: '401714224155137887',
      mid_rewards: '138300797378509929900'
    },
    {
      address: 'erd10chc2k8ch5avkvekukzdwhrk5p6s04lldxz6jq2wvz0d36llsveskg7y5z',
      rewards: '1236659012609697641',
      mid_rewards: '138279629931459434550'
    },
    {
      address: 'erd1vja4el7auk3rde7hen606vhg360z8l26cckxne7uttcnm3zkkpwqhpq2r3',
      rewards: '518475658656020301',
      mid_rewards: '138107965150266678392'
    },
    {
      address: 'erd1tf60wsncxfra9c3m5lmv5m7j9xpfpflymtkrkzr33f0jkx9xfz8seldz5q',
      rewards: '876014891156085355',
      mid_rewards: '138076698611565651948'
    },
    {
      address: 'erd1al3rganp7mektkxjpy3tj9dyl6rq8nude99axnr9s3xze5cuelxqwfm43f',
      rewards: '395911684237571767',
      mid_rewards: '137863119109355621260'
    },
    {
      address: 'erd1j277km28w25fc9q7maqydstczyl08f2mlrvsfqs2g8s0jrepv87spfaaz8',
      rewards: '394946722035024477',
      mid_rewards: '137790333227205692098'
    },
    {
      address: 'erd18mjn4skrsztx8u45gxszz62ghqh6qw828sptr3yev76m7eqj80xsc5uxxp',
      rewards: '394651427497588488',
      mid_rewards: '137768059532604394575'
    },
    {
      address: 'erd1hgfztsqguzrk9d9f7t0tpt09f0a57wgqddzsw3wqh54r9n8r4ccsqpp6n0',
      rewards: '630435151168638504',
      mid_rewards: '137552928492952572436'
    },
    {
      address: 'erd1adzy7p33dgn37gv2nl2ktt2al0mesumms3s3k3k9etxmcm2qrf7satlscj',
      rewards: '1344475963197077097',
      mid_rewards: '137412126560344907433'
    },
    {
      address: 'erd1hhen2a2hh0lxakvevha0s0pkgvnwj7r2h8g5qqtmltwh6scm7p7qrj6a6l',
      rewards: '388366782918436179',
      mid_rewards: '137294016716746067075'
    },
    {
      address: 'erd1z07dy6enkvy686q8ddaawke0nf8d69s7z320p62lcr7ut2g97r6q349lgg',
      rewards: '983014993141909424',
      mid_rewards: '137147581380457234427'
    },
    {
      address: 'erd1y52223gypyr02kdnl433g5fhg6skuarfp8vrth5hkrmuddvctfhs955h6n',
      rewards: '505717502571573770',
      mid_rewards: '137145633524466632379'
    },
    {
      address: 'erd16vk7yjj24m5cydcwm9z0ak5ga8ev8pwlthrugz38h4j0yss67r8su6kaz0',
      rewards: '862333258611100124',
      mid_rewards: '137044710320823116167'
    },
    {
      address: 'erd1rswew0kny8vxsq8nzs5amr4u3e93u4pfgs7lv4w332c7hfdlu7yqxnske2',
      rewards: '1458671470705396252',
      mid_rewards: '137025749694609102112'
    },
    {
      address: 'erd1s4jmxqtm2g375ww4z08p2ac6gszh0u5xzwduz5lxqndperl8jmlsfeqhqf',
      rewards: '1452580697672701067',
      mid_rewards: '136566330365033866824'
    },
    {
      address: 'erd1q4cywc9nmfapprvuqhwy9nsdg9m52dgqg8xph927g8uw4qzej93qknpafl',
      rewards: '1093100079633357162',
      mid_rewards: '136451160640535659669'
    },
    {
      address: 'erd15mggmm5syae7q87hwaas8ftwdxgmjpum4dnmxh2v2mkcs2v045ysqaqhy9',
      rewards: '1445901942253355683',
      mid_rewards: '136062560265461650108'
    },
    {
      address: 'erd1c36kdujvu434gywfm4h3dsuat4lgxtdj2n5v0ddykn9y7am6ssvsszzmrt',
      rewards: '610523405126085702',
      mid_rewards: '136051010597073597921'
    },
    {
      address: 'erd137d3ct3evneefm20z5xph3jylyd5svv6tak3w5vwty56u3v464rq0s3x7g',
      rewards: '607992877024055583',
      mid_rewards: '135860136053257026305'
    },
    {
      address: 'erd18azqvmq33uex8g3efsw2d0mmv2r99qvgupdc46yy2estlava939qkfv6th',
      rewards: '1202982510584712393',
      mid_rewards: '135739453848767426616'
    },
    {
      address: 'erd1r5d7yfxhy7qx2kcwwly048h6m6sds6wh7wy3a8xpyaq60spdrqrsd7fg5r',
      rewards: '844099651235019519',
      mid_rewards: '135669372308473930632'
    },
    {
      address: 'erd1ujv9c46g53xzrdzrc30t5te9tvvgkg6kd5c8jw0taadpt3nalsyqzzwca9',
      rewards: '1316040975226685928',
      mid_rewards: '135267311273399907412'
    },
    {
      address: 'erd1pvdxj7mrq84sezykx9l9xy563f882fl90c26n55tmkj3m8erer4qp23au0',
      rewards: '1313664285410392885',
      mid_rewards: '135088040557491048272'
    },
    {
      address: 'erd17y2tqfpnelswv59vlttz3c4v0zfz0nvpd7mtwzjssa2hlrew596qkh8z7r',
      rewards: '1194027446671495587',
      mid_rewards: '135063984669858795766'
    },
    {
      address: 'erd1xpr9vuhs2s70zhmjfj0q9ejs5aahvhdlva5mz26jjjxcm5d0q5lqvm267d',
      rewards: '355478085314903991',
      mid_rewards: '134813263728166665518'
    },
    {
      address: 'erd16xzzpxz9y6xazv8qfgzqmm0anyyx7j6rxwmjf83s9y3xhdtf6zcqarwnvl',
      rewards: '1548125017152132846',
      mid_rewards: '134773117904864261001'
    },
    {
      address: 'erd1ysa5uvnag67taxav48yg80dvh4a6a3f6t3hletagxhtzf2klqnrqatw78t',
      rewards: '1664887729409006908',
      mid_rewards: '134580382056144247761'
    },
    {
      address: 'erd14cakqz2g2wn854p6yf9pe8v2pc0fdg4ducckgjj3swjfxmccm4ssv90y44',
      rewards: '586462750639866676',
      mid_rewards: '134236145768937205238'
    },
    {
      address: 'erd180p342qmh3pfe6zd6mzmkayp5d442gw2dc24hvfhhkfrgr6ttj8suk95fw',
      rewards: '346340099950457115',
      mid_rewards: '134123997014850179554'
    },
    {
      address: 'erd1tuumcw2u54u5g3qch6dry8jm7wdhh9yaa7h5syx3gv0qxgjrmpkq5y3d79',
      rewards: '1655745115279158064',
      mid_rewards: '133890766200890224818'
    },
    {
      address: 'erd1x9sw6cl5qvv7pzfadnahmqjm687pw5fvgu9vxrl5nnu5nh40k2aqyxqavj',
      rewards: '457083791260698515',
      mid_rewards: '133477254005929412233'
    },
    {
      address: 'erd1erha72fy0p0y3uepysfqxx230vxd7va5mc9xefxfun9z0h5k7q6q8t2gr4',
      rewards: '1290658787911618560',
      mid_rewards: '133352764890396494966'
    },
    {
      address: 'erd1ej6ps52whccdda34x24kp3yeccf2ky5wphpp8zlw7wyw3hryvd9styec4p',
      rewards: '573265943519275393',
      mid_rewards: '133240727248606477795'
    },
    {
      address: 'erd1s6yy5uzgc8s46ef4dzjpsxm7d9yuchzr2gzcvsx8ymj8xytpa06q2znhmd',
      rewards: '688296334780879150',
      mid_rewards: '132917324611617715572'
    },
    {
      address: 'erd1aqtqw6qqswx62pgy33nmtkxpjnzkp5zepzp9gsj33e8zq50tdeesxxc345',
      rewards: '564609850722842967',
      mid_rewards: '132587809084043338010'
    },
    {
      address: 'erd12pra4826du7578cl7xuk2gmsde9v5nfs9ued4jc2sf62yz9fjegsc6wsl5',
      rewards: '799662412820039897',
      mid_rewards: '132317527448848454304'
    },
    {
      address: 'erd1vrzjrydmktud2hm3ej7gezt8j8p7004akplzkmwpyzmdjgg4afzsku7ret',
      rewards: '1515415247999467921',
      mid_rewards: '132305861263710400967'
    },
    {
      address: 'erd165dan3rruu59ky5txwk834xp4u2gl2rslamthyg493zl35masg3snu8k8p',
      rewards: '679270434958636371',
      mid_rewards: '132236512369413198891'
    },
    {
      address: 'erd1zvw89p6z4ny5hyf03sclg72ptu47zdy93dtpr0nsq48kuc8cdcuq90ynld',
      rewards: '917566823732152830',
      mid_rewards: '132210908490045563596'
    },
    {
      address: 'erd1ya3gtwuvzvmrcx6e854jug2s5vg7dj7q7dq572jv4wstxnhr5utqdxyh5u',
      rewards: '1274637230853053347',
      mid_rewards: '132144279044168809165'
    },
    {
      address: 'erd13gfgzcczkgmcw38zurj37et07xw5xwgl9fvn7t24vyfvqct6efsqjpv8rs',
      rewards: '1274207309253191357',
      mid_rewards: '132111850600009380792'
    },
    {
      address: 'erd1fw9m9sn2k4jws3y7k39x7y5rzspk3kgdkdhqrycze0tvlwwjvhtszsacm2',
      rewards: '437331756499935728',
      mid_rewards: '131987382930644752618'
    },
    {
      address: 'erd1455rqm7zhq6kkz846dfcmqm50f88w5k8n97yqrlql9f3c7dmglqq5nl94m',
      rewards: '437167260979837304',
      mid_rewards: '131974975240987614536'
    },
    {
      address: 'erd1ry6cte50lqq8zygaxachwweld03cpmgkz9lfhy3c0g3ghf8944pqeymmwj',
      rewards: '1033556059639082572',
      mid_rewards: '131959830295579582514'
    },
    {
      address: 'erd1l3kpgssf5nlkjn8tp7qdxmsyk0mv5h2szmzejsmwg333z75j8v4sl5ftux',
      rewards: '792655566122900072',
      mid_rewards: '131789009837905401750'
    },
    {
      address: 'erd1wmchv0l8wqsfl48ueq5ef6wv4yc9s4e8kqhm2de9337un8qmmtxqhclemc',
      rewards: '908024496352452748',
      mid_rewards: '131491142768381605687'
    },
    {
      address: 'erd1542v2r8rw5cuu4avdnlpjcgtghlhtgdg6m7ta8jv4c3l7qthv6us7e8d8k',
      rewards: '906400824331891827',
      mid_rewards: '131368671235272107675'
    },
    {
      address: 'erd1kg6x2sj8fdwmqw05cvrlymzqjp248damsmwwdq5dcs2hazjsz0wqxp7dnh',
      rewards: '662542064591466200',
      mid_rewards: '130974712486587690220'
    },
    {
      address: 'erd19kshsh3m7peduhhrgnaafau54t5g3027jtlsns2gs6ahsdmm0hrq7230ye',
      rewards: '780013185515812954',
      mid_rewards: '130835411010373193645'
    },
    {
      address: 'erd1eh0xv52d3ygm0p78xe22nlx03pdcqj7w63fmphgm78gj0d2z9ftsfn5pt6',
      rewards: '300986128128000087',
      mid_rewards: '130703004110271840473'
    },
    {
      address: 'erd1ezr8y0g3e6s3xzw0w67fdfuuvu47ln7sdjjd29x36g0xr2auzcdsgzyv6q',
      rewards: '298257063799843393',
      mid_rewards: '130497154229266730231'
    },
    {
      address: 'erd1a3r7me363quc9nxynsqfcq25xysp6c7pkurgfr9ppxtqwmeesc3qjmf3rd',
      rewards: '1010726201609664795',
      mid_rewards: '130237802892182523916'
    },
    {
      address: 'erd1azh85ddzh5glrffazk9fw925zh7w379q8nth0zzt0hkl765x75as7c5n38',
      rewards: '652035448105121324',
      mid_rewards: '130182211653548974806'
    },
    {
      address: 'erd18a4jd8ndp7sp5kyf5kjeu28ycezz7qqg2vvl7d2yjnf5fdqejxnq6aca48',
      rewards: '1127260816617344015',
      mid_rewards: '130027861955579490547'
    },
    {
      address: 'erd1fj5h98f5cymj2uq6r5tncmrrg4zcakln4rzcpd3ejs49hw7alrksfm7z2p',
      rewards: '1127176792875576201',
      mid_rewards: '130021524150689346702'
    },
    {
      address: 'erd1jz682ny087gr3msnru3633gt02mjt420plp0d3x43gjmqjfmpujqzcuppu',
      rewards: '1485100594738945669',
      mid_rewards: '130019265194132012152'
    },
    {
      address: 'erd1c0eps97cr7cpf6ghu7553cvatjz85t34z5m2mdj9j6myl5w4uy5q4whu47',
      rewards: '767820806451011486',
      mid_rewards: '129915755231737229243'
    },
    {
      address: 'erd1032mhagwhs7m4ayct6q5dmhucgwuu5rxvjc8g8l9pqe3ddw5yrls724zx8',
      rewards: '408743914423914703',
      mid_rewards: '129831038051256506315'
    },
    {
      address: 'erd14fdewcnk3vhf3mjrvyjdl0wmcslrypjukr9zvzchyqtzgwaz86dq93tmsd',
      rewards: '1119986916160775490',
      mid_rewards: '129479200816309461576'
    },
    {
      address: 'erd1yje4ptwr9xdqa7kugycrus5mlc84f50g3wqr267awal7qp0xwd8sngdcdv',
      rewards: '760324115541752944',
      mid_rewards: '129350289289552828870'
    },
    {
      address: 'erd1xenstu2zl5kkk047qdqwzfgggwr26en4w65ervnaa29sl0fx9cfq2jx9gg',
      rewards: '998398612082841354',
      mid_rewards: '129307948358892553779'
    },
    {
      address: 'erd1y3dtjgzqv08qxstuzgkxkjaafsae9kr9as2j2f69nzrgkgn02gxqrk95hr',
      rewards: '517458506566453563',
      mid_rewards: '129031242650748744604'
    },
    {
      address: 'erd1yh5v2576n9mu3e9hju3trdgw65lf7afwulwzn08g77t6l7d8ku8srpdufr',
      rewards: '1467024779705116253',
      mid_rewards: '128655829259187452713'
    },
    {
      address: 'erd162z32wr8p6ehfqadm7zrn5cd9vrrupas9mkexljswg975f0a73nqpajvk7',
      rewards: '273635616362112296',
      mid_rewards: '128639989495940768036'
    },
    {
      address: 'erd1na5tpa7y67e3p7rmun7s7skj4zx33p5acc7dkmcutucr6l36h67swa2x5g',
      rewards: '1462869393793476542',
      mid_rewards: '128342393739688686032'
    },
    {
      address: 'erd1mua9g8plaugcazydu8d08wpsq8fmsypxh6dqn097xn02pqs699ps2a9pmd',
      rewards: '268853987737584891',
      mid_rewards: '128279317278282042291'
    },
    {
      address: 'erd1nh4vukm25pxqwkh8njv0t8vg82tvwtkxvft59xvzjl6srl3grd0ske59ap',
      rewards: '623607698255996757',
      mid_rewards: '128037942328964062117'
    },
    {
      address: 'erd1fcpmmlezjrjh3w367pgaqdvcasxnkh3syy6te0uh40zh9acq2kgsv6wrr4',
      rewards: '503939286769235058',
      mid_rewards: '128011504948772679972'
    },
    {
      address: 'erd1cvjzsm9q2lwm6c5yxtpaa3zlpurg0ehxcf4qlzehj0ag5zqm6ulsfs33nq',
      rewards: '740863053055235140',
      mid_rewards: '127882365886007212626'
    },
    {
      address: 'erd1w5sp4ex835hy5vr9xntvw5w0ntz28jyplc6cq9dvgyd347zmrdpswhrqp0',
      rewards: '262411920826722821',
      mid_rewards: '127793400294447656484'
    },
    {
      address: 'erd15wm4xrldtrg0hdwzpuq308pfk4lv2sqfjwcv406vmgsd0xsua46s9yq5sh',
      rewards: '619317655974098368',
      mid_rewards: '127714349849254302052'
    },
    {
      address: 'erd15efvs3vlc47jlj9wx4rwv09gya6uvm4c43mynxdttupcww4dmrxq2k7ynr',
      rewards: '261333580641947838',
      mid_rewards: '127712062454064506055'
    },
    {
      address: 'erd1vsdxfx6hzag83uexxu44dtn5uy8lgm58glpslzv07h67vce6wzdscyqrq3',
      rewards: '1573664527015598127',
      mid_rewards: '127699530929314342804'
    },
    {
      address: 'erd12vppjlg27fpufgusr60fl60mln40wzktzh78mwc0h0d4akarmqasrkwys4',
      rewards: '378487644255804836',
      mid_rewards: '127548845744719466288'
    },
    {
      address: 'erd1lqpcpdr9fdarrkv9mvnsxkqft6uyhp6qymgnfq978dcql43hv99qdg5dzn',
      rewards: '855060949849732383',
      mid_rewards: '127496169241115002725'
    },
    {
      address: 'erd14h9vyzsx0vl6kv655xs5nr2phq7y076ehsfwynj88sphe02y4ynqgy85qz',
      rewards: '973930065707054501',
      mid_rewards: '127462316759865421657'
    },
    {
      address: 'erd1jk4y3j68kfkn63xtg3lznt3a3f2gz3swes7kccfuxy4uwg8wjndscm2zvl',
      rewards: '854391074200213043',
      mid_rewards: '127445641365564734766'
    },
    {
      address: 'erd1cv3xparqs0y3aldw7s8dpsprghfa3tlf5j8hxv8dy2xsmg50zxwqvyuvhj',
      rewards: '850863328749202445',
      mid_rewards: '127179547974575544670'
    },
    {
      address: 'erd106p26kw5nu0pnt3vghtf4k3xzgsm949mthcmkukjpeelhwt7uzlqqe2hwy',
      rewards: '846780506196623196',
      mid_rewards: '126871585817750502970'
    },
    {
      address: 'erd1cc0lmtp9uhngvm7rj6uwgdp6dvcr9maz9dyydke444dsvrzyrfaqclljuv',
      rewards: '488612998117631969',
      mid_rewards: '126855462321769670596'
    },
    {
      address: 'erd1gu0crlcljg9y6gmgwz8nku3talz2jgrh7fyuc4ds4y6qwg7y3p7seauqdm',
      rewards: '846194776878452674',
      mid_rewards: '126827404993867892226'
    },
    {
      address: 'erd1z86rknx6aqw2z8yv2ljums3t3lrpv7eypprpkwphte7mv75avg2sjyxylz',
      rewards: '606496964549204617',
      mid_rewards: '126747301261579499097'
    },
    {
      address: 'erd15qlqwpevcqv3me46mr3q64p8pxtjz5ulrmyc7ssvzhxukdruux2szmlr4q',
      rewards: '367462923476679589',
      mid_rewards: '126717264958190203261'
    },
    {
      address: 'erd1m9d0g6nv5epjklnung5dxjyvkpz5pveg7vrnrj3fqgkdxpn7004suyp6sn',
      rewards: '605276034851009165',
      mid_rewards: '126655208074000115477'
    },
    {
      address: 'erd13ql6m0s8p85t0cp94y3t28h5htvqsghmkmkymld7ln84mzvsxnvsu46e6m',
      rewards: '247265843550068835',
      mid_rewards: '126650950784215953277'
    },
    {
      address: 'erd1z3ad9g94wea2nhlenr945tew9qzrwd62kzk7zhtke7a484nvlgqspne9s7',
      rewards: '961630024043828331',
      mid_rewards: '126534540127189569125'
    },
    {
      address: 'erd1lq3cv4q07c773m5tqpexrvnzwef5pta6f5vvdkyf8rg0z5rgaz7qat27uz',
      rewards: '841497381337465024',
      mid_rewards: '126473086371485194180'
    },
    {
      address: 'erd16gwzc56vtpufenkcuylyw9l9smmc450lesleyksajw8n5yn2xg9qrh4ulq',
      rewards: '1079928114742319435',
      mid_rewards: '126457615938254855276'
    },
    {
      address: 'erd1sw82k9h9um8jqdpw9cwxhxp693a7dt4d4qy7xq6kgvukcfs20vgqqw6c3w',
      rewards: '840940868781244418',
      mid_rewards: '126431109331115010602'
    },
    {
      address: 'erd1hds20zduh4n562kfun34hmkkffmrxfhusadju8p7afp8j4zpl00s96ggjq',
      rewards: '1078536425274746362',
      mid_rewards: '126352642556594233018'
    },
    {
      address: 'erd1s4gl6amyvv5sg8sr2gwu00rklft5y7c2s37js57ynsdu0wgnnxdq2aerw5',
      rewards: '1317127532167817429',
      mid_rewards: '126349268893353948227'
    },
    {
      address: 'erd1w0v0vcgy6kejfy5p93zvjxuwguqj08javfv6hxulf89vl2enzn3q9za67x',
      rewards: '835981021888013088',
      mid_rewards: '126056994334175805645'
    },
    {
      address: 'erd1lxe8jp8x4q4e9qx8w8dwy94uvt258gd54qmgmz6qwl79g08nvkgq7gv7rn',
      rewards: '1550579185782324587',
      mid_rewards: '125958232750007053071'
    },
    {
      address: 'erd1ra6keg0y7v84qsr2hmgyecnmdp37upq4mycjp4zwlyp9ngrwa9dslt50j0',
      rewards: '1310735921549646140',
      mid_rewards: '125867157764053365820'
    },
    {
      address: 'erd1fe25aqry0xnxmzpw6xf8ll2edhw9792xsmg4jdwxsdrumyxh2hesncyzpu',
      rewards: '235361577423366084',
      mid_rewards: '125753027001199055981'
    },
    {
      address: 'erd15zw4f2m5ap332sw7dzmzdv9v527g3mlyxq2tzmrghny2j89m9t8sck79v2',
      rewards: '234388608858779754',
      mid_rewards: '125679637209256302915'
    },
    {
      address: 'erd1vckkcg55x3fnrvvukpd7ag48upytwy45t9fhmnz88w62pugqdcgq35m059',
      rewards: '591793775768434604',
      mid_rewards: '125638258272123297923'
    },
    {
      address: 'erd1lcsyshmy7g0q7edrvqvfttp0s3yvcmc9qcfh762ctg04rc4sf88q8h7m45',
      rewards: '350546291661652501',
      mid_rewards: '125441264751744850981'
    },
    {
      address: 'erd1dlel3xc3gzewgjj4r6hglu23838teqm07wxqu25l3v8vuxedwppsypz9vd',
      rewards: '1304984202992159988',
      mid_rewards: '125433312886005687995'
    },
    {
      address: 'erd1ct7jw5hjmjn7kmrf4h9y9uy40qy2f6l0nhmxkgfsaapecq5kz30qengpcp',
      rewards: '706208024704903752',
      mid_rewards: '125268380796486507731'
    },
    {
      address: 'erd1qfzs62kxa76f4s6vhfnla9vaun7vvzs62hz6txkrvamdygyvta6q2c4ezs',
      rewards: '1061718354005202202',
      mid_rewards: '125084076647812784897'
    },
    {
      address: 'erd14v0puzf4dhelzw6xsrm2wm293pgfc3pkn5km5x3l6e2cs6df38yq72t7nv',
      rewards: '464551284197479431',
      mid_rewards: '125040517581867587318'
    },
    {
      address: 'erd15cwrxz9eyqwwv7vv947wk2eljlkfepjkpt5cl3x0jrc4kg5zdu2sqen4ct',
      rewards: '821591165197652797',
      mid_rewards: '124971585589196900785'
    },
    {
      address: 'erd1du0ht7qya0hhkq3l7h98d4aea8hh5aajq7z238lef2p85gv7x8gqk94tm7',
      rewards: '820598134211291003',
      mid_rewards: '124896682514077732805'
    },
    {
      address: 'erd166kl8h7tg23qpt93f5ljvgk70wmqtnq9g0hylszrrvzmwapkdpns94yul7',
      rewards: '1056812152438752285',
      mid_rewards: '124714008050227563975'
    },
    {
      address: 'erd1f3tk7grjr8ns8cyphxlgnhtk7d9uj682fau0gdmhc74ztkgex5vs5xr92y',
      rewards: '693765528526365481',
      mid_rewards: '124329858999351507666'
    },
    {
      address: 'erd137vr2npzfknydhwf7hgr7jkpcmwk2n2um46vxww2f5f7n3tdrjfsem4uey',
      rewards: '812962971407628569',
      mid_rewards: '124320771811507326343'
    },
    {
      address: 'erd1mj4htzcu8p5fltrslh74327z35aa6sjf3kdga0kz772fzjhkefjq3wuuhz',
      rewards: '1524183287108112352',
      mid_rewards: '123967223397442771353'
    },
    {
      address: 'erd1y3fv9m7parl7cm9s4zvyg4ssly7jrjam0jjsxyqr4hlktsfm035q2mwd76',
      rewards: '449839186723184526',
      mid_rewards: '123930802620892397194'
    },
    {
      address: 'erd1h5d3jagage2dkq2jlr6whx3k7lpxh8lpq6lq34vkmsmgju8fx8qse9ml3r',
      rewards: '924173947245175739',
      mid_rewards: '123709275485249547901'
    },
    {
      address: 'erd16c2uuglk9m4cpahaxhzp34097x5a62htjmqajg3yspnjztkkgqyswppuf0',
      rewards: '1279250362012077170',
      mid_rewards: '123492241710474818130'
    },
    {
      address: 'erd1x0njx9pj3tl0nu0ug7a6zrtyppdlcf9lfxyx8wvw86pv2pmnk5hse3dxnm',
      rewards: '1159909011946277104',
      mid_rewards: '123490474160851991497'
    },
    {
      address: 'erd1lqj3nzsem5j4apehwy78lumw0auff5gzvlj23vfvttwm79fpflgsf2wvra',
      rewards: '1394680014297834016',
      mid_rewards: '123198954829081822449'
    },
    {
      address: 'erd1fkyaz2m6tt9r3sg9fc4lezj6fuq82s3at4jzgk4yc26ndpp0dtusq4gpdf',
      rewards: '1273941611267293913',
      mid_rewards: '123091809335970277511'
    },
    {
      address: 'erd1ety20ekr77xumg5qdmnrfycpdz5mfz7xv3h3tszppmcv2wsz49yq5qfg9v',
      rewards: '913493653718386862',
      mid_rewards: '122903674412051647571'
    },
    {
      address: 'erd1u8yxns9t2p97hssp4e08wdma4qwxpgdyceekw8jl7487xljm2dgs4pa5ys',
      rewards: '549398641162712595',
      mid_rewards: '122440446727798854647'
    },
    {
      address: 'erd1gdejutxjw8ny2p7kcnlu5ywpvg5ee57x26fa2wea6sjr00xkp9ssphmte6',
      rewards: '906692949528152320',
      mid_rewards: '122390705870464981100'
    },
    {
      address: 'erd1636g6xysj223kgdjgd03sfpzjkpwgj4wzruv70p3q8nuer8u9d8s6uptvv',
      rewards: '787054063020846835',
      mid_rewards: '122366495522243873206'
    },
    {
      address: 'erd12hgmvpq6sgzh7avcnwkegrtwqrs9plewkqf4nucr9v42xa0d05fsmtc79m',
      rewards: '547769566694611793',
      mid_rewards: '122317567694883746702'
    },
    {
      address: 'erd1gqhghcjwku7qj3kzjyyg0p7khv9latkpq5hvx6uc4pcll4jf3grsgfyn5s',
      rewards: '666889486325503974',
      mid_rewards: '122302633026018566774'
    },
    {
      address: 'erd1jwx3ee2g60r0acunq72aa55vd8kt79y7fcl4mse2v8j23lktvqhsx8etek',
      rewards: '189372362539546686',
      mid_rewards: '122284118513524480802'
    },
    {
      address: 'erd1429e4pnnu3dj5cpden6nkmtlaz4unzwnhew23ct32y2v7f7uktesa20eeq',
      rewards: '903474884678434182',
      mid_rewards: '122147971296733389812'
    },
    {
      address: 'erd1a0zv3mttaj2c9qgx33ukf8yj62z9r33nm2tzkha4qk29q0na673sczumea',
      rewards: '1141834961228597107',
      mid_rewards: '122127171306049833319'
    },
    {
      address: 'erd1c7tz7x44dsljgeh002yp5rkf2nwwry8mw9ks83av5505hgm3jksqsay54y',
      rewards: '1135170011273608700',
      mid_rewards: '121624442535245789500'
    },
    {
      address: 'erd1udmekv837sg9gsyqfg08yxssjxu4ys8sgmlck40nt7e9r4k09x2se4l8c6',
      rewards: '417989876789160221',
      mid_rewards: '121528449333587494800'
    },
    {
      address: 'erd15ch05q2n3600t5ecxgp63yw7fmcqyg48tyak6sa0cyhhvmy0pjuqaanhcc',
      rewards: '775642886890760053',
      mid_rewards: '121505764895900115161'
    },
    {
      address: 'erd1sw62ttmw80l5s9dtwwjwn4ad092r73fjs7efy3afcf4s758gzmhqwssqj5',
      rewards: '1252016726849596567',
      mid_rewards: '121438042950960880557'
    },
    {
      address: 'erd1xsj9cwj87rxrl0hc0evjhllj3d8c88pjdh8thnkcfw2vepssgeeqfhd0ne',
      rewards: '1488632289367547269',
      mid_rewards: '121285656466607097781'
    },
    {
      address: 'erd1s4qw8xtzqh80k0ln0z4fdsg933g06tst233sd96ttgrgu6fwll3q73vuls',
      rewards: '175562147219473120',
      mid_rewards: '121242431386196030413'
    },
    {
      address: 'erd1am9g9uclgw06t4kk7pg70ex5mrmz26jy658q39swqfg5qyeasarqza93tk',
      rewards: '769533187465791293',
      mid_rewards: '121044917972421293532'
    },
    {
      address: 'erd1sf0z6msnrmgqvuuhcrh222satv8m5vfydk5mw5cpz9w4vpza3fxsyup07d',
      rewards: '1127472651599653515',
      mid_rewards: '121043840401177577043'
    },
    {
      address: 'erd1w8juz2r6z7469twsfn5c3ecvjtvut0pwf8k7yw0tt34y78ljwe2s2tvtef',
      rewards: '888026877606295155',
      mid_rewards: '120982747602752609223'
    },
    {
      address: 'erd1806px5ywwzhgulyggtksun3fg34ts5eurytxfd38ekyrjy7yuwmqz324mn',
      rewards: '529165000310618419',
      mid_rewards: '120914248712335813694'
    },
    {
      address: 'erd1e527dujjrnvey2cefz3t6nlz6dzznnay0pt2c3jeakjknm63l7zsm8avxe',
      rewards: '289770248029844326',
      mid_rewards: '120857004417354237502'
    },
    {
      address: 'erd1802l2eqeqg0g8zaj9df5avumk36pk7j6gpsy85wjd2ys88kxuxtqfz9zfv',
      rewards: '1361750886535161324',
      mid_rewards: '120715152244579663088'
    },
    {
      address: 'erd1fa2r2nxz8868qecakxjntxmlnl5nwurk5ln53s7d3h04t8zjd8tsdgc5gs',
      rewards: '283867259942261337',
      mid_rewards: '120411749469397667097'
    },
    {
      address: 'erd1td42fa82ar07upuhyr5r279tz926xawtl5aanqlwp8vu8w5qr7uslagz5l',
      rewards: '641377572603435046',
      mid_rewards: '120378301543716110484'
    },
    {
      address: 'erd197z36x4k52788a3cgn87g4dqhlw5czfkj500vhxpyspe7fptwfpst6d5sj',
      rewards: '997950863352912060',
      mid_rewards: '120274175236791621621'
    },
    {
      address: 'erd1h4ejwluukk8a9rd3tflyf6nhtd8dumkl8gz9z52ejqhuv8kaaswqz62pkj',
      rewards: '878510149954233698',
      mid_rewards: '120264912836263948897'
    },
    {
      address: 'erd1d0xj9dgwvmspvk3q38mdxeazk20k7f4hyucnjw654qqjfcua8vsq9vlm6z',
      rewards: '637320858531056050',
      mid_rewards: '120072308716630568342'
    },
    {
      address: 'erd14fylgxqqzevywf64fcw6cysg234na05m6ng3hn0zzz0u5gq4mf3s6fqjv4',
      rewards: '636753376133577022',
      mid_rewards: '120029504234966900727'
    },
    {
      address: 'erd1g9qtnpp924zdgl7gj0w3800j3v6p9lxvyqx2y5v9nthsmyhl78sqcpscu4',
      rewards: '754887370541751935',
      mid_rewards: '119940202469774105925'
    },
    {
      address: 'erd1px0k6sst27t8ulzn6xgwsfq859zewkh7560dtezf3rcqtlktva7qr9l938',
      rewards: '156696943353303073',
      mid_rewards: '119819452847023509425'
    },
    {
      address: 'erd1tdk9stg9655umfvt6xjeu304wh5tzqzmzxju48lt0wxtkaqcaczqanhtyf',
      rewards: '395281318924982229',
      mid_rewards: '119815571448698625898'
    },
    {
      address: 'erd12awax6sz4eje25y3hjmsuuzjx9cjphptpzap9xn23sea9gehxfdq89276d',
      rewards: '272276549964811309',
      mid_rewards: '119537476831334062241'
    },
    {
      address: 'erd1x3t5zpx7uqwl7pg0mpfhl5qxkpsurj5r706svc5wvn0jcwjj24vq6445dk',
      rewards: '510370957450646735',
      mid_rewards: '119496637758128954193'
    },
    {
      address: 'erd1q5d0ksc9pfk7jjfft2usyuhp65ukekxzdutk9lv32x7eh2g75k7szdrery',
      rewards: '748693815087084435',
      mid_rewards: '119473030391715030845'
    },
    {
      address: 'erd1zn25lm2ur25dll0warq2tgf4xnnhp4zyms5q95reh0ds9x396twqaltjf0',
      rewards: '629251466911998820',
      mid_rewards: '119463644682064362736'
    },
    {
      address: 'erd1f6xrghw6qh7z9lurqm5pveja4rcakkr7nx3hq6mam7ytwjtgra6srcjdg0',
      rewards: '747136589612234016',
      mid_rewards: '119355570837761387347'
    },
    {
      address: 'erd1rgq0uasl2f6mq4juls0edrg97vssn4ns08ued96mmr8esv03fskqvsydja',
      rewards: '1104811395796935094',
      mid_rewards: '119334530451138131753'
    },
    {
      address: 'erd1zl7hzx7rwtwq0yupq2d4h8wc0z6g90j6945w33qrz6dzthrf4x2srk70pv',
      rewards: '1104431479973755831',
      mid_rewards: '119305873879658106354'
    },
    {
      address: 'erd1f0prhpkrrsyyg05ykmq7sppnjeulrl07uys5jzhcqtvz55s34u0qa6czkl',
      rewards: '745899077377467522',
      mid_rewards: '119262226850358528151'
    },
    {
      address: 'erd1wrcklu2lmwsd0pc8d54qp2yywxjz35fcz6zaltr98ejnga9tzf9s0t7kzv',
      rewards: '1341703898174261404',
      mid_rewards: '119203033191164247014'
    },
    {
      address: 'erd1kvpyvyjg8fndu0c9cg8x5rm2wj0pqnagrq7n4x63zmydezjpavdsw6vm47',
      rewards: '1221066932725955277',
      mid_rewards: '119103539006970881278'
    },
    {
      address: 'erd1q5fh7legmkn40xlh3f6l8y2myvuz7arwjpvk8s3jzg8qaqp55wksges4sx',
      rewards: '742879239404013858',
      mid_rewards: '119034444279945458051'
    },
    {
      address: 'erd1grwy4036c682wamrytwnupjxvq8nj3u4z75xv8j665h2k2sz9cqsqv6u00',
      rewards: '862018865649691566',
      mid_rewards: '119020996056184103965'
    },
    {
      address: 'erd1398rn42jeet8u6x2lcc2x6snm8rytg2yx4ew0ewzwpa768jjkarq4xzmyc',
      rewards: '384704756602741605',
      mid_rewards: '119017794689457882171'
    },
    {
      address: 'erd1q3xhltesk0s65djpgz08lz9m6rqu6hfnxyucea2e3v99rhuf0puq8altpf',
      rewards: '1098517416871831491',
      mid_rewards: '118859783557335026662'
    },
    {
      address: 'erd1lt0qnfhe0jmp2frvndzuurrhzpktcsds8a6w5nhwtrc7fqrkpnsq2464ec',
      rewards: '143787202968813730',
      mid_rewards: '118845687408614461339'
    },
    {
      address: 'erd1ldhe726x7g3rmstr6tpktja3wkl5zuvplqev3t2tv9dqg2ucghtqqfs2lc',
      rewards: '740282899537374993',
      mid_rewards: '118838605637711097565'
    },
    {
      address: 'erd1tgtr4ggrsauu9wuv6fl25gaqy0txpk00and8czw990qed2tfvx7ql3wr45',
      rewards: '619608126331544378',
      mid_rewards: '118736259662042100824'
    },
    {
      address: 'erd1yqxvpr07c0ku6xa3y06kycc0ag3uxfattlzsv7cqqawk462tfnnqsklfne',
      rewards: '1215178733940655293',
      mid_rewards: '118659399597436654132'
    },
    {
      address: 'erd1yz7s2m0rsdf2dv86lhlayfldh9sggj8853njmls60elslrcugwmqzzq3x4',
      rewards: '379881100577332938',
      mid_rewards: '118653952397945966874'
    },
    {
      address: 'erd19ja28xht29v448emcsc70xq4zyn7s52mwuzn96xgzgyf5203wntq9dd4cf',
      rewards: '1333912277170651145',
      mid_rewards: '118615321043860844025'
    },
    {
      address: 'erd1mqsus2hegjz6ymnjszvn3aqm6w3tqnwgfavc0flx9qmj93g0cfus3vpwrj',
      rewards: '140292090229759849',
      mid_rewards: '118582055461939301550'
    },
    {
      address: 'erd1jzl33fh8j3k3xjgmfuwsh5hsnger5lg0zshkm8n8fq4z0hxzg2fsvlvfdu',
      rewards: '975503404116932321',
      mid_rewards: '118580991692190257264'
    },
    {
      address: 'erd1xy53cvkp2vajqe6szs3p2xayltvxp6twu8c3rhreu5wczlv6hxwse99w25',
      rewards: '1449357825272488078',
      mid_rewards: '118323233163830624998'
    },
    {
      address: 'erd12vj3lvs6s35n2s4c7y09jmeyma2tftu8j4h0h3qf7gvxran9uwwsyvuyqt',
      rewards: '136472204252160046',
      mid_rewards: '118293926279409874364'
    },
    {
      address: 'erd1mh0nx5j4qyfrz5tpny0s6euk8gq7p53pmj6gyhcfjhfc9xzzzlpq6v4uk8',
      rewards: '255393257032938719',
      mid_rewards: '118263991334805728322'
    },
    {
      address: 'erd10hc5vtnam2mjjrdch8pmr5p8k6anl74lamfw89pp2f3p0ggtjg2sc5s86v',
      rewards: '1209612378352899545',
      mid_rewards: '118239536414458630476'
    },
    {
      address: 'erd15z5a3xsyfflk2cp2f5ucf0ezrgac5yqe4dqerex7hx5vrdu3nulsd5p06u',
      rewards: '370795931789414891',
      mid_rewards: '117968669572396941589'
    },
    {
      address: 'erd1u2qpwsa5wqjcm55l0323t0e5plwk0lvspgfp7zq4jrq004s64jsqs3pkgt',
      rewards: '489511478640594282',
      mid_rewards: '117923233574659896350'
    },
    {
      address: 'erd10jegzr20q44d8fyj2wc45h4tn4huq2mv7h3kdgq9cxqrpx7hrnqq0j6l9u',
      rewards: '129308746423068982',
      mid_rewards: '117753595688265650406'
    },
    {
      address: 'erd18f9n0fzr9fg34sqhl96tgfjd5f86ulaxe6ak92dy0j7lulsdjz4qu7jsj8',
      rewards: '128429242284254153',
      mid_rewards: '117687255800103021706'
    },
    {
      address: 'erd1f53wqmdr7v3ja3nhej5ufh2crfen3ly83khgya6a8hd26y9tsuyq8g4xqm',
      rewards: '843795698064282618',
      mid_rewards: '117646445504081020574'
    },
    {
      address: 'erd1kwgdxphl8y42f52q5re2acdrcexe6wc4g8ts2wn3p8dpnd44kjnscca3zr',
      rewards: '842158856493824467',
      mid_rewards: '117522980608429179439'
    },
    {
      address: 'erd1ha6qycn67h9rf8j530uy6v3sfd452a6yph9yy83kyxumd29ykmdqp3lth0',
      rewards: '841139128894626861',
      mid_rewards: '117446063841467429189'
    },
    {
      address: 'erd152fvy6y6vh8l8msnnqhh26g0u476l8mt7v6d7fywpm7v5mhfzxzsmmzjt0',
      rewards: '124653210989906676',
      mid_rewards: '117402434521031885512'
    },
    {
      address: 'erd16v7qq0zy2x6a3fqnyhzslg6lkva6qfl79wgu9xq4cpvnzmf34f4sarkrkk',
      rewards: '718410184938554226',
      mid_rewards: '117188774356354993952'
    },
    {
      address: 'erd19nar8ma5q2h9hezladznjj7k7ekz422d7amvdlsx8vh050ttxh0q6dfw6y',
      rewards: '121678890236016234',
      mid_rewards: '117178085257094629179'
    },
    {
      address: 'erd1rjsy2f4v82gts8n8nkkfrqlmcmjpeh8pl3wuyhuyxdy5nm89t64q7xj9k8',
      rewards: '240353234290058787',
      mid_rewards: '117129541384325035856'
    },
    {
      address: 'erd1xaaxl8w7fltqzu56twgrzg6ynnn4udk2yllrk8nzx0v9n4ngwzasxuwaqa',
      rewards: '1313603269508806934',
      mid_rewards: '117083438204973630306'
    },
    {
      address: 'erd16f4tlgy0lr9ag3zd9cs5nwpa7aekg0mgdm3qtrff8zzl9g8x6dzs2g555s',
      rewards: '952976041995051161',
      mid_rewards: '116881781173660476214'
    },
    {
      address: 'erd1kywttfhta96f7lnrt8wjzxdtmtqh0q29e0jc34wawdj00keqx72s3p3zwh',
      rewards: '832758748863432868',
      mid_rewards: '116813942343120749002'
    },
    {
      address: 'erd1ht38lcc5xh4cydqwhceesfhxvnthz3l3lszpf7m9zkwezay9kkyqunxh0j',
      rewards: '1188698147752941481',
      mid_rewards: '116662002372517346948'
    },
    {
      address: 'erd1w9ardfervg8ul0yxv6ls8fz3tssxujkkl4vz0r8mpucu5jrfy0hsm5zqnt',
      rewards: '1069114695653512364',
      mid_rewards: '116641973371781238281'
    },
    {
      address: 'erd18yvv8vyl9xpfpj5z0dqred6zlctggvdasfuhmxujjcgzk68yl7lqwdush0',
      rewards: '113401858828319642',
      mid_rewards: '116553759215098862988'
    },
    {
      address: 'erd1x0kxujlt3avqxx8zsd4xwqvp4nth5m72hp8dkxsxjslnfywegr9q2hyhta',
      rewards: '470939378311777192',
      mid_rewards: '116522363465715194757'
    },
    {
      address: 'erd1z7cd2nuu3ctrw344c6jwc5dukryfktsamuljy9azc60qqn46rv9sm4rtq2',
      rewards: '467935126386189203',
      mid_rewards: '116295756531239096582'
    },
    {
      address: 'erd1qw5ahtl5g6uvj7hpgsu4ryjkdk7lvsrqp23de06njdjfj7ghts6sgww7u5',
      rewards: '346254278387979984',
      mid_rewards: '116117523602610929580'
    },
    {
      address: 'erd1qf8pj7z0pxlxqsmejaxdslpm7erpnj3u57h3zull9fw8gqshm7rqy2nhcl',
      rewards: '580683195628864277',
      mid_rewards: '115800201222301724626'
    },
    {
      address: 'erd1zx4y4z45ycqthpmnf44an200zd2dgn48f0hm489qt2a76tnj3pmsc94svk',
      rewards: '1057608414777838793',
      mid_rewards: '115774069114402082476'
    },
    {
      address: 'erd1kq7wnahts3humt56cuxavvuyuvp4xpv0yr6ne0x9u3dr82je7d4qgmdlh4',
      rewards: '580286795592352856',
      mid_rewards: '115770301267396150035'
    },
    {
      address: 'erd1m0xvk2d6gpfu54t2tkfval3wrdse5v5a47nyhpgfck22uvu8wm9q5pv8z8',
      rewards: '697726298630523836',
      mid_rewards: '115628614893896615004'
    },
    {
      address: 'erd1e6r404ayrksdzsv32lucetjf3w23e4r50dkwwzyweaz5e7t80z4sa05r8s',
      rewards: '578061234736282155',
      mid_rewards: '115602430018387804686'
    },
    {
      address: 'erd1awjjlnjjpeajusa4xldm0ppwu9ls22kee2jwnunzwhkxxfxqzamstn7lvd',
      rewards: '577636853466527217',
      mid_rewards: '115570419474342162198'
    },
    {
      address: 'erd175d7k3kvs27w0qgtht7gzcdhy3mmye02jq3z4q59wz2nyycnfs9qqhump6',
      rewards: '931582661477439447',
      mid_rewards: '115268105457624162324'
    },
    {
      address: 'erd1dny5nhnanfvxxwzuvfh57462fdh3lj4na4sxfm3rg7jd3aqepvjqnnp949',
      rewards: '573257090788068272',
      mid_rewards: '115240059498254551517'
    },
    {
      address: 'erd15976v38xc64h73dm66gct6ce2c2mfzd8myrf9nzmgdrj4c7kstzqm77dah',
      rewards: '450346162658333166',
      mid_rewards: '114969043176399306434'
    },
    {
      address: 'erd1txy5gfaxqq7uvsntzhlns49a0wxaz3m6q3ja6kngv2923ezzplmq4k8j93',
      rewards: '1165924646756249029',
      mid_rewards: '114944225909034242315'
    },
    {
      address: 'erd1j5m7urz2l8mjjdp35hqew4zd55klmzv8qd44qh8sl00204c2fmhq6q4zr7',
      rewards: '688529025456706335',
      mid_rewards: '114934876175879440988'
    },
    {
      address: 'erd1w09kwg6nw8ngcmfczfzaw59whwn0k7mhye8k5lg6q63w0zqqcyds0n6h70',
      rewards: '569028037611430469',
      mid_rewards: '114921067349849176494'
    },
    {
      address: 'erd1enl9te4t7tkp90f52tz4zel8687yw3t7vnranrku0jchtyytvvmqqv98xu',
      rewards: '686989820856799683',
      mid_rewards: '114818775913799026437'
    },
    {
      address: 'erd1vc0e7ecp2clp5d96g4pfqcdydfjrzhxsndg2vs8nvtnrharrh9gq3x4y5e',
      rewards: '925461416943647121',
      mid_rewards: '114806387701144812884'
    },
    {
      address: 'erd1snrpt4rrnghndpknvawesep7gsv3dg3ywyd2we8g7fvv30vhmk9qtdwaq4',
      rewards: '1281173400915939082',
      mid_rewards: '114637294110099105542'
    },
    {
      address: 'erd1tlla05y3shwtja377ldjrku6ferrj7fqgl45qy2lxqpqg26hutfq74dsxv',
      rewards: '326550683469822284',
      mid_rewards: '114631306283572792164'
    },
    {
      address: 'erd155rucl45ykduh8adpz3q96hhalxu0ln955xly4asr74mkphz9hxq72x0mr',
      rewards: '325630965485505383',
      mid_rewards: '114561933115752387617'
    },
    {
      address: 'erd1ps66ftpjhfrjlnpfz6v5dcn080eetq243kh5pelswk8utss9swgsadvqh0',
      rewards: '324952603254028921',
      mid_rewards: '114510765108026417651'
    },
    {
      address: 'erd1x0rvu3zmq8zwys7ckcfkjg04l05g7nqtv3ekul5at9af057hglns0f88gt',
      rewards: '1398210908946922506',
      mid_rewards: '114465285760110984212'
    },
    {
      address: 'erd1fm6gpuvvpgjpecvvmcg8vw67a0h8xvkyj4mmkc0krrfdqumel3as9hhvh5',
      rewards: '1033647055952400655',
      mid_rewards: '113966694032749560872'
    },
    {
      address: 'erd1ekpc9308x53yyyqmc74zqjnx6fgf4yqg30ujqyucxfgcy4p7dw2swxe20q',
      rewards: '1388411767219834406',
      mid_rewards: '113726148856058688991'
    },
    {
      address: 'erd1nc5rrvygzxnzz6ywsm6u3ea77ugdmllk7fj82kfgldrknt2nhdnqezmqjv',
      rewards: '432699934249195000',
      mid_rewards: '113638010418859440030'
    },
    {
      address: 'erd1gll4wmhukqcwwqsx0dsd6yukgfsnle2cy7jl5gp5vewvufsj503qfsu3re',
      rewards: '549261853865170436',
      mid_rewards: '113430129034429903280'
    },
    {
      address: 'erd16ygnt4v3wn3avurvkfwfv088ttzjpf8fsvzn57jqr7cdxkap2wgqa53nxa',
      rewards: '1023236451407128174',
      mid_rewards: '113181435259357776352'
    },
    {
      address: 'erd1zwuy9xpjd6qsw8s07g0xskrlnfnn2megnggra75vknch998a9trs5nyfyz',
      rewards: '545933377847963214',
      mid_rewards: '113179066285559760160'
    },
    {
      address: 'erd1tdu7wnc7h6y57rzkmpyzam3vs9q92p77n40zulydw3xqut4mgs3s7tsad0',
      rewards: '306109280431453850',
      mid_rewards: '113089437028380930144'
    },
    {
      address: 'erd1lhwvns97fqfvct62vsu50zwglzvuvyvc6gnhpf73gcrvmswznypqgxw9lm',
      rewards: '901625104971730387',
      mid_rewards: '113008444745973102657'
    },
    {
      address: 'erd1742gdt5rkmaap77ygmy9fc4ny3tf8fya6f8yllzs2vtnh305spss74c56l',
      rewards: '1138158053541280199',
      mid_rewards: '112849826795665136228'
    },
    {
      address: 'erd1sqswthfm4ty68g2m2twsvgfd76dsxktmczts482vte098f9me9hs3t77jx',
      rewards: '1017401072510213052',
      mid_rewards: '112741279987400134304'
    },
    {
      address: 'erd1whdguk9qg4ckyn6qgc25lcgmfmzwtd2pvpm5mupx8ry8pfch87nsvw949r',
      rewards: '1016852362430422096',
      mid_rewards: '112699891477988351941'
    },
    {
      address: 'erd14eukvg8gr4vq0286taer6tyw6x8kgkespszpl0m0pudxept9y64qcswjx7',
      rewards: '180905082570787524',
      mid_rewards: '112645442262465458374'
    },
    {
      address: 'erd1vumkl3ddl8sukmv67cx9eqr9ruldk0thjaz2eft0r9cu2d9rtevqk4vp8d',
      rewards: '657500912385657087',
      mid_rewards: '112594464732444288296'
    },
    {
      address: 'erd1exn4x6sc0y90n23ja98ajs4a3leepcsa45muvkqtja7z879d4ecszqqg5x',
      rewards: '535589203785988618',
      mid_rewards: '112398818279756300672'
    },
    {
      address: 'erd1k74s7agmfe0h4wjle85rpsc4kjmcww2s56yzz99arfvampd9hq9qtqsqax',
      rewards: '534748519948839837',
      mid_rewards: '112335406557997113246'
    },
    {
      address: 'erd14nzru3z9fnckf4fh94qxtvjezaz35gl7z2jrjw8awhlzhqag0fmssexhzz',
      rewards: '1128760161457622812',
      mid_rewards: '112140955646253129839'
    },
    {
      address: 'erd1ncgynuzuxhq03qs5la39ahas5hra6cctumcnst30a45w7k078e0s5lmann',
      rewards: '412457917274255317',
      mid_rewards: '112111180603012200584'
    },
    {
      address: 'erd17ldwjvsav3cs27p5ttvl228ux7pztfdg8gqv5axx4tjjwk4s83mskvllpy',
      rewards: '410308379376749514',
      mid_rewards: '111949043669905749266'
    },
    {
      address: 'erd1gk7x55tzdncpagr4aclhjlj8m2gjqa6y35j0e207tys6az5gk87shpypl4',
      rewards: '169485541797056552',
      mid_rewards: '111784080701599182251'
    },
    {
      address: 'erd1f4qkyfssnq427k2fr7rx9t8e0gyardan6zwd9wccf3wpvhhexftq5hsrvq',
      rewards: '884319402455031955',
      mid_rewards: '111703097427107092775'
    },
    {
      address: 'erd1t62alnacvc7sxum60cpkksj4ehav97xtszll569r8smcnqhx7ykqs2fehp',
      rewards: '286744090435913754',
      mid_rewards: '111628745165937444914'
    },
    {
      address: 'erd17l5xutjhlejmrf67fpkwcmj52rn8a8xkwn8njh7lr35a59mxt4dqzueu2h',
      rewards: '166838044617188124',
      mid_rewards: '111584383327735743781'
    },
    {
      address: 'erd1l5cu8rww4wt4u8q5pe7rrhjkypw6vsu2egkzknce3gv43am3n8dq8ld0nq',
      rewards: '643688498447106702',
      mid_rewards: '111552611766096522990'
    },
    {
      address: 'erd1m00f0jsve8d60x6zt5ke4kr0ksjrk9zau70v8xeajtnk5ux9m85sr6tgwd',
      rewards: '999129786469276022',
      mid_rewards: '111363099920872487797'
    },
    {
      address: 'erd1a8x7gzcr9gkly3v5h7mgrjwudclucgktx5074fs7u9vtfj769vzstl7nvj',
      rewards: '879489900255120064',
      mid_rewards: '111338814166024248890'
    },
    {
      address: 'erd179md2qxrffekt3mj92p6shy366z8rec9ppaf9pfnp20x03rdhezs32fk6q',
      rewards: '1117747084297717406',
      mid_rewards: '111310253123239367011'
    },
    {
      address: 'erd1u5xtxx6usnnw4jj4gkvlu35t3h4llahym50d3p88whg5tvss6dkqpjcjxl',
      rewards: '400962910378147014',
      mid_rewards: '111244126727695504983'
    },
    {
      address: 'erd1gm6mdunufgel9ghkzq2c0007ddeuv8sduplnummwdhrqck2pelfskv5xls',
      rewards: '280151230266325951',
      mid_rewards: '111131454036743125078'
    },
    {
      address: 'erd18yzd7x04ugt9yjs55aws0ysasks7et4m6lpq0vydfa7zn5h4vghsw44dd8',
      rewards: '995694854133770696',
      mid_rewards: '111104007306151323001'
    },
    {
      address: 'erd18260ncx7psenwayvy2sd4j9jq0nw79g9q474kfe8nchdlqne7luq65w9s9',
      rewards: '518053929685662535',
      mid_rewards: '111076154665820095100'
    },
    {
      address: 'erd1fjfu3y9hqvj2crh3kyydqg0ukkv536ds4ss6xdmgfa0j2q4upfesftdvml',
      rewards: '398735105841947265',
      mid_rewards: '111076086240724238467'
    },
    {
      address: 'erd1vmyyt4vmzndyjyr0myqh3cq36g2c0mdh42mxft6a7lksu5ku9xksesszn2',
      rewards: '279024798872358384',
      mid_rewards: '111046488737092141340'
    },
    {
      address: 'erd1qc6kark27xk7ps073la7d8yd87lvyggc0fdw2nkpa484ae9cjf7sw5h7ke',
      rewards: '991123341743883705',
      mid_rewards: '110759183891121293531'
    },
    {
      address: 'erd16le876pafd4g4c2rtfgrzreadlqk3de3m9d6luqfxdq670frmhmqed26uh',
      rewards: '632208456699114030',
      mid_rewards: '110686686693031589340'
    },
    {
      address: 'erd1hfh3gc6h7u0gz8yk97t4vqhy9wg6n4pp5hgnejmtrqtma8v0p4vqn2jt7n',
      rewards: '1344802728590000303',
      mid_rewards: '110436774061891806819'
    },
    {
      address: 'erd1z0sfwmqwxx2khqqxqtp0sn0wunhlka8e8478f8zhc3c7yap7yswszxvdk7',
      rewards: '745528205946286446',
      mid_rewards: '110234252485962220666'
    },
    {
      address: 'erd1srpqyyzm6wxd5lf9usrg9ndpczwnkhpjea3nztfdcxkqxddfsejsnkkce0',
      rewards: '267919717273859170',
      mid_rewards: '110208846435290067763'
    },
    {
      address: 'erd17gyya0wehp3hdz6p0y6j0gp7fppljdmsxlgq4t4xedn2242z9f7sgf92d4',
      rewards: '266244731431915616',
      mid_rewards: '110082504365338857753'
    },
    {
      address: 'erd1nmwxpm7l78kpr20fyud2h9rcsaks627825gxvp8sa9e5ssr56q4qcc2juy',
      rewards: '384749412186867623',
      mid_rewards: '110021163003859163921'
    },
    {
      address: 'erd1xj3xk9g0r33vjpd94v4wwnjvw65r8kjcqkyu7x8jxq6ewe38rphq3wxwyp',
      rewards: '500614944583498382',
      mid_rewards: '109760754009597723420'
    },
    {
      address: 'erd1pd30vax79zqc45qkc0y73dx6amry769rqzh3zd3vw6kkvwz5e0rspww3rj',
      rewards: '142390761615157340',
      mid_rewards: '109740355598178559409'
    },
    {
      address: 'erd12fmp6t5y3v7kv32h84d63jvxnp64c5hk2cgp2hgf7fl4ufkqpthqvnjmn0',
      rewards: '858274842668778763',
      mid_rewards: '109738589123833828064'
    },
    {
      address: 'erd1wtgqgzwep44dxa33vxqa72gptwt2kncnc8j746fuscfjvxe30t6sl09fyy',
      rewards: '1096634031319276184',
      mid_rewards: '109717722159998117285'
    },
    {
      address: 'erd1yv45tchuk0a34av970qmglpq4f5j2rgwcldqsdt49uceh6aq07ps3lf379',
      rewards: '1334364019237944699',
      mid_rewards: '109649395378363684425'
    },
    {
      address: 'erd19v37ax40r3jdmkjaawy4tgad9vjuhutk97aetgjmq0wedekhs3jqv3n3gf',
      rewards: '260061682529220094',
      mid_rewards: '109616124783246584045'
    },
    {
      address: 'erd18ljy8lppj7njt9xv2wdvufr33n87rtuq7cr9xyeflsksme76f67qq52tpr',
      rewards: '378144609037859378',
      mid_rewards: '109522971030786896731'
    },
    {
      address: 'erd1t3vrdmhu8juzcdpknnkjsuckznwkhefl0af0t348tt54hj42lzcsducra0',
      rewards: '733864091520578999',
      mid_rewards: '109354443042927352454'
    },
    {
      address: 'erd1gmeuz73ty55slzutmqescd6x4dke5vjjv9h03vaaqpxaawjvpk0q0cwchu',
      rewards: '137169656100128612',
      mid_rewards: '109346534192836413501'
    },
    {
      address: 'erd1lf87mcryffjxglxwg84edayfje7zkd58c80acsxvgyyxtq8afqdswnlpmq',
      rewards: '374153851494489420',
      mid_rewards: '109221953221515313945'
    },
    {
      address: 'erd15h9qexhutzw7v33gft4e4f7cjqchygcp02m89e84j57swfh6rf9ql5s4fw',
      rewards: '135306904653637238',
      mid_rewards: '109206029200100921622'
    },
    {
      address: 'erd1yrwlycwarj40e8506w24jyeale95e6erceh3n2aujzfck7attrgsy24xd3',
      rewards: '134578229173346281',
      mid_rewards: '109151066127460362499'
    },
    {
      address: 'erd1qf8jq9cl7jznxz85dxpww47ezk4wh53kxwplcqk9ndagqfqy0ydsr9txvw',
      rewards: '1326200208227951262',
      mid_rewards: '109033609408199162930'
    },
    {
      address: 'erd1fdddp3m392s0c89qgqjtazx9t8jdnmredftkjda3nf6vfvctzhksu490kr',
      rewards: '132856566629172495',
      mid_rewards: '109021203292717838805'
    },
    {
      address: 'erd1cf9mwhp3a90nqy0ze5vjyt80wt3ednc2xtvdejdehaxkkwv90qdq23483d',
      rewards: '609556029553482811',
      mid_rewards: '108978042677463561575'
    },
    {
      address: 'erd1wqt0383qdumsfchzkun58vx8t8t2lmhpy8lmud6lsq9j6tqplvrqlpvgz2',
      rewards: '1086460528216677378',
      mid_rewards: '108950347649449445055'
    },
    {
      address: 'erd1lwh8z0q47d7vcv2hs3hrgs9m8fdaka27ukk9ga7tus0yx2zsyd9qsuex0m',
      rewards: '131598681937520386',
      mid_rewards: '108926322636581150921'
    },
    {
      address: 'erd16dmuraap3kfajmzcv4utsxq8szjw5fjqkyxtfdvwx3mvtyc9djksf593qh',
      rewards: '1324171180102758483',
      mid_rewards: '108880562375259097352'
    },
    {
      address: 'erd1h3lmf2kpkcphe6jzp393x4ddqnqcj0avl75ersgtrx3vhvctmr2sthvnl9',
      rewards: '1324171180102758483',
      mid_rewards: '108880562375259097352'
    },
    {
      address: 'erd14fyasp59qdsgwqmn7jatv8k8wdp3kv5yjf3lgte6gestedmvznuquvx44h',
      rewards: '1324171180102758483',
      mid_rewards: '108880562375259097352'
    },
    {
      address: 'erd1q4vkn8e9vwyt27alyhkth6pg66fnkyzw3squzape7lyhhu80c30q6ln9ry',
      rewards: '369303655670688850',
      mid_rewards: '108856109066476582152'
    },
    {
      address: 'erd1gqm5vyc2s7x0mlrjlh4hyjm5tjncgcap90kj74t3ftwyf2jp9gqq56des7',
      rewards: '727035126242246916',
      mid_rewards: '108839342803101867580'
    },
    {
      address: 'erd1sgex2pyyjn059n3hk2fj9aeuywszrd56hchhm0832rhdecwjz6cqad5yl9',
      rewards: '1084190563806054449',
      mid_rewards: '108779127096312767250'
    },
    {
      address: 'erd1f5l0etj9gkp6qv3c70uyukqklwsq5hr0p87hpes27k3vcd4x0arq3k042r',
      rewards: '604969027793598854',
      mid_rewards: '108632050918786289025'
    },
    {
      address: 'erd1tpax6a9m6vf483fw3a8pufg2p2rgje8utrysaykul46zt7mufztsrsnpkh',
      rewards: '604578831323498990',
      mid_rewards: '108602618891072628170'
    },
    {
      address: 'erd1k660mqy2hf752rrttsfn9fvz0aqamvknj800tdkulm3t4r4qk7cqdlkcql',
      rewards: '126585590938711343',
      mid_rewards: '108548191503897429193'
    },
    {
      address: 'erd1p8fhz25mu6m52ygucmv9w5ypsush96deedngfuvahvc68f7ynhlqkyvt2j',
      rewards: '722438710054695907',
      mid_rewards: '108492640926016978440'
    },
    {
      address: 'erd1lrpj0skwdewtsfxrzwnfdglh03c4czd4ztpppm7ul88dujn8ra2q2ct66f',
      rewards: '124242139255671777',
      mid_rewards: '108371427898467596984'
    },
    {
      address: 'erd1cufjdcxv6lv09dculglky80x9k4ssmxpmplkyvd399n2ts3ftkrsve2m0k',
      rewards: '719774930544437161',
      mid_rewards: '108291715396503725472'
    },
    {
      address: 'erd17sjdff6smqruc9azp8rueqjggzd7jfxz29uek9zhr3ep2gcjalkqkgu4lf',
      rewards: '838622442132433835',
      mid_rewards: '108256233332461257723'
    },
    {
      address: 'erd1d9spv5lcx3xw9jgkc2rm3lx04c2l9vq4m7vp3h49nwq2tqnl87lsafjqu5',
      rewards: '122035627158809900',
      mid_rewards: '108204993473346462796'
    },
    {
      address: 'erd1tgzrfapv0g2ztmcmhh4gw75dzcsmxgn6x0vsfhh675k0e5pxds6qjtecx2',
      rewards: '121803390619472546',
      mid_rewards: '108187476164027512925'
    },
    {
      address: 'erd1w8n2nwxl6zvn0eu4ncrtetz9rsqf0s7dpl66wx4qs6sgk5hrhrqqfj00tf',
      rewards: '240800188634783000',
      mid_rewards: '108163254586951644522'
    },
    {
      address: 'erd1muynp8pkn79qrm57zvyq0wmtfs7q6psm2xhrmhpm4v85ruhhnvxsjtcauu',
      rewards: '717968843000184045',
      mid_rewards: '108155484490462594901'
    },
    {
      address: 'erd1qky3z7pdq4fxvq8avvnwxjqu2as9nqncz07pekz8t05awue45scsht30eu',
      rewards: '239630570370536475',
      mid_rewards: '108075031756132858937'
    },
    {
      address: 'erd1jenmpvs5gqs3zk4efdvce0dpk9wwpwwnx8whj058f6g80l38av5q7yn4k8',
      rewards: '954403658360943537',
      mid_rewards: '107989464475958589062'
    },
    {
      address: 'erd1j0udm6gpjjvqld0k0xhnj06m5zj0rr557q42vjpcffsxd0w32tfsjpqhn6',
      rewards: '357300090523210726',
      mid_rewards: '107950695283535666625'
    },
    {
      address: 'erd102q90083se3hkt5y4klk40qg85p2qf2kuep64qf76yxhvc5svnyqjulcvp',
      rewards: '595866764507655590',
      mid_rewards: '107945478676806867686'
    },
    {
      address: 'erd1nkur55grefluetnhftgy7tzwmxf9xtg4lhygr56f2zr2lhw8avqsm8g35y',
      rewards: '952553096292606518',
      mid_rewards: '107849878912646842228'
    },
    {
      address: 'erd1tmmj256e8f92maur4gwlwcunpqku6g6vu7j0tvm830vpy72nvx9qfwgz2p',
      rewards: '235551500803912963',
      mid_rewards: '107767352682306056462'
    },
    {
      address: 'erd1084yw75l5gr8aptehewlwyr672yt4pqts78ka68vffps4qq5v80s7s87jp',
      rewards: '593354220445339357',
      mid_rewards: '107755960646428583207'
    },
    {
      address: 'erd1yxjsn7yej2la0qhl37zqacct7hjf4zt0m0wtnvkuxzl3ya4up6qqzeejxc',
      rewards: '115744655273695323',
      mid_rewards: '107730473396777943269'
    },
    {
      address: 'erd1nr8sfwdemdscswfhftrm30uwz33r25xkhgk2urnnlttqpje424mqta4df6',
      rewards: '1069732220171108249',
      mid_rewards: '107688552467463717323'
    },
    {
      address: 'erd1ftrdw92uuz86dgfqn83w0mh07ft9cyq5rm9dc2x7ystt0xjfwz7qq3hzzd',
      rewards: '1188116850730583349',
      mid_rewards: '107618155871118873538'
    },
    {
      address: 'erd16s6u665l4ww8zxwr4snwttphutmrp4c342yc06xvtve377glc5psr520a5',
      rewards: '351969414092617203',
      mid_rewards: '107548609082198085688'
    },
    {
      address: 'erd1srn86l39ttlplhm25tp6t3cv6zvp33sc8vp3w4s7r5wyq3t27c8snmkpcw',
      rewards: '946927163604654680',
      mid_rewards: '107425521904125952694'
    },
    {
      address: 'erd1kgcem9kgap24s53uj0xd5hzeld6ftrl5927nyzjfczj09wsmen9q8pepld',
      rewards: '348784917379627932',
      mid_rewards: '107308406510691545576'
    },
    {
      address: 'erd10jwdeskljec7u6qre6kdkqydmnvc6ry9grdcu0kthgpzqnphlnhqyyerly',
      rewards: '824729731919338454',
      mid_rewards: '107208323719375742068'
    },
    {
      address: 'erd1msknulpwxpktxvkkc9s5y3dk2wa53wh7wajq8xj0w7qh4upgrcqq4hw9ku',
      rewards: '1181446999325862408',
      mid_rewards: '107115057390142084856'
    },
    {
      address: 'erd1j9xdcvf8vcmazxzdcq84kr245zp35sdgf7z2dm52dv50ex7unr5setc5m3',
      rewards: '1180469860966887303',
      mid_rewards: '107041353075866571364'
    },
    {
      address: 'erd1alncqzv558kdnjvs8e7664zqgwyx5c3jqse6e6gsd5ut3ft23grqkh2h9l',
      rewards: '345206731939231806',
      mid_rewards: '107038508494906309338'
    },
    {
      address: 'erd16vqh7ewku9c7nd0d8zag5rdzm7uqa6lmtwrzqmxc73df2kyzq49s4sq6za',
      rewards: '223496332336302019',
      mid_rewards: '106858046525997751518'
    },
    {
      address: 'erd15enl7wvcaqfumczwqqy3s2lz0n6a57t6kwausldtdh2yn5jdzkas8d7hsr',
      rewards: '461650395905383796',
      mid_rewards: '106821707235927395292'
    },
    {
      address: 'erd1xepkjmshjfk0r9anm2v2gtmenevjylcj5qpertp54nv5nty3mcfs95q5zd',
      rewards: '1058085500077985637',
      mid_rewards: '106810055057001994822'
    },
    {
      address: 'erd1dr3c6ksu54av6ymdf0xep87l54hkay4q6yya6n0a6fkryn3aetaqmc3guz',
      rewards: '817304844549015326',
      mid_rewards: '106648273827591144550'
    },
    {
      address: 'erd1cakarqxu40cn99njafy0g22shg0syx96hvdfag5y3ev8u23cv24q39shfg',
      rewards: '578614340727925926',
      mid_rewards: '106644150105887532715'
    },
    {
      address: 'erd1mas9xvge5rnzc2f9hze2rqlzsy546nrjsy87rrqlgt9jgjdy7flszx5nv5',
      rewards: '339855669202701455',
      mid_rewards: '106634884580218429951'
    },
    {
      address: 'erd1qgthxfmhyf3scfgww3wnxa32qz4na43kzkkasdfr2gayc3v48x3sesh546',
      rewards: '576986764087618429',
      mid_rewards: '106521384052234158126'
    },
    {
      address: 'erd1kv9lp056vwxecp6aqjw0awy5qvg2s3p2k66gmlkx2jh7g47064qstuna8r',
      rewards: '95378636198804089',
      mid_rewards: '106194290258894263739'
    },
    {
      address: 'erd1u68zs30v26l8phdww3ez2hq4mvl076w40mm5wvmv6757gkdykaeqfqv3g8',
      rewards: '571843050483824041',
      mid_rewards: '106133400221167554260'
    },
    {
      address: 'erd1cglwvrnchdedvl3x8t0xxp0aqjyer95jhmnj96mmmd9prhve8jxsns2ey2',
      rewards: '211690993101655592',
      mid_rewards: '105967584673704837670'
    },
    {
      address: 'erd1s6efx5u22ge8c4j7zhyzxvr2cxtfn9r6zam7eaqtl6wxrytnt3qqryqwew',
      rewards: '807736062736139094',
      mid_rewards: '105926512681390951434'
    },
    {
      address: 'erd1uu5hyz34350erh9dzq0fg7czlvjzj7ylpgfp45pllznr5qswnxkqcgjyxt',
      rewards: '688015864077738718',
      mid_rewards: '105896169060144924279'
    },
    {
      address: 'erd1yk6jq70r4svfxejzsq6c37vp3ueff0hevjgeqcclap603dsgagyq540f37',
      rewards: '1281672518412736151',
      mid_rewards: '105674941913510409360'
    },
    {
      address: 'erd1kamj7p3g98akxk7pah2a3wju5qu3mcatcmlg8laj7eqrd6v80ajqzzwkw9',
      rewards: '681713976182699392',
      mid_rewards: '105420825602712539983'
    },
    {
      address: 'erd1xfnz0kw7u4nfhpua0sv4cyf277rwp9nvv0v8us0ncnhd938034cq6lrz39',
      rewards: '920220356559368145',
      mid_rewards: '105411061125177608615'
    },
    {
      address: 'erd17dx6v9gfthrj2x97rnq4pn0xlx9ur567z5p7a0a652zfmnfahg4q6qw7pa',
      rewards: '800191199081407517',
      mid_rewards: '105357413129759898123'
    },
    {
      address: 'erd1p8j4qalzmrk53gvhngyfj5jrfwvall0nrneyr5x9dev6hsmvemespu5pve',
      rewards: '679366375205970623',
      mid_rewards: '105243749021291865300'
    },
    {
      address: 'erd10mcrce5atpjlfpwvple5yax8dl35vhpljk7ngf5q9f8sxkps7pvqa6eyp8',
      rewards: '436829394948430917',
      mid_rewards: '104949490432277498896'
    },
    {
      address: 'erd14ah2ce73cpxnxmmhsllcl8vnt94m0sdnsx9h8gm7zk8mjsma9wfql99syp',
      rewards: '555074333475449766',
      mid_rewards: '104868557042071916840'
    },
    {
      address: 'erd1pd394ywtrxslzpeyu78hde3cq4k7n6ns6vscpwaflxvrkkg6x7lsyxrecp',
      rewards: '553674478115221681',
      mid_rewards: '104762967717425271201'
    },
    {
      address: 'erd1a54lm0f5wuv777z5qkjkfhwmqjuh3zqkyjuet5ckyepa838n3awqwdeu7f',
      rewards: '791595286332494623',
      mid_rewards: '104709034270295933069'
    },
    {
      address: 'erd1zf7n9g26fhnnum6wfk7q6qph3s9rm3n5960wntsswawna3uq8hls7hc0e0',
      rewards: '552315341952764159',
      mid_rewards: '104660449790520779728'
    },
    {
      address: 'erd1ewz33xs83uf645fpcysqm3w85vcpj02y4hx2ma3df669xtnh6s3q7qrx0h',
      rewards: '1148680831986315207',
      mid_rewards: '104643546704868106191'
    },
    {
      address: 'erd16lksg8xg96hqam8yw5mesv7cv2hlxuzqvq4p53tc39urdllgve0qha6r5v',
      rewards: '312737561961610229',
      mid_rewards: '104589399946137671078'
    },
    {
      address: 'erd1ac0aya70kwlj77te9vl4xz90gakq0wgm9mgp53qprr82ttepdcgs2ssmsl',
      rewards: '788416151783111641',
      mid_rewards: '104469236160028688869'
    },
    {
      address: 'erd157macckafl0pzucew2smxrkf5qa3a8h752ge5zd0n3xjc98wnexq9c72mz',
      rewards: '788264046491724245',
      mid_rewards: '104457763049699519187'
    },
    {
      address: 'erd1n73hpk7e8z7gfagtdugfthmtk2x89rtnr6jgyyqelu8r4syv0jqs9crz20',
      rewards: '1025266121572882495',
      mid_rewards: '104334530720607805274'
    },
    {
      address: 'erd1kurve65nrcgek3vwmg9zk7prj02p0e9hv6r0lsyzyvlvkc70yx2qlqd4rd',
      rewards: '546066425086524079',
      mid_rewards: '104189101870995854014'
    },
    {
      address: 'erd159cc7jfuqu4797qd6hlp5j8wp94uyzjz08zzwgxx4uq5ujfmz68sa9xh5n',
      rewards: '185746540421977740',
      mid_rewards: '104010627323248510897'
    },
    {
      address: 'erd1t0h9u9k3u2qyvrtmud3lm4zla8cadtapqe6afqznfm22kwgxeexqxeagqq',
      rewards: '781933497733912613',
      mid_rewards: '103980257739528702763'
    },
    {
      address: 'erd1vxmwyhqylqkd2fcdlygp2cxyea4tfpag2nneh0xe50nsqvuuhf6qh5m0ld',
      rewards: '1019505259475179102',
      mid_rewards: '103899996156851269204'
    },
    {
      address: 'erd1mjdhjgvc07ngrsrs36gz2efmus6vt5uk02q5zvy8llt66hefuc7qtql2q8',
      rewards: '541919803530551833',
      mid_rewards: '103876327435793496247'
    },
    {
      address: 'erd1ywm46d0nd4w4pc86sfpd3t3wssrhv5mwnu2nphmk2jsj0pfzf45smxxwxh',
      rewards: '660614495388805160',
      mid_rewards: '103829318372237554635'
    },
    {
      address: 'erd1qw3zd6spy7gyhxsa5farcje4yvwzx2r8wfhmt8tcwr4d7nv4gr8sfdry4r',
      rewards: '1018383738834427128',
      mid_rewards: '103815401269123026057'
    },
    {
      address: 'erd12qkhf6g22q252j5d0yc0famx6mlamnx9rlgnkdujehqcejr28xjq3hm5dw',
      rewards: '302448268490930698',
      mid_rewards: '103813291514132829126'
    },
    {
      address: 'erd16h66jsym3g6eezp5rt7z39er3r092wy0lcle0qck58dz5qnulp2sjy8mts',
      rewards: '1018211697587087688',
      mid_rewards: '103802424414775032444'
    },
    {
      address: 'erd17q78u5kqdgfzucsteu0jer53xde2fykpvnwn5z8fqzhkl78axc0q2k9mjh',
      rewards: '779053934106305721',
      mid_rewards: '103763055886141138322'
    },
    {
      address: 'erd1aa3hhs5qrrdc3e5hnthm07d634zzxgprfadj2hmfze7qwkakt6mqczue4q',
      rewards: '1017311260435542403',
      mid_rewards: '103734505575858042701'
    },
    {
      address: 'erd1lqp23ad9a64uug0qdtjq0g4e0mk05xznjjh3u9xgeyc8gqum5agq8q60u7',
      rewards: '778611900628864528',
      mid_rewards: '103729713858328622733'
    },
    {
      address: 'erd1t3eunw0zcaczc9mv97yzj8aztqr8gcvavqyjhfagztfy3zzt882qftx0wz',
      rewards: '300245962275602537',
      mid_rewards: '103647174333352293464'
    },
    {
      address: 'erd1p34ka6dskzg4z9rrhs8yen37nlxww9ycvcjrq59ch0khwh7vkttqn3fmdu',
      rewards: '178528820378496765',
      mid_rewards: '103466203801695870556'
    },
    {
      address: 'erd1e0q9hjf9mkngej0ytx5gqzgvxxwj77a7p43vew78ucw2ycnk3fysmr4wzs',
      rewards: '178493667490052428',
      mid_rewards: '103463552263647245560'
    },
    {
      address: 'erd1ymjvj4nsfry4mt76suuekykwsdymcf73r8dsmwufhwkdqdtutflsty0fr5',
      rewards: '774608303658563579',
      mid_rewards: '103427727587273765136'
    },
    {
      address: 'erd14w9xzts2d4spmduxn0tt4gvcru36ajrt88w93n2cqju2652267es4f7e4s',
      rewards: '416217514537809077',
      mid_rewards: '103394762283863383524'
    },
    {
      address: 'erd12wj73w8g5ea5hgzjmd4g29t27u99uzm24muc3278rkwlycl37rfqy0rchc',
      rewards: '1250824091654521623',
      mid_rewards: '103348083982073362405'
    },
    {
      address: 'erd1v2v5nwrq2muq40l0el8rw8rhfxh5vku8ljf4mmgy5dp757qsugnqe6kfz6',
      rewards: '533296278764377194',
      mid_rewards: '103225865836685398149'
    },
    {
      address: 'erd1lzg4kufx6vtu4lk7qdukfttrugyc3gu8fhktw4ae0wsedhhf8lqqehqgwx',
      rewards: '1010247539136263037',
      mid_rewards: '103201697985392761279'
    },
    {
      address: 'erd1we2yxvcxu7dnddgf4r4upkhmlastuc96w08rgul0ar9c0dz0n7aqnkvsws',
      rewards: '651887129986929925',
      mid_rewards: '103171024204918468081'
    },
    {
      address: 'erd1xs7sqsjagymh4wsuhkdvrrce3qzrqsecynf6u3ydt3vdm6x3up2q9kslsn',
      rewards: '293392655275956278',
      mid_rewards: '103130238028182256190'
    },
    {
      address: 'erd1dtka6qdyg9ru6dj232tr9wjac5vlpzcaeu5vytyvxg6upr44cj4s2z04te',
      rewards: '1246482729079262854',
      mid_rewards: '103020620477348769855'
    },
    {
      address: 'erd1gqwvkmp0d2rzxpukzr75kdstjyyu66cte6cahf0g7rzh74a43qpq3un07m',
      rewards: '408729150118870129',
      mid_rewards: '102829924398344337144'
    },
    {
      address: 'erd1wtkjsuqv2qevp26je2z2vktpnj98udkxykxj676zl0yt00xcunlsdce035',
      rewards: '169545997255426427',
      mid_rewards: '102788640780591513585'
    },
    {
      address: 'erd12stj57wdt3ufssrueq3lhjesgdavjje62vklsawen7tv3w3urlgs7zc8ud',
      rewards: '527034117352908978',
      mid_rewards: '102753518897814885922'
    },
    {
      address: 'erd1352l8ef5jcc46ytjjxas56w8zwdn2053h2xhm0x5vke7r2faxahsyugpuj',
      rewards: '287531287649673344',
      mid_rewards: '102688122459139403423'
    },
    {
      address: 'erd1csx348pwe2y7l25z7yhmgcrexy2duumnl2ssl5agw7h0gj7ej6wq3avdx0',
      rewards: '764632676997391246',
      mid_rewards: '102675278647185671432'
    },
    {
      address: 'erd10t4acrqgpmvq0k5qhdjea72rlmrwzgut2whhawcd3gntd6vpra3qu465yx',
      rewards: '763982830521132146',
      mid_rewards: '102626261546918240415'
    },
    {
      address: 'erd1kw7nmwx7xkdl6qz7eynfn4zw7g22jq9yu7sl8e7c4djpqgq7zw6slj4yh6',
      rewards: '1001454368231973078',
      mid_rewards: '102538440192005284497'
    },
    {
      address: 'erd1f37zah6fa9eul0pe6adpfdq6g4hza6j3zuc080wdq2lrr3nuzejqux3drs',
      rewards: '762259475835596470',
      mid_rewards: '102496271076086528544'
    },
    {
      address: 'erd1pzar7zr8l6z5w77l7e65ur427sdxpwtstfsxzpa855gs5mwsz6hs5utxgj',
      rewards: '762247715352036738',
      mid_rewards: '102495383997641232773'
    },
    {
      address: 'erd1p5wkphnw68at6dll9fm2krxmkughgc58rx0dr7s8l5jyzwzxsyxsjwh668',
      rewards: '162705853221718426',
      mid_rewards: '102272697341344096348'
    },
    {
      address: 'erd1rkjrs3xn37qqdcptghgmlrug77xufdcfyq29hu9tt8p7hj7ze8qsnvfh6p',
      rewards: '400251638722416774',
      mid_rewards: '102190476403595863255'
    },
    {
      address: 'erd1a2uj4dk8l7kddvzexjzffg6hs227prcd7d7ewmhqqatjt0ur9vusn3hqa4',
      rewards: '995535675447365991',
      mid_rewards: '102092000658555335328'
    },
    {
      address: 'erd1g5v9ftj5m3h7999c8zsm5dgwgq998gljfuntvxed54v2rvpdw2fsvlrk9m',
      rewards: '753972955985960406',
      mid_rewards: '101871229332879906886'
    },
    {
      address: 'erd1tqz9pzuwsl4rzp99vpzshpwquuteu0kse6qh2ayde3elsct96cxsuqdyqc',
      rewards: '157138302375067677',
      mid_rewards: '101852744001494808158'
    },
    {
      address: 'erd1skuaxwprvfhzn6pdt3hpdp8xnal0n2u78mshdzj3cz2vmtrd77cqd5j79p',
      rewards: '1110791787689625294',
      mid_rewards: '101785623870510077044'
    },
    {
      address: 'erd1qvcgtxvwclq04xqwmyj2km4xhar9q57cjczq4g8e3p7vhjn7ekkq78yzrc',
      rewards: '513869894077421678',
      mid_rewards: '101760558135833106685'
    },
    {
      address: 'erd1qr43q8mvna8kuj58aa2eeva3e3hcf82jkjrhz8vx7jpswce2s5xsfsqn8f',
      rewards: '752351322454290428',
      mid_rewards: '101748911560416979738'
    },
    {
      address: 'erd1hrxpjhyl77nt30p335fhj8umfn7l0d2d83u4sapp4svuqkvhqlmsseu678',
      rewards: '630801938976161768',
      mid_rewards: '101580594834765697342'
    },
    {
      address: 'erd1xuf43l9v4d3lxhfg9ehzh244592gf2an7hmuw9h84gma7j8fdsws60rrqn',
      rewards: '151014731024594799',
      mid_rewards: '101390850736167290286'
    },
    {
      address: 'erd1tse6tshpds5tg372cxjrn6ry8j34p30r3cqdp9ss4qpvtxalh3wshle94v',
      rewards: '508036227068939852',
      mid_rewards: '101320531989461348508'
    },
    {
      address: 'erd14wd92knuwh0t3h9lhgn4t3ve5sfjclfftfhd0qt9v7f4psfst25s4um44x',
      rewards: '1104180649211249490',
      mid_rewards: '101286954031532273999'
    },
    {
      address: 'erd1lu64klgpmwl738kgcszcu7tl0hxnvs2rzgcuwrjzd5xvkuw6rq8q7pks48',
      rewards: '624943326129045215',
      mid_rewards: '101138687055241671310'
    },
    {
      address: 'erd18eavvecnpuwwfhce4rk45z2ftjm6sp8zxlmu8rhuqx6j0uty9m3s6npr8j',
      rewards: '385622003221991819',
      mid_rewards: '101086981445327623276'
    },
    {
      address: 'erd1jktdmgxt5rnkkzfmyxdywk9mzjtehqfupmcgan98z4y32e9k6tcs6lpga9',
      rewards: '385243949718015384',
      mid_rewards: '101058465346236738888'
    },
    {
      address: 'erd10phu2gq7wze7ca8r3ln4pj5fvpl3atmqcjfqdp8exhr8w2rvv8psen9nzd',
      rewards: '621919378144071966',
      mid_rewards: '100910594471842279391'
    },
    {
      address: 'erd1g6rwhp48q0yyu6av2k08lz7hd7jkpv6zr5n4nnc2vyzq8xp5s2tqlgf4q7',
      rewards: '140096438401069467',
      mid_rewards: '100567297691212236851'
    },
    {
      address: 'erd1nwr3ufwnfmmg4jscxcpaxvrr6nd4ehyw0cetu7ypvgujef9uv3xsngwls7',
      rewards: '616503473107771539',
      mid_rewards: '100502079584246926112'
    },
    {
      address: 'erd1963g634ggy5w8ehrn6szn7mprakgr2f5f2tf8dzr3nu70lpxtt7sskzcsg',
      rewards: '616423622865604405',
      mid_rewards: '100496056581169004527'
    },
    {
      address: 'erd1al4ys2w3dxls9pmhzfvulxe5mcndcqpykh3ezam23attshvn7kyszz099p',
      rewards: '258014986281989746',
      mid_rewards: '100461745066140193267'
    },
    {
      address: 'erd15tvg5w0nfyxn2fx2w3egzx47qyqq3mysw5exp2whnt0mpl55nnjsgq76jt',
      rewards: '1092356012203773136',
      mid_rewards: '100395036572568707850'
    },
    {
      address: 'erd1n5se8jm0whlv0cwu8zdxrpadnhjlfg0z4ndg7amdwjqgd6kem9hst8ac0s',
      rewards: '137504886998189689',
      mid_rewards: '100371820236761116023'
    },
    {
      address: 'erd1ugueh35w38d4jw94aa7j2qfewhk3ttmqnurwyndmwas4we2td3vsxmvwze',
      rewards: '852476816161280260',
      mid_rewards: '100301251295509645902'
    },
    {
      address: 'erd1xe0d69r89erpswnr0se2vjf5xn788yk05a5e6kfp9yd2edrlcpmqgzzsj8',
      rewards: '255760896127107187',
      mid_rewards: '100291721888097054200'
    },
    {
      address: 'erd1ml63d58g57u8u6t46yclm30mf97u09hltw8vrxpzs0j7ea7vkhwquyhuva',
      rewards: '374068111903355851',
      mid_rewards: '100215485992271145462'
    },
    {
      address: 'erd1cgzu0hsju5kfyrh30f8a4n3wja95vg4f95l0qehj87g22p2ck7rq9cz867',
      rewards: '969568233553564690',
      mid_rewards: '100133309260666381946'
    },
    {
      address: 'erd1v3cxkygnuyfhd3zf63wnkqyu53nxc0ufsqt4mc4k7jxu0zrcl80sptq0s4',
      rewards: '729814631826997077',
      mid_rewards: '100048997404486920892'
    },
    {
      address: 'erd1fxzyh6wj28ewhaaw3uud6uqgkmya7zy0sa9qzw2zxdqrqjh2as3qe7d3qv',
      rewards: '488455392205931653',
      mid_rewards: '99843574306586413553'
    },
    {
      address: 'erd16u5c6na45tj583mqqclhj2jn9mtnenypuswyluglvlc4ulkyx4nse6gwvt',
      rewards: '129661722260356755',
      mid_rewards: '99780220210580389821'
    },
    {
      address: 'erd1yqv5yaxmaukav07mm7znle9jy0e8u0nej246v6yrcqf7rq8dxxwq5gqwu7',
      rewards: '367899005231484302',
      mid_rewards: '99750158055069191774'
    },
    {
      address: 'erd1g2u489nnneg5cw4j442mm3xqmsarh7rqgrt3409eh70azrrn6mqqpl0v83',
      rewards: '723940807498280102',
      mid_rewards: '99605942242086994214'
    },
    {
      address: 'erd1pzj6j56yzxk87rrs0gnlldzfd66nzkx0s7nv3etgrx8nrs4zx88sjypxun',
      rewards: '723919500858930031',
      mid_rewards: '99604335109147847502'
    },
    {
      address: 'erd1jn7ury9c5090a49hgh4yj9arkvq39ymvay3vyl6c5dewsa33qlgql553xl',
      rewards: '604386638601162212',
      mid_rewards: '99588122036375987111'
    },
    {
      address: 'erd14cl0y6z3ffchujq3napee22tc56z5ff66pvk65pscgmwv62keuaq4qfhty',
      rewards: '484800449430625534',
      mid_rewards: '99567886581817599175'
    },
    {
      address: 'erd1pe45qnts888ewf885m0rw0tetfr3wdzcxmn0mp4h3lv4uzfzwl6qm3x04z',
      rewards: '357712466914262282',
      mid_rewards: '98981800314718502722'
    },
    {
      address: 'erd10sk84jca6sw7jadk2686v7nt0r77y7p4pvwezt4juw43m2tsr4jqadqukl',
      rewards: '595883546379212880',
      mid_rewards: '98946744512217000547'
    },
    {
      address: 'erd140agpe8ka8g5h503w7svl2flljljsceghe320g680rjkfydk4e0qqfzznh',
      rewards: '236171599813834180',
      mid_rewards: '98814125968698278178'
    },
    {
      address: 'erd1z0pmz4wc4x8ehdc9smguxk76tuy83ph4jly0e5myxn6gkzauve3qnf2e8a',
      rewards: '1190598444082550733',
      mid_rewards: '98805339328443455933'
    },
    {
      address: 'erd1yufu20f328hhluvwcc63rpdmgu2awx78fs0dg4dvufrf0k5sgswqc0eajr',
      rewards: '832640105571815664',
      mid_rewards: '98804993229239673142'
    },
    {
      address: 'erd1h6z242u3ndl433gu67uymjmusrru5dmny0n4z5jl8tah3wjc8lnqluyk7d',
      rewards: '712843275819947539',
      mid_rewards: '98768869421242869663'
    },
    {
      address: 'erd1gq3y8vajsfdc822hehe85haamwf3cfpw5fldtwl9f7xd7fajeqxsegzf2d',
      rewards: '593367636731600845',
      mid_rewards: '98756972619983755201'
    },
    {
      address: 'erd1ajtffh7xql2x6j8dmuqg0tmckekhhpzgtrrlrvs66hv3a0yjnlvsc8urjm',
      rewards: '1069376789280060521',
      mid_rewards: '98661742763539613196'
    },
    {
      address: 'erd1evt52hqz88r2u7294hl8dssf8r9p220rdfhnucsnde6gf5sssmdsw0qaz0',
      rewards: '710935232244787544',
      mid_rewards: '98624948100353910946'
    },
    {
      address: 'erd1n8vjx4s3xzva8aldmvcdq9kalcs05uaqpf5n6sfje8qllt4ytdvsszd2w5',
      rewards: '231763758346515614',
      mid_rewards: '98481648044973491562'
    },
    {
      address: 'erd1jpnutwdj4x54s04wynw6tyvjluf4j0a4uyqm437hvsel7uq7cmwsssz35c',
      rewards: '469060526403583967',
      mid_rewards: '98380644035455728519'
    },
    {
      address: 'erd1mrsway7q9uvffah9368xgr0n0xa8k7e3ykxy9uw9qmh5jwwzptesh5flry',
      rewards: '110168607393278960',
      mid_rewards: '98309879136386217936'
    },
    {
      address: 'erd1y0kkax8afm328w7qz0lyrc4sx0txwwf6hnj0jj97an6flk0k7exsh0h8nd',
      rewards: '228594623674551319',
      mid_rewards: '98242604212850395314'
    },
    {
      address: 'erd1d6j60j3jd8eyrk0mhrz35yddha49gq5ugnyuxayhye79xm34y9ws4rkqhx',
      rewards: '105891303381507509',
      mid_rewards: '97987247488329558641'
    },
    {
      address: 'erd1yl96ukhzfnunuhnzaq2eq6fxck9f7yztg6jtrqrl039p228303vsumyyur',
      rewards: '820304599325075827',
      mid_rewards: '97874541547749154126'
    },
    {
      address: 'erd1y4pgp5nd2q57eq0xnkqzcq2gymwvnsr44vshwjtf0tvqj5tq29eqffn7f7',
      rewards: '820124769954177159',
      mid_rewards: '97860977245061676692'
    },
    {
      address: 'erd1s3rxtdrc8xzfpsvktq2sm900yju5fr4dt9rzcpk87nx9a5wlw5jqwg3fg9',
      rewards: '104006922353392630',
      mid_rewards: '97845111003526455383'
    },
    {
      address: 'erd1hj8sgl6hzchvnfcct7damzq8e6qx28dvy6f7n8p79088z099at0qg26053',
      rewards: '342359426562359121',
      mid_rewards: '97823739840694945574'
    },
    {
      address: 'erd1hqjgesty5924xvtxf6yunz7wvxr99e08xcjhuk2k6cjcnvv3u4dqww2zxq',
      rewards: '816044679560986344',
      mid_rewards: '97553221171574134042'
    },
    {
      address: 'erd19ywj9955hck335ysm979yks0x44pexd8v892nuhyz8k64anfmczqpzwpmx',
      rewards: '814775617547925184',
      mid_rewards: '97457497424177826384'
    },
    {
      address: 'erd1j2tn8aj7fees4pg3ckr72sh0z83qx54uqzada4cnl85ekum056usdnyx8d',
      rewards: '217874721766512370',
      mid_rewards: '97434015529399775349'
    },
    {
      address: 'erd1xacqf84dzudhyhk0engz88tthkwwdntuyulk0v3p764nae7388nqjyuanj',
      rewards: '812174704715982006',
      mid_rewards: '97261313848936932797'
    },
    {
      address: 'erd1zth7cpxp3f8hfe3gheqa23ysvk7c3zthwctj5hgqyxd06n4av66swnz0h3',
      rewards: '1050465683530408832',
      mid_rewards: '97235301903176961612'
    },
    {
      address: 'erd1wggkc640szqxlcgmecc0hcjhlz5zccedg9g7aw82dmy4crpctjmssmp0ms',
      rewards: '929322418771396934',
      mid_rewards: '97097618200405209243'
    },
    {
      address: 'erd10sc52tfs7887j3jz6ulg6ee9hmlk4ttjfj75cwcjjn3pxvn2x66szknws3',
      rewards: '1047257385191951186',
      mid_rewards: '96993304005074473309'
    },
    {
      address: 'erd1nhfmpw5028g96ya7jxua7s8awykcu9lq8jxh55skc0qefc65n0js2zeuw0',
      rewards: '211085970249210999',
      mid_rewards: '96921948562860498153'
    },
    {
      address: 'erd1lvtl9saqmk9jjaldyk3v772na8mxs9nwtyr48ua938f09lmw0p8q66u52t',
      rewards: '211080696261293155',
      mid_rewards: '96921550752602194765'
    },
    {
      address: 'erd1gdx5tk0wpxu6ccaulrn2lkrneeyuadx908ryt2q5km7tn39f869qeqfmd9',
      rewards: '210042318020952133',
      mid_rewards: '96843227191296892214'
    },
    {
      address: 'erd14ndg7v0gcmyg44anyef7qn0qcdzw4sa73dqft3ufqftn7dkul9ts6k0fc4',
      rewards: '447718805268992198',
      mid_rewards: '96770864921539686276'
    },
    {
      address: 'erd1w4hnjxe8vgxyvnmw30eqeuvlgsu6g3l8ced09alllq76udpm4mfqpl65dx',
      rewards: '1044021807572976166',
      mid_rewards: '96749248465240908874'
    },
    {
      address: 'erd1lr6qv969eph5p8pd20dzhw5j52sreyxmy99dslwzzcxf87vxaghscqhfxv',
      rewards: '327013618170651480',
      mid_rewards: '96666224864309652968'
    },
    {
      address: 'erd1w492p2du65zd0qsuzxut8f8tar25xefw8h6vjl5rdelg7avvdwmsdadyc3',
      rewards: '88330014585741059',
      mid_rewards: '96662621618720031961'
    },
    {
      address: 'erd1g6dt2cn5ghfrkv7xlzg002278egenr0evre6znj29fgasc753v0q6ewls8',
      rewards: '88114878548142522',
      mid_rewards: '96646394178684024491'
    },
    {
      address: 'erd1a8ylangnczq2uyt8qfkf9rfqn0mgkjzc9g5y5l6fvcr82w573uzs3045jf',
      rewards: '324180470772013829',
      mid_rewards: '96452524128543774580'
    },
    {
      address: 'erd1uqjlvy6dtxcnw8t7r76z9fhzsuf36yage3wklx3h0fwmyp8ncpysms8477',
      rewards: '323164560459815919',
      mid_rewards: '96375895294726927706'
    },
    {
      address: 'erd19zaj7g4gtv02arrvu7yejwdqwyw86hh0mhkj8thf55r332damqvqzmcz7t',
      rewards: '679938126323695605',
      mid_rewards: '96286875487140957833'
    },
    {
      address: 'erd1kuqhzscz4ng379wvc8ucvhws5gqxqzc8x4nnlkj83s60j7wnvucqwcwk4k',
      rewards: '675996880495470229',
      mid_rewards: '95989592284109952432'
    },
    {
      address: 'erd1k82x7xy6c6uqet4y6sg04tv3gqaky5g652mcjq950s03rtv4ey8s3nhnct',
      rewards: '1153157644821395516',
      mid_rewards: '95981227051892348028'
    },
    {
      address: 'erd1an0dxc0csf5tdswg33dnds64vccewcw8has7mac8v82nq8xvfa8qxuzr6m',
      rewards: '198583650556899202',
      mid_rewards: '95978914353517206298'
    },
    {
      address: 'erd19zcf8xjjpxd94hs4t0v3dv3enmls96ulzf6kdwegu8cxj6s7pq3qtp2l54',
      rewards: '790247520831345749',
      mid_rewards: '95607374018035892193'
    },
    {
      address: 'erd1fupfnvxmj4yqht0yw4mp6km444072eg66wk4gue5xxa3m8c9ykns99s4eq',
      rewards: '1028632462191693625',
      mid_rewards: '95588449548630811381'
    },
    {
      address: 'erd1etfuu2jhere7malg8gstpjd3glfry9k6vganhu49yrnm6nzfnmkqpamv0y',
      rewards: '1027071687897943161',
      mid_rewards: '95470722311742491012'
    },
    {
      address: 'erd1ryhjn33q64z0ucq85gk3ckqyh5c0qp3lq9pxjyad5t3phntnnxvqmslk6a',
      rewards: '428928926822151285',
      mid_rewards: '95353568083764081564'
    },
    {
      address: 'erd1w7efjlmmczvxk7kmhxsrt3482st89pcygv4zdrsg85pwqfn75v9qs82tjh',
      rewards: '428104312174205586',
      mid_rewards: '95291368440683720028'
    },
    {
      address: 'erd1dsumm367whpvrr4p8t69t9qt6pnvl2rl8hlg4em95wk6egmefrns8pw20v',
      rewards: '666532010200944616',
      mid_rewards: '95275669052709658125'
    },
    {
      address: 'erd1wdy6v23u94pud6smdvnqneps3geeq9drxmgmccjdnxkj0r6m6trsrlgr4s',
      rewards: '785767554004466375',
      mid_rewards: '95269455769387335349'
    },
    {
      address: 'erd1v4pjttja7h0x5c7g454vgtkwleyul5m5x6mkc273wfgk8gs4mzqsntuxkq',
      rewards: '426184418670154197',
      mid_rewards: '95146553294600886139'
    },
    {
      address: 'erd16m2zhu27yg9fc3a7ggxkngy7vlxtp6xqa9u4fv0zmpwmjvsjyy6sa7jzsn',
      rewards: '1020748420969438652',
      mid_rewards: '94993766260774143899'
    },
    {
      address: 'erd140xc48500kg7w2w8u3nw0cw62jlw00a26wfczq8x5e2azh3qmnuqt832wv',
      rewards: '1019433098187522977',
      mid_rewards: '94894553121916573458'
    },
    {
      address: 'erd1sjshtqvkdtdwku5vadcksh40aq508xpf0q4m037f6e9ynts7jzrqppcdha',
      rewards: '181110363893091260',
      mid_rewards: '94660926373753277556'
    },
    {
      address: 'erd1k57g7lz04avwgwdhszhlcv7yu35mxsnpqk8h6apdd9xlw3xs3wrqm3vyy0',
      rewards: '178832815705598019',
      mid_rewards: '94489133785890185857'
    },
    {
      address: 'erd19etxppvxa3g80dtfpvkwj90amlq2e4dpwhhq3mtk7xus8lpgtsaqpu0vhx',
      rewards: '1013377122289983830',
      mid_rewards: '94437758496368020932'
    },
    {
      address: 'erd1hv3f2evwzhez2xel92k2ccr76mlmz2qzrp98xxm0hnhtlx5zpj3sr2jey5',
      rewards: '893655780675554863',
      mid_rewards: '94407328663389990213'
    },
    {
      address: 'erd170neet4e7suk6smds05x44k9p9jfk6j2hpvnj4mh7xca2w02lvrsnw9t5a',
      rewards: '295666572129243503',
      mid_rewards: '94301756709085190935'
    },
    {
      address: 'erd1fdv9955h6sfn3vf9sph9t6l52gkukjvmz39w49wlfkyhncr8kclqc5gh88',
      rewards: '653331953274765779',
      mid_rewards: '94280005403641368244'
    },
    {
      address: 'erd1t4tpzm68rk4k287k7cdu4fusa78x9rpe2wmqfqhlkld4w8fewrys9ny7hh',
      rewards: '167888166070442390',
      mid_rewards: '93663592664783255278'
    },
    {
      address: 'erd1ahqky0s0a7jhnedv9m2mtwe0g60nrtctvdlp2jhlxg7fzvep5fuqdkymp4',
      rewards: '403099352506942842',
      mid_rewards: '93405275863481531974'
    },
    {
      address: 'erd1jv6v3q4jh7yejdny6dnx7sc759lkdsdvxe9j37mdszlad5s2ktdqtv6ucj',
      rewards: '760460617282915895',
      mid_rewards: '93360585443764174553'
    },
    {
      address: 'erd1n75szk253jykenpedtfmyrf2sy3cw4ntr0w4kvfl930d8usdwhasmk3pva',
      rewards: '163391038362814679',
      mid_rewards: '93324379992539204047'
    },
    {
      address: 'erd1euyl3npfn6lua2xl2urz9xzfa5ujf0l4vemg4dkrt2fm6l3h0kgq28ad3y',
      rewards: '758294085084106303',
      mid_rewards: '93197166651939679453'
    },
    {
      address: 'erd17gtj7z52k67q9j2ueadjaunhangjahgrnt8kfuy63tncrfk86z4s62sl88',
      rewards: '638772848686747783',
      mid_rewards: '93181830503158633401'
    },
    {
      address: 'erd1ujqqsnnhxsptf3fds48f5qvvxnjnjjzj7lvyfdldu7tmpzwwl0aqnxychp',
      rewards: '399961215213636660',
      mid_rewards: '93168570124543858265'
    },
    {
      address: 'erd19vrcaesyeczvkrhw65e7rs2xsym43spanlwf55pny83lw2zwk27qg3dgx7',
      rewards: '517451731454506132',
      mid_rewards: '93030731612597761563'
    },
    {
      address: 'erd1xzl0e03xcw7g8lcu30da0aw3ksrtj82nr8gtghdyk5cmyvgfvagqryl08q',
      rewards: '871694216992368681',
      mid_rewards: '92750795607636217088'
    },
    {
      address: 'erd18pfkgqnlaj8p0vvt5flztnvt62kjs9y6zfz2kugwy7389g8vydvssl6u27',
      rewards: '991006030664052532',
      mid_rewards: '92750335264295359136'
    },
    {
      address: 'erd1mrz6danyka62vhkhrdga50hpfyj5cx879qsnr4ak0fjymup35kfqtjwawm',
      rewards: '869935457248899383',
      mid_rewards: '92618134577929281568'
    },
    {
      address: 'erd1y5jza8m96f2fdjhcyyc2pdkzwfqzf20afdnzkjult9fnvrn5naesw3z6h7',
      rewards: '392653581313272257',
      mid_rewards: '92617364514145160700'
    },
    {
      address: 'erd1n4aqpjasd43qmkaqgjl5j3tlhqkkywgnnttw3244a98mnzlz6mqqqrtwdu',
      rewards: '630415490065091334',
      mid_rewards: '92551445480704067564'
    },
    {
      address: 'erd1jqryzwzwr5rqh52c3gca40a6ervpt4gp8wfknlvqyrrd2zuyh7dsj3vxxn',
      rewards: '389011589968935247',
      mid_rewards: '92342653699482982662'
    },
    {
      address: 'erd1kq94mmew5ylgk3va2csmd2hj3zmyk8kytp6k094lglshfdc6sfnqvf4fe4',
      rewards: '984962075407217208',
      mid_rewards: '92294447340517430858'
    },
    {
      address: 'erd1n5466tggxgljqldgeu23f7qnr6j9rr0awdukl6efxvk0snee82qq64lk3z',
      rewards: '387259756100020820',
      mid_rewards: '92210515079760402284'
    },
    {
      address: 'erd1j0fyhrwtqgqjau549gvaxl6qnvyd55fc77pv7yy87lmuj6se65fq3hjmpf',
      rewards: '267022925780274806',
      mid_rewards: '92141202583756005635'
    },
    {
      address: 'erd1j486qau5sd9qj8gsn5zjtvqf9dmksnd99y9g80m842u9zfp9q4cq82uy37',
      rewards: '862787485098693591',
      mid_rewards: '92078972052016399991'
    },
    {
      address: 'erd1r89lngvyqjuvcgc9y7km30l0r0j00vz9sek9xys55ydvz0cx20rqcffuqm',
      rewards: '861083301589138682',
      mid_rewards: '91950427638814643087'
    },
    {
      address: 'erd1pxjxtg8zzv2ec7eaxnkzr9mvv9cflkxjcfu4hvkewe574yyhgwmqffzk93',
      rewards: '859699135147106574',
      mid_rewards: '91846021709484267672'
    },
    {
      address: 'erd1ufuuwaw84xmx58z6p5essgqlcqxvdne833jyqrfad2vzyyf4dfesjc5f8n',
      rewards: '738870325885369645',
      mid_rewards: '91732056988353075047'
    },
    {
      address: 'erd1rs27yvlnky93q2086924h6cjt3jpm6mcmua3rj7gqnupapm9jqzsz0c36w',
      rewards: '500198042413720466',
      mid_rewards: '91729307604632428365'
    },
    {
      address: 'erd1wvp5hxc47gq6w9cy96k58pevl9gn5xdpmg54p38gkvk2a0refp7s5xh5ly',
      rewards: '856627713582637633',
      mid_rewards: '91614348253846266602'
    },
    {
      address: 'erd1aew0ezftm354wvlzycdh9m7m044qhdvtt4qwycz3spa5nnypsp4sj69xt6',
      rewards: '495265987329498199',
      mid_rewards: '91357288908802144682'
    },
    {
      address: 'erd1vsn3jhanqhssesxepyfvf37c6yzpz3vp52crpy5gv2skggj9lfqqcld00a',
      rewards: '494157189280650752',
      mid_rewards: '91273653670138455609'
    },
    {
      address: 'erd17we28esw030uls7fgemgw42gvvrsj3ssq8wd637ux4ggqewq2s4qs43d8n',
      rewards: '732745827822753510',
      mid_rewards: '91270093822297147342'
    },
    {
      address: 'erd1gtslswtx93z8337pa0xr278jretxp5vh8qn080ejln2k0jnmv3dqu5l4n5',
      rewards: '494082924591253249',
      mid_rewards: '91268051978262733831'
    },
    {
      address: 'erd1a7f8aytvuz0wxd7epe2mtyezsc2lnf7er24lwzjp9zz8uf8cwhkq0su0qv',
      rewards: '732653534622508297',
      mid_rewards: '91263132262581590841'
    },
    {
      address: 'erd19m9wx5nvu8vnery4jhcvfm3thak890svl3cchf4qj0972fajcrhswn332q',
      rewards: '851418946391965261',
      mid_rewards: '91221457512752066009'
    },
    {
      address: 'erd1vv3w4qf8dfhx9gfvwwcenjydaq6927h4mn9axss7xjkvd064kvjse2kz9w',
      rewards: '134977099270200928',
      mid_rewards: '91181152395902955085'
    },
    {
      address: 'erd192ul3lzyzrcp4mlfzk5g4e9d6g85xgafdsm77tze29cgvs5phjnq70qytz',
      rewards: '729777768144527464',
      mid_rewards: '91046216823402228958'
    },
    {
      address: 'erd17vnpase3643706n5j92kuezvl8d8e48wl5j7ugcrum8s2f2letxq5xyp92',
      rewards: '609304840328451889',
      mid_rewards: '90959095790961510500'
    },
    {
      address: 'erd140ek38puhhlwwmt8fwx89mz7t4weemg69s4j6fqc7knrvsqaflaqqstdx5',
      rewards: '131934887358683954',
      mid_rewards: '90951682187554630120'
    },
    {
      address: 'erd1svwuk0xdnytjgjlccmtmxddxa9ptu6wj9n7yp4nhct8h60jzahcszrx9qm',
      rewards: '487954376395866915',
      mid_rewards: '90805783315799045198'
    },
    {
      address: 'erd1fjw8jzpmp2papvnalgj6dlyccymxwtctn3hgz8h208ng43khht3ss96thk',
      rewards: '725923632373526308',
      mid_rewards: '90755504222144493468'
    },
    {
      address: 'erd12gcfz4d29nz5tntm7wkkjn7rhzwneph6vu4qajyq4rsuywkk5zhqe2u0ek',
      rewards: '129329060310215568',
      mid_rewards: '90755127939157918810'
    },
    {
      address: 'erd185u7zwjentm378su7vlqxnrs9tj7q29ah0wvwgfzkncmwct0p69qdpg4q9',
      rewards: '725715585800845484',
      mid_rewards: '90739811531507627802'
    },
    {
      address: 'erd10fu4ex0yvcuv0a4tqajpqe7g209tlk6hwgx0cqtsvvjuufhz0vgqyfas2a',
      rewards: '605836991865051897',
      mid_rewards: '90697520354219494848'
    },
    {
      address: 'erd1pp49lmqcq2x5dhyzjsrdfhuvqp3mn7yjjz9ehrkwjn8cnlej7azsw05d04',
      rewards: '485120604390664666',
      mid_rewards: '90592035466747609209'
    },
    {
      address: 'erd10avqckc4rm0xw6af8ug229c9qnugrdssvqasxh84shhqpy5x7k6q2407sh',
      rewards: '958362866619690198',
      mid_rewards: '90288102562473732246'
    },
    {
      address: 'erd1qpd3vxejd2ff34sqsu0lhxvafa3h07tt9gcryfndemm2w50gt6yqca3eqh',
      rewards: '361496474740952089',
      mid_rewards: '90267223253566054333'
    },
    {
      address: 'erd13yl97kc8ckercv0aajlneuwysz4uk7ud33le3qwujkcjf4z6r53q8w02sx',
      rewards: '238481976045806312',
      mid_rewards: '89988394734561239353'
    },
    {
      address: 'erd1nvzl9nhxfqlre3tcnx2d3zclffzxpfru35vpwyehzaawltmdgcpqk9ckzy',
      rewards: '476808213138441633',
      mid_rewards: '89965042276266910291'
    },
    {
      address: 'erd1r7rz5fwsr0ns3umfkt5urf8yatugk3yu6y5fjjagngulyeg8zcmq2fsvhw',
      rewards: '476402073379868501',
      mid_rewards: '89934407666407716395'
    },
    {
      address: 'erd1qr2cg8a3skuu38zzzk0h73dp0pf6xqc0vjej7778hx8w3t8ehuvqvvjh8m',
      rewards: '714026976998823393',
      mid_rewards: '89858154508554015237'
    },
    {
      address: 'erd1tprjnfd733rtg79zuwge6ezmp9wyt0lnsnczqma0qhe8ug9q87rq0n0h8p',
      rewards: '236176845182617266',
      mid_rewards: '89814521620251334635'
    },
    {
      address: 'erd1wanr65qfpsjwrvhnm75fsl5kn053ec4nanfa996r0nc3gq90vtxqlsgf2s',
      rewards: '116117994000226746',
      mid_rewards: '89758633866151342459'
    },
    {
      address: 'erd1jz3jkeclxsa9z5k42y3cjans6qpfulu29z7ynq2c0nzzk9hgpy5qwtslq0',
      rewards: '473805326843809952',
      mid_rewards: '89738538349611827009'
    },
    {
      address: 'erd10zksuy3fkg9nzjc7jpsw6utny4uktvamm3eu2vam8smed58sz4fshkrlf5',
      rewards: '712397709294013540',
      mid_rewards: '89735260900037609233'
    },
    {
      address: 'erd1c37aa2rs5gr65w6my5mt02t60z29nwygt6wjlrqewxxqave60n4q4vqk4w',
      rewards: '232867645465699420',
      mid_rewards: '89564912858405186279'
    },
    {
      address: 'erd1q7p7t2g2rjy9g087t5xrehhuywmsp5eus5nh0glh0sz7zxulmpjqvhsjlm',
      rewards: '470797970303156179',
      mid_rewards: '89511697237936142641'
    },
    {
      address: 'erd1tm0cmev7n7ulg35qcr35df5z23w9q5k2lxp97emazcaqs3utkkzq4e2cja',
      rewards: '111362997181554647',
      mid_rewards: '89399970452026379063'
    },
    {
      address: 'erd1l8ux5vmcc6dvs3z4ptw7mehk2k2erpqyctd0xf8k7ddnvr2zt9ssrnmrsg',
      rewards: '588489440887157652',
      mid_rewards: '89389016458695131289'
    },
    {
      address: 'erd14d8dxxfj38967qjwnn34yqt0wy4udlcptmpf5sc6ya5jqld7drmqmtdmm9',
      rewards: '707241921119609107',
      mid_rewards: '89346366299335558777'
    },
    {
      address: 'erd1u6st5vf7gpncuh2w9d7jc6k8nkjn828ps2ng2key92kfunku93es0527d7',
      rewards: '583620204988322649',
      mid_rewards: '89021736134805512166'
    },
    {
      address: 'erd1eql5q0zsqw9wf9tmdmk4dydwx8q2sdpyvzun3lmy6cx3wpl4875st7g2dg',
      rewards: '702930476719093228',
      mid_rewards: '89021159484805907059'
    },
    {
      address: 'erd10edu3qzm67w89h0s7dm2hdj777cnrxnk9272uv2zdfqcfu8euxlqrmtw6e',
      rewards: '701532402294339447',
      mid_rewards: '88915704493876382291'
    },
    {
      address: 'erd1pmrc3ta9euwxqmlnlz3h30gjjqfwdq42yxzp2ge8uy5gftcrlpys5yetrv',
      rewards: '100754055742610162',
      mid_rewards: '88599751376841751998'
    },
    {
      address: 'erd1jzsvfunjamqfyghj3683mnyvkhjns0z5923p6m0rhyugl838evas4j5dxz',
      rewards: '99982512922782936',
      mid_rewards: '88541554874834393438'
    },
    {
      address: 'erd1dmt8d2t2g5dh64hjkrsw7enmhjdjhdf9lpukxhwe97evxfjzda4q0pj3ex',
      rewards: '219247942330943216',
      mid_rewards: '88537595824985108858'
    },
    {
      address: 'erd1tetrvss03tzhkglkc9cxx03c4jfu942errqxvmg39vxc57ex3v5q7k8x5x',
      rewards: '337682383278692129',
      mid_rewards: '88470956363418362551'
    },
    {
      address: 'erd162ztz3faa9mh7wuls0lt5rfrgxfzap4r9c69dt54e7lw2vrnlrhqls0dpc',
      rewards: '335766169436095633',
      mid_rewards: '88326418769559129206'
    },
    {
      address: 'erd1x2uucht5wpqzpdchslenjpkg334eszn6s9ewayrkmvv0df63jwnsgtk2xs',
      rewards: '574035130310621514',
      mid_rewards: '88298746038356387410'
    },
    {
      address: 'erd1euh0yajgm5eea5njuxw064phg2tqm9nkkrnp6d8jr3uc24la7kxsrvs56t',
      rewards: '693231516354175379',
      mid_rewards: '88289579134576439849'
    },
    {
      address: 'erd1ve5ad3aftyvqhzyhxly8h208gf053xastp8aes2t6x2rnzs29msszjg0rm',
      rewards: '692945692831078984',
      mid_rewards: '88268019826644114673'
    },
    {
      address: 'erd1hgvf9yyzuhc9dwxsze8aewhl09g5c3vvk4fjftcamu963gls2c5sjysnfw',
      rewards: '573061021550602028',
      mid_rewards: '88225270242909863415'
    },
    {
      address: 'erd1kwgyjjc8pq7zzafh2l8ru4lhksl6duwwr7ltzck4r4cchh8nfggqwwsszr',
      rewards: '215043399314080450',
      mid_rewards: '88220452447024993166'
    },
    {
      address: 'erd17nnsattx9kcw5j85h36gcjpv62f996lyzsnqc684eu3te6awnlfse4d687',
      rewards: '332880576078262149',
      mid_rewards: '88108762101223880757'
    },
    {
      address: 'erd19pg9s3hw3dx90n4rhnva3jp339hh73zfc82gdd75wuf535wyh93qr6yazz',
      rewards: '91576011368726007',
      mid_rewards: '87907463062956613919'
    },
    {
      address: 'erd19dytyx9d03w87wt65zz53f3w0zs7lnfaznlahvs4wn4u88rk0kns05z2fp',
      rewards: '329140963442477110',
      mid_rewards: '87826687835645280002'
    },
    {
      address: 'erd149xzn5hh25e5w2l022g53z5za3fv6damnf303k9v0zzsm23kqfds6d6xff',
      rewards: '686785509750049208',
      mid_rewards: '87803364984646977202'
    },
    {
      address: 'erd100ej2cpx845454u9nnj0fjhgqsrlwj55870sjfx9phz3usnamk7qdsyzlm',
      rewards: '1044021807572976166',
      mid_rewards: '87749248465240908874'
    },
    {
      address: 'erd1ph5rkgaz4qkktuh0ak9qm0z38dfyn5w4vx90gh4sentpeyrcvgrqssnt29',
      rewards: '87985814927134633',
      mid_rewards: '87636659072496730116'
    },
    {
      address: 'erd1dwgudlzj64swawg2kqs0wf5gmxwnshpq7q54hnt86mjtp05vkves25ygec',
      rewards: '564238963196866323',
      mid_rewards: '87559833505636895882'
    },
    {
      address: 'erd1wzwglcry7wsp4etd36j8dzdj0hxucv59mvtqujwnlee4nsyupqfshs73rq',
      rewards: '325484001175156579',
      mid_rewards: '87550847783140337004'
    },
    {
      address: 'erd1dqjjk8d4hqhsk000wk7x5drk4v5202assnsjwlffrp290rmn0xhqjcls9y',
      rewards: '205209549846889382',
      mid_rewards: '87478697581902143790'
    },
    {
      address: 'erd1kgrwyhw2l9tmyljg8pu0y7ggl7x222egmwdycvc8q09y7m5u64esvjc3mu',
      rewards: '85690202239546687',
      mid_rewards: '87463503902170284216'
    },
    {
      address: 'erd1unm3u5lc3upnmsyenyfmsff5fyjpap27nmkv0xymffgld9z0gqssdquh5d',
      rewards: '324206304368007181',
      mid_rewards: '87454472724114168284'
    },
    {
      address: 'erd19t7ze33l2um0gjjtclm8uryu2egwjp4ulrd67qrua6nmssc6st5shxmzpf',
      rewards: '84431049166503737',
      mid_rewards: '87368527573624675846'
    },
    {
      address: 'erd19l2s3vf8nu869jxkg5v0rx33meceva46e0ap6xnh043zzfk7nklqlvtyc5',
      rewards: '1038604580308394281',
      mid_rewards: '87340633843633575173'
    },
    {
      address: 'erd1sd9ky5ptfvc3kug09j52a6jqrujyzu3au5tuxs86a43r57vd93qs56xu2l',
      rewards: '680161919900590091',
      mid_rewards: '87303755954449162986'
    },
    {
      address: 'erd1eypq8xzyjkgml5lr0erlr5wjr737hxp3urxq2ads64xy5d42g2jssh2rs6',
      rewards: '557841651108812852',
      mid_rewards: '87077292321652481927'
    },
    {
      address: 'erd1w6gkwxsv9h0gm7fcp6cdp48ulav7sl764u57d3gvc6dutatnl6xs6qwqf4',
      rewards: '79104942921772945',
      mid_rewards: '86966786095643854272'
    },
    {
      address: 'erd1lpewndu58eua3q2af6pkg7kdgsvy3geu0vkvrcph7jlkzj2zj90s7x5gj6',
      rewards: '198128370622800787',
      mid_rewards: '86944573162182418493'
    },
    {
      address: 'erd1v8k0eqwf2p0plhc40adk58d08px2ysfhstsptq28xqwd06ndgumq6ecjfr',
      rewards: '197132528659974186',
      mid_rewards: '86869458058653066602'
    },
    {
      address: 'erd1xu0pqhh533s7932cun7taqlhzw3rq5c8kuell6x8nfast3lr02pq04yn7m',
      rewards: '554233719762579287',
      mid_rewards: '86805150609698617135'
    },
    {
      address: 'erd188u6cn480he26mrxdn90ftp8xehju2hc6wvyvy3v79q2rvk9tnws5ku7z0',
      rewards: '1030232033677983509',
      mid_rewards: '86709103208830291387'
    },
    {
      address: 'erd1qyxpqztjcqgg52v30hla2vzsp4knsmaygqqn9v7hv02tjt25ykzs5f5suk',
      rewards: '1027122034852421566',
      mid_rewards: '86474519919032807075'
    },
    {
      address: 'erd1jhserxvtjxzlwa3jp32pnn56z470nfdvmp542dngasua0zjhvdqqqa5qgd',
      rewards: '666604066286075052',
      mid_rewards: '86281104152350498360'
    },
    {
      address: 'erd185cjjjl5awtjyn57qe3k5s4402fgak6z6gv8ns28r97t2ncr6fpqn47jcx',
      rewards: '547155178660861910',
      mid_rewards: '86271225180222760126'
    },
    {
      address: 'erd1n4td3fedfy4vp35sdhdxn8eyckkgvpzjv2q36k3xe6flnyg0jpds58ar7x',
      rewards: '427328921922548055',
      mid_rewards: '86232881731744896977'
    },
    {
      address: 'erd1d6tenl3wpryqprv8qr9ygcdyntgyjr2vx5pnjzwvd05p0l00ltns042v35',
      rewards: '665715222977200183',
      mid_rewards: '86214059822366652414'
    },
    {
      address: 'erd1zs5d2zerz2d884vl5mtdf995rnwq3qeswy4s95x8nynkw4ctqz2qczw7zh',
      rewards: '783266374556927155',
      mid_rewards: '86080794957571244733'
    },
    {
      address: 'erd12t0a73prktenzh0qshzyzvrm4jt0cr8f8a6m87z9lc58wke9u6cszms9p9',
      rewards: '782954815819057790',
      mid_rewards: '86057294474839923518'
    },
    {
      address: 'erd13pr0jm7q0w97s7kknju49d2pyj248qkrrnaymx8f9yly8le5czgq7emg8s',
      rewards: '305381338827499954',
      mid_rewards: '86034529311107079621'
    },
    {
      address: 'erd1ec79x99ggpluj33llkfp489qsx37m9n4arkuflky7wj60gg3cxvqufr542',
      rewards: '782005805692413489',
      mid_rewards: '85985711837660270569'
    },
    {
      address: 'erd1h8k28ws48fscmau5tyc0zf6pm3tdx8l8mwv3flrq5fcgzxknkjmsm75vkp',
      rewards: '542354071378121882',
      mid_rewards: '85909083711937056329'
    },
    {
      address: 'erd1q465ng4ypj9lqfyjrrnttncur6xjcar6nj870ff4036y57jkr8rsxdq82c',
      rewards: '659664616899772373',
      mid_rewards: '85757670235577916949'
    },
    {
      address: 'erd1gyrrrlen68pa4vtvsqtc6zjdgde4gfwwggw384fuhmxgw9gwc9jqfccrvw',
      rewards: '897183820089826400',
      mid_rewards: '85673444227657274138'
    },
    {
      address: 'erd1xy24mmztt4pdyx25l7uuu4zhfehrzv5lz5appxs0wjkv7779d9usfawcwe',
      rewards: '180251400937933802',
      mid_rewards: '85596135881172111733'
    },
    {
      address: 'erd1399zu2rud324jzge5eqe8545ucyutgwnt4dk7ndh0077jg56rkgs63yrnk',
      rewards: '535774341016970713',
      mid_rewards: '85412782947636819642'
    },
    {
      address: 'erd1m0w3w98mazqcx8hnxagjsx82h98zs792gd3puscc4h70tqfc8nnqn2n3ht',
      rewards: '415630169954103684',
      mid_rewards: '85350459622538278548'
    },
    {
      address: 'erd1gdupfmu3qv9g8l3657jyepdwaj9kklvulppprhpzj6cgdv09qufsp00ep3',
      rewards: '415615886092946533',
      mid_rewards: '85349382208902712452'
    },
    {
      address: 'erd1wczmhhacf7c4wvk6mgrp7y9jzcnwke6qmdypgergpmfrt32pjndq77whmr',
      rewards: '653581407150268010',
      mid_rewards: '85298821394916693536'
    },
    {
      address: 'erd1utk08r9ywqylkjgjj7u0k72xtl227tr5uhum3mpg86vqxxlmp8qssj6pzv',
      rewards: '890723719546779762',
      mid_rewards: '85186166989687072261'
    },
    {
      address: 'erd14yw3fk2cqtryxtr8l9pzfk6lsqxkrf4kdcmxredm4pf3qlsjw9lqp948e9',
      rewards: '174241938664445433',
      mid_rewards: '85142849719633433338'
    },
    {
      address: 'erd14tagve62vaq5mxcpa0hex7znjse9fycwu9lfe38hn4mfcy6yrzfs490dw3',
      rewards: '173184897305640625',
      mid_rewards: '85063118422836036501'
    },
    {
      address: 'erd1dltw0zx5v0uxjg4lzvjlgvalwndh6l7fhf75tls6u6t7w9wuue6svksjer',
      rewards: '292232680573129194',
      mid_rewards: '85042742599041099152'
    },
    {
      address: 'erd1plfckdqg4vw4etzaaylvfsrf89fv28v9wywxxpls2wd5jaen4n7strr982',
      rewards: '530309424345042708',
      mid_rewards: '85000571174168271411'
    },
    {
      address: 'erd1kga5lsxv27dddnymj6k9vf3p0pj8rry57ltp44w9lyt7tuwq68uqgtqqme',
      rewards: '648842716253366638',
      mid_rewards: '84941387915909620870'
    },
    {
      address: 'erd1edsnw7gyr6hepp0ah0maevp9ezep2prygth59hn2tyengzcm0c8qyuj88f',
      rewards: '290306142266722564',
      mid_rewards: '84897426243895504651'
    },
    {
      address: 'erd1va36l47g3equfaunuv4a027vr0a7f2w5rgj0appxe66ttcmw4mhq4whscp',
      rewards: '409049631689340822',
      mid_rewards: '84854097919087353928'
    },
    {
      address: 'erd1msved3jfsmr8st7k8h7d3mpq8qmqjqessd6kc3qqndkth9x375rqphf5ek',
      rewards: '644903186953704083',
      mid_rewards: '84644234188463618348'
    },
    {
      address: 'erd13n03l3nndty29uqrrzdvz9kx7065dc42qqc4z9ft6fjan6932x7svate2d',
      rewards: '883115669558647069',
      mid_rewards: '84612301372603632099'
    },
    {
      address: 'erd1l6z3xg7pt8x5sc4v8hlt2n2jruzr2cgmthyme4vtyfpx50397q8qw8pru2',
      rewards: '286387844597421466',
      mid_rewards: '84601873991555221757'
    },
    {
      address: 'erd18ltk99t9vuec95dpque89awel4zh7hxgpq6cjwprr9x6ue94j9zsfq845a',
      rewards: '644123320830485713',
      mid_rewards: '84585409870176900158'
    },
    {
      address: 'erd1wrx420l8u88valpqd7lnlyc8wcz9wt3v3s0vkzhsku5uxyr3d4ts3y74d7',
      rewards: '1001763495476117894',
      mid_rewards: '84561757270231003180'
    },
    {
      address: 'erd1s7d5dq57l3wz233xd6e7f7z5f4wfljw3cdf0w2zgpram8aefur2qugu8kl',
      rewards: '643348544862034385',
      mid_rewards: '84526969495845728416'
    },
    {
      address: 'erd1dfxheram7ervcy9m2lp5frvkv6yv54j4j2960498enc4pl8m324spwxvgj',
      rewards: '285111077352736272',
      mid_rewards: '84505569048253577733'
    },
    {
      address: 'erd1pse3qq92p038w9j7ea2zwr60npzwp7sgl3p8ynjp4r2rqcw2d49s3n6ql0',
      rewards: '165395521270511898',
      mid_rewards: '84475575610674357973'
    },
    {
      address: 'erd1t4pqmuulagvn7vw5ttr9uc7qfcmq36xcemm39mlgcp6ar0l2jycsp2dx9r',
      rewards: '162225389906251839',
      mid_rewards: '84236456599308191150'
    },
    {
      address: 'erd1vaua4jphhmvdfudnuj5a6gmgenyc5f2ndv88hvgz8rxj8d00hr8qhulyzj',
      rewards: '400398918507211253',
      mid_rewards: '84201585532047547378'
    },
    {
      address: 'erd1w84gpp6hvhwf6vh0p7e7gwpt4nhme4ewwrmmwzl09kxl00sjs4wqzeqn2j',
      rewards: '280680940939649331',
      mid_rewards: '84171409444882736298'
    },
    {
      address: 'erd1r9dz4mmh4cszjtk3sc0286wtumrka5cwqh9uykp380npmj8q9xjsd2xtzf',
      rewards: '637891984331071112',
      mid_rewards: '84115388015553308368'
    },
    {
      address: 'erd1gqrepsvpwfwqukfkm595wxl09uksj8tmrdk7tpzrfvufy0w06azq3mdfvz',
      rewards: '159172676702163124',
      mid_rewards: '84006194291702992743'
    },
    {
      address: 'erd10vgvagm032s5knkpkwnwfu7pgcsdq24hktuyc3ewh6f5yejmm8rqg3pteq',
      rewards: '278204079496056490',
      mid_rewards: '83984582909440052040'
    },
    {
      address: 'erd19kqrua3m25m7umh9c5tsfc3enhct5aj8l2eqx0xe6dykuyuczt8src35ts',
      rewards: '755388370559757932',
      mid_rewards: '83977992269386396756'
    },
    {
      address: 'erd1dfym0qflcuhhhc90q9mmths8f4pzs0yu0n98jspuzqn96w360zasc8pjhz',
      rewards: '397152288895265815',
      mid_rewards: '83956696354320453878'
    },
    {
      address: 'erd1exs209mxeln35876njvl8ss3v2zsgwequ663r0dmvttudsy6xvdsrjk9ng',
      rewards: '396849799538192324',
      mid_rewards: '83933879963546349988'
    },
    {
      address: 'erd1pf3qpzzchlt3jnl5r5w9xmd708vklxurquuu69kruuum64hjmjlqsh4mqm',
      rewards: '635328903015275895',
      mid_rewards: '83922058023871055447'
    },
    {
      address: 'erd1lscn2zm0hywgctt73kwdpd375e44fx8y7dnq0wwknjnqj8k5g60qj0qkvl',
      rewards: '750319180812665273',
      mid_rewards: '83595629678858470286'
    },
    {
      address: 'erd1uwawrlrhszh4vyjsl5agdl56pp3rfv0sp0ycvjlgytq73tjkctasr7c7dr',
      rewards: '511545773634488477',
      mid_rewards: '83585252661468387269'
    },
    {
      address: 'erd1ydmhl7c3nzhs8y4wjgnflalh93aufwvulel957nrl3ph4ulna2jqpav83e',
      rewards: '271921851411564386',
      mid_rewards: '83510722366726816972'
    },
    {
      address: 'erd128hhyh564wu3kpyj5pgnyh4fv6afjh6eucsdp05f9w7ae52cl4rq7fg4r9',
      rewards: '868499704916737517',
      mid_rewards: '83509837589954668995'
    },
    {
      address: 'erd16y35llpr9fvnyc708t0rh5kvwm92f4aqgw6czuljssd92mwrgdfsjs95d0',
      rewards: '152254219281800979',
      mid_rewards: '83484343772451070341'
    },
    {
      address: 'erd1gsk30v3rk8gxw0232f7z0t82nrrw3u0ca5c5uzded4t6wxzf2x3sf9ef2u',
      rewards: '748698296822390899',
      mid_rewards: '83473368443357864471'
    },
    {
      address: 'erd13xfrc88czmg6lx2zjkdfr9x29pysvd5cmaxk4cue5vsypym9qhqqdgsgpq',
      rewards: '388967395307378931',
      mid_rewards: '83339320151889924085'
    },
    {
      address: 'erd1azpumldwn9u23dg8zjudg07tr8px58jdrn823kt2g780wj6my0pqu7d4na',
      rewards: '269530067022305496',
      mid_rewards: '83330313086212944918'
    },
    {
      address: 'erd1s0jr8same9rrhgdvnufh0j77ff4tdmtngxm59cqgw90mmakudplqm38t46',
      rewards: '268321871542090278',
      mid_rewards: '83239180424638345820'
    },
    {
      address: 'erd1p6ts3mpq606pdsx3f7jgyxen2z0u6y7c74snuhtzmy0nwe4k9sms2k8ss5',
      rewards: '505584591059586337',
      mid_rewards: '83135608176714825388'
    },
    {
      address: 'erd1hjmg48u0xfp094ahsamqx3e5m902rk303vv3c56e82mgc09e5hhq4pxnhy',
      rewards: '385269204928797820',
      mid_rewards: '83060370314939999491'
    },
    {
      address: 'erd1z80ltqvaxwc4962pp2f4ee5ncylkjsuyp54u94pgcuww03nrahns3hplyw',
      rewards: '743106051948908099',
      mid_rewards: '83051552464203057194'
    },
    {
      address: 'erd1ds89twa58hczdujflt2hp992824845sace87k4s66q7hx0elycxstzguvz',
      rewards: '145355792604795351',
      mid_rewards: '82964004146912367211'
    },
    {
      address: 'erd1jv7qlj29cusuz0fj3uvlf6uf7p6jdpn2g46ts85q8sxwyqpfxekqgjgfta',
      rewards: '502408688292970811',
      mid_rewards: '82896053835746549867'
    },
    {
      address: 'erd1t8p4v9jx2jv2458vgu0rdglw8ltykrm9d2psjr93ncxfxrqhmuzq6l3rg8',
      rewards: '740764333849535644',
      mid_rewards: '82874919620803238486'
    },
    {
      address: 'erd1a2vg7zttwn3s4kauc6vakw8l7jy5ewf2fywdz409x7vncv9axrmsdlg34m',
      rewards: '501911753005233278',
      mid_rewards: '82858570633612907089'
    },
    {
      address: 'erd1sgkne4gg6hmtachetla0078gkm98t3hrednlnqxp8hjgqh2kcgzs94042g',
      rewards: '382409123165149730',
      mid_rewards: '82844637953984805035'
    },
    {
      address: 'erd1zzm0ayjxvlxccy5lpp6pe8c3upwsgkp9e3fxs5988t26crlc7ryqqcxdyf',
      rewards: '740143084938524405',
      mid_rewards: '82828059598821786979'
    },
    {
      address: 'erd1tp5yujzhjh729ymdrc373qnr47s0l5zxsc63q390tdkuq3jlr3sqywh5zx',
      rewards: '619129314262456334',
      mid_rewards: '82700143471438357279'
    },
    {
      address: 'erd1afwml7fa9rlalmrz22dpt55m262agtsa7pae7xknhtp0hrqhemusye3203',
      rewards: '380194297884780989',
      mid_rewards: '82677576475914421590'
    },
    {
      address: 'erd108pav7mv977jt3953peqw5p8gy4gm9jqse0fh8f57wy3wnypa4hs4y5dph',
      rewards: '380095680384391137',
      mid_rewards: '82670137882213706572'
    },
    {
      address: 'erd19ef7ttwgk0ze39htslxvydwk59ttnncav2kqd7l85tvu6xz2zpfqeduh7d',
      rewards: '140568280692903906',
      mid_rewards: '82602888160306419725'
    },
    {
      address: 'erd1cfsuws27xlvqsy6repp4ykxyplnp5uyppppqpg3hvnsv9g4ytlvqzfhzuy',
      rewards: '498185724040999496',
      mid_rewards: '82577520967250817805'
    },
    {
      address: 'erd15eayvp5nvvz0wnw9lhfxesnkgrmhnmp3vr5r6zwsh8mf6vgdnzpqjxt7x2',
      rewards: '617349358812407686',
      mid_rewards: '82565883676311287656'
    },
    {
      address: 'erd10glv8pam6g5qsdjal4spaw76mlfm2vgesnfppr6aslpyg84m2raqfnlz0z',
      rewards: '137460688567244171',
      mid_rewards: '82368486404847783025'
    },
    {
      address: 'erd1em0ttw2m3l8v4w8t0u5306g5a8a5nrwm5ukpny4xcng9xumg0d4q96qyeh',
      rewards: '255339049371472103',
      mid_rewards: '82259902519255526491'
    },
    {
      address: 'erd1zmjwr5cd43axx9z29axlujv2e9y4t9nd0lfean2naz63ptmy6gss6pdz2a',
      rewards: '970568491650813158',
      mid_rewards: '82208757467646563047'
    },
    {
      address: 'erd1t42tdpumlp4fwrn4xpe6sshah65ak9ywhj7yaw2vtdzvarmksh3sx2x7w4',
      rewards: '372896641152607464',
      mid_rewards: '82127123430731453994'
    },
    {
      address: 'erd1dy0l40v9g2aq4v7qkqy9gejnvt55h2k2aetpul3kj8jp7ztd3xuqjpd724',
      rewards: '849529043391142870',
      mid_rewards: '82078904512510676040'
    },
    {
      address: 'erd1qjru7hulmmhqs0ux8kj7hcl6qfhtwz7ey8kegq7d6qgmuvj4mk2sq0dzqu',
      rewards: '609299629568413091',
      mid_rewards: '81958702749902395104'
    },
    {
      address: 'erd1a7atzh5gjsqsgfjmu9jdngtr6lxusqf0fuvcpdyc74s39pzg39tslygjaz',
      rewards: '489172291057365380',
      mid_rewards: '81897649082962245364'
    },
    {
      address: 'erd1yt6fm63a76q9ecjts6d94wyvla88yt2aswha789le33n57r25czs65wlg9',
      rewards: '369179972717525951',
      mid_rewards: '81846779817279975620'
    },
    {
      address: 'erd14l8tugh9ghslllklw0c9k04y5z04wsrax3je6ju64t3p8djn3whquvft9c',
      rewards: '129660218432323849',
      mid_rewards: '81780106778728149482'
    },
    {
      address: 'erd102y7dpv9454mr3yccemnld7gjpp2zckvrqvmcm5574z5jd7ng3wqp43ssw',
      rewards: '245939394230215423',
      mid_rewards: '81550898384631967851'
    },
    {
      address: 'erd178pms2t39du60wm09z9v330qmhm7q4mspr527f755jza4qy4ju9s6qpqwc',
      rewards: '125997981021907895',
      mid_rewards: '81503868828831314957'
    },
    {
      address: 'erd1plg8duumlcwc345x20rwc3a8zs0tggzksdn6qwyew505kf9j840q3rqha7',
      rewards: '125460055031092527',
      mid_rewards: '81463293749652550484'
    },
    {
      address: 'erd16k0vlphju5tj9e04q0drq5a3qp5ma5arvulcelcxespgkrnfqzyqfghefy',
      rewards: '601811223198685303',
      mid_rewards: '81393861700088245201'
    },
    {
      address: 'erd15pymyzrc9hjjvvdgu7jsnpev0f9c2mmsca6n5lrzl8hm2ha7razsqg58au',
      rewards: '599728382427176974',
      mid_rewards: '81236755647092720517'
    },
    {
      address: 'erd1entx7lk8k9uwwp2rh77r56jmz20wndurmshh04plkzgmwpaqz8mqj7w7vn',
      rewards: '598332604540022084',
      mid_rewards: '81131473881098415498'
    },
    {
      address: 'erd13wk3qvsuxtd7h0c70tymgv57s8d7aky8vclsqzn83aa82fmgly2slc9zse',
      rewards: '358921162193479387',
      mid_rewards: '81072970675501582701'
    },
    {
      address: 'erd10cm3q6cvxqt3u2uukxsr82jg2e0yfw6wgn49xc8nj4gj8kym7vtsufttlg',
      rewards: '358667860201924458',
      mid_rewards: '81053864425684760596'
    },
    {
      address: 'erd1whl76cxw67r4uenmf604xew62y0l7q5ls63t7q7ldp99vzzfx5tqnpuq7w',
      rewards: '119465989288544470',
      mid_rewards: '81011168929028139006'
    },
    {
      address: 'erd1y34t3p9ugrlstung9kepjdh24azzkvxfp4s6zdz0hsc5lmvgn8cqu33mgf',
      rewards: '477073643363714071',
      mid_rewards: '80985063343459707436'
    },
    {
      address: 'erd1rz4vvwtsevcw0kv207nwxpnepfl7rzsu0h686xlaw2gwejzwyrfsh62lpv',
      rewards: '118888228077954702',
      mid_rewards: '80967589129452801370'
    },
    {
      address: 'erd163f43tjcg97gx5lw2nhee0qp3d4eulg492qcarvk7qcqr0z8f7eq83qkpw',
      rewards: '118822092440058578',
      mid_rewards: '80962600601681340018'
    },
    {
      address: 'erd133j4ahevkvhqgfnaglqjxsfx8farrd4uxqhz2sj5y6xufnhx97hsk2shw5',
      rewards: '237126265375144828',
      mid_rewards: '80886135188183481259'
    },
    {
      address: 'erd10w05egh7ga8tlwaxz694cz00dt6g8k2pa7y4329fehrnzsx7fpfsyvnu3x',
      rewards: '594389721655239018',
      mid_rewards: '80834067196955542450'
    },
    {
      address: 'erd1af7m25vrwqutrrprgx8cx26c4s0tfkrvsx5v04fjn034g76jqpus6w945n',
      rewards: '116418973749642247',
      mid_rewards: '80781336389123373858'
    },
    {
      address: 'erd1u33j68h4rkhl5mkq9awa99e7mez2npcdr9j297lx246xgs7lsvrqzxv7z4',
      rewards: '474355223102445107',
      mid_rewards: '80780016330998091581'
    },
    {
      address: 'erd19re75hrfmqk935xgny8u53tmd9s8mru0egm04v8tfup07t4l8x4s2p8n76',
      rewards: '832097722202831904',
      mid_rewards: '80764081935646286199'
    },
    {
      address: 'erd18yckw9fadqz09g0pagpx2x9jxj9ptllc3e2n4anqpd4tpcj8vq7smrgdqv',
      rewards: '116076714125927712',
      mid_rewards: '80755520177285641907'
    },
    {
      address: 'erd1hyhs295qmc39z0r3uqz6svknzr7fnzwdstayrylkjnu0at2s28sq3sw7pq',
      rewards: '233691542778053418',
      mid_rewards: '80627058393766404338'
    },
    {
      address: 'erd1nhhvduyxc5eamde6j7k6cud3qkv6f9f6pquh57avggtx6qe3xjjq0ckvnd',
      rewards: '232503876864027928',
      mid_rewards: '80537474251482333081'
    },
    {
      address: 'erd1n9g9m509cknmyd8204x2sk8puhq66284a4l4thyrtqqs7zye7gcstakxkm',
      rewards: '829081789163495647',
      mid_rewards: '80536593909489688045'
    },
    {
      address: 'erd10jedtrhy385xwjyddgwd7r8stvzc96sne4am8pl54ya6gmlady8sn5d3fn',
      rewards: '947581716011072769',
      mid_rewards: '80474893966771240355'
    },
    {
      address: 'erd1tfjrrdg96ddvgd8tegxmgvpwpvrgcunqh8rw4mv6rnc6sffq3apsvyz2va',
      rewards: '228779404733183979',
      mid_rewards: '80256542015099718984'
    },
    {
      address: 'erd1z7rzzpw6r9mv3rl5ctnndzgz2d2w3gmja054jue8f570k7urnu8qf3dndr',
      rewards: '466375233650262712',
      mid_rewards: '80178095789145820686'
    },
    {
      address: 'erd10dd5jpet8ak0h8gnnmhqz47c2jjdqmhvm9k070plfrpum47sjc3sr3gvnr',
      rewards: '108159310472546229',
      mid_rewards: '80158320403318120481'
    },
    {
      address: 'erd1c3au98xj7nmc9hv96tgsqvuem44razs3j6c45qf2lch88g79u2ksmuut0t',
      rewards: '704671077828334336',
      mid_rewards: '80152450831630499905'
    },
    {
      address: 'erd1zdnxc0ysvutyu3rr5vh3hkjj8rrdcfe2yp5pvg3jc560tvht4dmspyxrkq',
      rewards: '107954419108568245',
      mid_rewards: '80142865706095087093'
    },
    {
      address: 'erd1dv0asu80xx8sz6zkz5w5n09cz6yr6spg6xqcu2zjaqsk6z6k3wmswq6ak3',
      rewards: '464163982761610647',
      mid_rewards: '80011303922935426039'
    },
    {
      address: 'erd1jx6qt8lh6uf3p0e2wz8hfaxlurcrvrnfzesf6sl2yyp3hj7dk70qhpnydm',
      rewards: '105879516657273938',
      mid_rewards: '79986358430583323892'
    },
    {
      address: 'erd19u6ssp0qns8jy0jc6q83ajthfyzrnwu5l80nuetskw6ct6aevy5qh4u968',
      rewards: '821137707138632141',
      mid_rewards: '79937381819601898857'
    },
    {
      address: 'erd1dva2k3dea843tsd8f79kuktkpezsc06k2x5spk0ssag6p5tjfuvsc050fg',
      rewards: '701689564001994120',
      mid_rewards: '79927559003308604377'
    },
    {
      address: 'erd1hxv32vku7sdunqswhrfl9ft27k5ey8ej8j5vrzl5lyhlgrmmeyaquv7url',
      rewards: '342831251017469020',
      mid_rewards: '79859328964387487968'
    },
    {
      address: 'erd1f0ay9t6um572k5quql2ny7yucjpgn9lgyz8gl0hsk7w03t35246swegpld',
      rewards: '102690279874072976',
      mid_rewards: '79745798321557801400'
    },
    {
      address: 'erd1pe3wygfncy2mxgwxppsccntkdzrn9ndttq69fwav6gkeuzaaq07qrgazfq',
      rewards: '221940885138596129',
      mid_rewards: '79740721105246766036'
    },
    {
      address: 'erd1yxt2cz3wsgxn4pdjuzcere85kryn0n0mc5xgunlly6wxnqyrn9msr8dcf6',
      rewards: '460144875481794534',
      mid_rewards: '79708147728791871788'
    },
    {
      address: 'erd1xvt8pntal44ye4av4gu0hafqzx65ne30ruen7z9pvjzghrglj8lqvncse6',
      rewards: '221392908586371865',
      mid_rewards: '79699387924894383128'
    },
    {
      address: 'erd1allncn9uhj30hsc27pnjrfkk8uzqexvmyk27aw2vpdnyfuk5sc3qnjwvnm',
      rewards: '459839390696356281',
      mid_rewards: '79685105396633358660'
    },
    {
      address: 'erd1ls539fwtg726n43nw96dezrk00pmmkw4rp8luznm4t8c6tkfcrms9l42my',
      rewards: '579090655742435007',
      mid_rewards: '79680077946813095539'
    },
    {
      address: 'erd16y72her93kgjunjernrh5v08whc9ulxmd9k05a0e04fx6xhww5qq6c4cms',
      rewards: '100187395869362439',
      mid_rewards: '79557008937143673489'
    },
    {
      address: 'erd1tlxtz0r4juf300jmksgh3qjz48xpp0yh2l0mgwfey8l2l6hwes8qz8exus',
      rewards: '935345444378433384',
      mid_rewards: '79551927427090465152'
    },
    {
      address: 'erd1wpwax65y2xw0y92eek5f7gck5s7lxzw2zk53eev5qlsvral6dses5hg66v',
      rewards: '457202268592663689',
      mid_rewards: '79486190601683205583'
    },
    {
      address: 'erd1qv44fs2z4z4ewar2fj03uk4a0pfj2yxzg93arhtaj3cfan9jvcqqnfcu3u',
      rewards: '933438139465283964',
      mid_rewards: '79408061822545533606'
    },
    {
      address: 'erd1ymrc4tflzjwks06c8a8h5dgcpxu0cv9fzgrpds8s6wrfdwxnjp3shrt5us',
      rewards: '336615159424562913',
      mid_rewards: '79390457013838464895'
    },
    {
      address: 'erd1jlhe528nft0wcjnugdx22df7tmp0hmq06ureptshuh7jmcgh5fgsx389kd',
      rewards: '694440431867306639',
      mid_rewards: '79380766107325956220'
    },
    {
      address: 'erd1k7dhr299zp9vuudxyk7al9mtkfmh7ch7zmzq3mh907py72px2xasn4p4cj',
      rewards: '335073322825798306',
      mid_rewards: '79274158223403065919'
    },
    {
      address: 'erd1pqtdavyf9nzj3lcjlzf7ueyu0fst6alzuku2sx6pynnskw9uvh9s25ln97',
      rewards: '929909904961055358',
      mid_rewards: '79141931542888790514'
    },
    {
      address: 'erd1hzmkpje88ec52q25rrntghn2j9uz0c3dqgmy55yyapxs7un7lc9qa8tvk4',
      rewards: '809706238418936535',
      mid_rewards: '79075120548812290244'
    },
    {
      address: 'erd1vtys8takm4m997cgjlqe5c4thtkce586kvkwpelu6cf9fwq6tfvs2tyddd',
      rewards: '212793251406279594',
      mid_rewards: '79050726627708172370'
    },
    {
      address: 'erd1v0usj7a498en67ad08ev72xr8ju7zydysy87nlv6qtwh2ksh7c0sq6m0z9',
      rewards: '328336297941948365',
      mid_rewards: '78765992931599306519'
    },
    {
      address: 'erd16sdz8dztkt0xvv0gawwnm3p0c0f4shlxh60akcdftpdf9qu0zcjscpys55',
      rewards: '804777029686194030',
      mid_rewards: '78703316549684961702'
    },
    {
      address: 'erd1a60y590az9ktkhujfh40xprgu0jlw2sdr5lm2cj9vps6wqcvsvrs0qssa7',
      rewards: '804135753789948669',
      mid_rewards: '78654945917460724298'
    },
    {
      address: 'erd1cvhl0258a6syrq4uhm3qycmjxzcw54n7ksdw4wfvk9jrqc3grxusyr6mw9',
      rewards: '565300951105963380',
      mid_rewards: '78639937914485386439'
    },
    {
      address: 'erd1x8v3cvwfkkfyl9u58fwladh6ss2dvmg45l0v69c7tvt5vswua34sj3knlj',
      rewards: '564997967166426550',
      mid_rewards: '78617084217979726447'
    },
    {
      address: 'erd1fd5sspkml2gmaa802mt3zphla3hvk4n9qjtkm0e9y0tpuwd4v7ys3upkdt',
      rewards: '325819152680333601',
      mid_rewards: '78576127838559907288'
    },
    {
      address: 'erd1p3gvk5s5c2qe5dq3utf5y50dncwd4y3nhhtpczufc0xj6ema9yjqt4appg',
      rewards: '563486444920633300',
      mid_rewards: '78503072000963472781'
    },
    {
      address: 'erd19lzdmtrnqdt8yur55qrav0hppky5zf46urptke8ew880yplhxp0sje5mcr',
      rewards: '801071857940793523',
      mid_rewards: '78423840117039142915'
    },
    {
      address: 'erd15e38ucnt6wwn8djmancukxzreuag0exsevc633lnnjuxgxz7uf0qhfh7n6',
      rewards: '441669071799910494',
      mid_rewards: '78314541154498164800'
    },
    {
      address: 'erd1ycznhpasvrzafys54lrvhk24htkr904c0w2nkmtkkfxuvznkpkes32yx6f',
      rewards: '559591222994843898',
      mid_rewards: '78209260322858461020'
    },
    {
      address: 'erd1l268l0ppla6c3awdqmsky76fldm00rnwskxu27qwgwyqghq83veqwrgc6g',
      rewards: '557642372937843963',
      mid_rewards: '78062261020500057607'
    },
    {
      address: 'erd1lp6taryzx29dwce5f7nqjk7yv27v6kxldjaljmp20juf3xe4skqsyk7xqr',
      rewards: '79569427889068185',
      mid_rewards: '78001821611025409552'
    },
    {
      address: 'erd1mkj9sdvugpdrnk6qchwjgmvua8pzkd7kewe793fngrvgr0cw57zq794gqh',
      rewards: '197428313768869091',
      mid_rewards: '77891768756440914356'
    },
    {
      address: 'erd1hectaegml7vpfdjxqmaun8wf8qzan0f7ns89fuctwewta2jkzxxq4ew23v',
      rewards: '316290148526974036',
      mid_rewards: '77857367071058628284'
    },
    {
      address: 'erd1cf79c0zerrac4duxhwa32n0nh8cmvgwf7a065qkzq4mldl4ge08sz56rux',
      rewards: '76446716731148445',
      mid_rewards: '77766279446028044032'
    },
    {
      address: 'erd1vl0y6s0l50ea2yc7zev98kr638xt2yzjmqfy6f69ysqasc253c5s8c55da',
      rewards: '314663134504166436',
      mid_rewards: '77734643454933827239'
    },
    {
      address: 'erd18xr95u0xk9y732ea7dg9r4l2hxspywmywf3st57l7nsph50rpdvsj2jruh',
      rewards: '552102173942859177',
      mid_rewards: '77644370796332073589'
    },
    {
      address: 'erd1uul624rz9naxmunqf03n9yqd2sm60m04wc9let49a0clc4m9dctsf27tmr',
      rewards: '432464609666333290',
      mid_rewards: '77620260182311377667'
    },
    {
      address: 'erd1nk6l466uk998ny4pz2rt40kaev2jh95ka5zc49k4me3j8f9pgvxsfc94et',
      rewards: '551525653485033316',
      mid_rewards: '77600884585173165672'
    },
    {
      address: 'erd12eucz5eczwnv4w34gzal5qzc6fgz6nzhuzdk779taycrhuk7fg0qp24emt',
      rewards: '192732605965481868',
      mid_rewards: '77537577437977230343'
    },
    {
      address: 'erd1rnqzqqyu6neqqxvp9rdc83xwxl9yml68snndq34n20nm6peea22qhvfz52',
      rewards: '72306564622815356',
      mid_rewards: '77453992993103329666'
    },
    {
      address: 'erd1tffedpa67tcaeudfsjr9hfzyx2fug0pn0sey238qhtcrufg0z5xs7w5cuf',
      rewards: '70375681142941993',
      mid_rewards: '77308348887002272090'
    },
    {
      address: 'erd1hv8ey02gxdlwzrs922t3ym054c8xzdxkkg30m38hrw2r8sj3p0pqyxs2hc',
      rewards: '308757964091131270',
      mid_rewards: '77289223896920245651'
    },
    {
      address: 'erd1hjdz5wqwmqc48pghq6j7s3f9luhwmn6qt5hw4hp7hwvzqkt3c2kqy0kpmk',
      rewards: '188977096701168363',
      mid_rewards: '77254304109753896180'
    },
    {
      address: 'erd1gvl754uafx9mtuj9kvef6e635ua4pqds79z86vneqw9dt09xzlqqc55293',
      rewards: '903666747054247339',
      mid_rewards: '77162443233808311134'
    },
    {
      address: 'erd1d6j7ch0wswsqyvznec7200xrhxgsyv0jndsxfwnkqkhmtmqvk7rs8ksv87',
      rewards: '187227362405364189',
      mid_rewards: '77122323858183523864'
    },
    {
      address: 'erd1p944k4phr5acthjru693n3cnascjfzcyvgk9edrp4tsctkc2spasf0trkk',
      rewards: '421233817395600792',
      mid_rewards: '76773135683020110964'
    },
    {
      address: 'erd1kxymyqtklf3nz3kea72zjm4w4aqjuu7rdhyzyuh7utksxe4t8vmq9nqcp6',
      rewards: '540400805745510517',
      mid_rewards: '76761751348278190327'
    },
    {
      address: 'erd1hefczg7kkrm5tsgtkgt73phezehqt8ldqrwrtmfafvy84032424qv9xa3s',
      rewards: '181340864173150685',
      mid_rewards: '76678312719224263789'
    },
    {
      address: 'erd19vl4xquce9qu2fv4tswwwcdyu3j6nfgrmz0yekh4k5gdp5nulp3qxueq4j',
      rewards: '180496130769342403',
      mid_rewards: '76614595543758331536'
    },
    {
      address: 'erd1hpd747pqu487740x3mk34q6sxp2fdcxx853hn3wvgng2aqmu53pqh0afvs',
      rewards: '896046272410134165',
      mid_rewards: '76587640440591379480'
    },
    {
      address: 'erd1t8c9800mzwap2fjl9hjfkwnx7vlaf2msye9ml9re6wwsk54cz4zqlwxqdl',
      rewards: '537178434116833526',
      mid_rewards: '76518691919640451037'
    },
    {
      address: 'erd1t7mauzcnu7me2hqft84wd4evrada2sdmu7a025883akk3uqa0aaq4fwcpy',
      rewards: '297884893601235172',
      mid_rewards: '76469081900481099725'
    },
    {
      address: 'erd1t5hm2z08zkjyu5lzjcfvqu7e9k72mhjq8hs6gsf6d59ee6mgedfswdslvv',
      rewards: '297602561202165571',
      mid_rewards: '76447785923631913591'
    },
    {
      address: 'erd16qsapjr3qq7all6sgy4mgxdglyhkmkgtjukwe4hcfrlj43mg9sxsefhjew',
      rewards: '652981697768899919',
      mid_rewards: '76253586072495527909'
    },
    {
      address: 'erd1m9uj9rk2x4rk7zlfey3vtjquzpwxvvd7un7j7puygxt80het8lnsg7x6sk',
      rewards: '295000614677992052',
      mid_rewards: '76251524378289540086'
    },
    {
      address: 'erd15uxx865l2ay0fjn5at9zrzcpjysqdmyg0u66mll9qqm24jq2d7esltqqpd',
      rewards: '294623030657664686',
      mid_rewards: '76223043691758300261'
    },
    {
      address: 'erd1r0x62rqgn6z7hpwz62ny7gpluhqa3c295xn0mduvcvhhy94wcnhqp7p394',
      rewards: '531723740468555590',
      mid_rewards: '76107251255954903239'
    },
    {
      address: 'erd15pqfarngp934exunu2p7jfgzcnpydjlagkevdlt9jne50ku05kjqq3q3ca',
      rewards: '291873604142430117',
      mid_rewards: '76015657916658009241'
    },
    {
      address: 'erd109lx9pfvgdghpquzzq2re99qy0ddnd5jy9rjcc9mudh5a00456zqv0pmg4',
      rewards: '291360979601232211',
      mid_rewards: '75976991293919525608'
    },
    {
      address: 'erd1vhcg0mpg8vp58ee2k7ek2ddaflcdfvqqve3e5xxclxme8l5f2gvslx6a5v',
      rewards: '529581794558095932',
      mid_rewards: '75945686976858076115'
    },
    {
      address: 'erd1x84d8hd2lwv0swd44k9wt8vs2g53d3atgry22dyae5fjgvmz9qfs6hh97m',
      rewards: '290669550821351281',
      mid_rewards: '75924837692923929784'
    },
    {
      address: 'erd176s69lqfqew7yzmxhqdrmuucmlpckpuyvy4n6kvvv4ksjnhucvpqwayjyz',
      rewards: '528767679881010381',
      mid_rewards: '75884279333339549198'
    },
    {
      address: 'erd1dpav5lt3988xydkn6gl2zm6tqhtqps0qgwvd3yn2fxdrlxr925fseaenqx',
      rewards: '289475450666451730',
      mid_rewards: '75834768223964111650'
    },
    {
      address: 'erd14af5ekv3cm3dzutclysx59pq8few5cs0sdkrggp6xfshsmmg65uqcgp0k4',
      rewards: '527717800771174127',
      mid_rewards: '75805088275950470611'
    },
    {
      address: 'erd17hnrf30cz49efetx4au2vdy9ny7s7ljxd54zfflxhhspxv0gpz2qclcu2h',
      rewards: '646784783683726632',
      mid_rewards: '75786160657172533013'
    },
    {
      address: 'erd1n0gjrpqcqxs67snxdh6t3fjy6svjwy99f8004fq84ejdc4znampqv33c88',
      rewards: '526352124564891073',
      mid_rewards: '75702077041787017132'
    },
    {
      address: 'erd1gz48fg9qcx0ngkuq24h8c6rpt3qdyh73xe4527mfgy37r2rfdzgqm99ely',
      rewards: '643797198740424284',
      mid_rewards: '75560810892153679119'
    },
    {
      address: 'erd12378zdptfjfe3al94zk6wqkxd75clm9wclz9a69ptgh9uscv8f6s6hjh7x',
      rewards: '404259333334848168',
      mid_rewards: '75492771754629617267'
    },
    {
      address: 'erd1gkchneg7hyv9z970g90lt6edx2m98m7r3yt86xw2sh8mpegh99jqcrlurd',
      rewards: '165265846391802623',
      mid_rewards: '75465794398089425565'
    },
    {
      address: 'erd1eaeakx6ap4e8u7wfvn7hxgxw4jm5klgw9n999agrhgrsdttcsplsmxwhu4',
      rewards: '522571341336343664',
      mid_rewards: '75416897330311225670'
    },
    {
      address: 'erd1qjmu49ksdw02zkm0m9x3juzdjzlzz6glpzknxly3z9ccp5x7jpjqp0mjp7',
      rewards: '283727195249612029',
      mid_rewards: '75401184566248479793'
    },
    {
      address: 'erd1uze9utkpj89qxkyva4wnm4ndrqlqypdv4a0kpq7s6q89dypz590qkyymnt',
      rewards: '282608486523202502',
      mid_rewards: '75316801777673348307'
    },
    {
      address: 'erd1u3u6yh3hsapdk5esqjnusamv0f52jfq6m3la3gchky4aws24fsdqyhawrw',
      rewards: '757690563922822768',
      mid_rewards: '75151643811766031311'
    },
    {
      address: 'erd12megwh998h3umd9dsk37v6m0jzxeq669dd5me59k9yvqlndl6hqqttkjev',
      rewards: '159050849361063171',
      mid_rewards: '74997005008984423423'
    },
    {
      address: 'erd1v6y9xxjc2x337k66dpuwpm9a0zhc7ne5est326fkyte5m56h438qjv4z6n',
      rewards: '158714037025857550',
      mid_rewards: '74971599679250052455'
    },
    {
      address: 'erd1pylr6ygse05wfkk65sy2gg38a6cx56elhdurty26nsl6pxur097qljzp22',
      rewards: '874376537219668643',
      mid_rewards: '74953119640056604385'
    },
    {
      address: 'erd1m6kuv6e8am5k3zkltw5yzzkvxmwwyg25ex6adfqa6kp0h2z4xwjssqfsrm',
      rewards: '515143394198587877',
      mid_rewards: '74856616644127457066'
    },
    {
      address: 'erd1uwflhg4km05g65uazq3f3x8xfxd0r4qchz0tgfxtlsnsp32spejs0k74k3',
      rewards: '395628540207241762',
      mid_rewards: '74841761912183905376'
    },
    {
      address: 'erd1u90dacygu4vy7ll0fe4as6n2fjp4x6ahgylglh87k3gp9f564rzqqup2z9',
      rewards: '395400379598074859',
      mid_rewards: '74824552045138087699'
    },
    {
      address: 'erd1u364fdzz7acnp3m9zqq5k594228pvcr3ldqvrk5k9ss92q0th59q35f76h',
      rewards: '513668389574366128',
      mid_rewards: '74745358905258723093'
    },
    {
      address: 'erd12fyhyksr4m9v78n2h642xcd4r8dpwf456py7qy4w3z8rzrkf3xkqgj5deh',
      rewards: '274227518134901807',
      mid_rewards: '74684635900292010143'
    },
    {
      address: 'erd15vhvymsusld94um48plg84t5klv3n9xe4j3fy5v7n7szzlaewyds53hwm8',
      rewards: '274007979560937295',
      mid_rewards: '74668076382489382659'
    },
    {
      address: 'erd1p22w7l22syfj3a6h8rvkzkkw6ty6l953lpxec27me629nl8ycaqsvqemd6',
      rewards: '393229937607219640',
      mid_rewards: '74660838342629720718'
    },
    {
      address: 'erd12sd7caaazt6rk82uqcectap8m6gmq3d9xwd2cghx0dty65mgfcuslwwrqa',
      rewards: '511980481043535871',
      mid_rewards: '74618042093179909729'
    },
    {
      address: 'erd1lf4xyny642txdygp5ncs6v7wqz0qmj65pm8ghu067qk7xn3mdz8s2zzakv',
      rewards: '511621385812594671',
      mid_rewards: '74590955992718263018'
    },
    {
      address: 'erd162wwfhetrtsfzs265jkteeymj33f9vj799pmlhgv3x63dnrc8rsq28s55n',
      rewards: '866771484651590321',
      mid_rewards: '74379480114588209207'
    },
    {
      address: 'erd10jn4fc9zzrwqmamakn3lp55el3re04q4fvpl7uuladfynwjpuhsqysdqkn',
      rewards: '508773156063794573',
      mid_rewards: '74376117614298019592'
    },
    {
      address: 'erd1qkxujk7fdw3ce3jtvkzndyy39cqs4gs0fv3lplep0vmmnxk4s70q7nr4fm',
      rewards: '389117805208171466',
      mid_rewards: '74350665381044359772'
    },
    {
      address: 'erd1kyjjuyrz8yelxudlqy07fdpqryua3g5zpcqf0ls3ujc3pg5wfquqludc6f',
      rewards: '388878140831483633',
      mid_rewards: '74332587799320341982'
    },
    {
      address: 'erd1dgw6u52vsu4dpa2pcxaac3gzh5360jd24ac4xhqy2v2xzgf98husva8t0n',
      rewards: '149658572876025091',
      mid_rewards: '74288557437095170993'
    },
    {
      address: 'erd1f0z7zs05u57mraf6evxze42qw7s8av3et2nhrs0v9namm28hve3sktk0w2',
      rewards: '268719708516074943',
      mid_rewards: '74269188765925592422'
    },
    {
      address: 'erd1t3lcr6zgcyyt24yw72eweegd8kjrzh5dazjyxhakyzju7sdftu4ssn468x',
      rewards: '626274724828934374',
      mid_rewards: '74239112780320734289'
    },
    {
      address: 'erd1xmnuy58hhf9chty2y43xvcfjs7wphlf4apkafsm8kyhstwk5n7dqrdnmgg',
      rewards: '387446445056149458',
      mid_rewards: '74224596792312046417'
    },
    {
      address: 'erd16qnkz5asxjlf8ggs5emjh23nl5casc359hm9w0uz2ztj6stuc22snn7l6n',
      rewards: '506101319384558329',
      mid_rewards: '74174584342688640850'
    },
    {
      address: 'erd1sy97rql3vm2sgc8xjkcxnxl685c04qvrnxssdyrppn9ztuehy7pqx4kkpa',
      rewards: '266689079371586667',
      mid_rewards: '74116020970118904514'
    },
    {
      address: 'erd1ev7t50eneaweyxgfveev5khesaqflk3tpa78fln7he6zj82m2anq7alfge',
      rewards: '504657677454032588',
      mid_rewards: '74065692252257986598'
    },
    {
      address: 'erd1x8zjwq6lfg3t9zxcclnewu38ufrr2x6x2r3ss4yjvespywwdf8gqvc2crc',
      rewards: '862007085104547872',
      mid_rewards: '74020107464518826992'
    },
    {
      address: 'erd1kmyadcrudjt5r3w6v97xnt6z2uuekqws2quk5s7etdxjy2jgmyusw4fz0r',
      rewards: '144725378706684846',
      mid_rewards: '73916452821510790184'
    },
    {
      address: 'erd169fgwum2astm7z3lrce2cwpk3hdekp89tdh4ppwcajm27ypdwfaqeg78k4',
      rewards: '501921049753101540',
      mid_rewards: '73859271875581691624'
    },
    {
      address: 'erd1acvzgfs2s4rum35jsqec67dcewjf7cflrnwkqmrpa82xl4h8w6esflnndt',
      rewards: '621103380239872843',
      mid_rewards: '73849044778877268290'
    },
    {
      address: 'erd1v7g4j22gjdgj9e4pmf006v8dmqjfjfm90mrsj0n8m88jzsm0l66slpj8zt',
      rewards: '262113167867530151',
      mid_rewards: '73770865735454217966'
    },
    {
      address: 'erd1flge8kqcj8jxhfz64hu8ujgakwtcxzadtepkzjr29049nhxxe5vq7r5s00',
      rewards: '381064936906083650',
      mid_rewards: '73743247679441753073'
    },
    {
      address: 'erd1vga5c8nptzd4qhczmsm0ggyv3t46zfr265a42h69svhu29h0xkgq5ewcaj',
      rewards: '379839772139369490',
      mid_rewards: '73650835045984296888'
    },
    {
      address: 'erd1vjd3cr7ht9dwxvx77cqkvj4taj39duzntcxcm2d9m6ymmu85xfjqt2ua4d',
      rewards: '141138705123660736',
      mid_rewards: '73645914555830416778'
    },
    {
      address: 'erd1yw3xn7jpwjy3z8z9tv4esxe2ya889ejv0kyxupn0ad06z4ue4xns2vy2wd',
      rewards: '140586935586860450',
      mid_rewards: '73604295275434303602'
    },
    {
      address: 'erd1gnfq4ksjh0l3cqnqrvqrc035qkcd872qe58jdfxmdcmlqdtv7nzqnjaj4h',
      rewards: '140408357395079574',
      mid_rewards: '73590825347609982114'
    },
    {
      address: 'erd1g2ltkmzfyd8nu5flwrxv3q0xnxqtvne2klcq6wd7r9ync6q6747q2h38sf',
      rewards: '496631992303804940',
      mid_rewards: '73460324941523058317'
    },
    {
      address: 'erd1gvgvquhfk8ntdzpc2cel4g9y86hv4hfxf35q7d38ussqmwd2pv2smzpd40',
      rewards: '136941759019747949',
      mid_rewards: '73329344203434640061'
    },
    {
      address: 'erd108qwj40gfyds3qsjftgk6e5yqtu923vs7vy4dcwhsagwrr0jm6cqnrc3ke',
      rewards: '613468935275811603',
      mid_rewards: '73273188222042805820'
    },
    {
      address: 'erd10ds0ldsvd6q5qvn9quhcwcuma0t8e2dsg3dmydj9wkelqltye54sgacrce',
      rewards: '731919924042592246',
      mid_rewards: '73207796941599322554'
    },
    {
      address: 'erd15wa0l2pe7uv73k8e6zyfkt5pjlm3azyl55pdtkdfspx8lp77r6cqwy3lmc',
      rewards: '253423977075292591',
      mid_rewards: '73115451030803070671'
    },
    {
      address: 'erd136z4lzferkhr59c0qslfs5tgsh0zrw4nj6effe47fweg33yan7gqq4376h',
      rewards: '133906532323394798',
      mid_rewards: '73100400881057976770'
    },
    {
      address: 'erd1fhmde75qqzh6ef4jkancfut465y40wtdgh92wpqa8eh2jte5d49q7hf6pq',
      rewards: '251859459113520116',
      mid_rewards: '72997441413756502395'
    },
    {
      address: 'erd1plcc3uxzq93uh93keh0qegwmy3pn6f9jcr7dxl90q5flegd43fjq9llsjt',
      rewards: '609390614207899154',
      mid_rewards: '72965565606529944543'
    },
    {
      address: 'erd17p45vc9j3tlmerr39e3d6h5m8scda9zwmjx58vgexeee6lnywm6q6m76qy',
      rewards: '131833707810025296',
      mid_rewards: '72944050341783664604'
    },
    {
      address: 'erd1kdnrhjx3xczcklfvjq2zu0xhyme7q2pqqvlh96jekruy3v75ymusjzmle7',
      rewards: '369966605285981542',
      mid_rewards: '72906114519998654171'
    },
    {
      address: 'erd1jyxameg20chkrywufqg8g2pp9pqzfluas2hpv4nagpm9sak3g2pq9ccccj',
      rewards: '727532112589056793',
      mid_rewards: '72876829856556953317'
    },
    {
      address: 'erd1pu72js43ezqc94mgychufzyz3ym8lyym8tgs5t3mhhqu7vh4yxysmruvqh',
      rewards: '607828850144817628',
      mid_rewards: '72847763712589051420'
    },
    {
      address: 'erd1z5d47aas38d7x44gl59nrdhp9353mxcvxde7ch4svmd50msqxpaqt3xhyx',
      rewards: '486951115321620798',
      mid_rewards: '72730108598050594791'
    },
    {
      address: 'erd1nwtmd5hhkhs4vh4v2y6qww6md9wdcj59w9ma6v3fghpq92fa07tsyvazfg',
      rewards: '128978789887641799',
      mid_rewards: '72728707482863610418'
    },
    {
      address: 'erd1j59u36u729h7d5h4372gykuyn5tm24l4a3u7kkxn2yqtlj954pssyvveqw',
      rewards: '247528017895625188',
      mid_rewards: '72670726264507332183'
    },
    {
      address: 'erd1ssyke28t82ak269zkqcqn3gex3uhmqlsxlhmcne6azs4xnslua5qqq9q2n',
      rewards: '247394367360617979',
      mid_rewards: '72660645173181029212'
    },
    {
      address: 'erd1l5dyz8saeyyhj48f04x0t97psdem7525v5ldmaehw4w557emvmhsvhnw3j',
      rewards: '483901488134568488',
      mid_rewards: '72500079064819078073'
    },
    {
      address: 'erd15uswh2mwwzng9rvlkwnruzcgt9t6c2lqzcfqz45grvarj32hc36q9yf2s5',
      rewards: '483799144238694750',
      mid_rewards: '72492359393805885769'
    },
    {
      address: 'erd1633xyf3zq3x29aqwalfjpgj2vnjk7qysla7tuh9w3n0nhxt3ewas8hkq66',
      rewards: '243377194694160979',
      mid_rewards: '72357634904483663799'
    },
    {
      address: 'erd1qq3f44d384hxgpnhke5w7s0j53jsl65e433l684n25y5dxjzuvnsrz4u0z',
      rewards: '122575778500659713',
      mid_rewards: '72245736407947654966'
    },
    {
      address: 'erd1q8vmt3w5ylcktaea4wwk4g55y790w5fhgt6lgxwepeevk26wj32szk08u3',
      rewards: '122419337018638267',
      mid_rewards: '72233936224226764406'
    },
    {
      address: 'erd1lefjnfpy9k09wh7p3jnjhw4njxn6j4zxleushh903w04srl7ejtsxg9zhy',
      rewards: '479767743011930603',
      mid_rewards: '72188275882746337359'
    },
    {
      address: 'erd1lqh38vt796r5qncgl4pdnwm90aswarcsmgaes2z0zuv32v4lkxkq08mlmc',
      rewards: '715981974211313612',
      mid_rewards: '72005617483099673232'
    },
    {
      address: 'erd1fvqkz0n4rpr54kh66s3kmrg9x0nar0lp82qq42k8q63g804c8rxqwg7cv9',
      rewards: '119294599438459250',
      mid_rewards: '71998241208753638930'
    },
    {
      address: 'erd14mqytedylnxye5hfs99g7xemajpuwda4fy7myuw0qra4t8q625sq4yz4rv',
      rewards: '477060134154252890',
      mid_rewards: '71984044360824755948'
    },
    {
      address: 'erd1advrf9ekg65xuafafrmvv8vjqc90ps63azf85wf353f4rfyjwcnqfa6uj4',
      rewards: '593428936871253784',
      mid_rewards: '71761596412220150448'
    },
    {
      address: 'erd1sngrj29rtf6are2hsxgl3m4fva9akq9v2m8d02ape9s8kf502j4spaxu3n',
      rewards: '354768670372044491',
      mid_rewards: '71759753453577604817'
    },
    {
      address: 'erd1w4w4pya737yva8cmk70xnxtg7z6s5ykn2j8zkkupr0tkwdjt232q32cz92',
      rewards: '115553420942284698',
      mid_rewards: '71716048832300359900'
    },
    {
      address: 'erd1agsn5fdqmm5kwmjjw2g4pxt0k64ztlwacwgmsewrrtqzwhukv5psazwzdv',
      rewards: '115111544082460208',
      mid_rewards: '71682718617957182130'
    },
    {
      address: 'erd1xaxm24s4y3u9ervct8092npu9253drt72ukapea8pcaha7cp0f5qny4zzk',
      rewards: '591981310610704515',
      mid_rewards: '71652403788799941384'
    },
    {
      address: 'erd1jca63tyg4h9f6fwr6qgxrcfqnpnzw608g7a39elckdvpz3vdkyuq3j7u2u',
      rewards: '112895511848989328',
      mid_rewards: '71515566100936235774'
    },
    {
      address: 'erd15g4ajrgsd9fw6hx35300fanrcw2rtzaqukhvvtyqgjq0zd7lkdmse09ykt',
      rewards: '351136534511580508',
      mid_rewards: '71485786025636501500'
    },
    {
      address: 'erd1hqq09uvcwq9x767h5uy9jz33s8pns8f0wecf5wfflwcgj0ya5fts2lz779',
      rewards: '350238191160234787',
      mid_rewards: '71418025119428346012'
    },
    {
      address: 'erd15ndqv5d4achcext8re7j2pnn7uz3uwfnmvep9evwgenqzrk7fnrskr87qj',
      rewards: '230914718037474500',
      mid_rewards: '71417606005076724299'
    },
    {
      address: 'erd1e8ss3r8vujwchqj8weku4s8x0kvqqa9ysruaxf92my7e52mnmsdq7237ma',
      rewards: '588519154869784543',
      mid_rewards: '71391257746936242412'
    },
    {
      address: 'erd1fghpt40r4nv7nrauvha64238lryusf8rsmvcvuy883lxyekg8h4qdg4y6u',
      rewards: '110728632934518559',
      mid_rewards: '71352121156786616076'
    },
    {
      address: 'erd1w7qsrwjdt9w5n0ev6dxan868qyyqnc55tquy6a0h2yehyfha76vqfh5gwc',
      rewards: '229904063771931142',
      mid_rewards: '71341373628231314088'
    },
    {
      address: 'erd1l7wyr9f23aw0sufmkvs0gmgwpgcn7chylxps5f8ekttxvuw8r7uqktkcnk',
      rewards: '110087911996690599',
      mid_rewards: '71303792384376017415'
    },
    {
      address: 'erd154wf8ysuaa2guqsnnp60lwekmcl2c530pa3zwamwykkv0y89j9tq9608w2',
      rewards: '705930097577196087',
      mid_rewards: '71247417103701238203'
    },
    {
      address: 'erd14uch76m9e06smw86c9k30tvegl5gdr9k88fj8c39cym9trrqk9fqm4trld',
      rewards: '107277138197400014',
      mid_rewards: '71091779260996454719'
    },
    {
      address: 'erd1klewgrw2cx655cgj7089wcrv96vgl70vf3g723mmrjqw4v46kakqyml2us',
      rewards: '107187766061896714',
      mid_rewards: '71085038033511006240'
    },
    {
      address: 'erd1y9cf5f8349w7wttn69gr4damv8sdd9m5set7g0y6w2y035ekcctqew0qcs',
      rewards: '226425580323912299',
      mid_rewards: '71078996008009893125'
    },
    {
      address: 'erd1j9ntlvgmzqvpawhc79zy76tdlrgz87xtdzfy8wmhfnvkkerrs8vqdn90q8',
      rewards: '822140794887996370',
      mid_rewards: '71013043463673065896'
    },
    {
      address: 'erd1wk0p9ezc434h5fnczzjnupt8eeu7sw0vjzptnkhm7a25khp5h6fs6u0t2t',
      rewards: '581951349873301944',
      mid_rewards: '70895856497855431044'
    },
    {
      address: 'erd1wu5mzsvpewem8e7punrmmgn0yenfuw054wr9wza0cj8r3c84a2psvaqhr5',
      rewards: '581882105863639109',
      mid_rewards: '70890633509521169662'
    },
    {
      address: 'erd172rlc8jjm6ya26l5p74paqhtzkaz5kjptzs97apgnw8y2k35q26qm2rsy9',
      rewards: '104319961128450049',
      mid_rewards: '70868723123596589287'
    },
    {
      address: 'erd1egnnj60v6m988htq39unshwtt5qmddgpueplncrtv0uam9ulryrqlj6qx7',
      rewards: '104104782850613510',
      mid_rewards: '70852492497432692991'
    },
    {
      address: 'erd1v2qjhw6m9l50sseqk2zegjmsdtcufvfzmzcfny9g6sapw5t4hjksne6m4j',
      rewards: '103072469344321390',
      mid_rewards: '70774626391369252528'
    },
    {
      address: 'erd1sed9vmt4tl7xwf3cuu0d5vvphh4xz93s4vmly2p4ap6fpggxmzjqmmue84',
      rewards: '460432672072268982',
      mid_rewards: '70729855862708545089'
    },
    {
      address: 'erd1n4j9g9527ngq5flwxkzcfffkzuu0nzpymnhxw4ajtyfczjy2mmsq7anwh7',
      rewards: '341004735317159076',
      mid_rewards: '70721557188294279086'
    },
    {
      address: 'erd1y430j95tv7kvjjejrdrelcncqzlldqh4w8dnh9c4a09q9pjxsd9sk57h4j',
      rewards: '579352501311261996',
      mid_rewards: '70699828627890356051'
    },
    {
      address: 'erd1kwl4vr0w46dvpq85ajcz9rqxjnyf93wqnmwhqztcu0pjnsmfvx9qxdavhh',
      rewards: '579080185939484593',
      mid_rewards: '70679288222778651331'
    },
    {
      address: 'erd1l2txlcutyy077d2pey45zymx3cv2srkw9etgxs2fuk9shw8j6ttqa3fdf2',
      rewards: '459032850165389299',
      mid_rewards: '70624269061405785751'
    },
    {
      address: 'erd14p3r6gfqh9nye8arfk864a6ts6dg3pgvldz9qh5m0vsl9n46rv7sptj89q',
      rewards: '458269471327899106',
      mid_rewards: '70566688358291574268'
    },
    {
      address: 'erd1aj7dqxthzrr0njp9wx2k4q0t84lg4sxahl5u63mnrxh37kxavf7s6tpd9g',
      rewards: '336699475320035261',
      mid_rewards: '70396816855514144736'
    },
    {
      address: 'erd1twm64yqttun3q3sta76j5ja3354305a7sryra4z85ajnmy59cpkq6xsdzm',
      rewards: '575066284900233483',
      mid_rewards: '70376524728796003039'
    },
    {
      address: 'erd1sncmawvjmn2pj45vhyecna478cxz99yqaxv3ng4dr5wprpqeah3q9xdk2c',
      rewards: '96658004039645778',
      mid_rewards: '70290791361884718919'
    },
    {
      address: 'erd1unp3ma36g5y3y708jq3yufuaqc6a3hkf8d8k8e0hqcddd6mva8yq4ytz2m',
      rewards: '812011803065269969',
      mid_rewards: '70249026382837788696'
    },
    {
      address: 'erd1rqafq9rzzh7w0s5wuw409294xvnyrjfh5yzp227qfqa4kttal8rs50y57g',
      rewards: '811896404081995114',
      mid_rewards: '70240321983044001321'
    },
    {
      address: 'erd1yn502pkj6q36cle00v37uua55kmjy0qd4c4p5cn0kgsm5re5fynsa2epqg',
      rewards: '95568602037125391',
      mid_rewards: '70208619142537650974'
    },
    {
      address: 'erd1er7lh5vph6k5w9ye6wpmh8uscpj3m58panphhs33kmr23uswlaeq948dlw',
      rewards: '453444292705848072',
      mid_rewards: '70202731219234873638'
    },
    {
      address: 'erd1yxq3fngsl07w492zu3023gkl78vgvp0unsx0uxv9j3q4fkyfhmtq0d0q0k',
      rewards: '453400203707621534',
      mid_rewards: '70199405641693541947'
    },
    {
      address: 'erd1j70ps287hajhs7l97hsywjekvxzkqccpdehgl5r3gzhwm3jh04jqvkrxgz',
      rewards: '570197137327773289',
      mid_rewards: '70009251067253458865'
    },
    {
      address: 'erd1x5mvgsn7ltcet4sdzuu0nshn8fkxkdsft3jm9pmj4kk99qrdednqtc924k',
      rewards: '212062507244663537',
      mid_rewards: '69995607517043805668'
    },
    {
      address: 'erd10w9rrwhsyqf3dqml968nv8jhecu9vpayakhr3c3chepgc02t7scsltqlkt',
      rewards: '688745761362042914',
      mid_rewards: '69951224291921544036'
    },
    {
      address: 'erd133cwc43sffxhkeh45x4ehq5wxyntpyngzvxc864ck6d8htqwe0xqutejeu',
      rewards: '449695558403838602',
      mid_rewards: '69919968917875109852'
    },
    {
      address: 'erd1pf5kpegxhlda66mgyw00msvdf2p8seedkyudt2382s36tyhflcvq3f86c7',
      rewards: '568778800663336298',
      mid_rewards: '69902267721134702252'
    },
    {
      address: 'erd18q0gd533u52785c62a56uytsc90rhm486pxasmrmhtvmluwdravqm2hule',
      rewards: '688028756110359227',
      mid_rewards: '69897141489909025246'
    },
    {
      address: 'erd1l42t7eupl3h3l782u4ytdhrx2fc246ke826ug5j666gu0wj0e02s4t3804',
      rewards: '687768684696588652',
      mid_rewards: '69877524631110514063'
    },
    {
      address: 'erd14t6sklfjw27h5qgy26yete4z8v9vcvjv0hnjek6mgaea0x522exs263yza',
      rewards: '807005256768958150',
      mid_rewards: '69871388908810760258'
    },
    {
      address: 'erd1u6uaj3t0uamskzuffupnj44j2pyxvhgz25sxufxsrlmn9rfp84dsa90uku',
      rewards: '90591032314854212',
      mid_rewards: '69833167334951922717'
    },
    {
      address: 'erd1jd2az8vv4375spg2ftd0tf800g52gtjpu478l6zsfrw2rmwyny9q5qzdug',
      rewards: '209411179736768345',
      mid_rewards: '69795621226367236425'
    },
    {
      address: 'erd105pfcfqkxna486lfjjegg89z5jha9xuxq3kydzjag7knph75tvhs4mtkws',
      rewards: '89928913469252459',
      mid_rewards: '69783224545340062721'
    },
    {
      address: 'erd1la9g6efw3acfyqy60ndzjpntm03ardnp98wmrmhsflz68hls0hhqcsmnsk',
      rewards: '89642112451295500',
      mid_rewards: '69761591506202996719'
    },
    {
      address: 'erd1rg4r3tu2ldmxje682sch89w002ud0c3vwpuyqn6kcm4cvy3jca2shjcjtt',
      rewards: '327718452845128805',
      mid_rewards: '69719389655030226397'
    },
    {
      address: 'erd1n7g7mrrmsrdeln7mq94fl5nlmauq5e09z982hxtkk0fzg5w0redq2yc9wu',
      rewards: '565623827496620115',
      mid_rewards: '69664292073495240397'
    },
    {
      address: 'erd1mq8q3nmxstravyft86ak5utqjj9cxu8pmglm5fy3fd7zr2qwfdxs7jnxrc',
      rewards: '326186458242704635',
      mid_rewards: '69603833233968326250'
    },
    {
      address: 'erd1d826wzdmwxgjvje5565huywer3dnle7gl6mqxetpua9f8e6q4yvs3gpsj9',
      rewards: '87292564326414465',
      mid_rewards: '69584368053852491662'
    },
    {
      address: 'erd1zvjz2cqxs8x076a279zthd0wjw6ynyduz804e8th6haazrfrn7fs9yh4z4',
      rewards: '325715949710427839',
      mid_rewards: '69568343368675745840'
    },
    {
      address: 'erd13hgx45qaztr4wjtfdwj4gzsm3443yx7z2t90cplctv9ycjgzcpsq7ru38k',
      rewards: '564170582463807311',
      mid_rewards: '69554675633168295127'
    },
    {
      address: 'erd17awprz3rsh72vlz2syyyq2yfsakpk9p7wlleng4g2rhce2kuddyq8f7wyj',
      rewards: '85769356188735340',
      mid_rewards: '69469474384746843409'
    },
    {
      address: 'erd1r6yvl0vnjyq39tcmr9879mjwwqkq2jyphs76c20tf6avnz0e8xkqxlflty',
      rewards: '801067952828019778',
      mid_rewards: '69423545559306848673'
    },
    {
      address: 'erd1n4v8njaj5kl74m2dfdfnux3ydyypmr84gz4qh62tnvpysaumkjts7s4may',
      rewards: '84829715977102613',
      mid_rewards: '69398598508441333459'
    },
    {
      address: 'erd1qc58qchh7ggg6xyrqgudz0a9va6l25vh99kfjs3mezs9mgl02f6s99k28e',
      rewards: '680066934048299566',
      mid_rewards: '69296591291385181561'
    },
    {
      address: 'erd14sqte7l8c8amx6ae0c7wc68ywcqrumwn32xc6azw7tcm4eashrwql946r0',
      rewards: '83441862416832637',
      mid_rewards: '69293914464431620474'
    },
    {
      address: 'erd1tdqecz9agvqf0r2z6v8q0y3np5ha980jxdjmxhmyy857a3f37q3qv8fat5',
      rewards: '441336099434336293',
      mid_rewards: '69289425468831006036'
    },
    {
      address: 'erd1694qqr9szh0zrwl8ay5uc94gctm483gk365cr7532c55k4jsk60qeq2jt0',
      rewards: '83001194942838508',
      mid_rewards: '69260675472536627804'
    },
    {
      address: 'erd1pcp8uya8jpchcj723x9h3cl0r3uw6eqx6e7g7nwh7qu8pz6ktvqse3z7zp',
      rewards: '200630606295178847',
      mid_rewards: '69133313643706235167'
    },
    {
      address: 'erd1zkhlh4wgk50w2fwkhxemc8l5js9ejrpcuztyjr2gn4acwl2njy3qut23rc',
      rewards: '558234152189768130',
      mid_rewards: '69106898183256921929'
    },
    {
      address: 'erd18q83hlsknrs7xzwawg40w8a7p7hslrz6gljn6jpegxgah6gmx5psfhwm2k',
      rewards: '199598394153031318',
      mid_rewards: '69055455183412404076'
    },
    {
      address: 'erd120n496p50pmfa6rcs8pkylaa6rh6q8jw7p2lam2jj3zf8d2s9w4sn0p40v',
      rewards: '556985794543109086',
      mid_rewards: '69012736140110744747'
    },
    {
      address: 'erd1udhctyd404gqq7cpkjqmk774rw8rjzcl8hl4pdye2lyrjrcf0tas8eaxq5',
      rewards: '436722853136244997',
      mid_rewards: '68941454117730324472'
    },
    {
      address: 'erd1v2yly0x4acrsyq7lq3jyl28eh5q3rzpmrzen229guqrt3t6d4w2sf6nwty',
      rewards: '436229880437623710',
      mid_rewards: '68904269808697014853'
    },
    {
      address: 'erd13xdtyc75rau9nc6jnrex0u8us9pq9k9pn6qyp8099m9ymmwfd90s8kf5vw',
      rewards: '674824451975272745',
      mid_rewards: '68901157479228433945'
    },
    {
      address: 'erd1kzhhzvjhvr8z92trm63qdt2qszc45e23ykstx8mr3fvep80al6zqyk5yac',
      rewards: '436127809598165800',
      mid_rewards: '68896570733984952556'
    },
    {
      address: 'erd1pm7dlrcnmhms09ad48q88nm33l7q9lg4adqz85wskvy6qvn8qzvsgcpg9j',
      rewards: '196109173934032767',
      mid_rewards: '68792267702094727887'
    },
    {
      address: 'erd1xn5mrulayrtumvjm3z9vq7dsqyua75tg6p5azm5e9fdnxccfxmyqupv3fm',
      rewards: '76088820175206728',
      mid_rewards: '68739283760110115327'
    },
    {
      address: 'erd1sywwzthtgdqj3umqccrs8829nfuzu79v3c4c6xywrh9c4e6f549q0klu3t',
      rewards: '431955564606313893',
      mid_rewards: '68581863555324571238'
    },
    {
      address: 'erd1frxhrcydw6xs5d757anuhhca0yhz65vphxwkhdclpnxpzctel4kq2f7y94',
      rewards: '312439351809049843',
      mid_rewards: '68566906330364042961'
    },
    {
      address: 'erd1w8e07ksz7la992qpehuxzgyzwh6gt5venpc24ml22jq2p3lj48gqetkvtk',
      rewards: '312127243997918122',
      mid_rewards: '68543364431728907046'
    },
    {
      address: 'erd1heretsd97eqt7d0fhwfns97w68vzdqy8pzsefr2624v0k84c47xqa4elq3',
      rewards: '430615139660356718',
      mid_rewards: '68480756991886421674'
    },
    {
      address: 'erd1szfa7l9wtg80xtva7wqa5w7r3ykdgx0xgh7hsfduwx3rrw8rdlls7tdw5c',
      rewards: '788342994453440664',
      mid_rewards: '68463717994900791755'
    },
    {
      address: 'erd17953vfya7q9zqsy79j209v32vjzegqah6hydnhpeydqjx9wr4gns37n7tk',
      rewards: '310451328128288566',
      mid_rewards: '68416952210962078747'
    },
    {
      address: 'erd1xw536t6jhwn05fxnj5y3h86h8wwk3g55sh03axf9shh4up7xzqmsun4dh9',
      rewards: '310415977828862475',
      mid_rewards: '68414285782452029336'
    },
    {
      address: 'erd1x9m2s5f60rgtspqv8s7s8d7v9vl5qk59hvnh28mskcsxkua4sgtq7clqew',
      rewards: '547804783728167569',
      mid_rewards: '68320224071317242492'
    },
    {
      address: 'erd1h3dxnnl0hu6ugcfmefhl3ja2ecg66pv8q4kzk32p99r368t69j9szr2yzk',
      rewards: '189510073041926314',
      mid_rewards: '68294505843070189020'
    },
    {
      address: 'erd1ppgtmtp2n07w6u9803uky68dhtju3pgxzxgw48eycz3j4anvegzsaehh9k',
      rewards: '664828403714019626',
      mid_rewards: '68147168163597267891'
    },
    {
      address: 'erd19ngtz75530nj0kg3nxzhzxdu8ty9jvajjdud95r3vh74aaxee05smy94ww',
      rewards: '544610070310362377',
      mid_rewards: '68079250866649393872'
    },
    {
      address: 'erd1kp5vzalc9c6uvehqxhdwgc4ez39pg2hmg0t4m3wm7za0x8zr08qs9cnf4c',
      rewards: '663766812458240043',
      mid_rewards: '68067093673808346536'
    },
    {
      address: 'erd1u9saaqvjje6zw8kr227vr6a5x3ys9c6pqlcxnypa5a5lpju6vq7skut227',
      rewards: '544343589066558974',
      mid_rewards: '68059150522454108683'
    },
    {
      address: 'erd136jp59drfkquk6g9y6ltvultd0u45x29ycpeksgp2tww7md7nyds2adkn4',
      rewards: '663152055892176481',
      mid_rewards: '68020723361219647278'
    },
    {
      address: 'erd1h7nzag5mdfms3krshqny9a0uyqy4hm99ue8v9j98t6082dz5r6ksxe747h',
      rewards: '424354785077341247',
      mid_rewards: '68008546339807743857'
    },
    {
      address: 'erd1pancmyj07zmwt63flws6t56mxdqw7l5rgzhy4820p3vznx2gehvst7qwt9',
      rewards: '65756935513075486',
      mid_rewards: '67959962728240277748'
    },
    {
      address: 'erd1ant2rgphwwxj9yz8g8h6f8assse5c230gst2dm2sttf9wu69dkrqxe505a',
      rewards: '65316994750463960',
      mid_rewards: '67926778551268513703'
    },
    {
      address: 'erd1px84nt9rrdwkwmes4uuurhvvd9jctz6utyz0950wum9yf4t7yhnsy32vv3',
      rewards: '184575407390681482',
      mid_rewards: '67922290235461239483'
    },
    {
      address: 'erd1y3scslfdz6mu0m88pgmnxe0wn6r3skfjg5g2qyd2q0qagkzczx6qylhs7g',
      rewards: '422921848611308483',
      mid_rewards: '67900461749064527247'
    },
    {
      address: 'erd1nsndpasmlu3s6m63wsawpcup2n77l7hzdsc46ttxwytea5yc9atqdn9fq5',
      rewards: '64254169428213453',
      mid_rewards: '67846610977401811124'
    },
    {
      address: 'erd1w9slwhyzjzanfujzdk5c5zglfmq6x6mwmm6a2594ydw35ev3y2as7dwdn6',
      rewards: '301801002536736778',
      mid_rewards: '67764469059390814198'
    },
    {
      address: 'erd18chat80dxgfzgy9lmquz586hp939smse8p9mdv7u5989wyy522pq8sg8za',
      rewards: '301292237341716521',
      mid_rewards: '67726093542267991581'
    },
    {
      address: 'erd1w4rw86smg0eq4fvkjjx47manzqe3lahxs9cqnsrd6l3f9cvtcpeqaymyv9',
      rewards: '778147510648786890',
      mid_rewards: '67694685507713115158'
    },
    {
      address: 'erd1msjeanzecucvrcv5xtuvcj8s2vnj3x7uzy6k67tr42cgvja53j6qs9dxqf',
      rewards: '61772424291338870',
      mid_rewards: '67659416071133074895'
    },
    {
      address: 'erd16rugh2qzqtvx6w00gdx74wwpqzh202lr44x0qnyly9eus8tdaceqg674lc',
      rewards: '61424134275894364',
      mid_rewards: '67633144994451293194'
    },
    {
      address: 'erd1g7kx9rxm8whddcewc0zq6s7er8g9aakdnexazkym53dv65rypges7ewt2x',
      rewards: '180152368551890714',
      mid_rewards: '67588665993169731410'
    },
    {
      address: 'erd156nwjk98kqnfulx4azawskzh03uk4d3z4l5axd6yjg0ej3paje6qkvnn59',
      rewards: '179653871578257293',
      mid_rewards: '67551064995038200580'
    },
    {
      address: 'erd1jfnfzcfelqzqvdut869s0uml4s8qwzy743letlshwartu5lsqu2q6mkdue',
      rewards: '775428938378655170',
      mid_rewards: '67489627029414660207'
    },
    {
      address: 'erd1kzjgpn2zrnuwrhk9fwykk8vlplxfth43fz09fez6pway6knm8v6qusaqzs',
      rewards: '534151584198835406',
      mid_rewards: '67290380447092243057'
    },
    {
      address: 'erd1yxu766hdgmulhkvcsa9zj5f9gmcnddz00jjk6t02s8qff3qntytscduf5p',
      rewards: '772567001397405522',
      mid_rewards: '67273754731735153632'
    },
    {
      address: 'erd12xl7c6fef0huwf44f0t3rnz4wh73nm0qnv6lvnpfjklk7uvu0e0s6570xu',
      rewards: '175898819723062954',
      mid_rewards: '67267826168607946014'
    },
    {
      address: 'erd1wtx7cnwcvdmw39fh86xszdfyhv9xvjuqsj0aj4qyg2eveyh0j97qq3tx8v',
      rewards: '56359236370263698',
      mid_rewards: '67251106132112962309'
    },
    {
      address: 'erd15h0n8nmg3vd4vmv26up4djrckpsaupfu4temskg6dplg3jchm26sp6z893',
      rewards: '174617242501952540',
      mid_rewards: '67171158414849782743'
    },
    {
      address: 'erd1zal0x8xph6es69u4wp365ys0dhjkggh256sjjvpqc07ypw7a0axsz755gh',
      rewards: '293720484056862959',
      mid_rewards: '67154965739743848942'
    },
    {
      address: 'erd1yhc2cmwnngyr62swsxc0ah97heqw9zpjadmytfxrhxsgsxjeewjqqaqzzy',
      rewards: '55027645310042646',
      mid_rewards: '67150665897536625214'
    },
    {
      address: 'erd18ygd5ljrt3gkeh8aclq46et87tgp623gdqla7asxgjhhu0x2uxhqgdypud',
      rewards: '530658235834540188',
      mid_rewards: '67026881584980305899'
    },
    {
      address: 'erd109nh22phc8456hhjc24lhxetuzgr42xd3d9mdw4z03xwrlypgses6fy70g',
      rewards: '411117775600336947',
      mid_rewards: '67010095406426740590'
    },
    {
      address: 'erd1yn95pzvek9dygzalh5z9dap6s3ddxn8yskr9vv7sha26yy78urssn6mdlm',
      rewards: '529587152299664604',
      mid_rewards: '66946091104548650633'
    },
    {
      address: 'erd1xqfl6a545tng52hnnmlkmqty3ulqj9rny6jktnm74mqxlpmmz6pqdsctdc',
      rewards: '528914012677892851',
      mid_rewards: '66895317031687153658'
    },
    {
      address: 'erd1llq9zgukmxtfgv5a0z9242g3k3t7tg78dk55kx7j2y44cf3ex3tsy5sv3p',
      rewards: '409211839244531984',
      mid_rewards: '66866333030436591930'
    },
    {
      address: 'erd1cj8tyxx5ptxwnl39qva9z5dj5xmlaj0t537m79d3jep7zhe3qfwqlheewy',
      rewards: '766548782848183039',
      mid_rewards: '66819808095359250436'
    },
    {
      address: 'erd1hm6kedcw0qhpa6pqewtaqhsf8g9ne56ey07hvd9fqqdwldpxg0dqu9ua80',
      rewards: '168847329480856601',
      mid_rewards: '66735941151354688151'
    },
    {
      address: 'erd1e52k2nqt2jr6sejuucrv7v6rl2ulm37cma32w632gnyte8h7ygesjw3h25',
      rewards: '288141293067477728',
      mid_rewards: '66734134398605967440'
    },
    {
      address: 'erd1yhvdxxdu4c6uh5jvwk7uyvrhgyu8ays95dx4aapejpezw08rku7sk4773l',
      rewards: '286780638019626173',
      mid_rewards: '66631501904091472697'
    },
    {
      address: 'erd1vq35vvjrzgssr30vh5ttyctlw0565r5uhgcvr45sx2n4fhcaeuzqa6t055',
      rewards: '286728971549429380',
      mid_rewards: '66627604767394388122'
    },
    {
      address: 'erd1q4stezjw5whrrye98mj8qyf2gkceesyau008c8kf6hydnpr34sssae9fsj',
      rewards: '167241973306499234',
      mid_rewards: '66614851159428594963'
    },
    {
      address: 'erd1744wujwj34uup3fe27slpmxw0fa3c2yj7nts3jsjhpt7uszj9hmsedv48h',
      rewards: '524750071450600851',
      mid_rewards: '66581236195516729639'
    },
    {
      address: 'erd1pkvj75c8pqmaqrxhyucqfdrhtxz48u869af27vp9cc2f437zcddsrjhg4a',
      rewards: '404113024839807713',
      mid_rewards: '66481735889339312109'
    },
    {
      address: 'erd1fpf5g7kqwwjglvg3gx3dh6p3gapmtkt2ur7fhj6a4ccvgtpmsslsptfpv0',
      rewards: '760483407875471332',
      mid_rewards: '66362304509422381819'
    },
    {
      address: 'erd1ffgsm3m0u4sf0ahqejywtg4jq7wd9mnmew96q285xalxehqdrwzq30x7fu',
      rewards: '283147603392092340',
      mid_rewards: '66357466683283608743'
    },
    {
      address: 'erd1zrf3papqc9e5p9zjczvvagac32c3vpljqqf8gs9jt7jglffe29hqrvpj6c',
      rewards: '162338545335322533',
      mid_rewards: '66244991770637412797'
    },
    {
      address: 'erd1k6cghnr4uvc8n2fme23xg6e2kc0hgruvf8hf69w386ugwyumhqcsgf4mzt',
      rewards: '281259820083626901',
      mid_rewards: '66215073568763835578'
    },
    {
      address: 'erd1gxjpxvgqk7pgufr8ssd0f5n8cjyxdxt99h5xac2qqpf4qffyuwxqul4e9x',
      rewards: '399594309506917852',
      mid_rewards: '66140894889743080802'
    },
    {
      address: 'erd133j0yy3d7vpxrkasv6almr0te6axsn2u25ceed7u3ygrvvtfhcsqjnn25s',
      rewards: '398380699622263913',
      mid_rewards: '66049353826469069558'
    },
    {
      address: 'erd13jshpts0pgtaj3mc82vzh8ad52vddyrcmzrlm8zj2ewujw6kplqsk8uqua',
      rewards: '278202901658022303',
      mid_rewards: '65984494066602351527'
    },
    {
      address: 'erd16w7uz73f4m904n8ftpfmk3qlvhusfhwm0ddqx9dn9a9w8umeqe7qu3lv6z',
      rewards: '277949527469361555',
      mid_rewards: '65965382371048875866'
    },
    {
      address: 'erd1asvz7zkwyt2nh8fw6jum23a0qj8w9ejpmln9zldyawl447jkhyfsfpn0ez',
      rewards: '635286346948457610',
      mid_rewards: '65918848073412868040'
    },
    {
      address: 'erd1x9g85tpf7uqxmy86xmukr0cj74mz96hhceav7tn3rxh8ylqy5jcq5c3sqd',
      rewards: '276808027835379479',
      mid_rewards: '65879280493054193583'
    },
    {
      address: 'erd1x0lgm8eqxt5cnad5hpnm5ar55sfs9qe82hv4f2gxn2mw2ql3dn8q0y26f3',
      rewards: '634307117195396801',
      mid_rewards: '65844986007918654715'
    },
    {
      address: 'erd1txk05w05q0nl72vncgkhfrnset8jvw9rw5fwe9h9fve0cd27m3vslleppn',
      rewards: '633628692685646063',
      mid_rewards: '65793813302620987135'
    },
    {
      address: 'erd1jfw7nrjlaxrwmx7ch70fc5uc4wrsztjvypccvmvs6960ujhpq9dsmfrhed',
      rewards: '154790226592347324',
      mid_rewards: '65675631606056904318'
    },
    {
      address: 'erd1hn8l2keqxd60wk3jf2l9zk4dhxcm3ya2qak9aundx7ghdzrjxnkqyqjj9z',
      rewards: '631929983810033493',
      mid_rewards: '65665681834154152696'
    },
    {
      address: 'erd18r8wkz9u3djwmqqqqgxgctmpnqsp3yyyelwyuppzdwny3t2cnqesartkdm',
      rewards: '152922395434756261',
      mid_rewards: '65534743457118525278'
    },
    {
      address: 'erd195v9fw8s05qmsl06y5sawlsm23hhwg4y4yjtjymg9dvs742678qqa92xdz',
      rewards: '390858293277647749',
      mid_rewards: '65481948201422031600'
    },
    {
      address: 'erd17rg04gd9utp6yt4t9ykt8we9yv685lfp07f66wa9dxg4xsd685ysz84ccq',
      rewards: '271091537498765085',
      mid_rewards: '65448092835285149203'
    },
    {
      address: 'erd1ygw9uxhmwznugees3kuwcgf7re579z4hgxdur5d4fm8ssunaey3q3gv4l3',
      rewards: '149677038611232264',
      mid_rewards: '65289950284217113288'
    },
    {
      address: 'erd1l5jqzu9fk3t92q9hzsdgzexpdurxdrkqpad2zvezttznxhafz4fssyl4mw',
      rewards: '148375294216413763',
      mid_rewards: '65191761345976346375'
    },
    {
      address: 'erd12s2gk0s9sh2wmzngzz8p78q2lqqvt5kndcsq2ua7y7kaw5tzfhfsdzgesf',
      rewards: '386994338801323487',
      mid_rewards: '65190494987602865289'
    },
    {
      address: 'erd1fcdcxqe2g036xvp86c355e23jf7ynr89zpcfhcv2eqm2654kqh8scvsq26',
      rewards: '386983834421346684',
      mid_rewards: '65189702655466921146'
    },
    {
      address: 'erd1pvthxdpz96682ejv2d5sx2k7cu4knkphd5c7sz0k3969wq6h4ryq508tuq',
      rewards: '383884220179520128',
      mid_rewards: '64955902661725950413'
    },
    {
      address: 'erd13gzqwzz9sl43zatvlvyl249a3epy6az2ahkscdwxyymlspd3e3wswnyp6d',
      rewards: '263958761190112661',
      mid_rewards: '64910076512539140617'
    },
    {
      address: 'erd144fqxk670hth057p0suamq66wp8ch8ch6dwys2pqxj980en4qu9qyk64es',
      rewards: '263773008935155350',
      mid_rewards: '64896065454175697775'
    },
    {
      address: 'erd1ljf7y52534gzkpmvrpw604uqw4l2dqlu3282t92w8875cvw44afs8jxlyy',
      rewards: '143953940371097476',
      mid_rewards: '64858264200617892489'
    },
    {
      address: 'erd1ku2dk5zd3xnk0z7ve5kw5thfydn94vq8y9knrmffzyyad3r5gauseseeer',
      rewards: '501689123454502410',
      mid_rewards: '64841777967330421782'
    },
    {
      address: 'erd1zceyxlflr50ud75tksv20e6kufgaawp7w26d5ya82pj48lkrr02qzuhupj',
      rewards: '262716833395167475',
      mid_rewards: '64816399464999890798'
    },
    {
      address: 'erd1ff7e94gjwuddgukjnd2amg8nhkwhs690g3g5vy5shc8lrpdv4lzqeuyec4',
      rewards: '500524519443905454',
      mid_rewards: '64753933355341600676'
    },
    {
      address: 'erd1ckvjpylrquzaf9d4ut0jp8qgk0yk6m56ntjamdte6mxlcp2p8ycqj0shku',
      rewards: '142296684974787070',
      mid_rewards: '64733259515823234029'
    },
    {
      address: 'erd1hhu5umpu69dfmn78sxlfdlh4hej3jjxeu4lmxv558ufkmw7kuefsd0wrcg',
      rewards: '141915099034888218',
      mid_rewards: '64704476969545016808'
    },
    {
      address: 'erd1m75xwljrr3d65tf9rywtlp4uujdmj0rvm0u9m42ec83k8frnyztqz46a5f',
      rewards: '259881843732835625',
      mid_rewards: '64602559769606597895'
    },
    {
      address: 'erd18hv678zlp93597vd90jnk2y4zxpr5z69jx9r8up9qkud574lnjxqzztrqg',
      rewards: '140488708641952320',
      mid_rewards: '64596886140841096199'
    },
    {
      address: 'erd1el57t9phkq866h9udktc54vvlphgc9fz7j0v3a4ndu0n8yuej7pqvjfg2y',
      rewards: '258992164281292148',
      mid_rewards: '64535452370435609516'
    },
    {
      address: 'erd1ngac4w4y694rrw6ycayznzuw6fs296gefxxkyj56m8fehxelx39qylvx68',
      rewards: '139509428119478425',
      mid_rewards: '64523020245874072494'
    },
    {
      address: 'erd1gpdeujwykkz64sfsuvp97z3vqthuxztrn905ez5jhqvnany8rlhqcaud8p',
      rewards: '378052147113821301',
      mid_rewards: '64515996744448400109'
    },
    {
      address: 'erd16u359c4d998crcs0kw72gyadwvhmzh55prdjdk8spxvpzgmgpyrqzum0zs',
      rewards: '257953344161684371',
      mid_rewards: '64457095478734412054'
    },
    {
      address: 'erd12gdhreav9elxsvj90qwsrp4zqfcjwxxmqkvejqhcskfwxmqq5qtsyphwc2',
      rewards: '138124999290087960',
      mid_rewards: '64418594524996118750'
    },
    {
      address: 'erd18lqmcscpsr80ukcepjsz4p3fduw097c84r6y8aj5jdna2nc4wurqy22snf',
      rewards: '257149457705688259',
      mid_rewards: '64396459337035183435'
    },
    {
      address: 'erd1qy65tskw2vzjc8xhsqctlnugnk8e9rvf7xjd2xd2k8gej5hk3gaqwmwzzy',
      rewards: '256409568794263566',
      mid_rewards: '64340650449424004822'
    },
    {
      address: 'erd1ued8xz8k29l6nprqrstmynxxexpjrsmtjpgefgff3pa2nzlrs29slvxslq',
      rewards: '255190138804125506',
      mid_rewards: '64248670382932303684'
    },
    {
      address: 'erd1y8xhw6hkmt9jady9dffl8rznxkk2m9zclm9j37qlr56vtq93276qteravq',
      rewards: '254179878610008686',
      mid_rewards: '64172467730397685060'
    },
    {
      address: 'erd14sxpw0vzhf8l55lqz22hvtzqg38lzdxyp4tf08wysphnmh2d2maqmrnsvq',
      rewards: '491819890688828426',
      mid_rewards: '64097354184620277501'
    },
    {
      address: 'erd1h9hegcq03zzmpxxpujdse90u3nafhlrr8nx0lgcsfzl74v29m4vslht94p',
      rewards: '729886695811710723',
      mid_rewards: '64054433099983361521'
    },
    {
      address: 'erd1pqyhudjsgrtu7vv85a94whe0n9l6txv0rvd2jrs34tqfufv8crjqzhjvst',
      rewards: '370958056294707030',
      mid_rewards: '63980898419397019702'
    },
    {
      address: 'erd1jmwntw8mfh3glpxrfeng4mvrgz07av6v4s6gkf8yjwed2cn9j2tqndu2cz',
      rewards: '609580132124594198',
      mid_rewards: '63979860704009878789'
    },
    {
      address: 'erd1hl2ns8scdst07g7p5knk2dulamfnanuu489hwj8al7sumrhcwaksfl56v4',
      rewards: '369411226947780240',
      mid_rewards: '63864223032263452004'
    },
    {
      address: 'erd10s8hzth8804mr33lsxc47n9tqxp72gkwv3dupgfk5z7x0fqfye5qdsqnjx',
      rewards: '130226237277652466',
      mid_rewards: '63822800866498606684'
    },
    {
      address: 'erd1ph2krvzgnu82sjr2qj4gdgknpndhjumv7fmvhf2hdvk0gv4njc2sdn5d4p',
      rewards: '368657621403065826',
      mid_rewards: '63807379516299490318'
    },
    {
      address: 'erd1t2gc4zvcpy3mdemdl33k6n0sh8qx5ysggktek34cgt5e3mqyunsqecr6hc',
      rewards: '129806011102776700',
      mid_rewards: '63791103736020250906'
    },
    {
      address: 'erd1xflr65edeuu8wdg0mu88v7cgrawgnrlztdhhfsg6gvx5fgj5rzpsr4jge5',
      rewards: '248114155876105343',
      mid_rewards: '63714937913272647706'
    },
    {
      address: 'erd1q5kjt67y33dgywejz5ynd42rzf2m8tekr97896h24zkruquczcqqkl7txg',
      rewards: '486442283036845996',
      mid_rewards: '63691728020432185002'
    },
    {
      address: 'erd1fwl6ut5z0gm69le8hyglstw8lgkxusnrqztg0z5wz5n2h28fxfmq2uyx5r',
      rewards: '127798335860280549',
      mid_rewards: '63639667324096651370'
    },
    {
      address: 'erd1x7lamqsl33ag3t50fcwmke39pfxze3v73qmmcg4zrvjz784ejg9sjvvufu',
      rewards: '126307311007692886',
      mid_rewards: '63527201199603300951'
    },
    {
      address: 'erd1l2jm698p3hq87p0jjdx5lq50zzsq92pva777v5ptmrdh30fa9j2sefmfd7',
      rewards: '244446533211776855',
      mid_rewards: '63438293760463833387'
    },
    {
      address: 'erd10uw7rhmmgn48f7lv55e8ufr0u8rk6fkjde3hvs38ftj4pchw53cswv9akr',
      rewards: '601725805850118132',
      mid_rewards: '63387418777194521969'
    },
    {
      address: 'erd1crh4yhdjnwvyltdc8t3qshkn5l7gjelq4fzrrfu8d5l94p8sgckqfuce6k',
      rewards: '243619260147503467',
      mid_rewards: '63375893596392057023'
    },
    {
      address: 'erd1nw699m9wxl73avnypygum6y3m920s9067dffdx7w5jrj8svnzv3scl0vgk',
      rewards: '601306426246386982',
      mid_rewards: '63355785502510103915'
    },
    {
      address: 'erd1f8ey8yley2y4u06sgfyv9nu9mrqd4e49c8h4lxvcqyafn74gmq8qccmzzq',
      rewards: '600568500364932598',
      mid_rewards: '63300124683774264165'
    },
    {
      address: 'erd14p67wgl53r47y9n5g9yxuthnj9gehrl6hnunaa4jjvyr6s8q2pws0llvz2',
      rewards: '361384040320788233',
      mid_rewards: '63258742467029505006'
    },
    {
      address: 'erd10q0f89zqsjcld5qawwvk5y0sgsfl5n37jg6d0hgvwsq9sz4fj43q6jfl3t',
      rewards: '122661573919011655',
      mid_rewards: '63252207848168508886'
    },
    {
      address: 'erd1v70daw3jnj30l3gmacz5wu7e34eukx57p74v2fa8ug32a4y689lsvfqlnf',
      rewards: '599877833638542461',
      mid_rewards: '63248028563512552406'
    },
    {
      address: 'erd1yjkkkl09p2px3jn4ty4p9qhqetg0wktpx02jx3kusavey7q4kllq0sfecg',
      rewards: '360998361549613202',
      mid_rewards: '63229651203649062312'
    },
    {
      address: 'erd1x8888x3uahtcx4ywqhgg4wez7j7aw3h25rh62adz8y99d3v65p8s042epu',
      rewards: '121536776756332159',
      mid_rewards: '63167365816522868014'
    },
    {
      address: 'erd1hdtpv0kfjne9sfvvf4kkwl7uufgj2qamgxc7mygkqqvmyak7l37s07alpu',
      rewards: '716888221042533520',
      mid_rewards: '63073974538828689066'
    },
    {
      address: 'erd1rffw3slxmmx7h34vyfyghde4xhs5mfk4pfg8tpxdpxdj0tl0p22s8hd5me',
      rewards: '597255420334338489',
      mid_rewards: '63050223234760473720'
    },
    {
      address: 'erd16u2lg4njy9sjd22zlhrlj6duesmn2z4zewzmue098uhggk6pg8fsfhe5jr',
      rewards: '118334438511494447',
      mid_rewards: '62925817480766633165'
    },
    {
      address: 'erd1actnta5var3j65xwj4ep2t8lk6w4qje2t9wrduds3yduy6d2r47smew6lp',
      rewards: '714724206684229222',
      mid_rewards: '62910745664538587408'
    },
    {
      address: 'erd17lkcpc4mcucpant9rmwtru3cwr2pd0g0eqdjk9h7j8ml5vm6qazqalw5pc',
      rewards: '117688847373461661',
      mid_rewards: '62877121355295759945'
    },
    {
      address: 'erd1g647d5qlvgq3etp8muzgtal0nmu6pa743yg9jq6z59yv9peuuk4qs5wu8u',
      rewards: '475372274890512365',
      mid_rewards: '62856731264900396756'
    },
    {
      address: 'erd1rhwpxwrxuyqwpdlm8n33mfqnx8jzj9ke3ch6fygdr2xsrju58qys5sz9ts',
      rewards: '475328119544808170',
      mid_rewards: '62853400682852487564'
    },
    {
      address: 'erd13ncwgxafdwrg9t4udv3pl2t9xykzsr6rylvvv6h0gsc9t805nmxq2f3645',
      rewards: '474947238885648136',
      mid_rewards: '62824671335011061660'
    },
    {
      address: 'erd1rlhxxf8jgg2wmx00sdreyfyma7jjtmnye0p8f56vwkesdnk7wdnsx0j0a0',
      rewards: '355473155304169624',
      mid_rewards: '62812891863673566953'
    },
    {
      address: 'erd194h36j0305kj7aq097j3fgkuh7jh7jsdm28uwk75ha6fnhhga56srrtcar',
      rewards: '354960149784638132',
      mid_rewards: '62774196504219783108'
    },
    {
      address: 'erd1ruzm7aqegndz8cepcvu3s4fh5qrgjk5utauukrylath774fmfajsryqy4n',
      rewards: '116323922934601243',
      mid_rewards: '62774166826001039869'
    },
    {
      address: 'erd1gfwxefh5yvn82nc4up7qmh09e5hv3zlyw5dy057gjfdzvkerd00qwkt262',
      rewards: '235496990129610761',
      mid_rewards: '62763241010879756419'
    },
    {
      address: 'erd17j8es87wmcnygqde95dseng6qdrwe8sg2qzk8m8pz5wx6kacpjqq5u7z3x',
      rewards: '354272689790165599',
      mid_rewards: '62722342263703024056'
    },
    {
      address: 'erd1sldlxv378vgxju6xecqeux8gj9439sxcxljkvz95a25k5dxawjvqwcxe36',
      rewards: '234737080027303187',
      mid_rewards: '62705921950086399515'
    },
    {
      address: 'erd1fmz0pyp9jss754kpv32lu2l62pqhhduf952tfkmehh5t7tuw4s3smmf9ql',
      rewards: '353976090193897338',
      mid_rewards: '62699970130159648055'
    },
    {
      address: 'erd12zs48snsgerrxepnuftk65ltglxndumzprl7luly43ka5tksjvzqn2fg2p',
      rewards: '353412014402295867',
      mid_rewards: '62657422604481697371'
    },
    {
      address: 'erd12sxnzvxjfvdg0rmxegq77u6z83yelnprx9kpwh3xt732u8eu5raq0p5n6t',
      rewards: '352859884039817435',
      mid_rewards: '62615776107459671932'
    },
    {
      address: 'erd1akkpa99huyqrstk7keq2tlz86uu2fpcjdh2adpg39xje9493jy5sw27v3x',
      rewards: '233043266126814481',
      mid_rewards: '62578159703420742247'
    },
    {
      address: 'erd1udyaqukct65zk50xuhvja3x2y3lqun4gn7yzsjg0ftmxwthp979sxelw5z',
      rewards: '232637541390336510',
      mid_rewards: '62547556398154856009'
    },
    {
      address: 'erd1946e3s6rak32skz98mnkj4qz9qmtd7q6r0z39ljjku8ehankg6kspyufrm',
      rewards: '113237324698081131',
      mid_rewards: '62541348613127544365'
    },
    {
      address: 'erd1wlfr020g4rt3dner9ectyunpxgl8qf742rpmq6dwhs7q7qnfh43qqwdp8z',
      rewards: '232032013875824911',
      mid_rewards: '62501882221287165864'
    },
    {
      address: 'erd13a5na08chnpy8dg4t6f3kcmj62g9083w6j8jv6t3f8z65znunj3swaqrjw',
      rewards: '350848873570404807',
      mid_rewards: '62464088123575383013'
    },
    {
      address: 'erd1y0wlkyfm69m3c87572zhjq93ep9ktnthu0e0gvxedy5cr093k6csfl9yn6',
      rewards: '588561522470925796',
      mid_rewards: '62394453481666060826'
    },
    {
      address: 'erd1ckn4yccxv8x75gee0wu4tny2nkv7keygfk2ql4tqwhy0anaekh5qxtvfkk',
      rewards: '588472554164261825',
      mid_rewards: '62387742714480746955'
    },
    {
      address: 'erd1u8gzlc2xc0pyqupggvnvn9r8wlxvnu45x73gxa4ue3n84fkqpnaq8f8ys8',
      rewards: '110577532132010071',
      mid_rewards: '62340723813786952265'
    },
    {
      address: 'erd1kkc343sw7pay3hdymrzh74wldxp2dfnywm0ezzlljz4400wafdcs75h23s',
      rewards: '348805725042045358',
      mid_rewards: '62309976006429857727'
    },
    {
      address: 'erd1nznx5rw2j04wgt9dsxfcvlqz2ve5plmwssltzfjxch0tccxrtj4swa7zle',
      rewards: '348374067468181660',
      mid_rewards: '62277416619940491341'
    },
    {
      address: 'erd1ae4zr8aekpx5gpejtnwj8tlntd2mfxp6zhv2hqufph8f3qgrpj9sw7lf8j',
      rewards: '466385917218743925',
      mid_rewards: '62178901637244701180'
    },
    {
      address: 'erd1fzacknr3zdmh70r0t8jwrvdynsjd40uequr768jyz5yrjy9e8q9s72h3qx',
      rewards: '227421631321431839',
      mid_rewards: '62154126878762546966'
    },
    {
      address: 'erd1rtlvewmuv7j98lejwyncxx2x2hp0qfuzpmslsyj9udea2zt7cels2hcg3a',
      rewards: '346419596332504770',
      mid_rewards: '62129993326705495769'
    },
    {
      address: 'erd1nn03jwx79hzhzj5jx3rgg5rxq9764dvth3eahxnc7p2cnt7q79jqerq9cp',
      rewards: '465544564143942947',
      mid_rewards: '62115439435733297015'
    },
    {
      address: 'erd12rpp338s69zy5rvepzy82z9rcxrmf7gh9swtz2k4pcnys3uchx3sw628g6',
      rewards: '345782115590611862',
      mid_rewards: '62081908958188488801'
    },
    {
      address: 'erd1nlj7h782k7ft2gdttrvy8x4c3qydj4454dk4rx5c5texw29p2massautve',
      rewards: '107021162343188354',
      mid_rewards: '62072471325091095503'
    },
    {
      address: 'erd175rmdvcd85zm4amd75qjl4styddjv639dle7qqlp5wej63wzkjpqkple5d',
      rewards: '464865933817524309',
      mid_rewards: '62064251205943898344'
    },
    {
      address: 'erd10humrl9ghsrdw5yz5c4hsppl3zap7yjfxx2gepzhvt0r2j8t5smqc26uv2',
      rewards: '106784341496916794',
      mid_rewards: '62054608227280771154'
    },
    {
      address: 'erd1ske3su3z5mv4q5vfyv5he9cqpql5779cc2w2rszvmtgyw6egxj5s5j5fll',
      rewards: '225604109813942702',
      mid_rewards: '62017033523292405872'
    },
    {
      address: 'erd1ak5yzy8wp7x0jsv4fewwc8vns0epwhuemu8np5325vvj06d9wfzq5z0n37',
      rewards: '583132178606621149',
      mid_rewards: '61984924920220305734'
    },
    {
      address: 'erd1xsldakvth0h6z0260y034s8nqmu8a2e5ujhdeh5trckm0hyv8p7sje3yzq',
      rewards: '104820961559093118',
      mid_rewards: '61906512954333574136'
    },
    {
      address: 'erd15ywxvghnqkmczn0pgnhmd3lcg8w5cnmf9kva57aw7yzv5pxxctyszk6vc9',
      rewards: '462305067533806524',
      mid_rewards: '61871088291338157523'
    },
    {
      address: 'erd1pcxrtkqfytw7anm853rwez0t5vtl0yt9ydjp7hg8j7sv080ynrqqch8rk0',
      rewards: '342510560710811849',
      mid_rewards: '61835139698937135179'
    },
    {
      address: 'erd1c77k88qhw5sk6z2da2mudwjujvnzq3wp6n2qrq9426atryw7tzwqa426xm',
      rewards: '342010934955118407',
      mid_rewards: '61797453558198177074'
    },
    {
      address: 'erd1eu606wayudzfc7v0lev4qd08pr5r59syew7sdlhvaz0w5h7ph50smrw6tk',
      rewards: '699931246007982719',
      mid_rewards: '61794931294206245294'
    },
    {
      address: 'erd1ezlrkvwsreacy77pwppg55eajpcstn6xjema8clgsacu3zxwdhzqqcrz08',
      rewards: '699628495945150172',
      mid_rewards: '61772095238725477904'
    },
    {
      address: 'erd1vct8ju7q557vehvkak9t5hquxnp2jh3wr4kd9clqk2nwfx74kkhsf2w70f',
      rewards: '102485505124483328',
      mid_rewards: '61730352420411032973'
    },
    {
      address: 'erd1nsf99n7d6xtl4s063yvx4amf3u5d54uren34knuhgsnha7c3rvjqu8phpj',
      rewards: '102216386567880209',
      mid_rewards: '61710053147036837047'
    },
    {
      address: 'erd1ap9w6j3hdj7u85fgt8e6ewjy3s6htmqzgwea8pstx3lcw33w6nvs6crs8j',
      rewards: '340620827611197454',
      mid_rewards: '61692599514129624054'
    },
    {
      address: 'erd10grhxxmu53gvv9wtdcf8qhhvzd32uh8t58xsm9vu86j53jepflmqka05uf',
      rewards: '340227095903471575',
      mid_rewards: '61662900827899660833'
    },
    {
      address: 'erd1kumwce9e9nmuy08rzacmfazwaqzp96v448xw7h2n7lg0ct33ts8qh5zmh0',
      rewards: '459215671746599127',
      mid_rewards: '61638059062743947092'
    },
    {
      address: 'erd1dhynyavqqswm56e4rpnrymkz7wzngcpns87fjjn2aaeda7tpu52q7tpeap',
      rewards: '219769191757609834',
      mid_rewards: '61576913011958777178'
    },
    {
      address: 'erd13q8xfwn2ts97thyvxankn7z84yr4m87vpldsnslfd09d59w8l8uqnvl8ar',
      rewards: '338343631716849445',
      mid_rewards: '61520833499294246181'
    },
    {
      address: 'erd1np34kusllfft9u55qdwvuzlghx7asfllqsjk57lg8amu739an8jsck97pk',
      rewards: '98820786094347307',
      mid_rewards: '61453927285067961360'
    },
    {
      address: 'erd1dtkxyudjy3gyyhqtfagc8cuf9plu2yy2pn7udf4j56jadmxuwh5q4uts2l',
      rewards: '694967088082670626',
      mid_rewards: '61420491121553269724'
    },
    {
      address: 'erd14rc83k7yvwhl3xgz8syrvg4zq0dv3v2z2adelqcggn555j4tjfeqshzmu0',
      rewards: '98112124062959551',
      mid_rewards: '61400473801641815668'
    },
    {
      address: 'erd1dus054wzsch2pa8y70cg870zxxauhewutslvpfhk8gf7qejd76lsxqsk4d',
      rewards: '575245060676999595',
      mid_rewards: '61390009560206612175'
    },
    {
      address: 'erd1almkk4hldej9vpw6p6xy5wz7jfpn3suz6yztzsy0jkh4f03cgpnqv7phpd',
      rewards: '336317418967663717',
      mid_rewards: '61367998826616288288'
    },
    {
      address: 'erd1yn5ufx846t9kugcgd5d6wpey9u7njq4pwd022eayl3rt4jsk4xhqfndj5x',
      rewards: '335053688257461506',
      mid_rewards: '61272677212672019157'
    },
    {
      address: 'erd1fwmwjakgwneys3xey5y0hpza8r05dyhhddd8k7cjmq04v4fz53xq4vsmp8',
      rewards: '215533462650788122',
      mid_rewards: '61257417306557776368'
    },
    {
      address: 'erd1fx48r0uqsqszenfgsqgjlqau3nq7f7zm8wrmtlvz5mp0pw40jm0s7ugl7m',
      rewards: '96017090105322959',
      mid_rewards: '61242448031991875798'
    },
    {
      address: 'erd1gug62gw7knr34t6t7vcgtwtp77mdlfp23kg7re23u6dxx0v073gqdx32we',
      rewards: '334511589453985876',
      mid_rewards: '61231787383496081943'
    },
    {
      address: 'erd143d8pms02w3ee6v3urxpyvx97khcxuhcmsmhhkd6y2j0xtn5aw7stkrxkj',
      rewards: '572904988342376672',
      mid_rewards: '61213500854766590990'
    },
    {
      address: 'erd1cw3ez6u9v5sfpaqxwz97l50dcps0rtlaln93sh3e46k2jurfuy9stfuwsj',
      rewards: '94955348041345343',
      mid_rewards: '61162362166930741400'
    },
    {
      address: 'erd12gnp6yjlee9xhntj4s7fw206jmjtgysech9dxmm4r6zxzh64z5uqvguawe',
      rewards: '452502253994004755',
      mid_rewards: '61131674427082915259'
    },
    {
      address: 'erd1cy82asu68j7vktm3hlxmgtwcz9tx2km9xrzhjl5sfrkc3l507t3qrvf9sl',
      rewards: '452494044507707274',
      mid_rewards: '61131055195883410710'
    },
    {
      address: 'erd1hc58z50xk605c5dt9zlkpxzgjvwzrttkvcq7348zql7eq2ygy04sqstal9',
      rewards: '93826401199555035',
      mid_rewards: '61077207130222392092'
    },
    {
      address: 'erd1suxlxfhg0n38ha3vjwl4rz50hln4rzl0l8cwjw5mwt5m2mjf84zsd39wy6',
      rewards: '332037587539502298',
      mid_rewards: '61045176538728329492'
    },
    {
      address: 'erd1jfpfft44msltqutnvl4pdgfg2wtzvgjy4x50auvqn4fum8mx230sfkz8au',
      rewards: '93066516093860315',
      mid_rewards: '61019889954892022791'
    },
    {
      address: 'erd1zkxcq6h4pz6jk0vdmmn0u004d6d4epqdmdgyjw50s4ple8l5s3eqql2ayv',
      rewards: '211512874396385908',
      mid_rewards: '60954149404368656772'
    },
    {
      address: 'erd1m8ecy6vfdw3cm37e87rd46url5qu32ux79m7namct0jgyvakdsssuqg6vc',
      rewards: '330797973648212610',
      mid_rewards: '60951674026024051216'
    },
    {
      address: 'erd1q43nrwma6q392xqc0l782gxud5uencqm9j9u00x7d6fwpun0q43q7wgm5p',
      rewards: '210801784627098129',
      mid_rewards: '60900512799734016563'
    },
    {
      address: 'erd1lg9t9n6s6n879sysjlqppukkj99mykfjwv43amjle54tkfcsfqnsu7l7sp',
      rewards: '210693261857047005',
      mid_rewards: '60892327064032997880'
    },
    {
      address: 'erd1ck0y2ckz6nf8eal0jp48dznuceq2as8pwcl2y0velksjzttm7n9qf2seqh',
      rewards: '448575943318847664',
      mid_rewards: '60835517763815073349'
    },
    {
      address: 'erd1mg4ft233vxuqh5s6lvdvphx6ts47pac8usyscyanmulgv0f6zq9qdxts24',
      rewards: '90337000978782851',
      mid_rewards: '60814006071597907569'
    },
    {
      address: 'erd1tfxgxl3pdjw2l9v0wy4zfllr4s22rqv92n26yx67vwucasq0hfhqpqhg4m',
      rewards: '447882103428763996',
      mid_rewards: '60783182295817222192'
    },
    {
      address: 'erd18ta8dxmwdahq28kntq4ev3nq5frfae2tagzlvqrk6y2c7zwsgrcqhpaytn',
      rewards: '684843295490712975',
      mid_rewards: '60656866212138806259'
    },
    {
      address: 'erd1clamr8f0vv9zjy0j06mkz8ll7ygtepjwtvp3r3j7ktdncwasnvmsvrxdmn',
      rewards: '325948251039835767',
      mid_rewards: '60585865565028020784'
    },
    {
      address: 'erd105nntg24css2qnjpnl2rrxpe7dsxjg6553te3fd39l5neqy9vumstkj8au',
      rewards: '206537963149159491',
      mid_rewards: '60578898122203298119'
    },
    {
      address: 'erd10rr788vclv3sqjn669788mdk028le3ll8nyc6k396gevnlwwu5lse7784q',
      rewards: '563636297042834387',
      mid_rewards: '60514375157582097514'
    },
    {
      address: 'erd1z69equn06zs9gkd97wwujgtdday7l7d840jrh7qg55vpek7lkvfs6ssd0v',
      rewards: '324874637277709458',
      mid_rewards: '60504884232745383527'
    },
    {
      address: 'erd1pdam54de3tdcxc8yxhnf0vhr4948m22smv5g4de45hjc0uaj6q4qh52ev6',
      rewards: '85540471085863118',
      mid_rewards: '60452209870054398215'
    },
    {
      address: 'erd1vtayn8namdhg9kmw74ef7txpf6vp3rfv5jn4s2wxm6cuwzwu5qhqw38823',
      rewards: '681838098749580393',
      mid_rewards: '60430188011417563319'
    },
    {
      address: 'erd17ar7p4t6a3m30h8luxwaszx2kel43m7n4l7tacnwtqdv004z6dnsntmtu9',
      rewards: '443128302861191171',
      mid_rewards: '60424609113404240503'
    },
    {
      address: 'erd1sypenzth07nvr7qtw2vqz9u6vwsrpc39q2336e77f6uljh0kasss5ytx02',
      rewards: '204452686838925471',
      mid_rewards: '60421608359592835386'
    },
    {
      address: 'erd17kc3h3umeat3f4vdvdrgzhufvae0wsg47a53qr0n4l4hw2sv73vq27tjjz',
      rewards: '562402741140970986',
      mid_rewards: '60421329591381302242'
    },
    {
      address: 'erd1dtnppjgqvm0pj9073g6fk83gzn0tas3pn2ev0ca6qchzvz4hef4ql5e55h',
      rewards: '442261092505512663',
      mid_rewards: '60359196529801495012'
    },
    {
      address: 'erd1rcllkhsay0yl49n05qvzaq2t8fnz26kfjqely79g6hjcg0r580cql3gv4n',
      rewards: '441895023755028278',
      mid_rewards: '60331584425554103525'
    },
    {
      address: 'erd1x3733n02g4hu7wtnfm0vpa6pmh64q6xpxu9c29trlu6kl5ha2zyqwevm78',
      rewards: '441855525118700978',
      mid_rewards: '60328605093222523547'
    },
    {
      address: 'erd1p79uv0qgm0pfzc2ht5tdd75jes2ul9d2j8u732rmzuds5tkgxmkq7uuzk9',
      rewards: '203123397196530979',
      mid_rewards: '60321341718061137294'
    },
    {
      address: 'erd1aqa6jgtcwhhr8wdfykkmsjqhpe3ee8hjw0xkx0chk7tglnefjmjs7swr88',
      rewards: '561038291842748443',
      mid_rewards: '60318410901345759074'
    },
    {
      address: 'erd1p2mhkuxkxwe06rkfl9uy6n2u9y0hqky7mx6f238c4kdf4jtxg6jszz2msv',
      rewards: '322339596318933440',
      mid_rewards: '60313669289835044900'
    },
    {
      address: 'erd1g7gxtw38ml87x3jnrqgyugkzu83dt5l2uu73f6skxlskl2nh82zs9qngu6',
      rewards: '560311967951755105',
      mid_rewards: '60263625206120636223'
    },
    {
      address: 'erd19c590943u2zrvyan4td6lnlpre3rcn7juhmr54475tyrkexlh6gqhhyu6p',
      rewards: '80319087258054778',
      mid_rewards: '60058367471930230189'
    },
    {
      address: 'erd1njx9d7u7fxzzuet8fvjgjr6dc0mclvefal4mamd85cem65ek60kqlt7k5f',
      rewards: '557196758081515675',
      mid_rewards: '60028648853794099126'
    },
    {
      address: 'erd14jry003649w94djx8ypkmsul3kdphm00dv90y00fjexv4jt23etqsnpdv7',
      rewards: '198309915146705226',
      mid_rewards: '59958266836698365060'
    },
    {
      address: 'erd1p03z938u0wckm25st5keys0nyz7rawy9955h90ch456xgx33vn6ql9g70n',
      rewards: '197593299443063407',
      mid_rewards: '59904213417803436050'
    },
    {
      address: 'erd1qxsaypam5jzlcnxsvc8f7k9u89yarkg7es4w6n9lg6zu5t5m7plq0metrp',
      rewards: '78216556997818615',
      mid_rewards: '59899776265627816003'
    },
    {
      address: 'erd1rn0avzztrjzvu0lthk4zlmah48f40lvta8lfky37mqdrx2xw444s5mefg5',
      rewards: '316169487205745847',
      mid_rewards: '59848265739748670256'
    },
    {
      address: 'erd1z9jruv65guz0vysackm7c3058x3kgn20trzvksvs2cu78t3erfgsyslh5z',
      rewards: '196790954738183636',
      mid_rewards: '59843693568446811409'
    },
    {
      address: 'erd1yxkafagkvmq5f2ehat0kcdfafuyrd3el0x3wzqp58e02aqtd3r5qsqeewf',
      rewards: '75732645580490304',
      mid_rewards: '59712417959556069341'
    },
    {
      address: 'erd1hts82vqvhhd6hd47x8e7wagcl98r86s7wcy2r2zmw2dgqsl9yyts46ep0h',
      rewards: '553003432874386531',
      mid_rewards: '59712351621076871042'
    },
    {
      address: 'erd1yannn7dyyv84chxqew5uq73txy6agf3vuczl29vh4temaw4ryhrqwhhvqy',
      rewards: '75457666772545160',
      mid_rewards: '59691676654812744537'
    },
    {
      address: 'erd1rqs6wus36465sap5ndnn0d2cuyunzyh9y0al36wrsevpdc7nkr5qqs6grk',
      rewards: '671256967633838342',
      mid_rewards: '59632066633844117664'
    },
    {
      address: 'erd14p9fn89l8xys6g6qu3jd4hryhhanuukg303esx6yflwa2zvhgaxshqwugq',
      rewards: '551432664291143850',
      mid_rewards: '59593870527534650146'
    },
    {
      address: 'erd1kf37uljcfy9x50ntltqhdxf30fn2egekltjevfu709d6lgcxnqtsmhchgg',
      rewards: '73377117649764975',
      mid_rewards: '59534743457991083875'
    },
    {
      address: 'erd1zugrgvqzekk5zyd8tnnhq9yusl7r4xa0u9p0wd7dge3g2y6teh8q7zm5rv',
      rewards: '192050781668275812',
      mid_rewards: '59486148290998837495'
    },
    {
      address: 'erd1dgldaxlz8h9vdmfhp2gwf40hd28vydk5ag8sc4dk6d6gjhp2zmlqcqm0ca',
      rewards: '310997364321607086',
      mid_rewards: '59458139032488935400'
    },
    {
      address: 'erd1cmggy6v86qpudtx9xtl9rj7kszwf0ad9hnw6tqr0c0a0nxthgphq39smen',
      rewards: '310433764168109075',
      mid_rewards: '59415627383593363411'
    },
    {
      address: 'erd12emwnxml9u0prwn9nxhz0p8f6rc35skczrlcxrsq9r66e69c39lsfd0tq6',
      rewards: '189712677213559238',
      mid_rewards: '59309788020258715047'
    },
    {
      address: 'erd1uatsryrf7z09hql097zn9qkkxamrytz6s92t0ej469uphf00kqcsxqy9kn',
      rewards: '428256095837302407',
      mid_rewards: '59302817290996495206'
    },
    {
      address: 'erd1t0txtvwv6an837txh680t87787n6hhffczj0em9fnuuwpy6upwvq9me20z',
      rewards: '70101693392532259',
      mid_rewards: '59287682336479149623'
    },
    {
      address: 'erd14pc0tuu9g32sflrcr33v29kjl66evrn789f9905tk86sd78rrqjqywfx7k',
      rewards: '189095069122755963',
      mid_rewards: '59263202620754585870'
    },
    {
      address: 'erd19kwrxa40cr0v3e2athxv5tuen9q99d0nwz82500g2gvp22aq2y8qusx4fg',
      rewards: '188922344872892425',
      mid_rewards: '59250174248387445113'
    },
    {
      address: 'erd1zvkd2qq6wxljtk3307djsuwc9gc58s9lcsw8a3n6nj2zp6hrr7yq85jcy7',
      rewards: '666009713121202149',
      mid_rewards: '59236272842585537424'
    },
    {
      address: 'erd1aewx29ytwyp9jnw6xjhs9lfqfdydp5kw4wmvssnze4vzta9e6jps5r7vm3',
      rewards: '188298934451102071',
      mid_rewards: '59203151186373524815'
    },
    {
      address: 'erd10hd9uffzext23uk6urrv6286k0z05l53hfcz46epnpfvg3zsl4wskkfyp2',
      rewards: '307385722677946774',
      mid_rewards: '59185717457478744153'
    },
    {
      address: 'erd16av4fpyqr9g0y7d6z35pmh536nj3u8z94zu2z6dw8t296y734zlqndwpsc',
      rewards: '68583753168737517',
      mid_rewards: '59173186019475119967'
    },
    {
      address: 'erd1ml0q0pzj3d3seszwldy7prmlt4kd7gqlnyyfxg7map0f72cfu9aq33rzxt',
      rewards: '307018086498169308',
      mid_rewards: '59157987124016256597'
    },
    {
      address: 'erd17l7w43xqua2c5ev9rh334wpyc8etpue7evm4xwz4rf5tekdrjfpsk5w9lm',
      rewards: '663557178634131761',
      mid_rewards: '59051281258797783857'
    },
    {
      address: 'erd1tq6hk693evh9n3ca2n5hxt59krz8j4p0ztc349j0mnztgz2drm5sv2dd68',
      rewards: '186221496458910816',
      mid_rewards: '59046452658209145370'
    },
    {
      address: 'erd192s73sn4v6jk6yf6x6qhws4u5glq83jywt5vkv0qqdhg9hys76lsv5c55p',
      rewards: '663218635525780307',
      mid_rewards: '59025745379027475405'
    },
    {
      address: 'erd1aa4lnk5pcmmlx6jjl39kz5qretpq6csppv8ejuegyuzzeaga8g0q6a6mgu',
      rewards: '66034230209423683',
      mid_rewards: '58980878717525579461'
    },
    {
      address: 'erd1vasvdjd35azjkktfrpe6xesw08sdglrv4jda47cm5nsd0tkq9ezs3tl30d',
      rewards: '185200506698711461',
      mid_rewards: '58969440688034580121'
    },
    {
      address: 'erd15u4jp3pnptfy8svydwd5upe90q7pugtr5r3ldknhjsamc4dnlp2qq5zk8g',
      rewards: '65631724849417459',
      mid_rewards: '58950518245767420536'
    },
    {
      address: 'erd12953599htuz66tmwtpqa8cej4wqx4x4vykyf73k32zv28mh6muxqxweydf',
      rewards: '423525120785359484',
      mid_rewards: '58945965808445190735'
    },
    {
      address: 'erd1z3uhz5anyxmdere7q0wqtxk9568ued8s5xwqj253cqzu50y0jjlqc9dw8t',
      rewards: '184407141245345680',
      mid_rewards: '58909598132297090598'
    },
    {
      address: 'erd1t8xrwxcwmqr2dqztncnj44rxtv60ckwkfp4vf48p050g6k2y7kwqzuvnkg',
      rewards: '303603499446633041',
      mid_rewards: '58900429128410088898'
    },
    {
      address: 'erd1dmcfgrz3l205y3vjlmu82cpgfsf252s2mdvy267wtt8vq482gpfs4v0llh',
      rewards: '184022536009662735',
      mid_rewards: '58880587844345120098'
    },
    {
      address: 'erd132yvhu0etgaq8pr47w2gnv379dh49g0870ls9jwzm9cuwmwm5u2qal2nv9',
      rewards: '183427987094160237',
      mid_rewards: '58835741769357004447'
    },
    {
      address: 'erd1szymcu38a2ltstzjthtv9z3sgrhr0snylq8wuc5k8pgzf2egah3sy7x2vd',
      rewards: '63865070249741548',
      mid_rewards: '58817261717011995591'
    },
    {
      address: 'erd1mf2f5j76jq4sxxln2kx9pmhscuhp6ywe8eghnzn950t6mlc2qcvsqqw4tj',
      rewards: '421439836573654091',
      mid_rewards: '58788675449836705853'
    },
    {
      address: 'erd1aj0zqrakxjga4ajyd68vh7a6puawxh8sy3046z729h2079ajmc7qfckkl6',
      rewards: '420866845772849371',
      mid_rewards: '58745455476256111630'
    },
    {
      address: 'erd12ppttv4mzz83kvtpdxdz8dpaazr9y2arazzj3c60qmrux97vfu5qzyflte',
      rewards: '539867065546590276',
      mid_rewards: '58721491998103918040'
    },
    {
      address: 'erd15ykn6nhtuk7ugu7njrqpmgwk2ezq8nr5rsvrkzpmqp5a48dl22cspyynr5',
      rewards: '61917921187647572',
      mid_rewards: '58670390718554445429'
    },
    {
      address: 'erd1zkq2law38wkw7x06edgm26vajnw83xu8s0yssw0w9qrr4xhu8v9qfx9wm3',
      rewards: '299972810664484019',
      mid_rewards: '58626570851761561010'
    },
    {
      address: 'erd1csz0lnnjxrve8ys9daaamkusgm45q5nhrhelvymg5v5zcky6kzssqxcvk9',
      rewards: '418462728230021582',
      mid_rewards: '58564115921520271936'
    },
    {
      address: 'erd1rlgwzqgwr42z6xsncl07v2f0gh29jnu7vd3k3wn8nfnw4zlt3srqqt3tls',
      rewards: '59815907612871148',
      mid_rewards: '58511838485184734586'
    },
    {
      address: 'erd1j780ukjyynka96ye35ldzfqc7egqfhasdtndr0wy7v5r2t2h4sxqzkhw0a',
      rewards: '297870144206051235',
      mid_rewards: '58467969372200917517'
    },
    {
      address: 'erd12358377adj4lc2svwes4kx5ftpmddan5uk5cq7a0h59wdh9ptqrspyy9wk',
      rewards: '416767251140649938',
      mid_rewards: '58436228222614405637'
    },
    {
      address: 'erd1leus8j7ny0953464rjjemej2cxfuth690nd6d5dk4xc68ghcx6tqrek7fz',
      rewards: '535958978880762349',
      mid_rewards: '58426709948879849244'
    },
    {
      address: 'erd13n0n5z62vcghmtzfx8xp8k0wda0fmy5mvs7vhg0ufd7pgykm7emsqnyzq4',
      rewards: '57515716084810956',
      mid_rewards: '58338337938695246807'
    },
    {
      address: 'erd12dhxs5j2zq7sm68dd42n7vs0vkl0d30gmtvypllpzkykkjmdfgcqkjx9mj',
      rewards: '176814195303800611',
      mid_rewards: '58336871794402008037'
    },
    {
      address: 'erd1kfm0pmtva2n7n8lkyjey75zkn5jeen67eq900ky79t30wlmgc3hq403gsx',
      rewards: '534708087033494794',
      mid_rewards: '58332356754177322557'
    },
    {
      address: 'erd1yqrl6ha46fp7gtu3h4lquggupv0vhxk3jkrprmzer4h743maa2aqu9ldak',
      rewards: '534657898435040039',
      mid_rewards: '58328571091482188246'
    },
    {
      address: 'erd1520sz58v9mhlg8650kmq9s0ygryc7h6lpdx8zf3ygdljw7vgax2se4qhyd',
      rewards: '56995790248236727',
      mid_rewards: '58299120588453240232'
    },
    {
      address: 'erd1d5m8wnfte6avfg9eajjsr4zdz5uvk3lxj3765qc28903ps6ap6as0ak0an',
      rewards: '174122693672932205',
      mid_rewards: '58133855220287925796'
    },
    {
      address: 'erd1cn23htnf2elukcl6820zjvu4xzcg7syfylu77zd4xvtct68huesq04ptmp',
      rewards: '412499382522252534',
      mid_rewards: '58114308274382204442'
    },
    {
      address: 'erd1tuskrdkylcjlasqcvl965qjzggpcgjqmnnk54zjlpvwg75wzx7nq9ur75m',
      rewards: '173800097020890929',
      mid_rewards: '58109522161609093959'
    },
    {
      address: 'erd1rk8hgfv480mqd6hgdrz4laj0ae3c5e9s4hru784t3z7scx425r0sghd72d',
      rewards: '53639252062858788',
      mid_rewards: '58045941145623527019'
    },
    {
      address: 'erd1k6wcfczeradtxjlqdlx4t3tx985yfe8pztf98yh3eg4yf2pzfdcqupjpn8',
      rewards: '172898310555754914',
      mid_rewards: '58041501545669399165'
    },
    {
      address: 'erd1yth63v394u993rtm3arj6qlkv6jykn2f2fvmcrtf20h6mruawcqqka9mpl',
      rewards: '172801379679486627',
      mid_rewards: '58034190171899391683'
    },
    {
      address: 'erd1caygwv4xjmadwl333jrzg7q7vsfaz0sftxxpw8zxd7rd8cmpehpssp4htn',
      rewards: '172336432801614718',
      mid_rewards: '57999119815185493557'
    },
    {
      address: 'erd14lglfga2y8wj9kvy7rq6mncdhqqumcdqz0kwq33a2qed80vvhj0snfzdf9',
      rewards: '171753921861073952',
      mid_rewards: '57955181749469218254'
    },
    {
      address: 'erd1d929ywwuxkwhxpyxmgcm5ls09xc6e07ml83yyk343729ln7gq0qsdg0fqz',
      rewards: '170051489350379396',
      mid_rewards: '57826769411903541063'
    },
    {
      address: 'erd16qdkldzpem7cnpz3xh6vmw7gql2gvjal3zlavkl7eakmysg7j86qtu9n6t',
      rewards: '50625278263099295',
      mid_rewards: '57818600902437662202'
    },
    {
      address: 'erd19d7w8g4s7q0gtp62m4r69puzc9he0zcpjzr320pkcdvegpp7fqzqwpnsyh',
      rewards: '646209083142728449',
      mid_rewards: '57742736291306046474'
    },
    {
      address: 'erd1cszqm02q8y5657jkr4sg6xj5jcpe3gq09p0etgs98fyer3jfm9sqxp7faq',
      rewards: '287820757517845784',
      mid_rewards: '57709956806282883586'
    },
    {
      address: 'erd15pgr267xw02x30nvfj826ugqzal5st6qec8crhdv7e0f89q7333svep77w',
      rewards: '405373080653903599',
      mid_rewards: '57576780310504214220'
    },
    {
      address: 'erd1tvwa6u39w9pxhxm0mhay6sd04a47e704z3kn00queak6h3k8e0dsm9vhmt',
      rewards: '286045201339059043',
      mid_rewards: '57576028842639751326'
    },
    {
      address: 'erd1pur44m2gh5qqt2h9f4jycml26vrp6809ljj3r549ssjgf6nrsrdqd74yr8',
      rewards: '405316517658323269',
      mid_rewards: '57572513835071820170'
    },
    {
      address: 'erd1uvdq5xz3zfumdqmek04pznwtj2d606svm5cmhu66gqm36fkqy7ksaym8xl',
      rewards: '285875993416767638',
      mid_rewards: '57563265702427393623'
    },
    {
      address: 'erd1h5efg20pxaypecmcv69x4e7hwkllh0s60pah4hjcde8ys9h7vm2q7hwnqy',
      rewards: '285288255662904250',
      mid_rewards: '57518933384773046787'
    },
    {
      address: 'erd1x7z2nykdmytgpatenkg6qftu4cepp7547yvqk2srgeng23s4qykqr74cum',
      rewards: '404529796518991943',
      mid_rewards: '57513172451563670130'
    },
    {
      address: 'erd1egazam07783v3j6rcm49vgp62fvrxd03hlsqk9dknqzpgsdyd5xqq3u80f',
      rewards: '404399851482933327',
      mid_rewards: '57503370861350537194'
    },
    {
      address: 'erd19p9sk7ct69nqjt8jys6ymfmw7gggsa3qkkefsy5p5s7gsmvdfelszdhjql',
      rewards: '642393376827324543',
      mid_rewards: '57454922375425627921'
    },
    {
      address: 'erd1n03snal64hnuekykxrnnhy40p3x7nfkskupsx79qm4vvjngrlusscwthu7',
      rewards: '401387685695722498',
      mid_rewards: '57276166994271368847'
    },
    {
      address: 'erd1zqk8em3v6fs2f6ewqld6kws969q5azfwqkwq9dycru9pe226y39s0k40jv',
      rewards: '401149155023010031',
      mid_rewards: '57258174926408646419'
    },
    {
      address: 'erd1s5rpx5y0rpncldpmqhxvsvkryu24gwtwez7kv9jg6jup838denxqmn676u',
      rewards: '638541010633339082',
      mid_rewards: '57164343251130803097'
    },
    {
      address: 'erd1lkafcvgtqad2aq0g8dgk5rf749t8rudkpstksgssza3pze93c5msd5g4yd',
      rewards: '161087857831085046',
      mid_rewards: '57150653989271973746'
    },
    {
      address: 'erd15uh9tw4fse3s0jkf3as8h6du28w48mlxzfj9m8zndzn9yxamhpqqdkqds9',
      rewards: '278580347893093291',
      mid_rewards: '57012964360165445809'
    },
    {
      address: 'erd19ucun0nltsxlh4dzx9gpjnh3d0ep93ww8fysh599lkqusgvxd54szqr4mn',
      rewards: '397002248508910612',
      mid_rewards: '56945378997174079591'
    },
    {
      address: 'erd13a7zcjymwtvv2pxh8lq4h6q7ly7dve6jeyursugfhrhz0u7j8l2q4vc7lk',
      rewards: '396122013037274910',
      mid_rewards: '56878983945498961055'
    },
    {
      address: 'erd1nk9qnh5tjv2qsazzsg06x3tmg45ql6pg5zrm0s33wcttzg4h6s9s4wpktj',
      rewards: '515156926322538601',
      mid_rewards: '56857637355173460302'
    },
    {
      address: 'erd1vfpkmcafk7cllwe32fngrlc9zu3j2dzd4wuvewc84vx7cyt9em2q9uk03k',
      rewards: '514568080680469999',
      mid_rewards: '56813221470908807762'
    },
    {
      address: 'erd1llpl7aw32xw8an85p4k94v237sur8rpyhun4r3nx7tal5w0u9s6qy3da6e',
      rewards: '275022698427526453',
      mid_rewards: '56744615347066338322'
    },
    {
      address: 'erd1wedak94lesncuzl9tqcv4eqpgwr2n9gh0lnljfww6ef7zjnauthschyuez',
      rewards: '274071798963399632',
      mid_rewards: '56672890199542776431'
    },
    {
      address: 'erd1a657yt9rqsgntamxtr204z7h39v8ldy7tect9xs9tm7r0tdq8xwsvyepp2',
      rewards: '392687671003106285',
      mid_rewards: '56619935856463271446'
    },
    {
      address: 'erd1mu6gcrk0chq7fvj7m0ezka3gej3sw50n8cuxjjfqr7kgayjzh07qu3q0nr',
      rewards: '271455912224655678',
      mid_rewards: '56475577161393544843'
    },
    {
      address: 'erd1xf9uyzkh2rwvxpyj7rjrey599qdp2v50jg6zc3y07dguu0gph5jqc3efd4',
      rewards: '390570580195973141',
      mid_rewards: '56460246366468828154'
    },
    {
      address: 'erd18dxkz85k9dxwr8mzteqz26xswd36fza5cp5leu0wd4ajreed7hcs4ts6yk',
      rewards: '151890590470772642',
      mid_rewards: '56456915709760158543'
    },
    {
      address: 'erd19fj2res2y7sdvghajcj0xdswy8vchmeqpwptxg6urtx54yvavngq58upjs',
      rewards: '151492997622060782',
      mid_rewards: '56426925782534405021'
    },
    {
      address: 'erd1tj9e3f3c7yf5pwtx59v6ecvpulems32tfwmur94u5lg397zc5kzquz03zf',
      rewards: '151187561033302364',
      mid_rewards: '56403887085790677289'
    },
    {
      address: 'erd1etl8a5ctulkcyypfddsd5fvkpqmr0dsu648eaem2x4927awccnvqw9k4ty',
      rewards: '628146004019948999',
      mid_rewards: '56380261010072386532'
    },
    {
      address: 'erd1m26lz4yswdfth8r4kwj34tnuz7rzvh23pee84mc88x8vx5scemeqxtuumk',
      rewards: '269734436760214140',
      mid_rewards: '56345728437839322720'
    },
    {
      address: 'erd19n8uvahn0tr0mcs4evv2l3f29eraffrxc2gfvjs9xg54pdny0snsues60k',
      rewards: '148398515378779563',
      mid_rewards: '56193512888972413787'
    },
    {
      address: 'erd1k584k4zpn8q0pzmspucdxv3wwtnhte7kmfj8hkh2cdasuyruxjss4phmsy',
      rewards: '267130853040660180',
      mid_rewards: '56149343400913856511'
    },
    {
      address: 'erd1q2snl4dpsl7xwhcvdpurv8dxaqarj829h7dvjwq2953zjn85ya9qdz2823',
      rewards: '501920726239551058',
      mid_rewards: '55859247473362519590'
    },
    {
      address: 'erd1ar6u6f7v9yz2vx339xlsrpc089x289gsswkj34pfdp2ua2473hdqcuug07',
      rewards: '262004417093875138',
      mid_rewards: '55762662801728863599'
    },
    {
      address: 'erd100rn02d3trg4n6e06ujyu0f3m55j2pphm8tjw4wcg5pk77zan4wspnfjhp',
      rewards: '261989636102259521',
      mid_rewards: '55761547890169681916'
    },
    {
      address: 'erd1pgtgw2p6sxyqnyrwyws4jvat5y2adffcfj7zvt527te60wylmktq00s4x7',
      rewards: '381091241546051779',
      mid_rewards: '55745231805265191971'
    },
    {
      address: 'erd1tn39uamck2j6e96y8d52fwl65w0qu2puaymvrcpx7khgpj4xdxaq3zelyk',
      rewards: '142019169709331181',
      mid_rewards: '55712326889288270096'
    },
    {
      address: 'erd145c8rs4nxdnq5vmcs2vhwtnh32cf3vczq5w2ypcjuqm0k0x4stksz2rq53',
      rewards: '260567294208655096',
      mid_rewards: '55654262434665298851'
    },
    {
      address: 'erd17rz6rh5tz786efycy3c8apuk2gj90dr8czwwahuulcu6zlmlj8dst9zuq9',
      rewards: '497666366379490099',
      mid_rewards: '55538346473737499900'
    },
    {
      address: 'erd1p50ar3jj7dp5prvm6hwnnn99wxd3s0lsf3m4w3uku2zmnfm29uysfaa527',
      rewards: '258804952147875849',
      mid_rewards: '55521331195280867884'
    },
    {
      address: 'erd15sadt3qtv8zwkt7lkk0t2cfnjltk2ataac0gjm3k4r9urrq5q5psl9rs84',
      rewards: '258097938375449303',
      mid_rewards: '55468002037949761459'
    },
    {
      address: 'erd16n5yc0p0h3urz9ahpl092n8yww9dlpvn9jtd9t22m50ez4r77cgqnhznld',
      rewards: '256530907038449893',
      mid_rewards: '55349802840179115779'
    },
    {
      address: 'erd1k3ce5ys0ylas2d2f6jq4zn97h6xuu47xxwy7mms6y8y4slm7rtdqsa5cka',
      rewards: '494450377643090139',
      mid_rewards: '55295768498615582546'
    },
    {
      address: 'erd1p772ulvr92fs4hr57wr8dfgxkqxafq4xe0duysd5xwsgtaszqa9q0jzzj8',
      rewards: '613145143967638510',
      mid_rewards: '55248765051958376352'
    },
    {
      address: 'erd1nu526scf45el4zfztpxjmjsekjrgdtcq27l48l3jkaacl0ecrhmqcf3hmx',
      rewards: '254448735116292338',
      mid_rewards: '55192747237646721133'
    },
    {
      address: 'erd1dunyt99auvhu9nnhqv4rz30pptsgvfn7phg40j8uyq2dwz76uwjsjmnrhr',
      rewards: '134383453983917915',
      mid_rewards: '55136374480527416016'
    },
    {
      address: 'erd19e0aqncxfh4nw7u5e2pj4thedu3qxyfycpm5k99df2u2f75azrzs97htnw',
      rewards: '134203399485066432',
      mid_rewards: '55122793196722337300'
    },
    {
      address: 'erd1vpcyfjk5m497hh5m5s3plrpkn2mt457l6zjfdgwn38a6fhclgtwsxw92rs',
      rewards: '252413504780800266',
      mid_rewards: '55039232379804579876'
    },
    {
      address: 'erd1yh4udsg4qlyujavlgey2xhctxsryaet8cmwya2hdxyza438j9p5qkequ30',
      rewards: '131743818526511651',
      mid_rewards: '54937270106475903834'
    },
    {
      address: 'erd1fqjsfqqfrwg5r0wlr0uwecc94v6qq7ldtzt37s7v74f7rf8sge2sdu4lv5',
      rewards: '608471514617449815',
      mid_rewards: '54896239083379194195'
    },
    {
      address: 'erd1p96gjmm0d88xqa96562nk0lled92tkywpcaj7wh6z4n90a3wzztsh3qd4q',
      rewards: '487997062799411544',
      mid_rewards: '54809003097392150055'
    },
    {
      address: 'erd1waej5ddwlph9sc2gfwpy34hedd2r8d2dhd9c46wqvafczeqeay2srzq9ds',
      rewards: '128759268456351980',
      mid_rewards: '54712149258111318632'
    },
    {
      address: 'erd1hkt3ulf0nqege66jz0xzwzeh3az8anl3ctqk7kz29mkxd58sxa2slluegq',
      rewards: '246426695489627746',
      mid_rewards: '54587654904157258983'
    },
    {
      address: 'erd1sujx0ddy9pp9r684hkwduzgytwmqyf9la8wjrkegrsddprr92tnqhnpucy',
      rewards: '126814410484641487',
      mid_rewards: '54565451073712398768'
    },
    {
      address: 'erd1yfanrrlmck4r0ffmy0j8w9803f6dny9p7vxdfpkljnelemt5zcsqqxux55',
      rewards: '126745388416754439',
      mid_rewards: '54560244826166423119'
    },
    {
      address: 'erd1nfd0cn9f2pm5ssxjsmneacuux2a4lsq4m8xhncd2x8gk3v48rcps3p77l6',
      rewards: '245464744158299226',
      mid_rewards: '54515096128226743910'
    },
    {
      address: 'erd1jfguwz827fnkmuge4ewq4n28kefgwvxkzk9k8qxlmctaj6kupm4smpcexw',
      rewards: '124492688314638289',
      mid_rewards: '54390326498050639699'
    },
    {
      address: 'erd19r0uune6x8mjd44gyf2p2uvhn9h5zgyaxa4yn0eer3790cdxghhs97lhq0',
      rewards: '124423810558746190',
      mid_rewards: '54385131135776469983'
    },
    {
      address: 'erd1hgaw4ql9893kh0pxwvx254s6ahe74lswdc2dh770lwv3tv94flts4u3pyj',
      rewards: '124234170932104030',
      mid_rewards: '54370826857868697346'
    },
    {
      address: 'erd19rfval6z2ypnh35lqvq5e4ff2ktx8ec7dhvngq2qj649nnde9rzscycvtt',
      rewards: '123682125522561360',
      mid_rewards: '54329186768739493347'
    },
    {
      address: 'erd15h4ucsz8jdaqyrmwkqakz03q8550gxkgw38k4vxkxh5luh7m2z7qcqlh00',
      rewards: '481348201128688601',
      mid_rewards: '54307487845583409303'
    },
    {
      address: 'erd10sucj3shjavx8s3p0sdxalmw5r9wxmnzpnhwaalgz0mlp7damvpq7ld8fc',
      rewards: '123117558713471261',
      mid_rewards: '54286602206231533687'
    },
    {
      address: 'erd18reqrcdyceretdwd27cpkjr5zd5758zj8ned4lw0gm33pxzfxa7qd8yrc9',
      rewards: '480932051667688737',
      mid_rewards: '54276098216492099659'
    },
    {
      address: 'erd14quy9v2l4uyhen8qw5v3uwjxsjvv8gpluqlv2ewhjws6rzvacgusz9tpth',
      rewards: '480530996850381862',
      mid_rewards: '54245847157340662066'
    },
    {
      address: 'erd1pfnrzzjx5dldq40yczw0cdrh92vvtcsrhudhzawytdc9ar6v3zcq07e0cp',
      rewards: '119776795439827562',
      mid_rewards: '54034612645102246619'
    },
    {
      address: 'erd1lz5ckzawuddkd9p5smzcrhdqddusjxa886ha64vy0l26yfz0wgns8jd8rt',
      rewards: '477513895057537781',
      mid_rewards: '54018270973580731646'
    },
    {
      address: 'erd1huu55yxwqg8pedmqpzk6k3fmdvc5e90pq4v8adt2tsryshzwcktqjz4y6p',
      rewards: '238477402778121070',
      mid_rewards: '53988049778746494070'
    },
    {
      address: 'erd15a9fckwmevmr9593h0s5cal59esq5tnprl2s8kg7hae9kqcdhelqrpt5pn',
      rewards: '119085315147771346',
      mid_rewards: '53982455158608224270'
    },
    {
      address: 'erd1uu0x87lzz9adwwxua5n8pvmdjj0gkgu0r0t6gsj0h58npvk5sahq528uxc',
      rewards: '118590429256490921',
      mid_rewards: '53945126539865114071'
    },
    {
      address: 'erd1w7x29z9zqlpnt5af52rjw4kxhrvmwmk4w45pgk26j7s2w3wvmjfqewv0w6',
      rewards: '237434999293264019',
      mid_rewards: '53909422598323059295'
    },
    {
      address: 'erd1w3gu27raz45gm85ue4wcx2g0rlayshlwxhuphpflwenjm0py4nyq9pne2s',
      rewards: '117293017100903329',
      mid_rewards: '53847264376966711709'
    },
    {
      address: 'erd1sjuqhmq8zedg8p2t75lswctt55vtxkl40cs73d2c67lqtvttgg4smmnccc',
      rewards: '594406792548550710',
      mid_rewards: '53835354832912162145'
    },
    {
      address: 'erd1eq59jqutekxsn20z7w6tnmlg9tryh5nx9t3dtks652eahnsvyzpsczaq6p',
      rewards: '594276558232555475',
      mid_rewards: '53825531422678183307'
    },
    {
      address: 'erd1w5fct5vt08xzr7u2tmr6ce366emj9pd5jg9cpheck0a0ewsl9vvqjr8cvj',
      rewards: '355402138019058114',
      mid_rewards: '53807535119408258836'
    },
    {
      address: 'erd15spkjr2wtmvrxq3rdpgsj8mtvcurgnu5r56z0x0fdgwmh76rm67squ4zv7',
      rewards: '474054766881729229',
      mid_rewards: '53757353297135718856'
    },
    {
      address: 'erd1k6zxenrp5p87tus9we3tgrun833d77fsf0jzr6fnqlpjcya7l3jsvwtd8j',
      rewards: '592455412560816696',
      mid_rewards: '53688164701068653451'
    },
    {
      address: 'erd1dktc7smw6w39v956xfhswm6afnl070rxjdt29swczzw8lfppt7zsw3sn53',
      rewards: '115063075180911757',
      mid_rewards: '53679062669831204435'
    },
    {
      address: 'erd1v2t476lphsdwkfchh0ntx0zu5es83kcpmazrvt3q4ul0twts53gq2k27zu',
      rewards: '472900610379135685',
      mid_rewards: '53670296727501602851'
    },
    {
      address: 'erd1tfl9m26m0dxyqcnkkra4tc92ed7zh803jxxjs8w7us08lhny5a3q0sqahk',
      rewards: '233840583140485073',
      mid_rewards: '53638300320369225385'
    },
    {
      address: 'erd1twnhngv0jrgylghmv7egu32qd29ar0hc8334kmtasjvw78rzr82qqvft37',
      rewards: '114480169323573190',
      mid_rewards: '53635094816038849166'
    },
    {
      address: 'erd1cgu6u745r6amq30qn6xu8pln72eet4wly7vs9uhwd0lszl3ty83qnf2hsu',
      rewards: '233251213186778717',
      mid_rewards: '53593844887938878211'
    },
    {
      address: 'erd1uf7rd4420kne7nx2cjze9zr3ucelgvhvu0dfpwehqjjdu4u6unwqxp6zgh',
      rewards: '113896637679143253',
      mid_rewards: '53591079759915290492'
    },
    {
      address: 'erd1856trwpz60tct5xkag7ufq379y6zfd8zqn50h467zrmmv6mfupmqnvds0e',
      rewards: '113604807292595991',
      mid_rewards: '53569067361847339931'
    },
    {
      address: 'erd1leq6n9h94f6rsfy0gyzwddkalm2t39lqfujc0mz6r7qup3l6yhwqqk55j6',
      rewards: '470801620900974244',
      mid_rewards: '53511972597926265618'
    },
    {
      address: 'erd1ky6f72x0kjeh84dwvpf7vex24u0a54dsq4p2tc3srex8hrhrvchqeeazp0',
      rewards: '590005340729034503',
      mid_rewards: '53503358872263954442'
    },
    {
      address: 'erd1kj9stukvy96auawmxru4m34nan26na3d0dpl26sf6s75lh8d7t7sxtzeun',
      rewards: '231606974174524042',
      mid_rewards: '53469822012580276107'
    },
    {
      address: 'erd1jpuxhzx0zspzvydhwk2h0jd3rv80n55scs8de7j6mgk2pzgepy4srftwpm',
      rewards: '111394653318931101',
      mid_rewards: '53402358234551251202'
    },
    {
      address: 'erd16y6xszs03wn0fcp4dh5uk5weaskzfaa36l8gepz6al89744kfw8qxr2a7p',
      rewards: '230359603498750781',
      mid_rewards: '53375734415403473038'
    },
    {
      address: 'erd1srk3kepdnegpqdmxex86pk4cce5x6h68q7c4va62smvjutffmgxs4rnya3',
      rewards: '230324899386154003',
      mid_rewards: '53373116727951136619'
    },
    {
      address: 'erd19zmuajzh08uaeqmum608sgp56ql7pdt7eq5jp76xdgt3l3vxqfvsjnm4y2',
      rewards: '110811221932499347',
      mid_rewards: '53358350740762073162'
    },
    {
      address: 'erd1dw3r9vzqms78g247ggnh22wgfegt7u70m2edw26gtdxr7z0d8kesglpxsq',
      rewards: '109994230553098033',
      mid_rewards: '53296726111215303039'
    },
    {
      address: 'erd1lknf2yxtkudvxs9nfd8sg8cuwgtk6e3kyxatug8aszghxqypej4sz2jpxt',
      rewards: '348503403329472431',
      mid_rewards: '53287172260869036724'
    },
    {
      address: 'erd1tdhwa99xmdkte82l57v4leqy30yskfml35u2qjwwq8jf9tcecr9qw4vnmj',
      rewards: '586669053031064305',
      mid_rewards: '53251706898164153712'
    },
    {
      address: 'erd1lpw2rk7lkdspf7ajd8pavgfe4pmffdkzusxg4ffwjegc0hg6uljs8vzlhp',
      rewards: '108327881289331080',
      mid_rewards: '53171035487465489630'
    },
    {
      address: 'erd1vnxr9h0y54aujygagklxdtrnl66qpquvf7ypk5zfawpe4mxcv25s8negrj',
      rewards: '107649647750817854',
      mid_rewards: '53119877186887458614'
    },
    {
      address: 'erd17ej5at08y7svlnywt4yrf4utwyczn0hjzwswl76scuxwjv6syk9qmq526g',
      rewards: '107400752887641807',
      mid_rewards: '53101103361206999709'
    },
    {
      address: 'erd1wwxthxcqjc2sgq97aqqraew3yfvvpn2ugkys3d87ez6jwzpcp30s7x847j',
      rewards: '465248763280561358',
      mid_rewards: '53093127549604384619'
    },
    {
      address: 'erd102efrqdxuxwuzdsl3ygkd9c3pfpsynwygxw8hmjuptqvete0f7ps3jajvn',
      rewards: '345806471261876377',
      mid_rewards: '53083746075760204806'
    },
    {
      address: 'erd1e3erdgss86eq37ajzmdk96dzty0tsyuhgar9swxvjwat4laty7pswdmmcj',
      rewards: '226308202112016758',
      mid_rewards: '53070142317496994958'
    },
    {
      address: 'erd1elpjg7zxenfw8hlcuprs8k2ltattj2zuxmkljz5p4fq64v3q8g9sv7q6xx',
      rewards: '106982170275889674',
      mid_rewards: '53069530202622576076'
    },
    {
      address: 'erd136357qeaym5va79wf043m4vgu0td5sqdlxm60pmx22w2adfjcfusgcp8u6',
      rewards: '225296602869141642',
      mid_rewards: '52993838662203038136'
    },
    {
      address: 'erd1320q8fzqr8g7rrn9py84p4utl408c5lplvxvr0g7s5yua4xgv7mq38awst',
      rewards: '342316560716500892',
      mid_rewards: '52820506523994397211'
    },
    {
      address: 'erd127jexc4x0u4222lhmzvugcwfufqmnc8rx6g23flufn4s33yygzaqcgfy2r',
      rewards: '103296672475056199',
      mid_rewards: '52791537750807198213'
    },
    {
      address: 'erd1d3k39fs7tyvvgz7fkc5e0cv9r2z7j8kzyjkrvf6dwalfyvswdh8s9a7zg2',
      rewards: '103252913792198746',
      mid_rewards: '52788237088537638892'
    },
    {
      address: 'erd187j69y6evc2x52te75yt3vgksstv9dj43rv5kj8qtda8tmqutd3s70td3z',
      rewards: '102508821009770053',
      mid_rewards: '52732111108237583013'
    },
    {
      address: 'erd12anjjxtpxh23ufwqqh0epujz6ys7cse2mwa0u2xzmn4vfsk6fqjshm7m82',
      rewards: '221636558448236234',
      mid_rewards: '52717766126739690511'
    },
    {
      address: 'erd14shu87pjvvata7f7qh0qukudnzh6e2jtshzw3p8yf25e8vse9wtqnarf5u',
      rewards: '340638949494999117',
      mid_rewards: '52693966424973634975'
    },
    {
      address: 'erd1a932l4xdet2nzzf6dfz2453y29gfm6qaydgl4pnfl0kngu3wwwfsmzqw2k',
      rewards: '340611678670482545',
      mid_rewards: '52691909421068036576'
    },
    {
      address: 'erd1pk2pt0wpsf9l04ljtf2gf99y8s6e45myp6awm5mh7h9c9gz203vs6myk2p',
      rewards: '101354983962983215',
      mid_rewards: '52645078634752142711'
    },
    {
      address: 'erd1hgfvxss3wf6ru7mlx29f8s07w2hvvj8gtatu96q5qnn3sx477khqrlacmr',
      rewards: '339511818591026427',
      mid_rewards: '52608948362165025812'
    },
    {
      address: 'erd15aqqn7r0794sdktvd3nyfrzgljy0kn9228qwmc86m9zwyahycyusj7v9z9',
      rewards: '100731983989442334',
      mid_rewards: '52598086532332117307'
    },
    {
      address: 'erd1u79tn4rmkdrm5nld5qeyerh29t9lacprzfegd0fnhy7n0fk338eqn8epd3',
      rewards: '577816734123706577',
      mid_rewards: '52583987645489121778'
    },
    {
      address: 'erd1h68fn7eux57ch377mh24ezjx5258xjql7fp2kj9x2al7m2kfap5sut0vj5',
      rewards: '338397690589342928',
      mid_rewards: '52524911091879822994'
    },
    {
      address: 'erd1ymduw0dpjec0zugvzahj3t88mvg6l0zvr2m4m0mfllqgks4keaysvrhg5g',
      rewards: '99683727626579238',
      mid_rewards: '52519017876700989073'
    },
    {
      address: 'erd1pal4pvm3fae943xhpm47we0qscd249gd7ev8mtw9cv8ckuj96yesaus4ht',
      rewards: '337513676353737845',
      mid_rewards: '52458231012803401364'
    },
    {
      address: 'erd15ymnjguqxpd4k7mmh2jhg36zxtyxjwhdstsstdsu2f9ms8fpz5nqpjdk3l',
      rewards: '96841916673079192',
      mid_rewards: '52304663659916321428'
    },
    {
      address: 'erd1yspl6ujchtj4y938ktnrts37gmur47xvjrt5eqr3y5n0fg3rvj9sls0r5p',
      rewards: '335307075188452075',
      mid_rewards: '52291789869363365522'
    },
    {
      address: 'erd18p48xsh62gtf6g7rgnq9u7c9n9emhudxc4rd0nfsugxe9gt8fxaqs4xf70',
      rewards: '95791582249154921',
      mid_rewards: '52225438258759721042'
    },
    {
      address: 'erd1xktse0wh9zzwl3xnp4jvt3vprmxr7d24s5a2vpv5fw9fumwzj6xqrtxv9l',
      rewards: '95577316745617343',
      mid_rewards: '52209276482010214533'
    },
    {
      address: 'erd1u2jkwug5s4samfd2l4m57ek3ya46tpcjy7vpyxyfdaqe7ueyenwqmdr2ne',
      rewards: '95511734654990978',
      mid_rewards: '52204329707611304702'
    },
    {
      address: 'erd1692frv639d3n05cxeec2fth77wu2tg0nckcjv4sr64x8r0rln68s22eudk',
      rewards: '333493826067082858',
      mid_rewards: '52155018774590900045'
    },
    {
      address: 'erd1hmdearh74gfzjtha7xsnp509ppc0k82fp7jvr6mlnxewhgcdsscs2zfc6a',
      rewards: '94077407279666983',
      mid_rewards: '52096140202334145174'
    },
    {
      address: 'erd18wszh6c5lr2ek8aukr3suyhyxw5qmwayxstxte0wqv0wl0lw20dqpvuje3',
      rewards: '93430888418361327',
      mid_rewards: '52047374099866630416'
    },
    {
      address: 'erd1lrelsfh96s4f5hn7nuw6qskk5q38v3nayeyrkld29ry9ah3kzppsfkuzzw',
      rewards: '212588055206595080',
      mid_rewards: '52035248937112184050'
    },
    {
      address: 'erd1v85jnvzhscyly7j7mdanft72lyajmw26l6wy6r4wzczyv48tev3sdjvwrt',
      rewards: '570395150676987957',
      mid_rewards: '52024186964495864352'
    },
    {
      address: 'erd13vjrmuxrdqf6cgh092zt4w5hnp33rtn6sjmp306pr2f4899atz7slre6cc',
      rewards: '450250294333508913',
      mid_rewards: '51961811949544877136'
    },
    {
      address: 'erd19sv5vyuapksds2wd9utx83huq3u27nr52cs7lejkxczda7vxuklsu5q4qg',
      rewards: '211379722784806211',
      mid_rewards: '51944105946207363648'
    },
    {
      address: 'erd1njjgap5tw2y2e5e35zwawgwajpcak5s7lzlaaq0jrd4fsvrm4y9qwegp7q',
      rewards: '91806264125772805',
      mid_rewards: '51924830738078876745'
    },
    {
      address: 'erd18fequcf0qfy6egumny3q9p3phh9acdy8wzhfljn322nt4lz8r70qq27j8z',
      rewards: '208825373915153138',
      mid_rewards: '51751434631926261626'
    },
    {
      address: 'erd1gutts6n8cpuepwc8w3qdk5tlp9207rj75yarrtqzxna9nu4208nqkjx4gu',
      rewards: '327684009172962522',
      mid_rewards: '51716791612271154693'
    },
    {
      address: 'erd13qen8wcp6ene45e54nf6zd9v6u8zhksxscxp0t3qvfq9meq32chsqd5c2c',
      rewards: '88811810506952224',
      mid_rewards: '51698962877526875054'
    },
    {
      address: 'erd170shzmfvzl03wumlcxu97ykq5g79rc3ck2ycmata5qkzcwaqtlqseu423s',
      rewards: '564720129162999078',
      mid_rewards: '51596127247726528850'
    },
    {
      address: 'erd1wee68dmxptmatum8k9ztr4pgs3pfa98pedywrvpny5qnj92022ms5twawc',
      rewards: '86934547340752130',
      mid_rewards: '51557363284072594985'
    },
    {
      address: 'erd1z4x7kc3ex6nu67j9tt85pru9v2402syyr0mxx4260uul480le56qhsk5vw',
      rewards: '325244384373647363',
      mid_rewards: '51532773789952051430'
    },
    {
      address: 'erd13rrzxn7a9k7jk4c0zezv6symfyk6h886s37g670v59sc7ywjcjhsqgzkqe',
      rewards: '86591649947717056',
      mid_rewards: '51531498966099222641'
    },
    {
      address: 'erd1xlntygflc67cguwct26pr0pw5lv6n45c5ywmfvspm9nwwcrtxwjq77wcqm',
      rewards: '325181074180043185',
      mid_rewards: '51527998381880731590'
    },
    {
      address: 'erd1mxj4uwu4c7uejqw228axre44lh5eg7n2nyn2q4tufmvrhvaj9r0s9akuzs',
      rewards: '444331301299764987',
      mid_rewards: '51515349768681141301'
    },
    {
      address: 'erd1w2v8gv8ssuj8jt2649ede60gk2dv3gcrfpp3v92a7tc0txtd9guqph4ju2',
      rewards: '444024276388122986',
      mid_rewards: '51492191266745132120'
    },
    {
      address: 'erd1r29fnw9kyzugyv87nl5z7hvzp7a9ydnan0rr4apzw2c42cvm69psr5xvw5',
      rewards: '85720976159642651',
      mid_rewards: '51465825140158138357'
    },
    {
      address: 'erd1r0e6n62yamrd3p0e3v5g7hfmg7f9t3u20y6tatru8snyqvkkut9qkawt40',
      rewards: '85677613794504550',
      mid_rewards: '51462554371634405075'
    },
    {
      address: 'erd1negtnxy4wucqekm3xvtxtdqa7lgq59vnmsftyl64e4cfldsupflqsghpmy',
      rewards: '562937209911438349',
      mid_rewards: '51461643896788667210'
    },
    {
      address: 'erd1d67e0tjd88uxsy2e2yzsnwu56vy6lrrhk0mz29sjuysn3yrgtnvs29rs65',
      rewards: '203931419523615076',
      mid_rewards: '51382289823301324008'
    },
    {
      address: 'erd1fxfx5275w39ttnyt6wugpjdzyuqnes2y49fdedxrejt2s44npl3qhv62y9',
      rewards: '201357446592566155',
      mid_rewards: '51188138290814482298'
    },
    {
      address: 'erd17vg2rxqyqzymemxq4zaaxnspfqg5xywvgp0etusgukad5yakaleqwxphc8',
      rewards: '201326238251654918',
      mid_rewards: '51185784285012323650'
    },
    {
      address: 'erd1l5q6tuwhegu8me8m3a7d4hexn7ya9yml79uwsx4qujwznqf6p0ksxta63x',
      rewards: '81478791867104387',
      mid_rewards: '51145842528238332388'
    },
    {
      address: 'erd1lm906djhf2m44n9fwlhwhmjfuclx8m907q9lsku9hp09x68j0m3qnf63vv',
      rewards: '81075359509466058',
      mid_rewards: '51115412134217699818'
    },
    {
      address: 'erd1j8s44p62jd2xzrtzzmxtlqx50n9enagp4pdd5qlazlax2et0k0zqxhh007',
      rewards: '437595926787860015',
      mid_rewards: '51007308962352121702'
    },
    {
      address: 'erd1a7xma90rjfdhtqr7ehan7zme5waryyy5wdzdy52cn89s35qzkyaqlfy5l7',
      rewards: '437386410799725218',
      mid_rewards: '50991505435560451390'
    },
    {
      address: 'erd1rwv0fm8jenm4kzy9uzsux09xl022rlw5w7qhyzaylj0l3u5j3p2qt7dqrs',
      rewards: '79043006264523981',
      mid_rewards: '50962114291687820337'
    },
    {
      address: 'erd1qec7tu4tv85rhfezgnhzk4thtsjq46aqhj0uhygurupqmafjey4sj8q7rp',
      rewards: '198275011590610325',
      mid_rewards: '50955634105474457454'
    },
    {
      address: 'erd177fy5mcsksqg25k8tfgqxnfvwgnq8dyhgxpyt6ghr7kjcjrntzusxcwadq',
      rewards: '78520047350704977',
      mid_rewards: '50922668160253859245'
    },
    {
      address: 'erd1m7w6tv8wlu8rj99yzjp4ra4u8de7z97rqtszuxyw559wj5rexn8sq58kum',
      rewards: '77292013997760603',
      mid_rewards: '50830039152954258674'
    },
    {
      address: 'erd1up3kjxrg82kkmzlqkt232prmewph49x6lke4cpykq4ma63rgel9qpxlv7q',
      rewards: '315618960521770087',
      mid_rewards: '50806740206173911176'
    },
    {
      address: 'erd189yvn8gfn8d5dvkauury4tl9qsp943na2ln3qllkzwg3a7h63gtsze6zdt',
      rewards: '315122759145955794',
      mid_rewards: '50769312362091197607'
    },
    {
      address: 'erd1sxvgva9055ynnpulyp0k4k7hhwypzungnjmqer7xcsk6z5dwjw2sgwt8x8',
      rewards: '553334379199902462',
      mid_rewards: '50737314485097209864'
    },
    {
      address: 'erd1nwej86laqmv2txh02t6y256r8533upjpzxkwkvf69hj2u2asxzpshp5xnw',
      rewards: '195351146713684814',
      mid_rewards: '50735090664713327873'
    },
    {
      address: 'erd1y3hc70yrk6c9t4xqc0vk77qkmatg0xlmp45qxuvhkzpu3pxpwdrqe785s7',
      rewards: '75877495869970194',
      mid_rewards: '50723343834239694281'
    },
    {
      address: 'erd1sc9vd8l0c8v9ztrcnkpkygc6a3zlaut2t52mvehucan0hvq6uzvsn2jfh3',
      rewards: '75595834014964459',
      mid_rewards: '50702098435683709734'
    },
    {
      address: 'erd1eh7wwduhach9n5wp93yzkjhs20j633xtyqay6zhyaljp9eyw95yqcqlzak',
      rewards: '313848950856205390',
      mid_rewards: '50673230609029131927'
    },
    {
      address: 'erd14ck73qqrssyz5szxp990fx03q83evcy9jkp299s7wemgdf4wgwssqdcm38',
      rewards: '194227631176310494',
      mid_rewards: '50650345304448365599'
    },
    {
      address: 'erd16fwa388j3aa2qce435kfwctrsl8p2kz9425lw4yd028j9cyxjxssu2qkmw',
      rewards: '74516347446221893',
      mid_rewards: '50620674125003440101'
    },
    {
      address: 'erd1y8lw4yk9sh75ddgauapea67u0qf8rec8gyk8glngy6rsthxh4pqq607506',
      rewards: '312946832612014209',
      mid_rewards: '50605184967413669336'
    },
    {
      address: 'erd1qwuwp0dx66r0yv6kgkfglkhz7ukewsa4j4mgpy9lsh2euva9kmvscz99uy',
      rewards: '551375031845700681',
      mid_rewards: '50589523384847646150'
    },
    {
      address: 'erd1lgcs59p6ptwqu06gsx2x3ksfxjugmkwyarghmvmjc35lh9y7qacqcrqzx6',
      rewards: '312728762659218438',
      mid_rewards: '50588736225853913018'
    },
    {
      address: 'erd1pyhne0pzm92gkxljjsjfpulqnkecmyn46uyst6c9vgmry38fvxpsykhryu',
      rewards: '192039821873103235',
      mid_rewards: '50485321607468940936'
    },
    {
      address: 'erd172r8e8v438kzlxlq4vqdn0ure8j0vj3rg67u249rx3ves3h940yq4p5d4v',
      rewards: '72428734224733959',
      mid_rewards: '50463208092123869194'
    },
    {
      address: 'erd16f8uvcqkvdest3mxqyjuj79l2cc0gdaf9ked79a58ns3wr3fnzzqehxdc0',
      rewards: '429874420996179569',
      mid_rewards: '50424885517071418481'
    },
    {
      address: 'erd1vncmcjxpng4axy8erg62q5a3fefs33y8gkdypg7scaju48uslj0qg07uk0',
      rewards: '190823249274371887',
      mid_rewards: '50393557070407963763'
    },
    {
      address: 'erd17eqsgjcje9c0y0ew8qa7kyrn9vnmlglcalkc0qsalt5s6dh533fsxv6ysy',
      rewards: '188399795719638461',
      mid_rewards: '50210759024676209283'
    },
    {
      address: 'erd1c7kc3qte40enxa9jkgzht0razvat5577nqucr6ryux2ejfenvyhsgpkea6',
      rewards: '545769478437444136',
      mid_rewards: '50166703559696515959'
    },
    {
      address: 'erd12ydy7qf2n22thpxegmlyxu86nv92mwgfsvzaktudm4nw2qdtc35s3f8d9c',
      rewards: '544413718718112002',
      mid_rewards: '50064440313639379629'
    },
    {
      address: 'erd12qd6ghmjfkwt60fdmtkn4avtg0jxfk23r529ygfly800tnvgvpnqxyw2a7',
      rewards: '186008417980693244',
      mid_rewards: '50030380417282723812'
    },
    {
      address: 'erd1ewwn9nghakqt6ee8lmazcgn0gz3tfd48k5w0n76wlsl5slkfzvqsd03dlp',
      rewards: '66467612848207039',
      mid_rewards: '50013568223486580853'
    },
    {
      address: 'erd1t23gujnh9zw6cw2tnukpg2q2jdq5z69lv8fnv3u6s5y6ppgp4r7qpq2kg9',
      rewards: '424063304280289388',
      mid_rewards: '49986560310834609741'
    },
    {
      address: 'erd1qmvdf3272wc7dsytukkhz9d302egzwy5743xtkptlx236atl0d4q08q22m',
      rewards: '184395943770979387',
      mid_rewards: '49908753520925318331'
    },
    {
      address: 'erd1vw59e5d7f3hh8j8q25n34g84evmmja5404pxpwhuq3sssdfhaeds9xy4t8',
      rewards: '184115000639888858',
      mid_rewards: '49887562334807968608'
    },
    {
      address: 'erd1s7y6uwrrls5u4ajg5w7pkkzmln9hc4l6fzx4w4xcm7arkctd4cnq3nfx94',
      rewards: '301334611089365378',
      mid_rewards: '49729289740621128004'
    },
    {
      address: 'erd18z7tw6qayna4uw36m76m4ytgy70d846vrxx9m9w65qanyxat3cuqweqzux',
      rewards: '62270595864100037',
      mid_rewards: '49696992524687132285'
    },
    {
      address: 'erd1whc4t2sevx3h8w5el2slr603hetwtt9fxm2zkc3sja98xtf3egasa96520',
      rewards: '180676727802701853',
      mid_rewards: '49628217750257226563'
    },
    {
      address: 'erd13llz83un52ygrv39v95d6qannc9q5numa73f2d8ejm9fkmka622qkmrk07',
      rewards: '299808512257546964',
      mid_rewards: '49614178030101631244'
    },
    {
      address: 'erd1ydjyxlkps7zdpm6dc05530pl8h7glmgym0qfvdlmc572t0g8vcxq8gvpk6',
      rewards: '61120086852951289',
      mid_rewards: '49610211080733320619'
    },
    {
      address: 'erd1g92ee9tj5krzr3zr8a6k28mmeh387cyfskhg7nfzlq7sfnjpkahquuvax5',
      rewards: '61026850040726759',
      mid_rewards: '49603178345556030462'
    },
    {
      address: 'erd1083a8vyzfw7gdlfflmc3g2pt7ggpaelu3vgcuq3mn96ruva4tkgsfn5lhs',
      rewards: '299220233157321995',
      mid_rewards: '49569804879373851776'
    },
    {
      address: 'erd1hn7nnakvnuxm6706gvafw0f7n6du974m6zyrr9dsy0nexhd5qffqwvj8da',
      rewards: '60474110478637815',
      mid_rewards: '49561485897375566425'
    },
    {
      address: 'erd19qwt94yeadp8xq03pgsddd0rl8sm44dh77w848rm0az6slc6ujws2p9w5r',
      rewards: '417494025459294910',
      mid_rewards: '49491047893029315566'
    },
    {
      address: 'erd1fmkuxqnr2qzlh5d2lvl5jrx35dh8pzzwfn7tjvv6jecjfnrx0vxqwtdg74',
      rewards: '59458443386859239',
      mid_rewards: '49484875409368256306'
    },
    {
      address: 'erd1cc2f2j6pptm7jd0c8fkls0wtww3e9pvvxhe7ashg6ysflksgkplspjmxe0',
      rewards: '297666063151679730',
      mid_rewards: '49452575795609724883'
    },
    {
      address: 'erd18ypm48sw6p36raaynj7fuj659re35j9wgk7rkuw2r9r3x2wedmrqd9ruyj',
      rewards: '177873745818373275',
      mid_rewards: '49416792353655004560'
    },
    {
      address: 'erd1cz3ja7349vj5lqhcgug2dfuvrrdhjk6ltw00pnvulg8tdh2le72scj9kp7',
      rewards: '416298046223225328',
      mid_rewards: '49400836687346306635'
    },
    {
      address: 'erd1c6uex858lcjjdhgtweyhma3jhk47vkn3ealszqnr0cgqpcvf4htqrfw37y',
      rewards: '176647390950616774',
      mid_rewards: '49324289952376606088'
    },
    {
      address: 'erd1msa30qhdjme6zraw2qds6aq3gr9lrwwv2wdzt00u52ac5wjvat0q44qvj8',
      rewards: '414575126445290546',
      mid_rewards: '49270879021046524839'
    },
    {
      address: 'erd182kuer8cl3teqn4f5heduvtahw2r76mtpt84yf3qt7wckrjnj4hsacmuda',
      rewards: '175773064626342027',
      mid_rewards: '49258340620235667915'
    },
    {
      address: 'erd1lkhjuntmp8tspk93r4uprnfpe7r5r76a30ne2qfemvuk22gva2eqsm87ga',
      rewards: '532942190864465210',
      mid_rewards: '49199157432889191904'
    },
    {
      address: 'erd1xs8m8fd442caxr4p48v9x620pc7fmsy4ptnwdd09hx285jnf9t5qy8xer4',
      rewards: '55516054052898382',
      mid_rewards: '49187505953141549792'
    },
    {
      address: 'erd1rgfal4myetgns3fd468mu3xulerccff0k7m9c9anqku0ewcw2fmqcntd68',
      rewards: '532576665891395387',
      mid_rewards: '49171586345086493921'
    },
    {
      address: 'erd14p2sscc5h7cchs7y20wkh6qaqz3py7mgpze4r5zwuachd6z3rzlszevpng',
      rewards: '55149446873247483',
      mid_rewards: '49159853235861071083'
    },
    {
      address: 'erd1fh64vrtckqyw9dzcz76n88ehpq9u2xcgq738fhj6et5jyx93gt9sk2r8vd',
      rewards: '412622341508348942',
      mid_rewards: '49123582915655886178'
    },
    {
      address: 'erd1rgqfuztxjghanltxez3epe57g7u4sfw24a5s7qxcdvd4s6muy22q7mnld7',
      rewards: '531879141259696581',
      mid_rewards: '49118972941674960868'
    },
    {
      address: 'erd1ktepkp8089hallx3225e0fvf5uuf03tua9z37zap8q8l8aksl79sre7f4t',
      rewards: '173279815419071894',
      mid_rewards: '49070277976443280903'
    },
    {
      address: 'erd16df9yv5y0t5kla6wvcc60dzgpje6dsc9cskhgtshun7fzy80fprqyh37j2',
      rewards: '172465610303485123',
      mid_rewards: '49008863511262647183'
    },
    {
      address: 'erd1hnxxj6mn99juzf4k0kn0mq7yylxjht608s68tsy2fsm77w54fshslexk4j',
      rewards: '291187123467132297',
      mid_rewards: '48963877544951706869'
    },
    {
      address: 'erd14zurzq9j3wn6z0krg49ylrv5vcr7fd72mt7xpe9h3zd0270ey43qlkd29j',
      rewards: '171806887147891131',
      mid_rewards: '48959176854266209988'
    },
    {
      address: 'erd1uysncjqvgcnneu8mz25uws4nfss6cpt5sk9qe96d0zqrqjruy0uqaxgcvt',
      rewards: '52390513497462228',
      mid_rewards: '48951750370257306036'
    },
    {
      address: 'erd1ev2puc0k9sf8c5yxl4hkexdjgp6cr6cvzvmnn45sls957z27aess58ssvp',
      rewards: '291025882012685108',
      mid_rewards: '48951715305363362871'
    },
    {
      address: 'erd1sj8cwtsa3jqjuuute46j50psgn0m9de4eq4craed3384kxxsaqese56ww2',
      rewards: '52041157108392393',
      mid_rewards: '48925398858357630725'
    },
    {
      address: 'erd1vuu8jfnhmtwfgq5q9mkk047uqz2kk6jz5f3qg32ly5ak6e8mc0aq2ztxm2',
      rewards: '170696621941267153',
      mid_rewards: '48875430949741478856'
    },
    {
      address: 'erd19evzlflvgkg24gkwjdfuzufyshey07a2d2g2hvfymvpyw34dtfcqpur86l',
      rewards: '409268554118880153',
      mid_rewards: '48870610961892929533'
    },
    {
      address: 'erd1hqh6l26mwwnvrs4ytvp2xpdz6uzmckqmg0yczmlsv6nlxes8r2rshaftte',
      rewards: '170304083173707888',
      mid_rewards: '48845822245484021784'
    },
    {
      address: 'erd16nwhpjpmf8k9ekqv3sj5vzgmjplwln5tt0ul2whqq787x6rjnhfqwdash0',
      rewards: '527753841923076548',
      mid_rewards: '48807806814591665473'
    },
    {
      address: 'erd10drzcwswxkeqzyzz2dtxkavp062gd549pvzts5qzyayp28p0cpssu70xk6',
      rewards: '169366180273302906',
      mid_rewards: '48775077412373723617'
    },
    {
      address: 'erd1kmgkxgwpp9rskq4xr5recpuzxdyrtqkqed4ax7muf4tfhmvue57qalyknk',
      rewards: '169342942477912074',
      mid_rewards: '48773324614769551784'
    },
    {
      address: 'erd10rxl3asl58dafplahsylv29hcmdr8hxvunxchsnufxcxunk8r3mqce3dv0',
      rewards: '287805658899538371',
      mid_rewards: '48708817936542857403'
    },
    {
      address: 'erd13hytdrpdsshp9evlyche06d6x444d5qr6dc8kugd90ty6n9e4wsqdj7nzp',
      rewards: '168058525294253903',
      mid_rewards: '48676442646217518259'
    },
    {
      address: 'erd16pugp6dgl6eq8nn3x5wa7c944cwx2xdauwzper9nf2en5zs6zt2s7007q9',
      rewards: '404969691687014319',
      mid_rewards: '48546353189393067991'
    },
    {
      address: 'erd16cu3sh6s6mn82sumv7h69s0584sddatrjx5zwjnc7gd259rajqhstqgxhk',
      rewards: '285028658792082701',
      mid_rewards: '48499352320150796299'
    },
    {
      address: 'erd1zmvcls5p9h3rm55r3dxp7m7rza38an83m0gptmr36w67d5ndga6stzcfpa',
      rewards: '284959232730623924',
      mid_rewards: '48494115599879128832'
    },
    {
      address: 'erd1rj7lh99fys8ujd57294pur80rgw2lj08vadtnjdxtdpv3ugank6s8gzple',
      rewards: '403309007279202588',
      mid_rewards: '48421089858584744596'
    },
    {
      address: 'erd1lldl7sld6yg23yk8z9uttak4xp04f0aq36dw7x8ax6jme3v8chaqr20qn9',
      rewards: '521355292749189250',
      mid_rewards: '48325172318782733845'
    },
    {
      address: 'erd1cmc2548ldah93skg8uu7tq9zrt0xgjswjxptn8c6fa8pz04kk7qs2dxm2q',
      rewards: '43675126972332641',
      mid_rewards: '48294359754506141681'
    },
    {
      address: 'erd1rnjazeg6msc27tf0m32hn5cj93pxx22a582hcxeh3l8kwgtuyhqs5audky',
      rewards: '401536771977309202',
      mid_rewards: '48287412384498152571'
    },
    {
      address: 'erd10l4p45fa7klx7a0tmje9qwz4s7pld6md3srm54y08tkks2m0y9sqsemdar',
      rewards: '520025104243694771',
      mid_rewards: '48224837877140842973'
    },
    {
      address: 'erd1pg2dfcsypm2lpmajj8ms9aad39cww63fr99dm4wwgcgnlx0r2q9qzlmcp5',
      rewards: '399688345177573737',
      mid_rewards: '48147987881804511695'
    },
    {
      address: 'erd17ymxwjjr28vvdak5attjrcz9m3lawr4s9jrfnpcsgqmuknp3x4hqc2cp39',
      rewards: '41667696521786889',
      mid_rewards: '48142941806930685480'
    },
    {
      address: 'erd1fqnvdd9m9s8l58fvrtyq982lljrwm9whq2j8t2z7cperp0mf2utsple3av',
      rewards: '160847822844362900',
      mid_rewards: '48132548452900395794'
    },
    {
      address: 'erd1c4mvtjf7sce6fhysfwkzu48vk9q609g9pntvnqlyu3chxpyn860q6wkrgu',
      rewards: '160531226775579237',
      mid_rewards: '48108668010650131328'
    },
    {
      address: 'erd1as8zkvldy77c2z33xqv3g0e2vhvr8mxx6yh8cd540an0wtl9phas7y64yd',
      rewards: '160119500404111498',
      mid_rewards: '48077612009624847470'
    },
    {
      address: 'erd1qcxhcd4w7u5g2429jx6x9tvlcpj7hq3c59accmgmmqp4yaxuzrmst2cc20',
      rewards: '40618478933721301',
      mid_rewards: '48063800647294609243'
    },
    {
      address: 'erd1ja32tj76tsghf3luw6afh6enygz6t0k7f5qeepelty0v2nv5dm0srdpx4g',
      rewards: '398219485102630646',
      mid_rewards: '48037193618539775709'
    },
    {
      address: 'erd1adxjgla4ej0fckeghn7wh9yej95cm0fe8mnjn2pjt92e9c2tys7scerxpm',
      rewards: '278881430089254051',
      mid_rewards: '48035674610566289840'
    },
    {
      address: 'erd1jcndke4h5t776lfzt2gteq0j95hzwlsk8jg7ujfdqtc0e6658j4sc270ld',
      rewards: '517504245779489854',
      mid_rewards: '48034692701912304896'
    },
    {
      address: 'erd13d37ezzvu0czfp9332qc28hushl0f9pv7lhy2tyswaf642usz2kql4l30t',
      rewards: '159234936818012327',
      mid_rewards: '48010890493733371175'
    },
    {
      address: 'erd1f0m7ypv3umdv9ew9fphdwcelppn7jr3ckkesz67kdlvl6nmzx3hscwy8j9',
      rewards: '159099495413853376',
      mid_rewards: '48000674319405184253'
    },
    {
      address: 'erd15mdufgupnscn6kn988098h9kct74jf7q780pagjce8e59qy8s02s82vcgp',
      rewards: '277908825962669118',
      mid_rewards: '47962312307722436830'
    },
    {
      address: 'erd13lap278eerj2cn84ltetk8qqyvq7emnw5t4geshavz5n4ulcl4kq3f44m3',
      rewards: '158483331636352232',
      mid_rewards: '47954197862632199335'
    },
    {
      address: 'erd1c72xfzpxj27jrg7h4t32mq8vynkgt4d6a4kylc4k4d7yrkyht59qkca0dc',
      rewards: '276914956735650263',
      mid_rewards: '47887346005167502907'
    },
    {
      address: 'erd1q4np2d2kj5swrzd0sjh0765asv2c4gx4ndrr3q6a875lsla2ts8q67xrjk',
      rewards: '157149829890274467',
      mid_rewards: '47853613507431007575'
    },
    {
      address: 'erd1twr52rft4935lflkywktngqrqfa6wfjy58drs3k83ymyk2p3mnrqs9kust',
      rewards: '275484700754933050',
      mid_rewards: '47779463600051627229'
    },
    {
      address: 'erd1slpmkkzm49rvejay3gw8h9l5uthl3epluemurm20h2drkenpu8gq9ttzjr',
      rewards: '36541629734052492',
      mid_rewards: '47756289052947384300'
    },
    {
      address: 'erd1p2ahcrt95zm5reatgw79uv0ucgfmhnmghyg7g59gmj8hcrzc3deq87yf4e',
      rewards: '274958491997707229',
      mid_rewards: '47739772337027444380'
    },
    {
      address: 'erd1jtrv7zncqwsgkvfactcy24j0n8z9kz05m7srwnyhd5hhjzy3g3xqvpcsz2',
      rewards: '154811092429992503',
      mid_rewards: '47677205489879288672'
    },
    {
      address: 'erd1lpa8sjtyzasw4ewz33y06lzclxz5h9ftzhcrd7h6d54gg3ks5luquffdj6',
      rewards: '512190280863745606',
      mid_rewards: '47633867029067088934'
    },
    {
      address: 'erd153dtrf7ax3qv9t7rp08c6zl7873990dddy75552d4z3252zg6rxqvrds93',
      rewards: '33132583364412294',
      mid_rewards: '47499148983990004443'
    },
    {
      address: 'erd19hjw586h5wkusjeyx3uqmzny70jynuk0v2589wtu5du6zeeya7zqvc9263',
      rewards: '510187764746219806',
      mid_rewards: '47482819763434502098'
    },
    {
      address: 'erd1hy9f2tu34wkry5z9tggd4ppvxm2ac8gewdz00t82g4zgrhhalhrsujpdhr',
      rewards: '271010144490444211',
      mid_rewards: '47441953463301632566'
    },
    {
      address: 'erd10xv45k7s7vhf5y4rd2t72758q47wmgyajr2d2gxcusaya4xhq3xq9gaqse',
      rewards: '151422862662830835',
      mid_rewards: '47421635590997756895'
    },
    {
      address: 'erd1cak8egkz36crrfs5f4wsll0d2ewcd7avqn62epm707c6m9v7yz7spns8wt',
      rewards: '151248505561371380',
      mid_rewards: '47408484054693712698'
    },
    {
      address: 'erd124h68z0heswacs5r88nrk4rpt0z627slwvx3jrepq6yd4fdqycgqetywyh',
      rewards: '509055638393031666',
      mid_rewards: '47397424900190682231'
    },
    {
      address: 'erd1gcjx08xc3kvy3xe3995qqklk7u0c6w06e6pdaz8fm74qqthvltmsxf5pl2',
      rewards: '150777765464639578',
      mid_rewards: '47372976722786286975'
    },
    {
      address: 'erd128jm8fcksxs0wmnk6v4a2u8r6ghdpkwhhdf555w76r7ekdxr6scs3u387j',
      rewards: '269541056133468257',
      mid_rewards: '47331141981011014478'
    },
    {
      address: 'erd147hm6s5lw680vvjujw2j98l4e3efsarzcf43lg0fzvjjhf3nnaqqg6cuus',
      rewards: '388479581898973128',
      mid_rewards: '47302525001611859180'
    },
    {
      address: 'erd16p4adphl80w7tjxc33earqyw8mpupqzs4c603de45nm0y93em0pq7kyaws',
      rewards: '269150667867369989',
      mid_rewards: '47301695486367042974'
    },
    {
      address: 'erd17df9lg8y49drcf9qlw2dn4mk398pda0h6v46le9qwx6q6sgdkmas0uamw9',
      rewards: '149734937871219150',
      mid_rewards: '47294317552388704771'
    },
    {
      address: 'erd13wtaxnl29t68lfry583je3vqp709h46h06txpetws2ts7pju5g4s0w6fq7',
      rewards: '149645694669465449',
      mid_rewards: '47287586050213406978'
    },
    {
      address: 'erd14zueqgjywc9hhrugjufxsz2cgmmzqvfp9scyp5zvr65ffffej24sygzn0v',
      rewards: '268272307476861622',
      mid_rewards: '47235441869696938609'
    },
    {
      address: 'erd1gq3x8eddazqzfyfve6nhtze4866eal2resa2f07me3ves5x6wcjqw3ag4h',
      rewards: '385755444098709048',
      mid_rewards: '47097046722393485832'
    },
    {
      address: 'erd1z8xcr23e47dyhtdugntvfnp4td286yp427qsg3hrn029erpzzhmq53twt9',
      rewards: '144231803426481281',
      mid_rewards: '46879223060508566523'
    },
    {
      address: 'erd1t46cruv2m6yvxkutmmfqq53gqp5vh47ehdc6n3ks4q4mq4t4kppsuzfzhn',
      rewards: '143737000162001725',
      mid_rewards: '46841900674200855971'
    },
    {
      address: 'erd1l7efk5q783yl7x9nfzzsknvyxxawvqqkgaw5fkrc9926rngvyhkqmfmew8',
      rewards: '262366639129296753',
      mid_rewards: '46789984753109661937'
    },
    {
      address: 'erd1azr5np38s3u48p3klc4l3m3c2x6t93xeg7e0xl9gzsyuzesgmcasa6mcxy',
      rewards: '261787675863521309',
      mid_rewards: '46746314284027424070'
    },
    {
      address: 'erd1xywusyhlykundpgaa59m5p9s7fmaljrpzshn5unn6l74zccyg4ls49euev',
      rewards: '500308663626796511',
      mid_rewards: '46737651623244743519'
    },
    {
      address: 'erd1supqqq3e929kcufe7g995rcpajatdhj4jjrcz2lkjwc9rph9ax6svvl39q',
      rewards: '141275222656888785',
      mid_rewards: '46656211901217319486'
    },
    {
      address: 'erd1a6yz35dzalkyja3wsa60lry8wcflumsqz5kkp6st2z4wksejr6aqvxngua',
      rewards: '498890156369794177',
      mid_rewards: '46630655409543895160'
    },
    {
      address: 'erd1junw5quv77gufwqljmztt75pzs8qwv020r2lpgvgjckyvl5zrrtqy0a3hp',
      rewards: '259755716609261014',
      mid_rewards: '46593046159717861046'
    },
    {
      address: 'erd15mu94y5xj8gy4y9y7fmjw3jr5am2qcp2c2ftd4c6fhwyc9xe8enqhaa9ty',
      rewards: '259076222072441308',
      mid_rewards: '46541792743627653048'
    },
    {
      address: 'erd1cct3wy7rqqszcjgax3l8q4w3redf867mt5f3u2xhsfpmnv2p3exqqzg0u4',
      rewards: '259058280726672812',
      mid_rewards: '46540439450539830903'
    },
    {
      address: 'erd1epxr8wym5758lmwre8anzeqkpq33tj2n4khq34em3c43gzm0te9q9rzq5a',
      rewards: '139670470461797505',
      mid_rewards: '46535167466685667614'
    },
    {
      address: 'erd1cg2sn8c902t7aqy5x4yy4slaqnv2futvjp0krkl2nt04lf56px8qq7lxf2',
      rewards: '139613374436287940',
      mid_rewards: '46530860785477846022'
    },
    {
      address: 'erd1f0ehe38pszxtv2fe9y4c86wvs56w9dl4z82a7j242sy9g5m04yesdahc96',
      rewards: '138148177647385085',
      mid_rewards: '46420342839259831906'
    },
    {
      address: 'erd19dt9zvhadnt7udew22pglgkuafgge932uxvf6un8402q2nenhcfsmxjc9v',
      rewards: '496069949430168682',
      mid_rewards: '46417930756283775454'
    },
    {
      address: 'erd1s9rm9v2m4agrl29q4s6vrdj74kjv05sgfl80qgakh5j06t52e54swddq6z',
      rewards: '138113160008390002',
      mid_rewards: '46417701502906618666'
    },
    {
      address: 'erd19v8ryxl30xqs3shz2fjgupnzeqa9dr2rv0hrj8snyx7xp7tngk4sr76428',
      rewards: '137900991373026304',
      mid_rewards: '46401697890279380446'
    },
    {
      address: 'erd1uy8gjswqm80uskk0ah3v76dx6mv4nlhprhpuxrac2x2zervssmtqdgglnt',
      rewards: '376203799073675367',
      mid_rewards: '46376578182491284091'
    },
    {
      address: 'erd1dwnxdp8ysgwa2e4gk8xu5uvvux4ctwd08vvtv0s7kff70407rlcqe4ql8n',
      rewards: '495299721612474573',
      mid_rewards: '46359833443229139908'
    },
    {
      address: 'erd1fj233det4g804cj48h770dn5ekwrh9hs5yq9qy3mx7fc7rsx9paqk92l4k',
      rewards: '137277041677612718',
      mid_rewards: '46354634151536067521'
    },
    {
      address: 'erd15ysfmq7t7cv2kyv96js9udnglc6w27ptx3e98g6uepqf4h5rje9q9pjz6x',
      rewards: '137037626712724384',
      mid_rewards: '46336575382629585189'
    },
    {
      address: 'erd15d56yp3al2wfw5y9jg4zg2dszctu8qtxyqhmp6wzr2uf9khy4wnscv3huz',
      rewards: '136396034183691245',
      mid_rewards: '46288180867193430079'
    },
    {
      address: 'erd1sc8s7y4f0qae8pxs6phdfxqyl8pkxuknnqe74ahy65q0w5pfw08spswg20',
      rewards: '136004117085886740',
      mid_rewards: '46258619054701667756'
    },
    {
      address: 'erd10qpuyty99w344s8965ykrxmely0wnrvvs8jn5rmmyl7dw4h8z0kqszsq54',
      rewards: '374314385305762261',
      mid_rewards: '46234062084471333558'
    },
    {
      address: 'erd10dpxl28h7v2yfpnwvvm9tmzpq3xd6ylq90jxt6q4ar2m298ll70qgvmehy',
      rewards: '373568921816821716',
      mid_rewards: '46177832713507508223'
    },
    {
      address: 'erd1cl4fgzx8gmqlpeeuvs0kwp8lmat9h9f83yvjpzjnyfzm2mefp00q9n5mhc',
      rewards: '133815318580501241',
      mid_rewards: '46093520743449292541'
    },
    {
      address: 'erd1ugexdcz6wr0jk6j3eeeeh9eyncu3rkfh4eq6kzklp9k30hkytt8snehz8u',
      rewards: '372029994420655896',
      mid_rewards: '46061753360555719079'
    },
    {
      address: 'erd1h26kpumg7p4sg7q5mu7x7jcnnqhkg0lfluanfln4tw3d55tvwt0se6k0qf',
      rewards: '252685428481879974',
      mid_rewards: '46059743241689442390'
    },
    {
      address: 'erd1x4sdd88gc6dtl9u3xym8kcpmr9ce2tz83kf07al3dn9zzdfcu6ls8r4uqz',
      rewards: '252481719803610167',
      mid_rewards: '46044377752958045811'
    },
    {
      address: 'erd14tw9mgcx8xzd47wl8ww9xd4mlgq92wl56yvqpdc0vauw4878m87qvjmszr',
      rewards: '490123606811103452',
      mid_rewards: '45969405630686255283'
    },
    {
      address: 'erd1lvamf4qhruweesf0f2m3pral9hfa0avn76kyq07suve5mv3mp0zsnr6th2',
      rewards: '489117868432991683',
      mid_rewards: '45893544053031024151'
    },
    {
      address: 'erd14xmyrn00vqq8n4xqdsjza7zsrhusc8ual4sahv0t32aw36mes6ksfgg9l5',
      rewards: '130821836965450673',
      mid_rewards: '45867726199915995514'
    },
    {
      address: 'erd1ews4czm62zqaj2uq55jawa94fx5wrschvfqrshz855zw9p7vuc0snylhj0',
      rewards: '369282047840106026',
      mid_rewards: '45854479215062541935'
    },
    {
      address: 'erd1hpywewvje35qrx4enqdcq0x8tsevhsvrkaj7wwurkdq4tdpf57rqu35wl2',
      rewards: '129368747416258734',
      mid_rewards: '45758121487522511937'
    },
    {
      address: 'erd1yp3sfjmnqw3x4pc6k5ae8hcckfdvx947rda2fk3yh7c5la4vmpmqmzyut5',
      rewards: '486837205453937021',
      mid_rewards: '45721516520368112614'
    },
    {
      address: 'erd1h3sstwt8qslya4rjd7hmedhsjsezch4zazkgx2ufz9y825s95e3qewn9mh',
      rewards: '128668281908077191',
      mid_rewards: '45705286257506242516'
    },
    {
      address: 'erd1k7eaadt783d30pjlrpxctl3hkl79r63tstz3lkzcsutar22vqadse85rv3',
      rewards: '247097201789897709',
      mid_rewards: '45638230348898414873'
    },
    {
      address: 'erd1jea4f2r054xpp98gwugrstarxkcfewxn5cf4wf0m56zmd5fyj7fsucv07d',
      rewards: '246731182091753517',
      mid_rewards: '45610621944607190624'
    },
    {
      address: 'erd16v0vu5n2j648hrc92rex4t945ylskpq0wfgpq8p0nk2snrwgustsky4y0x',
      rewards: '365532484897863786',
      mid_rewards: '45571654410414910630'
    },
    {
      address: 'erd19lg4m0kpudkcnjndvtaxsfges3fyzanyvz937kdql4muyx924vdsga8kf2',
      rewards: '126616661345273355',
      mid_rewards: '45550535105485556850'
    },
    {
      address: 'erd1k43px9qx98h5dknneaw6j93vmj6lcxmtrawdqn405rz5g0upn9yq7zztg8',
      rewards: '245419203406467974',
      mid_rewards: '45511661046741626119'
    },
    {
      address: 'erd1tlv0ndth9suc2yfm03xpcp4s22nl7qu8stpy89x0qmgcanr4y0qsnfmhev',
      rewards: '125758420602243103',
      mid_rewards: '45485799088454458481'
    },
    {
      address: 'erd1hthy4lu62492wy4vfpr5htkmgp24gyxg0222pjqqwz27veqgtwfsejn8kg',
      rewards: '125735929926512042',
      mid_rewards: '45484102645144127833'
    },
    {
      address: 'erd1s56letf5xfyjdwlk2ce44zj8qp7v9g08pkx0765kt80ww2hezgmsr7z8n9',
      rewards: '125044197171707867',
      mid_rewards: '45431926115703374843'
    },
    {
      address: 'erd1nn9u8a6xc3mzyf7aqdfgqcnnjpwr0xswfhq43vjdsu226kgna8zsn8wx9m',
      rewards: '124736283899523930',
      mid_rewards: '45408700605851883260'
    },
    {
      address: 'erd1jq4t3azdvgx6t7m3caugrdq58eh44jnhqkq0angrthc8n6dcwa6sfmqsc6',
      rewards: '482643583152537293',
      mid_rewards: '45405196878204681288'
    },
    {
      address: 'erd1u5u8mtarlelylgu0uzqa2nfn65h9y5q8g5jk3g5j0gvp4krq85ds4ffjta',
      rewards: '122706852935269233',
      mid_rewards: '45255623187269345105'
    },
    {
      address: 'erd1w2uf6erv9u4jrvts37pkvax882g0wy2ypfqcm5nr375fkxdyvp0q038uq9',
      rewards: '122196395177719281',
      mid_rewards: '45217120002289177861'
    },
    {
      address: 'erd15fgqzkjqhkg896nhweu2hw25caq3msz8c4eykqftn4quhrn5yswqwt5tsp',
      rewards: '241264098293998084',
      mid_rewards: '45198246707570159759'
    },
    {
      address: 'erd1ttqlw3artwtldhnadqulg0khmptzq9kq8ar7h0eepc47lh0j6w7qlpkzkw',
      rewards: '121913940775033955',
      mid_rewards: '45195814822861100468'
    },
    {
      address: 'erd12ahz0e62njxlyrsjqrmttyn2p6r4hd42wvw4cs3u6c6cqwsafaaskrfjr2',
      rewards: '120217436146737899',
      mid_rewards: '45067849617989861342'
    },
    {
      address: 'erd1dqjms4aglxz5rt209kjgyhe8wktfctvrnytuuavycqf74avueg6suvzma2',
      rewards: '478017076709881555',
      mid_rewards: '45056225331120145942'
    },
    {
      address: 'erd1us8qpyvagzxy73wsyuwx46arcx032e4el0w4zv7zmx45at6xw0fsrdl7xp',
      rewards: '477281136423130998',
      mid_rewards: '45000714283289040870'
    },
    {
      address: 'erd1fxymwdzngm3n4hrzrrn65za7ftgqdqq4nvqrdz758pfehrvnk7tsnvkjpt',
      rewards: '118743304871084241',
      mid_rewards: '44956657754702352289'
    },
    {
      address: 'erd1fargnf5hwgxq2q2ap38y88tyywk0jjxj50va64nde2n6ygef9g9qv494zy',
      rewards: '357262064777104237',
      mid_rewards: '44947827049456172307'
    },
    {
      address: 'erd1dsvhcfxq4l89qx70vm2sq7g8qqa8g5v2cuemssnee28p05lw0wwssa32zw',
      rewards: '356988596130645691',
      mid_rewards: '44927199654289513536'
    },
    {
      address: 'erd12e37nkdcfeghmaxyt7uzq49xjvtu52v2uk0exfkgxnltseer56rsc33kfp',
      rewards: '356977751800954791',
      mid_rewards: '44926381680175301385'
    },
    {
      address: 'erd1cr47lhvwyvayh00vtk3pw9dw80gvpxsr8pxlckn9hsc5nuhjgqeqtyfp9d',
      rewards: '117451042324334112',
      mid_rewards: '44859184020305058442'
    },
    {
      address: 'erd1txqee8q5r2qju75w5dps386tf6psxzg44s0t54gpsm3gdhv3wtvsh9cmdc',
      rewards: '117187791148540633',
      mid_rewards: '44839327316066743549'
    },
    {
      address: 'erd18fccaem0svsvkjpdxamrmvfgkgwqwcf8n7jejwu0lcn8pwqthvtsdpynpk',
      rewards: '236446968132960111',
      mid_rewards: '44834896653778807902'
    },
    {
      address: 'erd15s35n6clnr0zq5c7d05urv8smr8r8fjmwyu435a2zpx2u6f3m8nqxenenm',
      rewards: '236446968132960111',
      mid_rewards: '44834896653778807902'
    },
    {
      address: 'erd1yl2h75rq7av6pyuxkvheuj8w576p8tgyew8kvf60ueepekd6jetsdk94xt',
      rewards: '116855924489350898',
      mid_rewards: '44814295032437902677'
    },
    {
      address: 'erd1lemy00j6t9psq52lctrjmj0mjkfs6kythhy9wej88td4tx3fgejsxwqj3p',
      rewards: '114525377994238200',
      mid_rewards: '44638504849060341650'
    },
    {
      address: 'erd13ahpfwxaypg0w6xs5cwczacp3atlp9f58c33spmx47dt33tksyssa445v3',
      rewards: '114003299984181396',
      mid_rewards: '44599125163086370247'
    },
    {
      address: 'erd1uwz66rkl6zedpxv3uj32snl8cnlwecvwqkrp85vlugfej3lrmc0q2yc7sj',
      rewards: '233059774058437647',
      mid_rewards: '44579404875887074123'
    },
    {
      address: 'erd1l86tp2848uc45eqhu0vs27yxamk69wvgxegesc8pwdh48dnp9w9skcqvss',
      rewards: '231867627558789790',
      mid_rewards: '44489482768679390960'
    },
    {
      address: 'erd183ea9d4ugama4dmv33n2zjma256dye497ek9n0scg6xngn7dfxmqd9p69l',
      rewards: '112016383289010973',
      mid_rewards: '44449254542211648730'
    },
    {
      address: 'erd1puksv5cm7alxepdutgkwte3gld7wzujr4eqqqamrvlcqlhevzgrs5mt2t3',
      rewards: '112008359498757843',
      mid_rewards: '44448649317830612470'
    },
    {
      address: 'erd16deywydlkklrqsz65hl2c8p36ugmh8qkt5fwkl6tj5l9fx2nw8hsfll3sx',
      rewards: '229883408504004493',
      mid_rewards: '44339815627417276392'
    },
    {
      address: 'erd1gf5k6e4x2pajcmfnq8ma00thjmrz0guanzl984jjj8hhrhuejshslz852q',
      rewards: '229740914375161851',
      mid_rewards: '44329067474959471619'
    },
    {
      address: 'erd1m5plpu9nmq0tnx3yew2v95apuzlrdy780rsya5gr4q8dec2h902snylzxr',
      rewards: '110397208268681327',
      mid_rewards: '44327122212159014228'
    },
    {
      address: 'erd1qhau9fc755c9mffgd703vvlkj4t86n6k9yd5lv8fanq7ggt7c2mq096dxa',
      rewards: '110207310501502687',
      mid_rewards: '44312798463036082331'
    },
    {
      address: 'erd1yydw8vsg5vx9yc9kd7y2mzl0yetzh44n5e6m4649fua30twx827s8racz3',
      rewards: '109893036899778694',
      mid_rewards: '44289093201547567907'
    },
    {
      address: 'erd1w3nj5ces3f6x7zsr6cjmhxju3j893hwepz7nhmfrxkfd26qjcfesyx9f3u',
      rewards: '109312463972735663',
      mid_rewards: '44245301317745650228'
    },
    {
      address: 'erd1z8y4cwnwrkn4xtdj23zjtv7e7u75naupldy00vs77xvkwg35w8hqc8axzd',
      rewards: '347302493688441639',
      mid_rewards: '44196589160956895569'
    },
    {
      address: 'erd193jj6urll5t47ur65ryx08puasthnwz2xsnlph494zll7a54fpms0hsxlh',
      rewards: '345746797886430937',
      mid_rewards: '44079244988296680642'
    },
    {
      address: 'erd1n8vge75kse85u6wj7t5x45z5eupzxs7clpswnd0tvujd40zzn8mqv75hz8',
      rewards: '106200367713079051',
      mid_rewards: '44010559821139206122'
    },
    {
      address: 'erd1gr567fh8te2dlx83ghlrd4qpmkdj2jxsfthkmusp39c2ns6t59fqpsqp7j',
      rewards: '106169775361861304',
      mid_rewards: '44008252278662883013'
    },
    {
      address: 'erd1s679xr73jy3d0wdv27rm2z4fp3d23nuqch04h775ewzdkskgh2wswru7tx',
      rewards: '105930695874513731',
      mid_rewards: '43990218814404273230'
    },
    {
      address: 'erd15kch8438chy6324lvxw5lkh8t7kt2jvpzl0y2yusftmfljq70rdq8tpess',
      rewards: '224926483904749822',
      mid_rewards: '43965921055427806321'
    },
    {
      address: 'erd172xzdrryvy9n7at2pap9vrprxcfmjejaurkch0ufan00crtq8k0qqac88d',
      rewards: '105060052313709498',
      mid_rewards: '43924547268468062345'
    },
    {
      address: 'erd1f3wt6f5tdcd5tfzqdad6t8vn7acyfevdveqh2fdvvkk746yglvvq0apmu5',
      rewards: '104809381201509649',
      mid_rewards: '43905639462563534463'
    },
    {
      address: 'erd1pm85v6phvry0yvgquw2dqh29a7yvpw8naw7uhmf33h6e7gl24ayqffurpz',
      rewards: '224058411256395665',
      mid_rewards: '43900443430175861664'
    },
    {
      address: 'erd18dcekhd8w8eyxe25q02zxtl3qlyez682w8tz04wcxxxe7eugjq2qglgclk',
      rewards: '223410632051889901',
      mid_rewards: '43851582261610017495'
    },
    {
      address: 'erd18x04jg3mkrfgv30s523ch9al5jx3vuz7wtzckddd0v9xxa0c3dcsch404c',
      rewards: '223035254107289328',
      mid_rewards: '43823267976589054758'
    },
    {
      address: 'erd1lug9uk2kz7snxjynl80fxkuh8yn303d67jqmh49ys09w9fjxgekqsq9sx3',
      rewards: '103428620637913059',
      mid_rewards: '43801490434348840260'
    },
    {
      address: 'erd1hzu8vxt8tmmd4xxqce0vjwehrjusqzyjemwrt269rwud7mspwnuq3lagpa',
      rewards: '340337308544274802',
      mid_rewards: '43671214028420634630'
    },
    {
      address: 'erd150kmg6jzn9mz74p73zuygnft5ntsnkdgudnts55az98f6s3p7j6sl8vvp7',
      rewards: '100602252984520188',
      mid_rewards: '43588301086217721500'
    },
    {
      address: 'erd1mg8h3mq95et4egmjjyh4kfsrx7n4myw3vtgs4tmvxm7suzd9qkyqap4uhs',
      rewards: '100412503833883854',
      mid_rewards: '43573988547053174770'
    },
    {
      address: 'erd1rgpljex84zgxudd7r87z5jrcvpd4j65xvv7cqgge6dzwyxw9gaxswf9tl0',
      rewards: '99997827379711616',
      mid_rewards: '43542710025009455804'
    },
    {
      address: 'erd1d8qdylj00l4jzzpdl6s38a8sn95pwpmna0cfqsvkczcnv7ndc6rqrx3ug4',
      rewards: '219132688211761695',
      mid_rewards: '43528902352107212417'
    },
    {
      address: 'erd1w3le9pmxf7ww6tflj2z436team8qkyqcthjj2ydk5f5907cp6zuq4t8hke',
      rewards: '337785476353263276',
      mid_rewards: '43478732544036008690'
    },
    {
      address: 'erd12vwfkdcm4cptpspcwgtelvxep3m9twc83azencupa8mdk3wk0t4q54u42j',
      rewards: '217002820348397589',
      mid_rewards: '43368249104872749932'
    },
    {
      address: 'erd153xzfakdzndhpq59ejms9dzlnxwkryl2k2dn4vdv93lndx0584wq8a9mvc',
      rewards: '216563838487678935',
      mid_rewards: '43335137256661618877'
    },
    {
      address: 'erd1zn9t5aed4uq4nc8n09mgazmhg0egnh26xkrhrj5j4dwn83adym2spl0h28',
      rewards: '96864159796433668',
      mid_rewards: '43306341430663042345'
    },
    {
      address: 'erd1h4gy2vdax87kw3d8dqcdu4cezdp8qqnpzsp70sfd2w7rr0n7rfpqfcj8ky',
      rewards: '96622403020580022',
      mid_rewards: '43288106021908399476'
    },
    {
      address: 'erd1n6zcd9h2qzlx8wz64yqzrh9qa924twuf5qe7m2fjn9nz378urk6s88f8aa',
      rewards: '454524368814996269',
      mid_rewards: '43284199998204547359'
    },
    {
      address: 'erd1fuflt6f32myfxeaz7kxfy3kwpu2gmkdvu96ddd66dn606dgj480sazvpqz',
      rewards: '215010012332174815',
      mid_rewards: '43217934109079827615'
    },
    {
      address: 'erd17lq692qft0wf6hux3gs9582jw4u2fr3nj76xeynznt97tu7n0mls27859p',
      rewards: '333601880572194202',
      mid_rewards: '43163169189657979079'
    },
    {
      address: 'erd1khf7vpz7auuergggdnjdawgyukpkgmfkrcjmhhnrve2uxlgd8fms57hetz',
      rewards: '333560259456345510',
      mid_rewards: '43160029761372483118'
    },
    {
      address: 'erd1e8gvkxahwztrktu358225mejfwm6cgqktkg0wj2cen7064e845tqg6cxdc',
      rewards: '213780085292870381',
      mid_rewards: '43125162263405969063'
    },
    {
      address: 'erd1wl043yfl5jl4n3c6yumzmh84yrjz7nv96gnycplkh6pts7j0nn6snp0y5a',
      rewards: '332107229140915251',
      mid_rewards: '43050429516906951078'
    },
    {
      address: 'erd1y25l0ax9jud9ejyztelska9vq767y4aas5d3g6gfv7shrwja239q84yyd3',
      rewards: '93309067364228853',
      mid_rewards: '43038185291366090360'
    },
    {
      address: 'erd1cn7tmexeg5gunyr55usrfjs66zg96zjjusylwwtzadkeys73dt7sd69rs2',
      rewards: '92721348603723780',
      mid_rewards: '42993854406356811173'
    },
    {
      address: 'erd1esuvngtt6q670dm5mpe06pnqc447fchfgpdg26c6de8fkk98jryqks4pfm',
      rewards: '211944561608330231',
      mid_rewards: '42986711026421071978'
    },
    {
      address: 'erd1j8qly5zmvqg2hjzqffncjxnsfslh2d37ks4q2ljfmprfwn4wug8swp9uqa',
      rewards: '331200654503242438',
      mid_rewards: '42982047735150546663'
    },
    {
      address: 'erd1put9q8k9aekgg4vslf5dnyx6kjsvhy4wncx3mjecez7mkutks6lqcg7r2f',
      rewards: '92173806109728304',
      mid_rewards: '42952553966469291419'
    },
    {
      address: 'erd1079hvwk7cmlhqqjvexv8nm3ucedcezyjcdzhgk30aqdshc9lcgxq0rq4xz',
      rewards: '92116096980731037',
      mid_rewards: '42948201039638497458'
    },
    {
      address: 'erd1dxp98rqz4g4y9zkv47heaqfxz0ralc966q99sqrujhxetrmdyp9qlxknye',
      rewards: '91268608218669478',
      mid_rewards: '42884276030973944116'
    },
    {
      address: 'erd16pyfwvqn33r8s9fh24zv7ja2h2n3jhu7vjqhpjpr3swxzrf2s6tsq9fs7h',
      rewards: '208773378271562370',
      mid_rewards: '42747512666095147231'
    },
    {
      address: 'erd1xm0k6xnxqamh9q9hgvxkrwwyl8v5rp3t39qma4e22hcv3tr9jktsn6mfal',
      rewards: '207791711305157532',
      mid_rewards: '42673466764671646265'
    },
    {
      address: 'erd1vmjgg4jsqvgc39gw0g2vrdwn0auygd9xkr4j8yht9t3czhr87kcsswd7tq',
      rewards: '88391695440831595',
      mid_rewards: '42667274127841814474'
    },
    {
      address: 'erd159pr0quygtjt0w8rpqtr962rjd6glr8mepkrvqsy9a5rav7r2y6qjghktl',
      rewards: '88158078789298104',
      mid_rewards: '42649652718400189813'
    },
    {
      address: 'erd1kh7ln2w0s02cn45y8x7am6s04as3jlfga2r5lmsuu6ftqlsgh0rqaqlfqv',
      rewards: '87970381082934617',
      mid_rewards: '42635494917090334621'
    },
    {
      address: 'erd19v44y5l6rt7sfv0uqh2rtt5s3x6wmtur7s3hh5ntj0llmy23muhsm6uams',
      rewards: '206617800454762555',
      mid_rewards: '42584920149492504521'
    },
    {
      address: 'erd13u8yjfqy55p3xhtklnv9d7y06mcmf9wlvn64p9vp90phjtfyzd2qkzcjhx',
      rewards: '444554026032267680',
      mid_rewards: '42532149614404654026'
    },
    {
      address: 'erd1nszgu59m4mx2sqf7w2vlnzgwuzrvhte8705ff46yd5fekczejmysdztedl',
      rewards: '444178258487137604',
      mid_rewards: '42503805942307025386'
    },
    {
      address: 'erd14tt938mjmzadz3xfszjq6hgp0lwprxkk8eddfekymmvn5j5z6d2s8utw2q',
      rewards: '205397137446787305',
      mid_rewards: '42492847078020142419'
    },
    {
      address: 'erd1knrkn3xkg8vh5tggye46qresqelu9kages98pyvuwc30g9dtf0mqc9u8tx',
      rewards: '86040423477760922',
      mid_rewards: '42489920648550372951'
    },
    {
      address: 'erd1cdun6xr8e3697jp0ztfpv07tz63pt3eu8s7tcgqvjne2wlzpkskqcsl0tr',
      rewards: '205286462340311013',
      mid_rewards: '42484498994296604584'
    },
    {
      address: 'erd19zx44hvg705phn2t5yzw6cfh2cxpy5a53rtd0w42e7etdyamzg7sglaxhp',
      rewards: '85709833502441253',
      mid_rewards: '42464984663575991330'
    },
    {
      address: 'erd10tngr5gtkxgkf4leehryxkrca32aucksjkq6hnhpmy4d75s6y7eqsk52ja',
      rewards: '85338515376930453',
      mid_rewards: '42436976605589660831'
    },
    {
      address: 'erd1ete948n8jh4aq0c26sla4nfus2dm206tyylcr4y929l73887g0nsnsy93r',
      rewards: '443201928023272509',
      mid_rewards: '42430162566540928598'
    },
    {
      address: 'erd1wuu23pv6yfxf7eajl2hqhf4y5fqulmwahkj2glsfhcxx9qp9t2nqlgm2rl',
      rewards: '84761882641051510',
      mid_rewards: '42393481925438788175'
    },
    {
      address: 'erd1qneg64vtnj526skq9yrwu30mecxrfj2shmf7334vhd3220qg0k4s0jnujh',
      rewards: '84714527310715791',
      mid_rewards: '42389909972585207165'
    },
    {
      address: 'erd1hrq6gkgj9gud96tjuqe2yj0c6cgww6d8cr839pnzedtr625dfqfsplwsvc',
      rewards: '203123982142195390',
      mid_rewards: '42321385839775004988'
    },
    {
      address: 'erd1xyp65fcwm03dzpsr32vrre792l5ytz33mxh0wjh36pj3lvz0r2lqv0nx8l',
      rewards: '441454915824247985',
      mid_rewards: '42298387639298163401'
    },
    {
      address: 'erd1z7yhj7fmz4204ramtmsngx76lxyz080ckrvsl03962tnsaj78w7srj7e4t',
      rewards: '83393277469365004',
      mid_rewards: '42290249763108289283'
    },
    {
      address: 'erd1dnm3gm04dhxt0egmrlucemccwghsusp74aclqlp5qlea8rjrsnlqayjdqq',
      rewards: '440348936782926193',
      mid_rewards: '42214965034817451078'
    },
    {
      address: 'erd1d5zzxsv5tahv6lq99465w0rqxgteucxz6n63qfles9uytq7cwmqq2d2l4y',
      rewards: '199809182866285775',
      mid_rewards: '42071354710254982379'
    },
    {
      address: 'erd1n7p389m7fpldyvwaytar3chkw3mhveuywpq00h4uvyyvcpzsh9kqfx9pvz',
      rewards: '80213097389241188',
      mid_rewards: '42050372789775646683'
    },
    {
      address: 'erd10pwlsdgsnqr6wgg47gvupcfrrm9h7a8gj96r693v0n95tyvemjzs6ks4m5',
      rewards: '199348483574363279',
      mid_rewards: '42036604743593170794'
    },
    {
      address: 'erd1xhvd8f56cydw0jn8tc8wh3qysh8rghmtndkyjuts5uun9fe5846sqz8uv8',
      rewards: '318214067170550507',
      mid_rewards: '42002485828340259654'
    },
    {
      address: 'erd1qkd20cfe9l7ee6rt8pnp545hmsu6sdnskcsrxvf99lsx4xppa0gqlzvzsw',
      rewards: '317840384331160526',
      mid_rewards: '41974299402967855362'
    },
    {
      address: 'erd1wpap6vwvuyrvcjxjepmrs9l7dfnpjfrtlva7phswtzz7jzm4yfgsxxcljh',
      rewards: '317822266879707265',
      mid_rewards: '41972932826450295347'
    },
    {
      address: 'erd1vs4ka4zjtsryu90aw9n5mwzup239ghrmf95faqvsz2apzyugnk5s444yew',
      rewards: '78974551961833238',
      mid_rewards: '41956950869954667197'
    },
    {
      address: 'erd1e5cef3l9dyglvgxcyq2zxxmkzs8u2l2tsapj8yz84ymf4m3xmrkqy7jhh5',
      rewards: '317289857609439016',
      mid_rewards: '41932773866545981956'
    },
    {
      address: 'erd18swhtp5u5e689nemrg25mhjyns065he2e2ss0sv5xl6wwvldhnzqyjgarz',
      rewards: '197960034507700323',
      mid_rewards: '41931875781287150915'
    },
    {
      address: 'erd1gwmlhdctux8wskm99m60y6zttphlnxu547yddcrkzhrxarx90wmqgyraje',
      rewards: '316364035496070008',
      mid_rewards: '41862940271968299478'
    },
    {
      address: 'erd19aau8dqhtuncxnt6zj45e2865ulpkzyhvez3vj2gfjmylt9eg9zsenktaw',
      rewards: '315825938943379487',
      mid_rewards: '41822352327522365592'
    },
    {
      address: 'erd1k3lutn98xan2m75ntq02z6rza7s7pfxset2f0nmrgyn9y6djymqqxut6s8',
      rewards: '77170954220920021',
      mid_rewards: '41820907766639898344'
    },
    {
      address: 'erd1gzrl7felg7es50uv8vjn5x7l8j8unvkj48xzln4f333dyfujtr3qg6av4d',
      rewards: '76424229002836330',
      mid_rewards: '41764583225037807875'
    },
    {
      address: 'erd1mn0lt9h0sr9cc69yw5y94vsrm4e69yxzdkzj0vj6d68r5mpmlmfqajlpw6',
      rewards: '313771945377842046',
      mid_rewards: '41667422182897768926'
    },
    {
      address: 'erd1mt9x22grrdzs5f0wxxuhvv34pd3lk4q37ajrf5zzpufswhnjkf5qjm264w',
      rewards: '194225108622321421',
      mid_rewards: '41650155031381834267'
    },
    {
      address: 'erd1203pylvwam9axfmm8rwntafnj6h6vtl5thncfnn0za4nhpdrqpvsmutqky',
      rewards: '74887403911098613',
      mid_rewards: '41648662446258088108'
    },
    {
      address: 'erd1xed6pxjqxw8rd420j3zt5lug6n7c0jvhd3phd9th87at2we4dtgs763lh0',
      rewards: '74073977991208024',
      mid_rewards: '41587306754826275140'
    },
    {
      address: 'erd1ssszzggdrgjlhxppgzhf2adk3wfz3va0uwddt7rh0gtvvaytxdhs4mnj6n',
      rewards: '72837345434565383',
      mid_rewards: '41494029120435050612'
    },
    {
      address: 'erd1vc6n958f0p55s5huksyqc7taqeq0nxksqg3xgprv2zwccy9ltanq473z90',
      rewards: '191847974791408739',
      mid_rewards: '41470850824010104791'
    },
    {
      address: 'erd1gags7st4afm7mldvqeugj5nzakynyyuatjp8gvmw6phauwyrtfpsjhftfj',
      rewards: '71993467331883540',
      mid_rewards: '41430376459254576748'
    },
    {
      address: 'erd1l67q7ng0wltz4fhf5pnpg7sn405cdawyqnrg60hk8uttqf336lyqanz8ny',
      rewards: '71750519775553176',
      mid_rewards: '41412051231430113280'
    },
    {
      address: 'erd1d958af30kmm0g35velh868mrc0d7ux63ejzw9vuem5whxkga6u5qhfcapu',
      rewards: '310320420516554114',
      mid_rewards: '41407078014879496376'
    },
    {
      address: 'erd1xup79ahhp8pke4yrks9uyklm2lay4lww2mk543gn5mp7s6pxdcwqrtzms6',
      rewards: '310253748301427897',
      mid_rewards: '41402049013764176801'
    },
    {
      address: 'erd1ladjz6v0l683kdgh206zkmvj8ffvsf60y2avrusljte63jy3882szs4cuv',
      rewards: '71040675917431043',
      mid_rewards: '41358508604303641373'
    },
    {
      address: 'erd1hh4ndnpkw4tsuusu0v2xzkxp93n49wekh6fpvr90950qjxzk76rswxeequ',
      rewards: '428802893690867695',
      mid_rewards: '41344061563595334987'
    },
    {
      address: 'erd1a33reqcl3d3q4nehmmgkssaxc3usm60kkf9k9qd7lmxyxq6ukfxsajx4h5',
      rewards: '70388916572101632',
      mid_rewards: '41309347218734306961'
    },
    {
      address: 'erd195w2c4hgeqyurple9679fzak792lc9en2j0vgrdvxzkpcju0u9jshuczke',
      rewards: '189198637225490840',
      mid_rewards: '41271014632147625985'
    },
    {
      address: 'erd1n8r30axayxh0325vacupj8jy6s0467u0dxtyvzugl9g2jf3dhn8q8eayj5',
      rewards: '307684226994223589',
      mid_rewards: '41208233261650570941'
    },
    {
      address: 'erd1vtw6ssw80h55jmytf4z9vrrpug3nmsd9j9tlu0xe4a96m026w9cq4unkjx',
      rewards: '68777292295705156',
      mid_rewards: '41187784431775291268'
    },
    {
      address: 'erd1hmqyx5a0apzt6j7t8kyt8869u9uvr0lw4n4tqquujc5zl5c9uv4scjxet0',
      rewards: '68677753762006658',
      mid_rewards: '41180276365693500286'
    },
    {
      address: 'erd1clr6ey9g0nvzc2swvme2mjshc5trlx9khr7x82cmkh0tun30ft7sdjgmkh',
      rewards: '187687866059315738',
      mid_rewards: '41157059068119880493'
    },
    {
      address: 'erd1ls5a0gpqezw9qxq0kehutlj4lfrpaujx750jcxtmjcezdqdcksgq3lsc90',
      rewards: '306809803260480492',
      mid_rewards: '41142276582036265527'
    },
    {
      address: 'erd1ex4mjsam6wf74gyyz68mkkeemgcqcznh645lu523nqfyxutjg9mq0f29k7',
      rewards: '306460325729721332',
      mid_rewards: '41115915932571720445'
    },
    {
      address: 'erd1melvxk30nxd6xxw90a8wy7ayrwmraqc34ftacc29h2ahhgp7pwps8hvkx8',
      rewards: '425763943396584142',
      mid_rewards: '41114837374922126078'
    },
    {
      address: 'erd1jdyc5x44kpjqsll5hd6qml72zf2w2rcdsplc2mtduksgsg5h55hszt0xgm',
      rewards: '305935179851438167',
      mid_rewards: '41076304841165923871'
    },
    {
      address: 'erd1hxnfzdkpr0tnl2c3y6aaq6sp90rnpvf25q028cfz3g6vwlghr34qvjpve7',
      rewards: '66479251153663626',
      mid_rewards: '41014446086191619297'
    },
    {
      address: 'erd1ft09fl9wzqerv92jgxc9eq96t5qlxx98cezjjwchl6kcm3nnc5as2l6dez',
      rewards: '66320809079424997',
      mid_rewards: '41002495000322473028'
    },
    {
      address: 'erd1snvscr0equx782etc3ldd0qnzl0kg8cua7tuumeg72e6vydfap4qjvdr5c',
      rewards: '185573866575388217',
      mid_rewards: '40997602752736772084'
    },
    {
      address: 'erd16r4cd95hxredazalnd9zvnpg0u0q7u05rx273qnrnug4jmte439sry94kn',
      rewards: '66250089085193656',
      mid_rewards: '40997160680333381231'
    },
    {
      address: 'erd1fmsxr9p33fm9fnj93nk8r4wvd4r8yq40wm9ywxs45ec8uxvzw6eqkxarad',
      rewards: '423399581081249072',
      mid_rewards: '40936496506865920202'
    },
    {
      address: 'erd1s4nt4j76q82980m9zgn6ztxwkd2fv5htpml4gt8dy50jjfhc72ns7hc4mp',
      rewards: '65330025906251991',
      mid_rewards: '40927761474917710739'
    },
    {
      address: 'erd1pl6gcg5wu63aglwncfmz65gkgv4x8mnvkfqxt37d2hzd3sy4wqeqvkx05d',
      rewards: '422714157866318328',
      mid_rewards: '40884795898061680766'
    },
    {
      address: 'erd1mg05q93dq4hz0ru4sn4ar52jedp8p9xfl9urf0qevm6h90ml50lqpv6x63',
      rewards: '64112931981663985',
      mid_rewards: '40835957614904742023'
    },
    {
      address: 'erd12usuucrk7ptksn7up5ytefsl0jgj6dtrkay0rn9vu5wl86dp7d6sqsvuxv',
      rewards: '63618165111941370',
      mid_rewards: '40798637973807654840'
    },
    {
      address: 'erd1nzy2e3aena4vy4ag04zxxcqj52wzhave3qhl3faneemjc5qgx4yqnlpx9d',
      rewards: '302204752005770915',
      mid_rewards: '40794923372724164666'
    },
    {
      address: 'erd1wlkpedg34k39qhyrlw9tgsq7tpn26l06tfpmm5lgd2g9pvnx9pzqyvq9ax',
      rewards: '63130101154150906',
      mid_rewards: '40761823924905440168'
    },
    {
      address: 'erd1gfsnazkcqg3qsyevawjurfljr60dslutezyqqca9smajzh0u3djsww75pf',
      rewards: '62890618414970263',
      mid_rewards: '40743760043869550305'
    },
    {
      address: 'erd1x0rfa9ptvraldzp3utw2etn4uc9sc6wtadeplat2qu97vnfw7gwq0rkjd3',
      rewards: '62472878997250518',
      mid_rewards: '40712250486347747473'
    },
    {
      address: 'erd14p0s88y7dxtrn8t52kxffy48w02u40qctevd7tzs3jl5z3z5qxmqwf50mq',
      rewards: '62435940742150661',
      mid_rewards: '40709464280343590070'
    },
    {
      address: 'erd1a7xm8xuqkawzv0ysyxqfvmfwq4gqht06vru5esjldhrpy43jhuaqfjws6u',
      rewards: '62179019952044803',
      mid_rewards: '40690085069115267141'
    },
    {
      address: 'erd1meth0v5fxnaktp0kz5ped22jkls5sx64pe2exsm8hzt7ug4lzarqw72wth',
      rewards: '181441947611689371',
      mid_rewards: '40685937315530071777'
    },
    {
      address: 'erd16m76yad20ffca0dyx4k74n7hcfwaysf96cvfwn2q5mn2rcshprmqadsvas',
      rewards: '299986834390797468',
      mid_rewards: '40627628643753888851'
    },
    {
      address: 'erd19kddd86nyneaszw77ayxkyfnp9q0a448ptt58sn9c67akl7tpr5stjhwfr',
      rewards: '179918983334486416',
      mid_rewards: '40571062040512640326'
    },
    {
      address: 'erd10nmqe388v059smp4kalhud9qpt44n8f6zwa2c2lsjtedd4emau0qrqnekk',
      rewards: '298858007362331436',
      mid_rewards: '40542482644413508695'
    },
    {
      address: 'erd14n9a2lnh6vjcfy9xxptlu9e788x7nlhrl87x3mkjh07p6gz02ksqwl0rs2',
      rewards: '298711315083364580',
      mid_rewards: '40531417830785575058'
    },
    {
      address: 'erd1uurzn5uc59ym3w7hlnr6lrsdqcq4uf4jad95p5elml2v2x8y2ryspfz6pp',
      rewards: '417647783938738727',
      mid_rewards: '40502645701248960842'
    },
    {
      address: 'erd1y9wec3675p3ewvwpg000ed5897t67pnua02dur7va43w96f02ldsrmzlr5',
      rewards: '297446941647650787',
      mid_rewards: '40436047736866424768'
    },
    {
      address: 'erd1unf39h3essqgn259u8ve3lwhf7098unv2k60mhvjt3uzax46ph3q7e7c35',
      rewards: '58731077536252274',
      mid_rewards: '40430011120443357195'
    },
    {
      address: 'erd1g07m80nyc46d3rfkj8hk4c0nz7ya8c0tjf35vg44q7u3fwqc0yaqyk0g2h',
      rewards: '177993570409675070',
      mid_rewards: '40425830571481705871'
    },
    {
      address: 'erd1kcgsgy3980x0pvklg6vw2kjflj4e60jucry344ak0ygvegeycm5sjm89g5',
      rewards: '296974481718655716',
      mid_rewards: '40400410680180037240'
    },
    {
      address: 'erd16elukt5054hyx2rfhekpws9y485kt0jkqfzrqxz0v3yxp7mqln4skk92vf',
      rewards: '177004972755641947',
      mid_rewards: '40351261897029791285'
    },
    {
      address: 'erd1m6tm29j22zsy4glzmsn08687f2ywc6w0fnw8t85lldnq83de7hds5s6ps7',
      rewards: '176217386596635131',
      mid_rewards: '40291855266178282736'
    },
    {
      address: 'erd1kvqdtymdfzafc66vu7dkq05hga8q6djs7denhjmac0tnsthtw3sqqkxduz',
      rewards: '176165946036280429',
      mid_rewards: '40287975169575721593'
    },
    {
      address: 'erd1tph85v5sf7dqd4uzjtpv5aptrc2pq7m20ss59qmnpcrg8mx92gds3zf4gy',
      rewards: '56245186837068019',
      mid_rewards: '40242503519637031359'
    },
    {
      address: 'erd1a0z4wz6uh2hadl6s3t4uzrm9wyq5ttdy88fzsqtyf6w8kmkq8uss7e5cnv',
      rewards: '414188089551368999',
      mid_rewards: '40241685316179864237'
    },
    {
      address: 'erd1svqjd0hkwuzlavhatrtuumw767x0ae5al4fj0v8ey7gyqvnjmlsq8zq5ku',
      rewards: '55523160648640624',
      mid_rewards: '40188041994697184367'
    },
    {
      address: 'erd1536c38whtejnps5t8n6t48h4h6stklpjc3jkwmg2na442zusmmvqet0pdv',
      rewards: '293748434882130633',
      mid_rewards: '40157074035248642542'
    },
    {
      address: 'erd15h3n3pnc6kmhern2wjxgdukn6j5rv9367sk9w9x5dvcdan9q600sswctvr',
      rewards: '54864638564292160',
      mid_rewards: '40138370504251252577'
    },
    {
      address: 'erd1as5y8wc2exjx6e5pae8wdkfphxfkwme6zug9wmum4y35828x3y2q3ajv3a',
      rewards: '174131874782418804',
      mid_rewards: '40134547739799398000'
    },
    {
      address: 'erd1ah7tzauaz4nzuayj0clt24m2wgqfl3pc804pwf4rhtawta2r2sgqkqzxh8',
      rewards: '412583417296087304',
      mid_rewards: '40120646911407247675'
    },
    {
      address: 'erd18aag3vsar6cwvpew2hxtyvf5pg9msxgf70ef8f3kwseezqj69p8qwtwhkm',
      rewards: '173793928678107963',
      mid_rewards: '40109056891291068910'
    },
    {
      address: 'erd1yhns8why2ljnnkjtyvsudrhynw5dr9pk2mrru8rm7x6udkkswc2svpf96j',
      rewards: '173055402848490285',
      mid_rewards: '40053350819221788420'
    },
    {
      address: 'erd154ks2e3s4vsujw695cumv5yqs4ts0nczg7s847v3jmyrzh55l8zs3qyk0q',
      rewards: '292300577959041541',
      mid_rewards: '40047864013243913130'
    },
    {
      address: 'erd1483ufqfdwy5nshrlgrm5j4q2cnwcytwzt3c0ns89zzn6gsp2se2sujt9yc',
      rewards: '172499004598607712',
      mid_rewards: '40011382400834545828'
    },
    {
      address: 'erd19qywtq93fgxzmv6a5phxmuuddtd3men200vp2r82ce0kll65capqevm03g',
      rewards: '172491664534205731',
      mid_rewards: '40010828749032304074'
    },
    {
      address: 'erd16f9z4x3ezceavxy0d8l9ywattvc32d5ggg3afmy22kluxzd987rqcjvyhw',
      rewards: '53168607247569251',
      mid_rewards: '40010441000675144322'
    },
    {
      address: 'erd14k9ucgwrq9k5vv6axgl2eec68p85khlq2get08vpcz4ac2eyjenslqjanz',
      rewards: '172255194871707384',
      mid_rewards: '39992992140571161043'
    },
    {
      address: 'erd1r65ttu4ycea23f6xsnmkkagldytklxs8xq2utha29r7vwwgud56sdjk7gj',
      rewards: '291517457636889567',
      mid_rewards: '39988794234835079827'
    },
    {
      address: 'erd1gm0lg6lqcxeuvqahneg63agcuvsmaszju6mphaw3umm60rxckarsggtrsu',
      rewards: '291370421033596812',
      mid_rewards: '39977703449257426211'
    },
    {
      address: 'erd1wm6zgztk25l5gea659sl7e826wcukvl5u3ppdwg2ejgm4remyecqtys28r',
      rewards: '171928709770225366',
      mid_rewards: '39968365781054231421'
    },
    {
      address: 'erd1z0y4svjwhnfjlgh54efx02yn49l57xje4k9wylsw3xsxau90xw2qe43jj4',
      rewards: '52424648904073410',
      mid_rewards: '39954325160934270032'
    },
    {
      address: 'erd1q0qz0g89ymxv83rpkgs5a5y7phdksvyej70uvq07vepqqkcrq97q26tm8f',
      rewards: '52094096603257495',
      mid_rewards: '39929392017700200163'
    },
    {
      address: 'erd1q2svunh4pnrvfcuaqlrr293kvmstr3edksat47xmfww83fsvqdrs727fnl',
      rewards: '171269035739084443',
      mid_rewards: '39918607400714314586'
    },
    {
      address: 'erd1w3qyrqjrn933skkfus7l3wl0kkwgwwuzm246dceelv08luvplrvs2u9vkj',
      rewards: '170126234714622341',
      mid_rewards: '39832407360476738059'
    },
    {
      address: 'erd1hjsp095dp5gnrfuw6jcds2gax8gncfp5wxkxd6vumh9u97zxdumqev3fw6',
      rewards: '289012877250151733',
      mid_rewards: '39799876894463719440'
    },
    {
      address: 'erd1g43jlqzuzcjhutcdxmyjv3t65gt7hgjwl93tp9qmdcjqzvxldduqq3gfrv',
      rewards: '288550687237980643',
      mid_rewards: '39765014484653309650'
    },
    {
      address: 'erd1z3cg3c0cc9hc92wdafw6egdqnl48dhnv9df0nsvyqhd2n5rwnkzqw6cg74',
      rewards: '168908835795039523',
      mid_rewards: '39740580495075900157'
    },
    {
      address: 'erd1sa43pf3g48qzecxt4ygppevpqww4adnlfrwt36wg8x77y3tf389q62sddw',
      rewards: '288211864516413347',
      mid_rewards: '39739457514010714061'
    },
    {
      address: 'erd1qshenmx20p52wt6vld9284fpu9g07hrd3mmpwszmar4tvl36vlmstx5gmd',
      rewards: '407418868118159830',
      mid_rewards: '39731091479256815254'
    },
    {
      address: 'erd1dccq8s7vaqwvys2sh5czk0c9eunjykl5q0z075k06zuqlqpsytvq5k4dfr',
      rewards: '49372169510516438',
      mid_rewards: '39724080489362652977'
    },
    {
      address: 'erd1eszd8znk2aa4en3r0zynan3rjpnhnkpy6dq7ea0lla53twwalzgsv5kcju',
      rewards: '168328813213312212',
      mid_rewards: '39696830123127178404'
    },
    {
      address: 'erd12unjcwyr8spxvx3anue2j5tzh3mxjq2qpxt8hvtdyn0auhrp7aqs96z0fn',
      rewards: '48694014029803814',
      mid_rewards: '39672928076586092838'
    },
    {
      address: 'erd1m5gmzjgqsk3qm3h5nkmj4845jcxdumxpyvsg6qyhw89gqmxsk7ls9nxyc3',
      rewards: '287260540089224994',
      mid_rewards: '39667700312059286405'
    },
    {
      address: 'erd1dlw2crzefqwuehjj84prajmch2p45tv59mwzt0kvnrlhe3wpkdaqdchvl3',
      rewards: '167859351332681575',
      mid_rewards: '39661419205448471632'
    },
    {
      address: 'erd1dc4vhz7henj6qvy7evnu8p6thvpvlckaglj288m90qq7fdqhp5lsa2rczf',
      rewards: '167584426156063310',
      mid_rewards: '39640681946048505827'
    },
    {
      address: 'erd1gplfw3eduvnpww6gu7zf2gp895hssk8akly8gvamhef6w4nxadjq60s2tt',
      rewards: '286894580393088185',
      mid_rewards: '39640096433643818335'
    },
    {
      address: 'erd1y54s62cx3s4u2qupecd7gf7y05hj6ruvmmnl50vv0ckk7dk7lfsstclawv',
      rewards: '405797758810976955',
      mid_rewards: '39608813248385919030'
    },
    {
      address: 'erd1djrw638025pkthz74kmdwu78vlqu79uc5g46t0wgcf53pgtvf76qdt6w44',
      rewards: '286461606505237308',
      mid_rewards: '39607437759250231245'
    },
    {
      address: 'erd1ff5uhygwh6zp7eww4rgg3r8g6kx8qd8d0srfxmsa7a8qlzsnwmxqqt7h7a',
      rewards: '167063101595435198',
      mid_rewards: '39601359091814863673'
    },
    {
      address: 'erd1af2nxtgzs3s5gcuq7x0lmu9fqwax3sgf6pe6czle864z9whepu8sfn5fq2',
      rewards: '47396552792591854',
      mid_rewards: '39575062211522654845'
    },
    {
      address: 'erd1cxm6vtfn83g6dg7tfmea59pngwd8338yee0nmxjqgnlm49u2qc6q30k7kg',
      rewards: '47388919243870807',
      mid_rewards: '39574486422568300811'
    },
    {
      address: 'erd1evsgjs94d038dyucn6mm7kht5wpwaqakmfauhnutnp73pam0kclqqpyzer',
      rewards: '404402097773860032',
      mid_rewards: '39503540296242633491'
    },
    {
      address: 'erd126uycxfhmxrmp2egkgly0p7feqn53vlncku9trgw543mggjgxkdqkmn7kh',
      rewards: '283264718723955388',
      mid_rewards: '39366300545087139749'
    },
    {
      address: 'erd18capes2ssl8j4n9qg5rmv893n6d9csytk5unpdj82lp224xm9nqsk480lm',
      rewards: '42799879806048367',
      mid_rewards: '39228340964413578868'
    },
    {
      address: 'erd1hkyqalc3dtqzdf9w9mgjkfyu0cx8rfyl72q4zt0mddfntns06a8s7lu293',
      rewards: '161999557001207574',
      mid_rewards: '39219422308049179413'
    },
    {
      address: 'erd1g7khxnqe6dfr504u990mq3hfyxxzkzrvvgxgxygcvrud6scnx8nqe82dvn',
      rewards: '161355651765838421',
      mid_rewards: '39170853348090351655'
    },
    {
      address: 'erd1na7tdysfnw32ecrn2hgt3wtm49excx9s3vxxx8p0v2528x0pdnsqyslq44',
      rewards: '280654712563107822',
      mid_rewards: '39169431071513401469'
    },
    {
      address: 'erd19fj6ch4mhug39ullyuvajfffvw76uysexjqrt2gcds85j00fevhs7xt5hl',
      rewards: '41780273336917474',
      mid_rewards: '39151433334140019420'
    },
    {
      address: 'erd1kpr4hz3q8jhhnj76tyea9zv7v8cteqm2p56djxy32cekl5pd5qvspjnp2v',
      rewards: '41149139834970292',
      mid_rewards: '39103827729928440566'
    },
    {
      address: 'erd1afdc3uecx7vt43let7zv8rrw6gax4rn82vnldfcjz3j4a99au2dshzz8tl',
      rewards: '40782276553763378',
      mid_rewards: '39076155695230527977'
    },
    {
      address: 'erd1xzanycpmj46c658q2u667xklr4rtyqc803wklnmrkzr92p3hfdrsm457se',
      rewards: '279047306750447359',
      mid_rewards: '39048186477954637787'
    },
    {
      address: 'erd1tfjlg2pkvav903s6up4elxtecnyh74gslqxdeur8328v3jrcce5sfa4q34',
      rewards: '40167716635012420',
      mid_rewards: '39029800215500652113'
    },
    {
      address: 'erd1e7ceuknx0szd726qeqcmvhpecyre89vrgc9xy3lc4lmk6aw34s4qjmd4qs',
      rewards: '39793495090792146',
      mid_rewards: '39001573156302189352'
    },
    {
      address: 'erd1amag4j4rn2hf36tn7tufhnm36uudq5w6vsw5y7gh5pzt5h3eqqyqjgrkw6',
      rewards: '39608272340353466',
      mid_rewards: '38987602037796897630'
    },
    {
      address: 'erd15k0rkzkzygpuaff4x3c96csqtj64mv74r55dmgjp20rjkrla5assfc0ury',
      rewards: '278202199441232526',
      mid_rewards: '38984441099275372825'
    },
    {
      address: 'erd1e3kffgj6pjxr9v57lechcmalagjps3jrxnr4kk9xpumzylhs9e7s28l2qy',
      rewards: '158771540283987523',
      mid_rewards: '38975937077500923380'
    },
    {
      address: 'erd1m9hkxg20avlf2llwqvvgchft32wlplz36qu5tygljeaxe3ka7zqquthx9w',
      rewards: '158348510397043026',
      mid_rewards: '38944028466556619520'
    },
    {
      address: 'erd1cmscydaj565qj7wwm0w5nxlpccx4nknjzlzxc3y22lgw39mq8gtq5e7xdd',
      rewards: '277066822396282918',
      mid_rewards: '38898801040451009625'
    },
    {
      address: 'erd1n97t0cezgxuq7at78p0hfufhkdlu2agp5nmefnq9ecxgm5pnst0swjrv2k',
      rewards: '38237354756426540',
      mid_rewards: '38884195453126985899'
    },
    {
      address: 'erd1twrklzzf3h4zcpstk39x6zqzjr3rcfyvfqmw5f4z9pmk3f9ecpusarex4g',
      rewards: '36733649197384794',
      mid_rewards: '38770772838935792109'
    },
    {
      address: 'erd1mrzyvgmzfk7pawa2x43rlp643qa8czaxevv5t6ad2e7yny29zcfqw4zaak',
      rewards: '275294912974683419',
      mid_rewards: '38765148147104060282'
    },
    {
      address: 'erd1u4k3qazgj2l942z47838qjjycn229wx4huj40kkjvs0kq68jv4es8740wa',
      rewards: '155729023974027257',
      mid_rewards: '38746443908761858148'
    },
    {
      address: 'erd1q39hfgpn6j5e8ww4d025kyu634t9mvu0gjjerdpa2prn6f2fjkhsnjeh8d',
      rewards: '36234730209927723',
      mid_rewards: '38733140008833690054'
    },
    {
      address: 'erd1j7pfxvmpu7cuge9y5yek428n3klkzxj8l258nl32gh09uz0hfuqq7eq6xs',
      rewards: '155303461862251491',
      mid_rewards: '38714344295291590752'
    },
    {
      address: 'erd1nj9zcjnl9fylclqe2y8nfzkj65pwuu2d8al6xzsxyd0nmef8yncsse6v7j',
      rewards: '155285697026700727',
      mid_rewards: '38713004316146918075'
    },
    {
      address: 'erd19vavepymr7u37zf258rjcgkgywwpj0sd4axcawjp7hskgjcj6vksnke67v',
      rewards: '35211928652948147',
      mid_rewards: '38655991377112613791'
    },
    {
      address: 'erd1m7qegz9v8apn3yelz9d9jakts93548ern7yaxd3xmqk3m6c6svvssgfv2g',
      rewards: '154380160344983515',
      mid_rewards: '38644700826099413511'
    },
    {
      address: 'erd14u4vqsjpnax2vtqu465r0da7elna7pdhxk5zh6kf5lq3m847rsjsxyed2n',
      rewards: '273155788831534652',
      mid_rewards: '38603796710357330253'
    },
    {
      address: 'erd1savfs7y62dzxnue9dze227urlhlc29t7y5vet7a8w6cwplp7fmrslnq9y4',
      rewards: '153291138829794482',
      mid_rewards: '38562557306431966558'
    },
    {
      address: 'erd16zs9qsdraf6mp7zzyuvxj5v2efx29ksl5m40pr3frxrxsrdqur5qez3z34',
      rewards: '272392656012059563',
      mid_rewards: '38546234564071776773'
    },
    {
      address: 'erd1ujjfhzgk8tgwd9a3xk4c2nhy7h54yhdy9j6vk6n7p4e6dun50jrq68ny40',
      rewards: '152775489864892246',
      mid_rewards: '38523662555227172321'
    },
    {
      address: 'erd17360dg3tlg3hjjpzqq0ljhmwswk0ax9aejue0nddslu25y007myq66tzln',
      rewards: '33267492286704405',
      mid_rewards: '38509324993882419187'
    },
    {
      address: 'erd1g2h67psfmm7hd0k66fkjpltjcnauunu6kr2gsk829pg6cw6agy7sk53w9g',
      rewards: '33258709558820646',
      mid_rewards: '38508662523792902026'
    },
    {
      address: 'erd1hw28qc5mxuwa838fxpxv3cs3s32vq4udy26lcnmdqpznczp6784s66nxsk',
      rewards: '271871996694642948',
      mid_rewards: '38506961888294726227'
    },
    {
      address: 'erd1ku6dsr250y8r0mr4jwnez3s2zhx8ruljqpd3d6zg059cy6j685yqkfdm6h',
      rewards: '391028147139998548',
      mid_rewards: '38494760064078558474'
    },
    {
      address: 'erd1qrk3w6myana6wr64ltz266cm86l93ttk0ht3ajdmfgcsjhyzgclqq768u5',
      rewards: '32852110105788821',
      mid_rewards: '38477993239760349755'
    },
    {
      address: 'erd1uef6jvv9rswljp6ru44s9l4c2w0m3g3qvwg5khrl2gnkf8myvxxsyu028x',
      rewards: '271378470838453729',
      mid_rewards: '38469735855283582495'
    },
    {
      address: 'erd16eluwqj67fue328f82c35j7cvvpufkkrz9ya8ss9uf0lz99qppgqz2d2v5',
      rewards: '151626683612364935',
      mid_rewards: '38437009548209048419'
    },
    {
      address: 'erd19jwd7wqwxhnutugxhejmm60ujxkemy4qm2vxrht76dfxdam3e2ksm2gast',
      rewards: '32247146254573019',
      mid_rewards: '38432361579304299174'
    },
    {
      address: 'erd1c3ypg5e8nv5ddv57amghwe0uczzecgcf5gg0cxn8my0tsytey8yq69j0x2',
      rewards: '150969721695171673',
      mid_rewards: '38387455739204309823'
    },
    {
      address: 'erd134c6dt53art9g9d6ylnlecyjx6mu7y4hk94aj0392f3fvef7wgfqws020l',
      rewards: '270188652698306601',
      mid_rewards: '38379989373297048264'
    },
    {
      address: 'erd1tx0che92urmxj6sg4p0y49dtjjkqa5r905u9g2w7uww94k3ywufswxxn90',
      rewards: '150581738457970431',
      mid_rewards: '38358190652857372139'
    },
    {
      address: 'erd1r54w0le4gxf5mg3c9p86cdzd34wc9q2j2gdwyn50rtahhqndusyspv0ruq',
      rewards: '149720715097811168',
      mid_rewards: '38293244746525028685'
    },
    {
      address: 'erd1mh7mhy084uuw3nezj5frqd54r8fyhjkx2chh928s60zwkptyexcqxlrp5a',
      rewards: '268687750266566388',
      mid_rewards: '38266778195463550185'
    },
    {
      address: 'erd1qddrssyefkyespj4qz6jupghl9m7dx7zqzd3a5mdnz64h7ncuafqgzesgx',
      rewards: '30014539599769369',
      mid_rewards: '38263958874582067028'
    },
    {
      address: 'erd1np3z442rsftarz0hqlqgpmufttw4nez4g3ysvt9rm775jlxzntzs8hutt6',
      rewards: '29370286503428977',
      mid_rewards: '38215363675908820898'
    },
    {
      address: 'erd10zwgw6waxuqx3ccqw5d7n365m3r0k3mvfln7hk9a03nqw6h9e98qpy0cex',
      rewards: '387070902939894019',
      mid_rewards: '38196270124030172639'
    },
    {
      address: 'erd1lypl3def4txl7999d2vw78ej3mhg8pkuugsmt8s8y5z6vr48tkvqp5xsg4',
      rewards: '147435287214888070',
      mid_rewards: '38120857803171720984'
    },
    {
      address: 'erd14nud9t22sljwhvrqlvvqln329tg94wr55v4ve4056myrlx4ppulsqg3lwv',
      rewards: '28105088813369298',
      mid_rewards: '38119931409523720280'
    },
    {
      address: 'erd1cd245ljk2u44heg26q0jleucmle6de94lyq3zt5kdhhkn5u5t4wqlfemev',
      rewards: '147224030643273738',
      mid_rewards: '38104922986363012582'
    },
    {
      address: 'erd1wrph30m28z29as279d7kx9954e7nggj953g3n7x27cf0w5sw5kdsfp34ey',
      rewards: '27803541930461591',
      mid_rewards: '38097186108387509999'
    },
    {
      address: 'erd196p7qqjl0zhs9lyfaj5a924pmv57f3qvu9mx2nravl46l8m496cs2xzxjw',
      rewards: '147017336767923369',
      mid_rewards: '38089332327980072630'
    },
    {
      address: 'erd1vgjuspq60c8x579cwtr73depa873xhrgs5p8sfzq2mmh68feqmls3z63eh',
      rewards: '27509529954559135',
      mid_rewards: '38075009155785415487'
    },
    {
      address: 'erd1grkdlq7up9kqkvcl6alj9ca4rkuxrdsgxvlfpusxh0k54zf5mmtq6a8tja',
      rewards: '146730745421108889',
      mid_rewards: '38067715104072894837'
    },
    {
      address: 'erd1j6kqkc9nksrwejm86xkxr5xl6mdrzsfdrsgky8z8z3w3esq86hqs6qvtyr',
      rewards: '385299382149367468',
      mid_rewards: '38062646544635003710'
    },
    {
      address: 'erd1nl5ev8stdcfnv8tdkhf0pc7m2zv5eqgpfxlny6un4hfw6hh6cdnsughhkm',
      rewards: '27297414377026557',
      mid_rewards: '38059009545243474324'
    },
    {
      address: 'erd10jh778wrtlyj3dvservc7spsfvt87rmp33jzjg3jcjhvlgj3dpgszlwrfe',
      rewards: '27123262911928275',
      mid_rewards: '38045873519830852162'
    },
    {
      address: 'erd1yyn0337a076tkczy7e599gwh8ylpfq0g880lm2musf6k6gf4949qsgc28z',
      rewards: '265491537831650003',
      mid_rewards: '38025691921825219610'
    },
    {
      address: 'erd19p39h7k9e03cm5ap0np36kcwvy4wuhm2hsa7php433pg3sjnqujsu2ejrz',
      rewards: '146171381522320684',
      mid_rewards: '38025522990528294184'
    },
    {
      address: 'erd1c6ahnulylwzcp0qaff2zpep4ndhsg07scwsf7djdf5x3j4h8m9zsn90avc',
      rewards: '26759371853532868',
      mid_rewards: '38018425676151728289'
    },
    {
      address: 'erd15jj8p6dtuzd037mmz4wnawmlquzgc2acaxwqkzf9vgy0h40p9lgqxsf5cj',
      rewards: '265246980928135499',
      mid_rewards: '38007245302971994689'
    },
    {
      address: 'erd1yzgrggavx6ghx93qa9amfggzvjpx4t4qf8lk9mhuv84l8fnx5ufs4r70ke',
      rewards: '26085659862865671',
      mid_rewards: '37967608430226187875'
    },
    {
      address: 'erd1c5u9snypkanmmzw288qupes9xd0slj3u936pze85ekfnetllfqnqw5559x',
      rewards: '383868326978177474',
      mid_rewards: '37954703857589521226'
    },
    {
      address: 'erd1gnnzwe6840l6j6x24unwju59p6xsyjxqwmek7daftl04a56py6yqrcp37y',
      rewards: '25157334018336318',
      mid_rewards: '37897585982364209999'
    },
    {
      address: 'erd1uvn7nvq485aythttfk4yw782shqey68tak37ksdf8p2ta7v7sqes0k354r',
      rewards: '263723984964454436',
      mid_rewards: '37892367637883475244'
    },
    {
      address: 'erd1jpk0fhrdh97z8ancf8e46w0y2xkdu5yzfk3pfp2xr63qchdjmlfs7ltzwa',
      rewards: '142632719527976244',
      mid_rewards: '37758606178440864047'
    },
    {
      address: 'erd1jkmk0afn3mk5zsxzykjdnyl6ndd8zttxvclth07tty0g55t9v3esafuf5x',
      rewards: '380593689440819862',
      mid_rewards: '37707702077365736051'
    },
    {
      address: 'erd1v6d8nqckjtlhwppzy95fzltc3j8qcypefdc7qhv4256pzv2fkwns4xkkws',
      rewards: '261208695533330183',
      mid_rewards: '37702642527797829022'
    },
    {
      address: 'erd1ad765jjzmdfgf3lupl7cqh9uvkq0ys4jsw9qvpwwky3z6stpa0sqydl6y2',
      rewards: '380027319164854209',
      mid_rewards: '37664981481625470650'
    },
    {
      address: 'erd1urqlw0tqeg0y4ung69hy0su2q38hmvs9tkm7g5lapax3r28dsyws2laq8k',
      rewards: '141101117811824295',
      mid_rewards: '37643079392295059799'
    },
    {
      address: 'erd1xa9xll3cddflsysp05uuxtz7czty3kgcnl43cq3yczjsepx7ya0smak4j0',
      rewards: '260000212021527244',
      mid_rewards: '37611488140363767268'
    },
    {
      address: 'erd15x2ga2yrt5usjx549vf4un4ga5ya8qgpkctuy44wnea9z5hudvvqu2x9nq',
      rewards: '259823102911119339',
      mid_rewards: '37598129023494941711'
    },
    {
      address: 'erd1et9khe6247s8zfpz76h28tzh5tgnfmysctul4r23yx7azyur9evsqkhgs9',
      rewards: '139710580207390304',
      mid_rewards: '37538192894218553843'
    },
    {
      address: 'erd16w2vv2q3qgexdn4nag23xek66fvqxffals3gw9jczdrw35f877dqp80tfz',
      rewards: '258964153477955988',
      mid_rewards: '37533339550860740552'
    },
    {
      address: 'erd1sylslp4vh9kmq05tqf7vq3uwseuy7p4jhkvxka9gsgq0m5xuqtpq3v3ak4',
      rewards: '139546530281914478',
      mid_rewards: '37525818815201916958'
    },
    {
      address: 'erd12awa7gxrqfqcnxhq4nglf0ch4339559wwvm7dqls4dm5dncq5hvqssfd7j',
      rewards: '138864459419017428',
      mid_rewards: '37474371070084364327'
    },
    {
      address: 'erd16wpgw86x90eztpqumgfh2heqvjfx427n6txd7hmefuq4fptynt9stnc9la',
      rewards: '138145061498966785',
      mid_rewards: '37420107792114008641'
    },
    {
      address: 'erd1hpr585z7f882sasemsqvl3v99yf3qyrjcc53fzespwt44yh08uwqzrtsqu',
      rewards: '136900269610434453',
      mid_rewards: '37326214709607015969'
    },
    {
      address: 'erd14dkpm66ajqdkdthffdxjyrnmfj24s7wlzw4mz454u03xtudpertqmaxva8',
      rewards: '375135646682863489',
      mid_rewards: '37296008794560269972'
    },
    {
      address: 'erd1wwl364kal9592a8qzkw759p93ca430wnx3ly3gam6ju4kxeuufeq9dtlh5',
      rewards: '135784014333924613',
      mid_rewards: '37242016981664091600'
    },
    {
      address: 'erd1trh8lkrss8vvyh6q2dy234vpmm0ps0s7xeuvq568fv8z4f26sjnsd2khpq',
      rewards: '135749893803134045',
      mid_rewards: '37239443313051518557'
    },
    {
      address: 'erd1cf09y3sqlfq3hfsdfa2d7wcevhagvu2z7343y0wu42g35cpgjc6stlc4tu',
      rewards: '253881362141870324',
      mid_rewards: '37149951009626264913'
    },
    {
      address: 'erd189lenrlfcnfnsetnl8zgh3gq037ak88qqtj6a88kcr6dwtlmwwkszpa4ue',
      rewards: '373011008992774984',
      mid_rewards: '37135750052700895427'
    },
    {
      address: 'erd12yzsahn2qf82q4r63ft9dxn0h6ppej8xtmfw3x0quglk58c65fyqld2zup',
      rewards: '252989846821132339',
      mid_rewards: '37082705133156910439'
    },
    {
      address: 'erd142xvexv635aderjrajnhuryja3dfg0xk3m268sedtyuca3hckssqawpjaw',
      rewards: '132989188124442009',
      mid_rewards: '37031206764874315493'
    },
    {
      address: 'erd1f7y7t37k4var0l6xuk4d6psh4x78rxgrgtmxpyy4mrwqy32cgs6qaz3n4x',
      rewards: '132397567317253340',
      mid_rewards: '36986581553404055756'
    },
    {
      address: 'erd18gt8m44sp3tg5nyvg54c2upq3dc4gjed5ze9epnyta22vq8lpcfq443hg8',
      rewards: '370912713289232873',
      mid_rewards: '36977478253670265400'
    },
    {
      address: 'erd1p65072e2tc2q2ku0kx50u5ym9rhmhrn45vszfh3up4xgda5n5t6ssse28f',
      rewards: '370606605157276488',
      mid_rewards: '36954388903269910721'
    },
    {
      address: 'erd1rkdr5psn6jz3ya4l0q9ka6q5dr0c5ttsz4equsrz5yngyypwv27sj789av',
      rewards: '251114786026885918',
      mid_rewards: '36941271661841971363'
    },
    {
      address: 'erd1jyav2mtcyu74gk2k8fpc84098e3p0a20uhltl39gvlazmj7cccmqj639ny',
      rewards: '131348389633498251',
      mid_rewards: '36907443403699802327'
    },
    {
      address: 'erd1563s5f3fscjjdsfg6m3vat07njdvtqu2efvn46k8wqf4auwdwals4lkhyl',
      rewards: '129977415729549628',
      mid_rewards: '36804032570881671839'
    },
    {
      address: 'erd1fzmt7hfrgeulspe83lxg27s3z4smfpzhe9q0yr42jj88jcyjdwssjlqyr6',
      rewards: '367329095542782468',
      mid_rewards: '36707170485889328874'
    },
    {
      address: 'erd1hpg2myd8u3f286su3dwzmdlvf3y2tdldj8m32p0h8ke80msp93cq349nh2',
      rewards: '128397547143558356',
      mid_rewards: '36684865075606953533'
    },
    {
      address: 'erd1rqqv494c8h6ksl5y5yrve8jwzwncclp8utf8dl96lukf2qv8kc8syypev7',
      rewards: '127718192120843624',
      mid_rewards: '36633622182889760649'
    },
    {
      address: 'erd12uplvcs237pm7hlhln5dwnd04f634rc029unlzph2pvp50aspe2qpxdhyp',
      rewards: '127421905655433534',
      mid_rewards: '36611273668412167924'
    },
    {
      address: 'erd18ssthcn7r4x70ya9q5p5wrau77ylagrvlqdjp8znazfs70nh7h0qrju3rv',
      rewards: '246196108964882805',
      mid_rewards: '36570262053358396224'
    },
    {
      address: 'erd17vz634vkzwgjz7jspwlkruk9antg2mp3gzeegjdgsy53t2rg5m4qdwgyca',
      rewards: '126830593164130223',
      mid_rewards: '36566671712820363715'
    },
    {
      address: 'erd1pw7vrtxhj9q99pkan35p4qlar34uugxuajxcqx2jp996fusruhxqcxscek',
      rewards: '126598119298372465',
      mid_rewards: '36549136502268784223'
    },
    {
      address: 'erd195z0e3n0qs436dag0f0f4avrgx4240xld3sz9xug30uvvsk2vaksgj0vz3',
      rewards: '126212241830636091',
      mid_rewards: '36520030251457269794'
    },
    {
      address: 'erd1mxmluykl44fkqa7wuklhvtvn89uttc2kp3a2td3ukq9g98qhh98sdk3sfu',
      rewards: '244878825149385721',
      mid_rewards: '36470900996210584260'
    },
    {
      address: 'erd1dsep9lqvfl470l0ymncx6zg530mh9a9vvhn5sf52nrj8kgnh6hlq2klvnm',
      rewards: '244680275333798424',
      mid_rewards: '36455924633986159272'
    },
    {
      address: 'erd1zuclcvzj0qc27audm3jmgx443kewfhd9n56tv0flhg8ng9a8g88sv22q9s',
      rewards: '124930051256842517',
      mid_rewards: '36423316233279634985'
    },
    {
      address: 'erd1eq9x8yhw30mvqrn3zvh35gxkchdc02cjlg0wth908z8ecnr8tj0qxn822h',
      rewards: '124656010323994207',
      mid_rewards: '36402645671272232180'
    },
    {
      address: 'erd1dcng4q7ka3sgzdum8frjkqvxa2ugx6yk8t39n78lvc90sefpc0mqtxjs3r',
      rewards: '124610274826422211',
      mid_rewards: '36399195900361458572'
    },
    {
      address: 'erd1j8lvz4nz83hs2xkrrcpv5v5pp4qlmplcf0htjt78j6jl8pz6r02sdvuxxg',
      rewards: '242828019007617382',
      mid_rewards: '36316211274941645788'
    },
    {
      address: 'erd15vqvuglmpzurtq7jk0u5h3uvk8xsjplzj0dxsxv5a62yvt72edtsfwudu2',
      rewards: '123375776309844018',
      mid_rewards: '36306079233921335245'
    },
    {
      address: 'erd1uz0q2fg6ufs848jvjwmlmpjdjmyu5lh3ry7c0zfzty9tmzttdg8s0eehjn',
      rewards: '123252121294491253',
      mid_rewards: '36296752092038518385'
    },
    {
      address: 'erd1y8d8wz68nu7npg5skxlhvcdg6se8eclflcm5x0ez9p574dypvnmsjyltht',
      rewards: '361134682690519063',
      mid_rewards: '36239933735410747170'
    },
    {
      address: 'erd19j2hscm6azrwxyvknllvylzdps9nhknlpx8cwchq3nw8wlmzenrqnhnqvh',
      rewards: '360081464933519989',
      mid_rewards: '36160490848076110376'
    },
    {
      address: 'erd140xspxtwx9pz07jte8cejg3ptq9d6z7g4y38lwpl7uq3hhw92xxqvvejxs',
      rewards: '240535374028366629',
      mid_rewards: '36143279955112883714'
    },
    {
      address: 'erd18km7uqaj8qfk666wey2hc9jc0ydspzj6ghde9dt2r9lkq0ndmzjqmz34z4',
      rewards: '240483902035905906',
      mid_rewards: '36139397487626200343'
    },
    {
      address: 'erd1kk6h53hgpygurfvwuv8whth754w8ekvf0rr28l5tht06927k7elqkdl6n9',
      rewards: '240120461113942834',
      mid_rewards: '36111983597170559044'
    },
    {
      address: 'erd1wvndl64hj2xphl7jzxxyhtlvjtwfd8xhphqcqaey646nc953dwus0vhry3',
      rewards: '120198149686982642',
      mid_rewards: '36066394864650165954'
    },
    {
      address: 'erd17tcvysp0ehg0j5769zu0zw3uxjsgvgqx20awg7e3wedjf9ha2upqncfts4',
      rewards: '119833184177685053',
      mid_rewards: '36038865976494340651'
    },
    {
      address: 'erd1gh4qn9q0cd62prxlpju9xd65g89l35narkfwlls3p7xfyg8v0zysagw7tu',
      rewards: '358235900930034543',
      mid_rewards: '36021282282493708766'
    },
    {
      address: 'erd1n6vhc5lwzpju96pn5323xdxnfud42478l79dqe758ge3sj4anjeqn0kk3y',
      rewards: '119240762310249608',
      mid_rewards: '35994180342059779394'
    },
    {
      address: 'erd1yqkgpu5j5lqwaq4c94tyw9vf2dw98l2sv0qv4e23l6fxlrle33zq9yy6w7',
      rewards: '119179618644102846',
      mid_rewards: '35989568352422646710'
    },
    {
      address: 'erd1dn45kaz3w6f5gaag28kssa6hyv0afeuhrf453f2cth5z9q4y4etsdtfwrq',
      rewards: '118658948000577487',
      mid_rewards: '35950294822331495484'
    },
    {
      address: 'erd18da8ufpkh6yvaxqk4ceqjne74svdx423x7yqqzevgvk0hxdjae4sa8mddr',
      rewards: '118373550185146941',
      mid_rewards: '35928767624991600781'
    },
    {
      address: 'erd1a49lrqtxpd4aknvxxg9ugfztsjrnzgsu6rrcemr3nwdhdtdd2zws90q427',
      rewards: '117879291010595249',
      mid_rewards: '35891486278701068032'
    },
    {
      address: 'erd12ru0vd734g34ppa0pzp84cndl47x3dcq5xdnls58nkq9ljx23knq3etz22',
      rewards: '237184802305082787',
      mid_rewards: '35890550554995399617'
    },
    {
      address: 'erd1vrrld2akgxp24k63tmezvse6nh4g27979w6mzhn24y5ltmyk4vvqtv66qn',
      rewards: '117152970314541119',
      mid_rewards: '35836700824466180919'
    },
    {
      address: 'erd1y93uewc2d7ltwywrekvsf234vlv4rkervzs0u9evmsj39tlmrgrs8yca4k',
      rewards: '117116201321111898',
      mid_rewards: '35833927385656405732'
    },
    {
      address: 'erd1palqae85fyha2m00a04qst3w6q0acryq9f4dnuy3m0atk8lks49qhvrdzu',
      rewards: '116572573004946181',
      mid_rewards: '35792922187266924594'
    },
    {
      address: 'erd14ux3d0akntymsgr78kke962v8scnu87ya0faxcwxhq92zwnn63ksh0ryzq',
      rewards: '115603663488920988',
      mid_rewards: '35719838564238800366'
    },
    {
      address: 'erd1rypk7yua8mf8txzwzhkmvqwwd4ls53d9xlvz4q0czhjdr4xl2deqwak2fn',
      rewards: '234774417389641843',
      mid_rewards: '35708738260246317344'
    },
    {
      address: 'erd1qpntaza8xr52nkw79trlndeqc5g9vkfqlclfua9he2pugcc3wlpsy27hu8',
      rewards: '234188639266314391',
      mid_rewards: '35664553755052261201'
    },
    {
      address: 'erd1jzra003cdjsnrh0m5ctuwh3z7rphgpp9ldvhee64r5h7d0r9dq8s98xltk',
      rewards: '352901039820143497',
      mid_rewards: '35618880436073469961'
    },
    {
      address: 'erd1j6rdysksq3x34hs4cm44gnayhde95fnrff9y62jnp7sam7a422fshm29cj',
      rewards: '113270340766700947',
      mid_rewards: '35543838973551271047'
    },
    {
      address: 'erd1n9cpx6n5hy3z89q9petznlvqf0kq4zhmfj87jlus7s5jgn305r6qcvy488',
      rewards: '232226068861425146',
      mid_rewards: '35516519544153511716'
    },
    {
      address: 'erd1t0477sm3658rd6erwf6x27zz0xd7ey33h85e2fy4zzr73wrx50esezx3t7',
      rewards: '112907817431197614',
      mid_rewards: '35516494295485239029'
    },
    {
      address: 'erd1emq7qt4z47kej5zddv9yv52qtjkwyzyjgvzmn0tfw8ufdt22dllq0623v4',
      rewards: '112417774315771445',
      mid_rewards: '35479530961218221172'
    },
    {
      address: 'erd15a4m6fuz2vkyh2474sxu9jm3djdgxlr3fnzsxltkrvsj4hvpvxnqhp2y7v',
      rewards: '112122525334243609',
      mid_rewards: '35457260702841631005'
    },
    {
      address: 'erd1dyunalwaquqr7pzewfwy43ycght4s67x6n6k9kt5fzsl80fn5a2qx7ws63',
      rewards: '111671959145761197',
      mid_rewards: '35423275063394767355'
    },
    {
      address: 'erd1tugeuc8k00m2k0zjauyuhlacxkfwy45tyej5jh8z4cvk5u2y0lwqrnzmg6',
      rewards: '230908779606749570',
      mid_rewards: '35417158076735324739'
    },
    {
      address: 'erd14v8syfjuq8dz926524n7y7003k5r2cwc9mnkjfp623hc774k8a2seg5qs2',
      rewards: '230769349584796411',
      mid_rewards: '35406641045996447362'
    },
    {
      address: 'erd1vnu3lu6qndufanfqjal04g9lvkz4f6x09v8064cxvm7qrueleqsqh96nzg',
      rewards: '111226269029051269',
      mid_rewards: '35389657219893122838'
    },
    {
      address: 'erd1ynvutvw2ylna8akr6dvv62crtrsdcv64p5xq44z5s7902y2mpzwqacst5p',
      rewards: '110719570152090742',
      mid_rewards: '35351437562535980948'
    },
    {
      address: 'erd17ktth7qq3y8w7na7e40h35fn49y246ufrp02xnxqur8w4dyguphqgrvhse',
      rewards: '110040492134030859',
      mid_rewards: '35300215563930608815'
    },
    {
      address: 'erd1gn2l0vgq20jym677hghx4mx9g2c58pezlr7yvx8nu5u7zanh663qsywqxm',
      rewards: '229300380101203314',
      mid_rewards: '35295838530175202429'
    },
    {
      address: 'erd1s8t852ns3r52dt97snt0hkmac9uqaxpdsm8rqxgtzm4zm89ferus3fzgx3',
      rewards: '109506135474224351',
      mid_rewards: '35259909714889023979'
    },
    {
      address: 'erd1mnvnvsqqel0ug2m87zydmq73jc8strmm852rf2kgvkhdh0hpq03s5avz53',
      rewards: '228354098466954958',
      mid_rewards: '35224461699736429051'
    },
    {
      address: 'erd14at2c0a28pejv9uzdhs73h39wp3fvl9zj0jtk60uhc9c3nd0x3tqlwt2lj',
      rewards: '347429592481139182',
      mid_rewards: '35206176062622329742'
    },
    {
      address: 'erd1x6ssa65rvlhdxvk3v94tr8j35rdy0tat30uw490lg8ya68qumz0skjf7p0',
      rewards: '227420151349655331',
      mid_rewards: '35154015246357644709'
    },
    {
      address: 'erd1ckkjz37e9lmdg5zjx9ulcwvrkcccf2txwa9l5zgh2ftn4q9j78wqhk24ul',
      rewards: '227155273403189545',
      mid_rewards: '35134035836858826419'
    },
    {
      address: 'erd1s53ax0l3g2543m2mrpklxnjd845r8uk7dav99tq3qckydcpfa48qj7xv6p',
      rewards: '107559085034019941',
      mid_rewards: '35113046155356244554'
    },
    {
      address: 'erd1zxlgvm6zn4uzpwc7vtfha98mr7jss44mwl273rz34579dpv00c0sg0ldr3',
      rewards: '107037987240375730',
      mid_rewards: '35073740405870251730'
    },
    {
      address: 'erd1eajgsvuldky32alwfcyl2l02r4h77k3vd3tcywukptju4yct3pfq85sg7g',
      rewards: '106679770804744361',
      mid_rewards: '35046720591830691210'
    },
    {
      address: 'erd1xjs7npfsv5003nq9lr0wk6535s76rswdkk9e50p20sxfnh2jzqyqj9c2k3',
      rewards: '106586868275127469',
      mid_rewards: '35039713071168974909'
    },
    {
      address: 'erd18al3x6zamlyp2c662ejhsjhpuzw6vv4s0nhmngs8v9zf9xnjac3sc7lyps',
      rewards: '225764747771873922',
      mid_rewards: '35029150241899541220'
    },
    {
      address: 'erd1hwzf0e2nn2tu6ltc3kqd7tnujhhx3ksrsrss0ghww47j4qfl8wkq4959mk',
      rewards: '344031117582814789',
      mid_rewards: '34949833386415994795'
    },
    {
      address: 'erd1fulcnjp77f5vrcu3ce3zupj6lktr08eh625rczura70qew3gl67qxd47cp',
      rewards: '105268373536905294',
      mid_rewards: '34940260675646946338'
    },
    {
      address: 'erd1qmx5tnmlm8mr7ck35v5twq636mtasyd2lc38ppjrca00rw5hafds8ak8cm',
      rewards: '105198080608526990',
      mid_rewards: '34934958568696631972'
    },
    {
      address: 'erd1vru66u4lr77cgkvquh6ejvvjvddvfdufjcq7j34svwr3xy3ws7wsulsatj',
      rewards: '223796772685197519',
      mid_rewards: '34880708362668727017'
    },
    {
      address: 'erd1fnfs29lwuzpuapajsr5g2p4w9k7emf9q7dftp8nw2f94sex808usjxkwlu',
      rewards: '103303368177822437',
      mid_rewards: '34792042799223776447'
    },
    {
      address: 'erd1fsv7k93nyw82vygfhuz7ghpsqqd8h2hwf4puuxwvekvxta5w5w6svtcvmp',
      rewards: '102967996732109893',
      mid_rewards: '34766746153966950115'
    },
    {
      address: 'erd12kswe6lt22nd2ztpnkk0gl2mp2zh99ffsfjzxewmurwad2eexntss9u6ye',
      rewards: '102942848350211165',
      mid_rewards: '34764849243231679608'
    },
    {
      address: 'erd1guxsknczch5y0uzl4mvj2dv4zpepy70srm7rccrvnw0wr0hutz6q80mr6p',
      rewards: '341537105296514287',
      mid_rewards: '34761713184534566675'
    },
    {
      address: 'erd17x5mpjqjepjdqrkh39hxz5qg9v02ypqdnrdcq9ex5p5q4p3t88lqw37zpa',
      rewards: '102484299647634667',
      mid_rewards: '34730261492812408396'
    },
    {
      address: 'erd1ndfvdxa28ze2nsdpqv54jzx3fzdmxpdwdp9k9a034p003e6qqqks4hkyje',
      rewards: '221566090880928244',
      mid_rewards: '34712450846995124349'
    },
    {
      address: 'erd192mpvvy2gfn4t4jx7l5alw5kv3ukzfxmspltvpffansad6zn3nzslr6nwq',
      rewards: '101895504267885769',
      mid_rewards: '34685849399771151861'
    },
    {
      address: 'erd1xzzg9klzct35hq742e9v3u3z083r7460a5xa5wysm5c8wd438ewqj3cdm8',
      rewards: '101859562891220025',
      mid_rewards: '34683138387050245984'
    },
    {
      address: 'erd19zepwx3aek7ygew8ge6l4vhzn4ep6xyhrqeqd2vnauzphzl2rmhqhl0vq2',
      rewards: '101379172998925512',
      mid_rewards: '34646903183231625924'
    },
    {
      address: 'erd17wrztfsn7xt8ge7edk49h586ea0m9uav2urk7szd3v37t24kxswqpj3ht5',
      rewards: '100689467194708981',
      mid_rewards: '34594879544117775407'
    },
    {
      address: 'erd1dyefkrg5g2t6kzrns5c3yj3d79rhyrcps7zzcv5mj7lms6cfqytsahug4y',
      rewards: '100113922964538864',
      mid_rewards: '34551466968579946650'
    },
    {
      address: 'erd1nx05f2ddjh5x2a4mqj205lph4drrvue7dr68sv3fmyw3dtfwtfaq0t86k4',
      rewards: '99674093299780159',
      mid_rewards: '34518291171579129854'
    },
    {
      address: 'erd1f9v6ncf0gdp5z8j8gdggedhczhshq7f46jllrvj7n36kzm2098ks6rurg2',
      rewards: '98609927292410658',
      mid_rewards: '34438022471524465028'
    },
    {
      address: 'erd1suwahvu0n5rkfe57esr0hlkrmc23jnlazlf8lm6hms8r2qdv84hqgkl4ac',
      rewards: '217563152581199268',
      mid_rewards: '34410514258630946964'
    },
    {
      address: 'erd1d4fu5538jep2zcvgzr65whe0vz5kxesrwsxfnzq5aftsjl35hgrqumcs0z',
      rewards: '97633740683350788',
      mid_rewards: '34364389946544929794'
    },
    {
      address: 'erd1kz6ygzrzvhfntw6wqh6q0daj6y4gn44spx2ejfcgmzvx8u3wcn3q2g4syy',
      rewards: '334653746816570711',
      mid_rewards: '34242510134099712421'
    },
    {
      address: 'erd10d6jnu40gduj3ns7je7w5gh4gswxrgtnjm905u9szfsknnapna3qyj7346',
      rewards: '214944301794129992',
      mid_rewards: '34212977646054111815'
    },
    {
      address: 'erd1erxwsqggs4mwem6wdtcps3c8pu4kdzt3j8xfdgrk0d4cv0js79us4jzxjx',
      rewards: '214332052177180903',
      mid_rewards: '34166796429475930086'
    },
    {
      address: 'erd10txg2uktyrq428vgyrwd8ul72zjchcgedam6aasuvy74dfazp2zqtjeduc',
      rewards: '214189637612476532',
      mid_rewards: '34156054278440747118'
    },
    {
      address: 'erd1ecl4uv47yc439p4tffhz9gtuene8x8smp2wlk5tc9lym5jkak2xqe2smm7',
      rewards: '94112222988741474',
      mid_rewards: '34098766307368075695'
    },
    {
      address: 'erd14ueeemxucjedx63knucc3y8hqsaj3ps0kx90rlqvusum7hh8h4vs3p7nj0',
      rewards: '93747307016901287',
      mid_rewards: '34071241155760196986'
    },
    {
      address: 'erd1pqzwknkvc5p7fyesuzpwczem5t00duwx7kth606h5kwyg2k8vhxswzxsmz',
      rewards: '330985053639309891',
      mid_rewards: '33965785233850296797'
    },
    {
      address: 'erd195d5dak2nus4jap6s85u77ark0yprylm7243r3fhgd0rym6jkg5s0dyq88',
      rewards: '91725988254540434',
      mid_rewards: '33918775630337269738'
    },
    {
      address: 'erd146hvg0t6kmkc40r0ygsg5m8tjnvz3lkrxdc7pzwex3cxd90hf4hs4wq7l4',
      rewards: '330094543646009482',
      mid_rewards: '33898615187961871125'
    },
    {
      address: 'erd1emxytu3umnzm4k2cn2xmtppy8j3dm3lnsjhfzkul8gd5a4xxuk3qsl4xjw',
      rewards: '91149858107656269',
      mid_rewards: '33875318859840523633'
    },
    {
      address: 'erd10u59ytneu83cf4wsqvyka34zsm2uh23w2ud6pdvdeelwpucsgrgq9tcz0e',
      rewards: '210208190540881845',
      mid_rewards: '33855738746314949123'
    },
    {
      address: 'erd1wwejhp83uxn3cchg0k6usx9346qtg77acfexljwj0u0drexl4fgspcqhsd',
      rewards: '328995951312099556',
      mid_rewards: '33815749753506820754'
    },
    {
      address: 'erd1lkgz5qe5sp589308cthjex4vvu4t0d42mtapkqet0rts4kdlh49q0cprd2',
      rewards: '90310398498413916',
      mid_rewards: '33811999480048603631'
    },
    {
      address: 'erd1e34l3x4a0extn455z7zxsjhdt57p3pxt2vfyfvexjvrwddg9ht9swmsyw6',
      rewards: '328817492690532617',
      mid_rewards: '33802288844712962103'
    },
    {
      address: 'erd1an2lhuadr8uc6qz273ykf3xhxs00gzsz0c3mv0xs9kj636gq2zys7jpqw3',
      rewards: '209055040331311550',
      mid_rewards: '33768758080094671659'
    },
    {
      address: 'erd1qsguca82l9pd0hhad0e36exqk5yqtlqp8x2u4w0dgstqujtgw76qvhj2r3',
      rewards: '208952721958832011',
      mid_rewards: '33761040334278919556'
    },
    {
      address: 'erd1v9erfnt22vjlkqylx9h8p0yl095va87rutl4f235z9qmq09j4qfs79v0xv',
      rewards: '207965956540878366',
      mid_rewards: '33686609863084085600'
    },
    {
      address: 'erd1aq3jez4g2ymvsmgl4xqj4epjkl2jt24adkkuf4lpes26c37wqlys9a3jpm',
      rewards: '88449879915006844',
      mid_rewards: '33671662909359987694'
    },
    {
      address: 'erd16gtp7fcyhrjthpg85kzglppxnlvqdwmvauqrxj5ww92mkhs44gsq2j7ven',
      rewards: '207569504138733590',
      mid_rewards: '33656705958304818524'
    },
    {
      address: 'erd12fuytdkdjr9zygatsu492a65pamqj56pwmyxksr0xlpg656r3m3sdk8epg',
      rewards: '87980005990972199',
      mid_rewards: '33636220911766890895'
    },
    {
      address: 'erd1njj0f64jcr7uwkpsr7q26d4cnt8p4sgdeg56n2y64lmn6tn6fz3q2c22nj',
      rewards: '87388963898927568',
      mid_rewards: '33591639352050203614'
    },
    {
      address: 'erd1849c7xg3ksjv0utmg4ga76lh2w38jjhjkz5lgzp4xgaf8kpheulqgjlaul',
      rewards: '87070219110700591',
      mid_rewards: '33567596834601800338'
    },
    {
      address: 'erd1ktc0yxy8t6n8d8358xaxgeg7sruqdfrtjtu6rhh09nlxugrnpchsa0er7q',
      rewards: '85719829860139701',
      mid_rewards: '33465738676232079915'
    },
    {
      address: 'erd1akjr40ddwat0lrl88hthd8exydycar09dfahua0n9my0vuuam6ys7vpfs3',
      rewards: '85607471361384684',
      mid_rewards: '33457263616351664708'
    },
    {
      address: 'erd1tr9nxlvxmz4zk5l5s907tyxfk5wglsn53xslws7j5300dm9fkekqks9fts',
      rewards: '204886285746939887',
      mid_rewards: '33454314178469226661'
    },
    {
      address: 'erd18e9j6e0h0jtj3x5pm7d7zvhzq6cc3l3kr4xdu07qmegld93srqeskr9vqu',
      rewards: '324093655694637866',
      mid_rewards: '33445975776728498010'
    },
    {
      address: 'erd1vmg8smnsf5ps2cknhy9j0rf485r9y3zuy5dxru5wq2en4mvhvhhskt08xc',
      rewards: '323716297965683164',
      mid_rewards: '33417512159070151639'
    },
    {
      address: 'erd1lhxsvsn65uwcy3al363pdnx99ptvrzzwg8pvfyu7ml0d5eq9a0aqy0h7f7',
      rewards: '84900387322580399',
      mid_rewards: '33403929158916289212'
    },
    {
      address: 'erd1p74qy9x6xkt6ns0ls7mjf0phpndmsq4dd85ewp3z2eznxsu69plsvnpcmj',
      rewards: '84522529872231054',
      mid_rewards: '33375427847903278516'
    },
    {
      address: 'erd1mqw0n6607t8hvz46v3lcst8qrjt83q3v098qmc35wlwddvf9u7yqq242un',
      rewards: '84404271878145199',
      mid_rewards: '33366507796529143753'
    },
    {
      address: 'erd1ddhrp0xyps8hv3fa3q2y4f6jazhv60jfe0w4twv6r0mpmgxaj4nqlee94u',
      rewards: '83955257154291954',
      mid_rewards: '33332639182102908099'
    },
    {
      address: 'erd1tt0dgagdngl0ry4p45dxaj73fs83zjsft4ywnp4qx2vhmelshl0qn3vw75',
      rewards: '203248729877578511',
      mid_rewards: '33330795404151824623'
    },
    {
      address: 'erd1y50h3kq9nt5kd9yejl5v0g34du7pju906k00vff5t0lf5zql6ves5560w2',
      rewards: '203073530495500052',
      mid_rewards: '33317580335682779394'
    },
    {
      address: 'erd1yqqzghtm6lenw4u3q4ac4497dwffaa7tr65uud3y8ztnw8w2scdqyw4pej',
      rewards: '82407439379187066',
      mid_rewards: '33215889239078244568'
    },
    {
      address: 'erd1yzgcxa7fq3ddpfqn738d8gspp62n95hyknu3uehpkajgfy2dt3nstzzucn',
      rewards: '81973999445265756',
      mid_rewards: '33183195411417234746'
    },
    {
      address: 'erd1scufew7e2mf4q0pw9ehczljzw2knpafl7klamdxg6ffxa2y4fpks2np499',
      rewards: '81696418124180323',
      mid_rewards: '33162257802389428464'
    },
    {
      address: 'erd1fwj33ljqsnqdeyrak6hns0h4dtfqpdmze2vwjcfd9mwd34rw5wtshx3cyc',
      rewards: '200791110203367183',
      mid_rewards: '33145420251110297455'
    },
    {
      address: 'erd1ksl2p77jf7c3sq45uwqr867mf3lq5gtn26q5h332zdr4582wxfrqwgeuty',
      rewards: '81316170755748757',
      mid_rewards: '33133576222869090407'
    },
    {
      address: 'erd1rey57ctre78svft89w3kndt7x09jr9lrlw9cd5rrjtrxqeq2ew8qhpm25z',
      rewards: '80920283283890509',
      mid_rewards: '33103714930068976098'
    },
    {
      address: 'erd1jwhm6jwjxqcxs502vgzcvmhv7h634uzrgt3432df80r6nfdgh42qglck78',
      rewards: '319293689603248828',
      mid_rewards: '33083920387067391538'
    },
    {
      address: 'erd1gay6e7r4dn7ydzllr2dqh6jpdafwr47sggcc384s6pc8f8lphpvqmvtrxx',
      rewards: '319268674922104512',
      mid_rewards: '33082033561211433712'
    },
    {
      address: 'erd1c4lrk35vpqm5g32prc6053wm2elkjg6gadla3afj95qjh9tm0nmq8qzuwp',
      rewards: '80285607857404720',
      mid_rewards: '33055842162955710058'
    },
    {
      address: 'erd1zxfqm40xk7zlqdtq38r99dy7mzax7nrh40ezz3ftaps278yakuvsvgp2n4',
      rewards: '79642796637964142',
      mid_rewards: '33007355723238853646'
    },
    {
      address: 'erd15wrnzuclndl6xdr3ytpklswcrq6lfq0vw8t5hhjmx4s7aaww0stqwmxut9',
      rewards: '79355988840483033',
      mid_rewards: '32985722172730829785'
    },
    {
      address: 'erd1na7a677pfcd7ps5f5lswjnz9prragd38hl2c02echleewvmzx62sn8uvy2',
      rewards: '316541196745078972',
      mid_rewards: '32876303321586057713'
    },
    {
      address: 'erd14mx2kqxrq5g374zvjwfzr64hgp3nah8tk9hq20zjrjvhtj7hx68q9g4r2u',
      rewards: '316413199506514726',
      mid_rewards: '32866648651281811254'
    },
    {
      address: 'erd183vg93l8e9544f2wup9a29p3tmlf4kyl8fzuenulxssqg7kcz24q3nwj8v',
      rewards: '77677073159529865',
      mid_rewards: '32859083679978532971'
    },
    {
      address: 'erd16lss88p04npye94ys7m672n7zcm6yzzzkcjn8ppx5vfwdypvzqtsjhtdg6',
      rewards: '77322298789938071',
      mid_rewards: '32832323496639996205'
    },
    {
      address: 'erd1q4pj6dyxwm0mrf6w629676qqwy4justr5m2zedvdqzsp30ykgwzsk94d0x',
      rewards: '77314563287456233',
      mid_rewards: '32831740017442026322'
    },
    {
      address: 'erd1k95l2nfmrmhgp2qsxddr9zz0xvmnzdclqc6hv3kgdfxjy97vrquqh6tyr3',
      rewards: '196078393142032972',
      mid_rewards: '32789945945767833036'
    },
    {
      address: 'erd1d3wmqq0gxm5vy0fde8h0xu9kwnefaw8wtgy0zvnnn5glcvmfmfmsgsdyqr',
      rewards: '76556484520749895',
      mid_rewards: '32774559091983811730'
    },
    {
      address: 'erd1y69y9f2d7e9e8za4jt8acdlefyff645kj03wfee9vz6jsn7hjc2s7snnpz',
      rewards: '195429277633521755',
      mid_rewards: '32740983981475896566'
    },
    {
      address: 'erd1ql3q0t7p0u2w8ql4v333xllpgjegpmwpmfp5ag7dlumlnh5w6h5q6j3jmv',
      rewards: '75923770008206407',
      mid_rewards: '32726834234136560158'
    },
    {
      address: 'erd1ld885xnyspuhvzhmn02z45ekw0mtylj485tm2unhjdwwkjpynexs8l7x4h',
      rewards: '194947015346022022',
      mid_rewards: '32704607545247980602'
    },
    {
      address: 'erd1l9lrkngzuh85jtyxxud5qh02jsn26e6azg4pq8hgnttwcgxpptxsprd489',
      rewards: '193914894720620169',
      mid_rewards: '32626755987946875998'
    },
    {
      address: 'erd1h0ejtwjs3j2haxmmv3pqxszkyxk8ar4kvnt2kda6ep5q8kce29csxhdatm',
      rewards: '73995364578826989',
      mid_rewards: '32581377044259513973'
    },
    {
      address: 'erd1d3wd3cgqznlrx8utfgefzu3etwzhxych3fauyf26gg8cqswpw6gqpgsltj',
      rewards: '312401836509096118',
      mid_rewards: '32564076598594194440'
    },
    {
      address: 'erd1lun65sktfcgd06q023fqmls4znl5dtp6ulwcexgfxudvjykr4dzsuyhqk7',
      rewards: '312387885960228652',
      mid_rewards: '32563024326284342546'
    },
    {
      address: 'erd1p07ydq0ccvll9hfcrqxdhtcag5ft7rxle0h68uyhrwrh99a3zdwqvy36mv',
      rewards: '73460754853631238',
      mid_rewards: '32541052106814726356'
    },
    {
      address: 'erd1wzl9m6ycezekqjznz5vxqn5gjn2ppng0t4x69mez8rkjxxjajkfqdf9qe0',
      rewards: '192569862028414420',
      mid_rewards: '32525301868019425445'
    },
    {
      address: 'erd1v8ekdd478n37r73d7uclztpmnwum6c5e2xt9czz7qpt50pp9rfkspur2tc',
      rewards: '73122663729607924',
      mid_rewards: '32515550319652350908'
    },
    {
      address: 'erd1q98cu0z4pg88e7nt59e7yrue8xzvx392xzv2rx3wg4ra8g0qjvxq9pgl5y',
      rewards: '72376341636611739',
      mid_rewards: '32459256185267282448'
    },
    {
      address: 'erd1s96aaefdnv29ht68agty4pr9p09tezdp3vjkfvvwkkzlrak7f07sdewg56',
      rewards: '191501156723609224',
      mid_rewards: '32444690774483103207'
    },
    {
      address: 'erd1kd86txae720zufgycwl5jquaqaavr696csyu23etjf885cstpflqg97pjl',
      rewards: '191426869426420712',
      mid_rewards: '32439087377330213362'
    },
    {
      address: 'erd10vqxhgguv9l9wqvugnue07efv5ykxg0j6y76u7xlvhmsuyy0fcyq6afzs5',
      rewards: '71885613282217964',
      mid_rewards: '32422241164289003727'
    },
    {
      address: 'erd1sl5yzqnrl6whmp9vzcqj4ecgw4daf258scdf6xp9r5s8yg5jx9rqgqw8du',
      rewards: '71835204466852882',
      mid_rewards: '32418438890910010328'
    },
    {
      address: 'erd1fqyc4zht93zu3vzws42r403r3378cxjx3txfcm7gwueyv9zj5gqq20yz5k',
      rewards: '71144506117653473',
      mid_rewards: '32366340385379670591'
    },
    {
      address: 'erd17l90kuafa8fe50x0472xrkmvezpx5f2ey3t79sqlf0w3hquefwystcaej4',
      rewards: '190343441181269303',
      mid_rewards: '32357365750968759686'
    },
    {
      address: 'erd1d9fhzvmtq05gmjt4j9qg9dzmkucxg8lt6zsjwkmp8699pd9nraxqtede2r',
      rewards: '190151945738616151',
      mid_rewards: '32342921491199405901'
    },
    {
      address: 'erd1skh0n9qc59036p3x4pepag40l9kwwu662k23ulekjnq8qhvps87qxjlfg5',
      rewards: '70672456159015791',
      mid_rewards: '32330734252240380668'
    },
    {
      address: 'erd1tkcqvx2x2y5n89qkagr96rrqn8adzsu3h7zwjac76mdzjh0r4vtsmm8rav',
      rewards: '309074260398839677',
      mid_rewards: '32313081728570593226'
    },
    {
      address: 'erd1h57mf4w8lfmsrwkymg0edf4t7urvxhj2qx5x9fqc6ywuewjjzhtshvgm74',
      rewards: '308950963568715904',
      mid_rewards: '32303781604147938470'
    },
    {
      address: 'erd10ezw77kyfaveed7ym22984wezm3rwkfydld3hg4j95gsjdj9hwyqcnhr7r',
      rewards: '189033356641033890',
      mid_rewards: '32258547726075866749'
    },
    {
      address: 'erd1qvshup4ge27x7mvka4tarsyur85q4jretg597zm88j2nrcp8walqhls26z',
      rewards: '188516079294177787',
      mid_rewards: '32219530148073632820'
    },
    {
      address: 'erd1jcm9atmpacf92kxcgc7jyc24rt48928zh9a34j5u5ctkr3n3fhtse57zf4',
      rewards: '187528902541117169',
      mid_rewards: '32145068650390361045'
    },
    {
      address: 'erd1rp7mnyauw49u2m9ps8tyfrrm8xhhhhrjx5d2waty3p3tawxpufjqcpsyld',
      rewards: '67895420501193686',
      mid_rewards: '32121265954329007311'
    },
    {
      address: 'erd1mfakcr52q3jgnt5up3ychkmlx9qwxl258seghx5zduww0ntql3dstq6xll',
      rewards: '67463492619311103',
      mid_rewards: '32088686178846626682'
    },
    {
      address: 'erd1q8f5sq70pcf30zexu2fkfqm46cype8zxvku7wyxudq82k6tnfsfqujywxh',
      rewards: '67087428955657315',
      mid_rewards: '32060320170902150967'
    },
    {
      address: 'erd1ah8j3l7yfmpm7dzwzyuqna6cfzuz0qwugvf3hzczs3npffenss3sjm9ahj',
      rewards: '66993235566627188',
      mid_rewards: '32053215282342629109'
    },
    {
      address: 'erd14fr9qhd67d7g59wjnp9p9zwfs8eutfmndyyhdxqa4l50f98e65usm35vf5',
      rewards: '186271683687361897',
      mid_rewards: '32050238217566630084'
    },
    {
      address: 'erd1jznwrnep7fd2ljjpc2wzsjg8y2clwha4u93gpdj55vyrlh4u9d7s5fwprt',
      rewards: '305215789186572427',
      mid_rewards: '32022042110445016850'
    },
    {
      address: 'erd1qm2w5vkzrkd5tpyhue7e529vm8ucuj0wl6ucyqg0rkrw0p2nhsaswegvey',
      rewards: '66297167836456761',
      mid_rewards: '32000711771176272829'
    },
    {
      address: 'erd13n7c3ef0hu7242am884jwlqmadakk6q9k7q9z9h30rydhsnsllas0nvl0g',
      rewards: '185537649368113810',
      mid_rewards: '31994870934460868830'
    },
    {
      address: 'erd10c94lsum40wrcldtvs2zjsz87jwuyzrfdereva5l9w4c0h7f9fzqv7djpe',
      rewards: '65628402538919429',
      mid_rewards: '31950267648075887397'
    },
    {
      address: 'erd1rxs7r0e76hetvrztmmvvpgkknwutu9kwgjw5w343m0jjwndlgxtsarptjt',
      rewards: '184714303090205568',
      mid_rewards: '31932766962933056340'
    },
    {
      address: 'erd1dq6juw8vn0ngnacmu3rderwj7am22pymda3e5e0m2f0h02pzewdst2c7rq',
      rewards: '65355659466007848',
      mid_rewards: '31929694982006949852'
    },
    {
      address: 'erd192awt7v8z6fx2tfmdee8s0rd0ndsnawj596gxqx7cgvu4ahak8wqjdascf',
      rewards: '184514800737968227',
      mid_rewards: '31917718752070238500'
    },
    {
      address: 'erd1r6khn8umxeyx4qu8u3xwtexdy50jg2dhs73yuns73seg7tz3ex7skzarcq',
      rewards: '65118211100955056',
      mid_rewards: '31911784551246239417'
    },
    {
      address: 'erd1kjurayl7mruhhu5pd599v7fnhzsemptfdffculj0d3sdhwvmnncqvfsj04',
      rewards: '184383109670509752',
      mid_rewards: '31907785460910307096'
    },
    {
      address: 'erd1da2lt9khn5tfdltc3s0c29cpsakvuppsgavnfda85mcjk5zpdkrs9h5kcw',
      rewards: '184280641915792295',
      mid_rewards: '31900056447380715332'
    },
    {
      address: 'erd1rvewd2hl9l5ftu83n2xkwg67qqxx9zkpezxret5z7kc904z0h66sqxwgly',
      rewards: '184041326452040057',
      mid_rewards: '31882005183719460791'
    },
    {
      address: 'erd1w5ulsv3vl5wwc20tjepxst33j37a8zcrd6tqqfmvf23pl4wy5zpqgk5pwu',
      rewards: '302966881921800939',
      mid_rewards: '31852409871267487867'
    },
    {
      address: 'erd1mdkd5krexht8zuz6ucmu2wsyudazzej4r9q72mlzsf42hxkee0lsk25set',
      rewards: '182807602104603598',
      mid_rewards: '31788946911881494538'
    },
    {
      address: 'erd1u9rfvgl28m90v85nzf5u0mhpglvn7fclcade0r9e83deqkjevuvqydlfts',
      rewards: '63119109364361917',
      mid_rewards: '31760994828061971897'
    },
    {
      address: 'erd1kawcernuvd2znxpsqncrkclje0e7u7y9nruey4l5pdwz2rzvtu4qrpqgxq',
      rewards: '62901853737439256',
      mid_rewards: '31744607510075983918'
    },
    {
      address: 'erd1gqz76na6rhgj97v57fq5mnnmcpwhg5cguw0fg7ac3vruwrgnn6dstvlpgp',
      rewards: '62706025138592472',
      mid_rewards: '31729836405798923648'
    },
    {
      address: 'erd1f25mdtxk0s934k3m8cg2lew0792uv7dqnu00rfe38l67pehyeerqtq4sgm',
      rewards: '300573997257993175',
      mid_rewards: '31671917598431807246'
    },
    {
      address: 'erd196v3u93ehv8upggqyz9qxylrm2qmxmmyyu6q4wpnksaw76xy0jdqptrkgn',
      rewards: '300228797241682828',
      mid_rewards: '31645879596488319512'
    },
    {
      address: 'erd1k9a2338ws9c6c9p9wfph89j9s2z5gqul8d6z77n2qspv2etwtg7s5tgvs2',
      rewards: '61294559680533106',
      mid_rewards: '31623371346112847433'
    },
    {
      address: 'erd1wpg9l0h2rwutvemu4dgxz77hmd4ld3fnuzk8efv5kpmnj927n03q4lzz23',
      rewards: '299766002353048977',
      mid_rewards: '31610971561609054623'
    },
    {
      address: 'erd1ka2w003v8tyuqpq6lm8hdday4ze7ttmyn692ndnsmefr5vqcgc2qxujfdh',
      rewards: '298749026732126289',
      mid_rewards: '31534262372898419892'
    },
    {
      address: 'erd10pwqnxhwswpyf79nupqc95c006e96zv03yzqv24fwaul480hu54s4mk7kt',
      rewards: '298603802080907672',
      mid_rewards: '31523308260580901628'
    },
    {
      address: 'erd16c45xvq6jsw5h5cnpgqf8gdnedp09qymvm3dkqk2phd20zjfewfsez8kll',
      rewards: '297919875851073254',
      mid_rewards: '31471720567474825038'
    },
    {
      address: 'erd1lhwmxa3a6rp2jpndmdqqy55dfkfa0zuee82knjv882gn6vy6e74qhugjkh',
      rewards: '59180304836135237',
      mid_rewards: '31463895769211462520'
    },
    {
      address: 'erd1usv7gg6q5pzydvmp2zsqtzhegtg4yzvhxmzj9mx6cmemz9quv5ysfj0hyn',
      rewards: '178332428435672796',
      mid_rewards: '31451390205092970973'
    },
    {
      address: 'erd15dd5pwsu0a8cm758539j7lh97et3ykmm6kh05hczhe9yyxmkjscsllzgm7',
      rewards: '58821880603219417',
      mid_rewards: '31436860281284761964'
    },
    {
      address: 'erd138zk2xfcttc9x3059cpreazupqtdlkgmxzu09qn0q8jsl9m26jcq42hrrp',
      rewards: '58504179457414650',
      mid_rewards: '31412896484468264394'
    },
    {
      address: 'erd1338knweh2at8dfux4u9h99ztvwtsmaf5hwt3f9c3cm9483ncssssyz3r90',
      rewards: '58473291854883992',
      mid_rewards: '31410566671557711402'
    },
    {
      address: 'erd1cgpjave7kdwpgru0reh8fkx43l0q77tg9wzkxkm2jmg4ycl4g2sqs2qwa4',
      rewards: '58330647165482023',
      mid_rewards: '31399807162506768914'
    },
    {
      address: 'erd14rh82sqn56vxazggf0whfsju2rsvdcltsun6utr9wwvyp8lmq36q6s3sgn',
      rewards: '58067864158500919',
      mid_rewards: '31379985771651624726'
    },
    {
      address: 'erd17gv46f334payjffes2ynwpm4rhypklgwmxnvmu886che5d0ldy6sl94ju8',
      rewards: '296567475255771146',
      mid_rewards: '31369710695907519553'
    },
    {
      address: 'erd1hv6ekez97k53vumv6a2ky8ce4md3jjntm8xxzmg03sppnryk0ljsvl7e0a',
      rewards: '296440455763608806',
      mid_rewards: '31360129775781460161'
    },
    {
      address: 'erd1whxjpp3j65eanmtrf9amrfu3skxp75pfjlssvxhrrwrsef75jqdq2ezags',
      rewards: '177061617672530878',
      mid_rewards: '31355534551683192810'
    },
    {
      address: 'erd14qd0dctd3xhsunqg9h45tp0h54caujglga99cqt023sxyvd8uw3qhc9h7n',
      rewards: '176772620651939501',
      mid_rewards: '31333735870836505701'
    },
    {
      address: 'erd1yq3a4kq9w76qvcx0ds4ng38xvm7v02x0k8ap0pqsq4swnfalfngs6ulapy',
      rewards: '57355626784727494',
      mid_rewards: '31326262604657726858'
    },
    {
      address: 'erd13w0j94kut3nh40vd56gas74tuvew4gq7qvnevntwws57h5ayf7kqjtau24',
      rewards: '176667018274373526',
      mid_rewards: '31325770416658115026'
    },
    {
      address: 'erd167wppkep58srcgaxms59w6du6hx8llaqknv0dsccvvfmngp3veyq5e9pq5',
      rewards: '57217817339439925',
      mid_rewards: '31315867811973236671'
    },
    {
      address: 'erd1h3wljh76apk6sese8n7kxxt6v3kprs5lch2rd00gnvsaqtnlpwuqyxe0np',
      rewards: '176403527674248990',
      mid_rewards: '31305895652944415359'
    },
    {
      address: 'erd1mmd5hatjsla07ndfsdpf2z4n90mzfphj2mmt4jslmy0l6n59w9nsu08rxg',
      rewards: '176232378306993131',
      mid_rewards: '31292986071986492395'
    },
    {
      address: 'erd10z0442kwwwd0zx7fguxmdt7nf4aeen2eguw6v4jn34kv3c6tyr0snhs9mx',
      rewards: '176180045772811845',
      mid_rewards: '31289038694922944094'
    },
    {
      address: 'erd1wux53red39ssy2g55sfergayplhlspe8jw24u7y4lmnx7mgnwl5s4094s9',
      rewards: '294837938012088101',
      mid_rewards: '31239253882510770860'
    },
    {
      address: 'erd1su6j62kw96yc86s7r890l0anm6f5npur84emts9quqfmzpna7nxsmxmend',
      rewards: '55508750800877479',
      mid_rewards: '31186955078050793451'
    },
    {
      address: 'erd1vauwn8d89p9q3sp88vq7pmhff8xh56600xmr0dffpzpnkvjuxsdsg7nysh',
      rewards: '54863404737181130',
      mid_rewards: '31138277438228086332'
    },
    {
      address: 'erd19z54n6pmx0n5w20gau54gs94tmzuav7g35mmn6pc9waae3tgqq3qgeda2l',
      rewards: '173328222462045809',
      mid_rewards: '31073929258654983143'
    },
    {
      address: 'erd1w8le4k2g4vr4tndvakqzhdymu4vt0g37pnx6reuh5yxdq7cja35q3wumes',
      rewards: '53859421641565951',
      mid_rewards: '31062548259318214733'
    },
    {
      address: 'erd1xv9f3m9c032ptl90jvmfpvvjkte8smchsx3f5f87k5c9e6fzfuzq3emhwp',
      rewards: '292423497410600622',
      mid_rewards: '31057135672477296148'
    },
    {
      address: 'erd1em7300wr384jjjr88rkvk6aw3vpmgs3gcgvyuh6mxesxczgjgc6qv8frgc',
      rewards: '53605063275894877',
      mid_rewards: '31043362328533867688'
    },
    {
      address: 'erd1hp6n0rqtfr7wpm5qk5j4hzf4e6e6vxpusyx3x254pudaetxqchpq9352ag',
      rewards: '172653444133468945',
      mid_rewards: '31023031580205536467'
    },
    {
      address: 'erd1hnlmkpgec5raj4lkgp7l3rxcns3zwf79qcrxu8xntfd30tk0qpvq320ukl',
      rewards: '291837263881428885',
      mid_rewards: '31012916816594658612'
    },
    {
      address: 'erd1f0qw0r8nanf4vx2l0alpygkj2jkf7nma4646esuadmh0aaauz0js59dmyp',
      rewards: '53146707343613493',
      mid_rewards: '31008789118534879401'
    },
    {
      address: 'erd1mem5auaym29hglyzguxa5dqu9vcgugyqcmkgq7ml0vv96tdaw04s6a9tl5',
      rewards: '52894777846164155',
      mid_rewards: '30989786394217768383'
    },
    {
      address: 'erd1jne8xlspslj8e76xf320stdp4ta664lqtf0t8a9prv50zqtc4wtsc9jgmx',
      rewards: '52669414824090371',
      mid_rewards: '30972787545638711784'
    },
    {
      address: 'erd192spmnwdtkmv0gn0rarqllakyj42rzl4hlrku6hrs2s73p4j6v9qs0j6ra',
      rewards: '52577954643570178',
      mid_rewards: '30965888819550600811'
    },
    {
      address: 'erd1fvc7kwywhn6qachfg4gamedlj5hhmq4y4287xcjgef5p75xuedrss5g5mp',
      rewards: '52472993032235949',
      mid_rewards: '30957971697561083859'
    },
    {
      address: 'erd1009ry4zmadre2ar6zh88jfy3wwywhzxad4zmwycn3zfnpu8ys2zqu2nvaq',
      rewards: '51453691159022232',
      mid_rewards: '30881087042573470739'
    },
    {
      address: 'erd1mh0qfc40tgkrhwrwcya383csy2em0a4kqyn9ug9xvuzgdflm2a2quzft0m',
      rewards: '51194697665077619',
      mid_rewards: '30861551489908207503'
    },
    {
      address: 'erd1ytyzdtsdz289vj8vh7knx9624yjn98wsk5e3ys0tgxnpqclh6rjq5xhgcu',
      rewards: '50731756969260764',
      mid_rewards: '30826632456976987079'
    },
    {
      address: 'erd19ak2all6eg7dkwclev9ajwzfjj9vxan4mdc8l4mtp9yd6ksu0evsuqcdmt',
      rewards: '50486421861686684',
      mid_rewards: '30808127139172840171'
    },
    {
      address: 'erd1y5gwu8m0n8zt7lc6fw5k0ezmulhautlv59qn3xmuyezlrz9emduste0edg',
      rewards: '50347596929063177',
      mid_rewards: '30797655749559099062'
    },
    {
      address: 'erd1j684um38ycxz3gpp87fynqqmfwe2q3v084n8vulnyj668jyrverqqjfk0j',
      rewards: '49992725059464100',
      mid_rewards: '30770888211917957506'
    },
    {
      address: 'erd1khgcw53y7wkjjdvvt9g7ktuqq6kgcgx6plaapwjd7v7d2lys78lqcv7c6y',
      rewards: '169285528946873065',
      mid_rewards: '30768993984520009120'
    },
    {
      address: 'erd1yeluedc4saw67ayhms7lt744qyalgjgm4jkt3vjdtld0re9xjxys7chh23',
      rewards: '49263732537247167',
      mid_rewards: '30715901225204702313'
    },
    {
      address: 'erd1us07kwe962nxzplkucyamdgtu9a40vesw3yuaszlja90whpakpzqfetxqd',
      rewards: '48768704125220232',
      mid_rewards: '30678561856301397224'
    },
    {
      address: 'erd144was5nc33lumsrcwv9u6l8jcn35rgw6n99gz5tmmrhde3a4nt3qpkwr5v',
      rewards: '167844392965995738',
      mid_rewards: '30660290914711407865'
    },
    {
      address: 'erd1cucg7fqjzshv0t4r47ac52v9ccchh54k6q3548dt4k72dev9l4sshpnysl',
      rewards: '286752994133858219',
      mid_rewards: '30629416760646101532'
    },
    {
      address: 'erd1ackcqug5v3xkc0g5mgk76q4r2wdm34qzc5a4yce4vz3ag0p7s3zs2cgckq',
      rewards: '46731426122332668',
      mid_rewards: '30524892545489660788'
    },
    {
      address: 'erd1fcvudhfpyf4a66a6yh9evxu40tlvyremte4vn0ysthv66wfuzc3secl884',
      rewards: '165710225573555803',
      mid_rewards: '30499313359420331994'
    },
    {
      address: 'erd18275kuwpwvl4nrpvpme5fnexqhwa8lj5w0rzdz66xam5aacpmfashwk895',
      rewards: '284695737831417152',
      mid_rewards: '30474240511891077117'
    },
    {
      address: 'erd1f6733z9a6302kuu8z4ajg9nqfsg70hrfjcjczc805tfx0m3wtwpqrnmavs',
      rewards: '45779958387836773',
      mid_rewards: '30453124534048731429'
    },
    {
      address: 'erd1xcf4qdeqds22guy4s0md9j4t2sks3qxexkf85hrztk2ag56ap3kqut82v9',
      rewards: '164954740445692391',
      mid_rewards: '30442328068869539011'
    },
    {
      address: 'erd1wupea9kaq58p75a5vzqwh2nvtgysfyfzshf0azcw3kkrm9gs23ysvjtmkq',
      rewards: '163645435959210428',
      mid_rewards: '30343568882447644567'
    },
    {
      address: 'erd1fhght757dchhd0daethswsmmmd5jcsxg06n4cdljsgkq745zralqefp87k',
      rewards: '43870889243181159',
      mid_rewards: '30309125855745930351'
    },
    {
      address: 'erd19lnktk5pd7c9d4swcyf0r3srkyz7n8ehfr6q3y3xa3hnd8zmp5rqj7rj4v',
      rewards: '162864556727514791',
      mid_rewards: '30284668146665985340'
    },
    {
      address: 'erd170el9vw98m3lvlsvg90uzqnqsjqk82yrxdpnf96r7fvwrhl9dpjsatlg3z',
      rewards: '43457367479652150',
      mid_rewards: '30277934430561400098'
    },
    {
      address: 'erd1xd5l2xfpavv4dvhjr2nxsddrr7f3lwzfddmej0v0v8hp25k4qpgs6tr7z6',
      rewards: '281799698180579625',
      mid_rewards: '30255795892846993893'
    },
    {
      address: 'erd1rfs4pg224d2wmndmntvu2dhfhesmuda6m502vt5mfctn3wg7tu4sk6rtku',
      rewards: '43100211412663948',
      mid_rewards: '30250994598791500809'
    },
    {
      address: 'erd184emx77pukzdgw5pnylzq89dvkrxj4qcxh59rqv8rq43nf7vwjmqlex488',
      rewards: '43040628780065581',
      mid_rewards: '30246500355946507369'
    },
    {
      address: 'erd1grzm7ejtztxay660e768qhlnea59fc7gnu9mm46u022j24e9upasjcdasc',
      rewards: '42951040346996104',
      mid_rewards: '30239742813408386862'
    },
    {
      address: 'erd1vvrtlvj66hwkxudxtpcwys8rcz58lr7qmms2m9y22s2623dpjdkqxr8zpf',
      rewards: '281562351044677547',
      mid_rewards: '30237893097673474911'
    },
    {
      address: 'erd1nln2px3jh6wfm9ht7rnzjrukwycpujwx8q6fmndv6e8920xm8xkqy5sep8',
      rewards: '42406754697966963',
      mid_rewards: '30198688033229894553'
    },
    {
      address: 'erd18kkl9x6y20sh6jdkkyqel7e4tama7lpgds264h603y9cgmlaqnks7rs33w',
      rewards: '161544342844604622',
      mid_rewards: '30185086078227930946'
    },
    {
      address: 'erd1rgjfce758agjzj4hj9azhlp8g9c5m7h4zwj3z7hx0f4glsplrasq69gjhz',
      rewards: '41837926118193598',
      mid_rewards: '30155782010733260341'
    },
    {
      address: 'erd173wmfmjseq02pjfd8kz70m30lpu23e6r54jjuuk6xhu2j272235sgnaskl',
      rewards: '41808151716668741',
      mid_rewards: '30153536165170862049'
    },
    {
      address: 'erd1at38pslu7uzuhy03hamxn6lg492ja3zlgspchpe80lffgw68qgzq0weknh',
      rewards: '41693445059466184',
      mid_rewards: '30144883986659705831'
    },
    {
      address: 'erd1laxpjmsefyhnfyjyc3kua6y020zv0nw6kzh7nd2ve42qn0gnsuuspt4ehr',
      rewards: '160763930668429065',
      mid_rewards: '30126220571855208439'
    },
    {
      address: 'erd1hsye0sahaftmss9t6w5akfuwdc25q77k8ayuekgj43aw6j94kmyq4xuu0v',
      rewards: '41408055537529741',
      mid_rewards: '30123357414887613470'
    },
    {
      address: 'erd1jkcaun0r7cld2564kfrru6q5qvcadrpn249de8g8cg433af9vc9q9k69rr',
      rewards: '160633083050782417',
      mid_rewards: '30116350901051018390'
    },
    {
      address: 'erd1yskyaupu2zumx0s57ltqk6nzkz4eu4eal2rxlyjltldxuspsh0pq8xpsqa',
      rewards: '41147549129490547',
      mid_rewards: '30103707745019935000'
    },
    {
      address: 'erd1fluq3wfutpfr7gs4hm5lxj3a8rpta9fy3hq4ysk37kvgzra2wdvs76gswd',
      rewards: '160448664556849822',
      mid_rewards: '30102440446599837479'
    },
    {
      address: 'erd1zd45j53jjegafuv0sr494nfeqtg2hdfr7urs9e3tmv64p4upftlq3lprgz',
      rewards: '40969529549332392',
      mid_rewards: '30090279952565922961'
    },
    {
      address: 'erd1l2h7std4r6fra2n9ljhk9nk7qjmy26xyz253d833l9w7dm67p5uqgfdk5x',
      rewards: '40752124413906471',
      mid_rewards: '30073881357342059790'
    },
    {
      address: 'erd17f5hcdaenlr4l0v8xpwa35qr8ecpwg69zzx6s44gg0daly6c5j9qknluee',
      rewards: '160005619663229509',
      mid_rewards: '30069022128940296144'
    },
    {
      address: 'erd14rf46r9fvfxyvrve286rsym4qug6xl6lc6990mc2kjcl7u3h7kcsz90lex',
      rewards: '40600466466129049',
      mid_rewards: '30062441989577303656'
    },
    {
      address: 'erd1fgagp0vgdxc4p04l54zs3qrcwynkrly8zspt5rf6unlf6sqkyx9q0jrufd',
      rewards: '40251550388954843',
      mid_rewards: '30036123689848695629'
    },
    {
      address: 'erd1nj9k0w9q3kn0xzv0pug8c3wcskanqt9mml2vtrm4upjtmn6ahm3qg03yse',
      rewards: '40215591936726906',
      mid_rewards: '30033411389139665302'
    },
    {
      address: 'erd1wcqg86n4rds5u852jcfeztn7kmxn4j05rlcc48tacc8rrur0njaqeulwg7',
      rewards: '159208290150634909',
      mid_rewards: '30008880569213735848'
    },
    {
      address: 'erd1t3ganlpu3l7xf3vegqpylvhgummmp2q6hwnecz7v4crxm6xjpslszj3gv6',
      rewards: '39463503975767375',
      mid_rewards: '29976682342604707130'
    },
    {
      address: 'erd1js5ufu0sa9uquyffuvd9znrfcnexdfnpmfaya65n70flntckc0ssty6zfn',
      rewards: '39009533844340656',
      mid_rewards: '29942439948033823719'
    },
    {
      address: 'erd1pvkkjr7zxmt9y0n0ejqw35jyvegpha59xhe8zmrqje6lxkshxdws5f0uej',
      rewards: '158223134943693712',
      mid_rewards: '29934571554205143357'
    },
    {
      address: 'erd15exx5ty6meks67xp653mvuh5lsdf8rc5awklwwfpxzkvgfa20r2q99a6r8',
      rewards: '276541044074054281',
      mid_rewards: '29859142244595898825'
    },
    {
      address: 'erd1k9zxqex2fat6qy7uma4hdpwwulwyvn9c55cg38t96vr872d9ph0qry8vc3',
      rewards: '157022414252875256',
      mid_rewards: '29844002706569258191'
    },
    {
      address: 'erd1ql9jqfu7yj7wg8dkwl8cmf5vzghkvaxevhtu05mvgk2qerpzvjaqlqg55h',
      rewards: '156867372179848668',
      mid_rewards: '29832308078504237265'
    },
    {
      address: 'erd1n07h9s9dy46674qfh8uahlkew9mp3efx4lan4tt5jp0j95qdf9gs4j2ym6',
      rewards: '156734566434537240',
      mid_rewards: '29822290708599432745'
    },
    {
      address: 'erd1rxtlakputlgvg6led7l5et72nmaf03adl4dezyxjceph52adesjqrqu80x',
      rewards: '275909939005415235',
      mid_rewards: '29811538785072899126'
    },
    {
      address: 'erd13xwkf3vc4v90xmkhjvgazhmcxaqx6a7fcrw60hfemtx82zakpy9qpp3ycx',
      rewards: '156337893838451441',
      mid_rewards: '29792370194868852219'
    },
    {
      address: 'erd18jkrp6rpcdv9h8qxj2wyk0cxq6je7u935tnfwgykyxfc6hzhu9psgd74cj',
      rewards: '156156495150316522',
      mid_rewards: '29778687520561106041'
    },
    {
      address: 'erd18pa2dxu0haxe0ecahchjac8efdu0vukrxy9hzykeu52awzdmpkmqnwutj4',
      rewards: '156077064842419307',
      mid_rewards: '29772696192595640007'
    },
    {
      address: 'erd1wr9k2w9gd3hu0wvudlavynmccmxhhwv7u39f4g4yhf5rkqtk79esfvs4e5',
      rewards: '36187310351309452',
      mid_rewards: '29729563188693124364'
    },
    {
      address: 'erd12n5h5y6c97f4wjxqu4gywr5r7gpsmlwnkhyr8efuqyws5at2ed0qjapsur',
      rewards: '274406481315850852',
      mid_rewards: '29698134867363826897'
    },
    {
      address: 'erd1mfudqtq5j2vnx5q5fdd3vmf83srcsdlhj6y6ddtdee5y0z8nhnys6htjma',
      rewards: '35602139261287565',
      mid_rewards: '29685424471255856311'
    },
    {
      address: 'erd1m343akv5q6pe6504awx4kwrec2g8amcc2ww0lyqdjah6ncs9tjgqdeztlv',
      rewards: '35589392486392000',
      mid_rewards: '29684462998098782263'
    },
    {
      address: 'erd1fyplss8llpcau7yt0fzxguzd2h25al4knp0k67usxwlq9pgzp5jsladwut',
      rewards: '35564559570557346',
      mid_rewards: '29682589882570931672'
    },
    {
      address: 'erd1hfcd7qdvj7s4rzlnltyutx7dcvhs8pqthexdp2yr7t4rqlwws20qmfg96f',
      rewards: '154821365219322579',
      mid_rewards: '29677980353424779013'
    },
    {
      address: 'erd1eecthtr7tj9m7ygrsdrpl70ha0r59qvxry5p5zel7my3h659uhvqtm0tmu',
      rewards: '154467854766054876',
      mid_rewards: '29651315505700808094'
    },
    {
      address: 'erd1j2d5ujpjh7duqvwgxycaax2s0jf8hedygr2pkvh6wmy8s6w8evps95h7h4',
      rewards: '154074102304232114',
      mid_rewards: '29621615254015487278'
    },
    {
      address: 'erd14jfk8fxz9f0gc0dmt5daf48ne60jjks6j3cquzpd9a3ssyvjdl8sfcnfvq',
      rewards: '34042665563460231',
      mid_rewards: '29567795336678005433'
    },
    {
      address: 'erd1rdngdp6k48nzyhrph20akx57vj20vrluznmnyk3v2gkjp4h3d7pqpzfx2z',
      rewards: '153242448780483689',
      mid_rewards: '29558884677409136060'
    },
    {
      address: 'erd17s80x9e72nrneut3kh20ker8r758qn77nh2trx0e3ppvxpkk5s8sq3n8eq',
      rewards: '153090469244323671',
      mid_rewards: '29547421052638193954'
    },
    {
      address: 'erd1d8cv34gut05uwndtkzz0w7fynhece75uytrx6hxejg2ugzy37teszvlr5j',
      rewards: '33465121986937228',
      mid_rewards: '29524231952965893892'
    },
    {
      address: 'erd1q7epl38fpgegvdfkjhsu2ux33fh87el2rrxpkt2mya7e4wu50sdqvsrmm8',
      rewards: '152175041077888028',
      mid_rewards: '29478371460371241825'
    },
    {
      address: 'erd1w0cf3jrdumas4gq7m6zau42zezfjxduyyyh5gpcls5zh7vzkvlrqsh8k0y',
      rewards: '152171202911082561',
      mid_rewards: '29478081952288917947'
    },
    {
      address: 'erd160uurhgldy9sahalzwuay2qgqgu3rf20046tzejs4dy4dh8f4qpqu62v5r',
      rewards: '32840318738494425',
      mid_rewards: '29477103831793891736'
    },
    {
      address: 'erd1vu7xmusnsy2mgqsmp55392a8eltc5g7j7sr6p6swdmy49858kelsytr6sl',
      rewards: '152064165864391147',
      mid_rewards: '29470008282827469875'
    },
    {
      address: 'erd1rfh7ynwvxw77x6kytwnj2xssgshe8n6zsqj5vf9gzkrqazcuwqnsnwpkvl',
      rewards: '32672911577064943',
      mid_rewards: '29464476520702643788'
    },
    {
      address: 'erd1axx75fuspvam6f0xqaepwqnzasq7ctv2qfalzmum9me0gmcg0edsetur9e',
      rewards: '271218888001440800',
      mid_rewards: '29457698723116838204'
    },
    {
      address: 'erd1zu5k5ct4h2xvles6tmg5qsjlt3zvtl56yeth2p5uhdaepdhprnjqhpvtec',
      rewards: '151716817126175587',
      mid_rewards: '29443808205500145394'
    },
    {
      address: 'erd1p67ayltd0px6k569sefnamcc0dq3asrtjmnvjhxfl3zmg7vthzjqc8u85r',
      rewards: '32318977359857827',
      mid_rewards: '29437779708999076484'
    },
    {
      address: 'erd1f8x8lje56meps99wzm5dmtcrsl762ev9zxfthjc7a5se0rwqz3vqaxavm0',
      rewards: '150499923192667451',
      mid_rewards: '29352019430562148557'
    },
    {
      address: 'erd10zw0xcxhdv6mwpw8ze9z0q3lhd7ejdndr445rlwa622n9fy7p7dsl0nh48',
      rewards: '150352293117256216',
      mid_rewards: '29340883880130948423'
    },
    {
      address: 'erd1kqguf4rlxg753shjzj6xuuk8k00vj34vzptlwjt8lr2ruwdmhr5sc74tc3',
      rewards: '269450209401645509',
      mid_rewards: '29324289526584611489'
    },
    {
      address: 'erd1r52rn859ys93med69gke6p08k5tnpth070snzxsg4d9uzze2astq8ygppx',
      rewards: '150041535651604739',
      mid_rewards: '29317443836352642418'
    },
    {
      address: 'erd1flf4vg97qpu3cg9azd96q5vnjekrgpvlfftqygwzd3s7ek9kqf6qlne58q',
      rewards: '30595794204442073',
      mid_rewards: '29307802176468016025'
    },
    {
      address: 'erd1ztted03nwtr4ffq972642d5vkresdd2a8drpqkm4d53a3d4dj38qwuy0yp',
      rewards: '30349903926620357',
      mid_rewards: '29289254982872142860'
    },
    {
      address: 'erd17cwm9studv8c6wue48kjh37sdrrj3dccw7ue77jrph43dvh0djfs3gp202',
      rewards: '30321750423303820',
      mid_rewards: '29287131399617694427'
    },
    {
      address: 'erd1qnk45nkvvy5an8x4fx3dmtxewa6t98dm5n6ajnqvdcuww6v3msrqp3x0t4',
      rewards: '29704523104066226',
      mid_rewards: '29240574721232623115'
    },
    {
      address: 'erd1y3tmgkw5cv5hsl9gdcltnw5y4xpujhgn7tq4qkmjkh5rsqctnp5qxpckls',
      rewards: '148889336616211523',
      mid_rewards: '29230534916001140094'
    },
    {
      address: 'erd1mvfdllqhza5ccd92ztrrj4yh96f847tf5uqhpxw3yja3fmae8eys9sgd06',
      rewards: '148405411046857104',
      mid_rewards: '29194033020520273384'
    },
    {
      address: 'erd1shtukcyk8e5dfwdwpu763ylj8ca6h5jl4q7k0numfc9z6t9a6dpspgntfm',
      rewards: '28849175115672193',
      mid_rewards: '29176056901036058458'
    },
    {
      address: 'erd1kx0cmqe5dyr4t3zq54f2gcylznhtnnxqt4ndrd5qdd34fln2ezhsasdc7k',
      rewards: '148011500879052265',
      mid_rewards: '29164320873271586983'
    },
    {
      address: 'erd1rdfrgxh6wyx09eeussgh5t6fh2chf0sdwrkahqphs0c5ajh8vz8qq6qvfs',
      rewards: '28294609872941223',
      mid_rewards: '29134226744066894587'
    },
    {
      address: 'erd13ut7ecudcv58xce5927szqh3mwn7smah3nw35pkltxewhl0vsj0sf7r4el',
      rewards: '147493288445813489',
      mid_rewards: '29125232762882623736'
    },
    {
      address: 'erd1mgkugtknfnt23r5w8y420c5ln4f64as35lr534qplcq4u2sqdl5qz6qj8e',
      rewards: '147382940699699685',
      mid_rewards: '29116909371538436834'
    },
    {
      address: 'erd1d2cqucze0effcs6r4enhth32x67h0msgmxsep2yjncmq9c485m4sa3tey7',
      rewards: '27798947750199729',
      mid_rewards: '29096839575163480397'
    },
    {
      address: 'erd1n9x0f4njqlsqa623khayf6rcg0tery2j3mr9dcux5s5s2yjrl7wqrl447r',
      rewards: '146912615427550811',
      mid_rewards: '29081433329326220090'
    },
    {
      address: 'erd1kjfdzh3t20vlxwm7d42wpa23jyu2kkqdmjkdzud4r5pwknlnmlrshgy4ae',
      rewards: '27296332387972599',
      mid_rewards: '29058927932173489813'
    },
    {
      address: 'erd1lx30tgxhndsh0xzf9d4fx3svf03lfp3x78ne3nwvy72lmd5vjl0sqwsu42',
      rewards: '26639463688015098',
      mid_rewards: '29009381154427300548'
    },
    {
      address: 'erd1xtgzfcr3c3xdhlwgavq7rx0u37zafh797urlzuccsgq45csdtyyq4gpqck',
      rewards: '26573621049716493',
      mid_rewards: '29004414727246016405'
    },
    {
      address: 'erd15rpw78wg64p82wxwy788p0cr0f7lff69w3m0ynk2m9d7evt3d85qn0jxp8',
      rewards: '145665689182095804',
      mid_rewards: '28987379254967909703'
    },
    {
      address: 'erd1av8pwt4d2m3ndhetkz0l5r88x7rzlf4jv7p070fd0869x4xng8ys9nvszm',
      rewards: '264759508811600775',
      mid_rewards: '28970475895909406524'
    },
    {
      address: 'erd1z2h78lh8hfs3g7q3pgcat2rh7a8wzjgdhrxt7nuyljzkrerp669qnhnxjs',
      rewards: '264693247010131226',
      mid_rewards: '28965477851778690182'
    },
    {
      address: 'erd1a4fn7yrpm76k9qcqclc83sv9e5mg2wy59uwwprj5pr23k46t4qmsrts2lz',
      rewards: '26023191315376338',
      mid_rewards: '28962896506460020446'
    },
    {
      address: 'erd1ahl8f84mxdph64tf8uc4cvchctkt6n6amr00emugv8mw9yl98j2qtfuzf8',
      rewards: '145239080342288904',
      mid_rewards: '28955200688122146325'
    },
    {
      address: 'erd1rpu9wadh86vp0fmrk2yhv3fds9yt03cvlll6ttymz7vlnnp3552qjlyhvw',
      rewards: '25896914561227960',
      mid_rewards: '28953371610125783989'
    },
    {
      address: 'erd1d3k2w6jdvdfsfs9cf6af3mx4caehrkdlmj4hq7gkg77yxlf77ltsjsss4z',
      rewards: '25779559220304053',
      mid_rewards: '28944519644741436570'
    },
    {
      address: 'erd15f47e3z7zrgx5dp8mp58vuy60mrlj8m4eg54p0qt9e3nnefymx2sc3pgwt',
      rewards: '25758589655049539',
      mid_rewards: '28942937936876277462'
    },
    {
      address: 'erd1mfn9qlm0uyhg66suzu993v82m4nsakkkckk8f5drjlt9gjtmrczq5x2t9s',
      rewards: '144832867806682876',
      mid_rewards: '28924560588783130725'
    },
    {
      address: 'erd1yjv4zq54xr5fhm7a4hds8cqq040sdrtmpj94c9nswnxuz75gfg6qj5vf5e',
      rewards: '263905686501610769',
      mid_rewards: '28906073155711023204'
    },
    {
      address: 'erd1cxfmsyrhtswzqrxs3z000dplx8sy2ea9me8mhd5awetm35s4n0fsec8n6f',
      rewards: '25056655234094712',
      mid_rewards: '28889991908621773901'
    },
    {
      address: 'erd1jf8l27e3hvydmdfkmjnrasd9tglrh2rl5tp4vvvryf97m9d65rgsjpr9a9',
      rewards: '144326921537940266',
      mid_rewards: '28886397699714850067'
    },
    {
      address: 'erd1upltuvywr9tt7l7pd7s865qssyvxugkzkmgzz0rrwwj9v0n6qrasjr8hc8',
      rewards: '263427597096303908',
      mid_rewards: '28870011474725037076'
    },
    {
      address: 'erd1px8nau72kh2j8glh3jrm4k8gw4yngv5nz0c8en3hau7suy5xy2hs0nhuhc',
      rewards: '144105955291151552',
      mid_rewards: '28869730494351345367'
    },
    {
      address: 'erd1hqe8hqdjykm6resp7nt96nx2f5mxqwm248u7xnunk4zzneh0ptyqe4w89l',
      rewards: '24689976025463942',
      mid_rewards: '28862333758286169891'
    },
    {
      address: 'erd1gy45cmfqavc6cg9ctf0kns4hsyjf0nawuwjtxavtzq034x9wuxms7mw55r',
      rewards: '24067238133438890',
      mid_rewards: '28815361424344406587'
    },
    {
      address: 'erd1jm85tp65afuzf0zgg4fu23p9fdgy7ldzhx8f6pq39dp90vuqfteqdau2yz',
      rewards: '262425895262142694',
      mid_rewards: '28794454368490036217'
    },
    {
      address: 'erd1yysts3s5x93h4uekhw32epzprr4c4gx4aep22ym439fxqk4lwfgq6tu2t8',
      rewards: '23679415637948969',
      mid_rewards: '28786108462542063400'
    },
    {
      address: 'erd1yzfakgx2h8ejraeg0sx9gd43lnpphf0hhgw9ha6el8erap9ms6ks6cu9my',
      rewards: '262086526033250084',
      mid_rewards: '28768856175489021436'
    },
    {
      address: 'erd157sy0dsm7y2jc9y95teha2whgukjehe6h93l0txkkfqzzwf464xqj7qygn',
      rewards: '142559604814168627',
      mid_rewards: '28753091227773802860'
    },
    {
      address: 'erd1235pdcld7kj33tr4ra6spwnfawcnap9zjm6p2vsnxcx5gp0uyuhs8tyfap',
      rewards: '261848310549658865',
      mid_rewards: '28750887881944270776'
    },
    {
      address: 'erd1d4na38e4wjvrwaymp3ma0qta0qum6z9g5ntfrzlnt6aw49z4dkgq3j2x2k',
      rewards: '23197105809724813',
      mid_rewards: '28749728440377251629'
    },
    {
      address: 'erd16kvy7cs8agxzkr60jn5k4rd63hruc7uhquxf4ezsmtncf5w4rrtqaumj6w',
      rewards: '141893933089746244',
      mid_rewards: '28702880448992575703'
    },
    {
      address: 'erd1dr3ml3x0wlydhz5hkyl35ehtgwrdv3wk4gxka9uua4a2wjuglr9qqvnj5s',
      rewards: '141351787439993973',
      mid_rewards: '28661987086261063199'
    },
    {
      address: 'erd163hqce6a4qeanqurdla2cvxqaq5pwu2rxev6m4n4cu9e0xq83j9qsx7sqv',
      rewards: '260398053158825050',
      mid_rewards: '28641496795684474283'
    },
    {
      address: 'erd1jr5y82ksldj9kkgsgz0pynu8letg88nwlxfcdwkp6cwy9mgf08pqdvvckr',
      rewards: '140940314615201632',
      mid_rewards: '28630950209941789908'
    },
    {
      address: 'erd1778tdtppqjrss5xveyqza3azu4khx7p34rcm9kkss3ltsg5n9gqs7djwtr',
      rewards: '140404659492304252',
      mid_rewards: '28590546419466583365'
    },
    {
      address: 'erd1a5mtu4876s98szedavqpx4c68lgk6f2u5mx0dzhjysuvwu9jaf2svmfzjc',
      rewards: '20930873782501939',
      mid_rewards: '28578789416214017156'
    },
    {
      address: 'erd1qy9s2ratjrwdzcfshalxrhtmymmwwrsjdyx0pzzszac8atf5wjwsqlwufm',
      rewards: '139937894068707523',
      mid_rewards: '28555338892141793338'
    },
    {
      address: 'erd1cksqaqy7jwz3se25g3ma2aulzlqqdyfrxap0mffn4v7setrsfgjsd9hsrn',
      rewards: '19939817166216059',
      mid_rewards: '28504035265340054293'
    },
    {
      address: 'erd1k6am2ss6wjt6jrxf647vygpapl97nx2fg6vn6qyxq34jqp2xm4gq2cl6lu',
      rewards: '139203036514326399',
      mid_rewards: '28499909513448021759'
    },
    {
      address: 'erd1u7ycudqzpmgk0q5m465jkusyucnv8xxttzex8hs7hzx6grsnx2cqhje8hz',
      rewards: '138293475003300709',
      mid_rewards: '28431302435600966980'
    },
    {
      address: 'erd1rc3yxr07lln8nmvhgh90p0v5a2cj7sekhlyjl56u5h0l49w2h3ysw7zpsu',
      rewards: '257465796361404092',
      mid_rewards: '28420320362942331594'
    },
    {
      address: 'erd1vmjl8mp7pzr49l3a6hvxyzc0fdt0qhcd60f4tgkczhje2qnegu2sach87x',
      rewards: '257411243844603140',
      mid_rewards: '28416205535389112967'
    },
    {
      address: 'erd12f29sslgzqe9hr2m0p5286faktrfg2arvf0wxagpccuszm5tlw0s9vye5e',
      rewards: '138059002791306058',
      mid_rewards: '28413616492312592940'
    },
    {
      address: 'erd1e5y234l987xdc8yc0lzfxllhms6jssmnugdch6mja6g62xyw5exsr8rckt',
      rewards: '137437268230726229',
      mid_rewards: '28366719838396572137'
    },
    {
      address: 'erd1jmcqa4ms0tsfvx8wf3u3gj0m7kp643znnncn4dpc62zz9cazcnfsf7le4k',
      rewards: '18040978154563386',
      mid_rewards: '28360808233069776104'
    },
    {
      address: 'erd1vkxfath94ukdsrtnr4g4ahqrgyvv6k95tl4zcx7r04dyf7gpn59q62qu95',
      rewards: '136692879004480969',
      mid_rewards: '28310571497713239315'
    },
    {
      address: 'erd1e9j33yp3fc20w6n9n7z3f99ecdvngntky7yx42m73c6lv23sspuq3t0g6x',
      rewards: '16821198060449558',
      mid_rewards: '28268801758676653332'
    },
    {
      address: 'erd1krd4kr3gxr2em78n76n5gy0z94my243jqptx83lqcs8xam9jhessmp6wat',
      rewards: '136102950360337229',
      mid_rewards: '28266073923967692045'
    },
    {
      address: 'erd19sth8r5uursv8jt039k0pneklz7npfckx0n4jna8v6sl07x8qt8sla0c9z',
      rewards: '135980851928858694',
      mid_rewards: '28256864193243703070'
    },
    {
      address: 'erd1mtfmd9dd8unejxq9jcgvwv5c2yugwpcm9e0de4demukvfldr8zpsnvf3kg',
      rewards: '134090426061673625',
      mid_rewards: '28114271753851895002'
    },
    {
      address: 'erd1c42pjp98xkvwnjzc4fk3dsrsd27uftvd97e5zzngy2ndwddhvu2spu3f8c',
      rewards: '133608625353782509',
      mid_rewards: '28077930133991819064'
    },
    {
      address: 'erd1wux8l3saw4d9e976twuamgur5hjd8wlxq4a7austpj9svupyqw8sf3642d',
      rewards: '132019634850884118',
      mid_rewards: '27958074584027258674'
    },
    {
      address: 'erd17zcmhsfaxpzkmy744yfupu57zwnyn4eycpmvvxsngjdmg37nrszsx9rqv0',
      rewards: '251315608872241151',
      mid_rewards: '27956419475835569830'
    },
    {
      address: 'erd1vl46te9wrm674ladw6uhja6kqg6qu62vfny8n7v2yxzyzddvmhkqudz8dj',
      rewards: '251249138918464123',
      mid_rewards: '27951405731038774125'
    },
    {
      address: 'erd19w6vhfdh7aexeskv2ntj5nhl6mvtccj3y26hzv6pgpmq3yt5zmkqndzl79',
      rewards: '12262684186304548',
      mid_rewards: '27924958805298305459'
    },
    {
      address: 'erd1sx3r88na675xfs268q4aq95pa8s42uqcx4ddpm0pzcq9s6avav0qs4gum7',
      rewards: '131351008892280167',
      mid_rewards: '27907640971086915981'
    },
    {
      address: 'erd1u3lk6280pkj33d3mjasjhytptz7wdjuw75k92mllyj7qmpms5rhqawxu3n',
      rewards: '11768009684211248',
      mid_rewards: '27887646131375024714'
    },
    {
      address: 'erd1dgrwag6rpecz6xlz4p4ea4zcksxylrexd9zznjfjldj6hcw9dazqeyutl8',
      rewards: '250365088732654562',
      mid_rewards: '27884722940283760842'
    },
    {
      address: 'erd128rlwhckv2gk6e42r9qjmuslthma55jvzc25jzmhu98l7g6jw0eq4udcut',
      rewards: '130812998940554690',
      mid_rewards: '27867059558842574161'
    },
    {
      address: 'erd13pznvg7w0ysl7pmhr0venhhg4efu76q83yje405ecndpfncmnxys2u8e0k',
      rewards: '129650478671147420',
      mid_rewards: '27779372120824156320'
    },
    {
      address: 'erd1mmrhv30z8a8zn0zyd6yklme9xcvvg6ga9k9a8pccwrtm0guqjx5seml7rm',
      rewards: '129559598778372042',
      mid_rewards: '27772517165108911411'
    },
    {
      address: 'erd18g5m5ptek2sgtac0sau95ujeemm9wmledgs409xla2nclfxka8yqc7e0qd',
      rewards: '128633087673920612',
      mid_rewards: '27702631600802678801'
    },
    {
      address: 'erd1wqylwyltcj6ueqyu385ptrseuenryv3wh3dj86nsxwvpdv64jkfq3wvayv',
      rewards: '127802611411959994',
      mid_rewards: '27639989823568490283'
    },
    {
      address: 'erd1t563xcj7u7ks5vn9llwaxmqkhg62r5rl69zly0940z5nqq3jj8eqew2sq6',
      rewards: '127773265098194866',
      mid_rewards: '27637776268126002605'
    },
    {
      address: 'erd1jhqcvjcthn586kjdwn4pw5wfwa3n6hpchqx0564806s0gdy5hsyqp5zjx2',
      rewards: '127648670494122888',
      mid_rewards: '27628378254250888525'
    },
    {
      address: 'erd1wpj0uhez3r0m4wrj9mtkfvwcmqehnr7ghhtzrz74z4222frlu42qeghhxr',
      rewards: '246244777896462824',
      mid_rewards: '27573933089497423261'
    },
    {
      address: 'erd102h2c0303469w636fxyjc39tpn2ynjzq4fp7qad8e7x73fpsppmq80tr5g',
      rewards: '126816362604485438',
      mid_rewards: '27565598319650663788'
    },
    {
      address: 'erd136msmc50neue5f7746t97puwcj9htt9mxjx37lc4q6sumymc0l7qfag23f',
      rewards: '126740265891492095',
      mid_rewards: '27559858440545234259'
    },
    {
      address: 'erd1hxfuzgm6j6uxvgpd2qp9enyveu87p3ua8zpc84fu8p3a94pfa5aq40zals',
      rewards: '246016505044611847',
      mid_rewards: '27556714756127480518'
    },
    {
      address: 'erd188m5tq3dhn8lx8a49a8clxefr042hzvnlql5crtausewes9surasd8lsmg',
      rewards: '126280072675989487',
      mid_rewards: '27525146646589627735'
    },
    {
      address: 'erd17fk2ph36jywkad3awwlz5u9cu37jhhzxr3uhn4sjrsdz7zxa338qav7yag',
      rewards: '126095262446879968',
      mid_rewards: '27511206644048017681'
    },
    {
      address: 'erd1jg2la5cehfe3tv3lmphaaxyvemhn8vwspsrpk6msy2j276a4wz7q2h29we',
      rewards: '125916329362295285',
      mid_rewards: '27497709947107014146'
    },
    {
      address: 'erd16px4m9ae96hcjmrg9gmhlh3jcdcacw5xqccwmyggqrsd7n8z5jps0rfyyh',
      rewards: '244466441319604414',
      mid_rewards: '27439795403933743058'
    },
    {
      address: 'erd1q97pz8n3fx4gcqy85hsxsug7s6k606nue8y0n94gqj3ap3nx6ftq5zzltf',
      rewards: '124698201399273502',
      mid_rewards: '27405828090878876886'
    },
    {
      address: 'erd17fcqpmhzy3850c2vnsjll5w44grvzlnzkywwuu7awzv0z5skhwasg5e7n0',
      rewards: '243520355032907116',
      mid_rewards: '27368433308314418619'
    },
    {
      address: 'erd1gumpnfpzpet3y7cg75c50skfrssc9fzlmz0zwx2mlavf9jx247ss7zqjgj',
      rewards: '243450579544311333',
      mid_rewards: '27363170231194423863'
    },
    {
      address: 'erd10r6tdjpmjj324h77hj2c5kscqgfy0ws07xlcvuvk2rje2pvakhzss8tyap',
      rewards: '124007030913974360',
      mid_rewards: '27353693972717883660'
    },
    {
      address: 'erd10v8rp8atqxhhpppvyz7jmvun4pcuu589kxcp5kektvfah9svhmys5sdud8',
      rewards: '122644097883332753',
      mid_rewards: '27250889652834002838'
    },
    {
      address: 'erd1jj7mrstrq7pns5gecdnylskdgk9ntstvar9gh9rwr9schg7jr97sajgv0z',
      rewards: '121762245979620258',
      mid_rewards: '27184372675725603867'
    },
    {
      address: 'erd1l247jdc5t6edrqhpdrx2unuj70d39g0jkpkxke6hrg696hjmf9ssxmrye8',
      rewards: '121755936971153023',
      mid_rewards: '27183896795172389590'
    },
    {
      address: 'erd1vpydcgsrevnp8yhdsf6qfph4s8ku64fpglm9elu494r5upzs5unqg63ls7',
      rewards: '120504397527607883',
      mid_rewards: '27089494753099244027'
    },
    {
      address: 'erd1e5nu9slrk0h5xs3lt43l4ldtwlkpzq44eh4294mscx2an459m2zqmgjuzk',
      rewards: '239261609915422147',
      mid_rewards: '27047201534251583111'
    },
    {
      address: 'erd18fztx6cn027e2atk0l42sh898mf4lm2nz0cyhzz47hnn5yft9ndsl3z2yk',
      rewards: '119800605275977280',
      mid_rewards: '27036408591019535091'
    },
    {
      address: 'erd1ndr96c766xg6hpentgsr9d6vnmujhdh98uwurs2rprxukr2zaqnqtjp0kj',
      rewards: '238339026994676714',
      mid_rewards: '26977612267888972762'
    },
    {
      address: 'erd1nrqvcqd7rz4uytt897q3fdmz8064k9eddrjn5s0j5v38zphdhh5sd62gug',
      rewards: '118986780055052262',
      mid_rewards: '26975022780814201697'
    },
    {
      address: 'erd1gf5n2t587ax2xjyt3rqtxcnnnr5g4rk8a45xlqkl8uwrmxptdv6qjq0ysv',
      rewards: '237508753648255726',
      mid_rewards: '26914985796318068164'
    },
    {
      address: 'erd10jwtd7c28hg5632qjz5597e9ux50rzdfz89j4wqsnwh5xk3an43sv4q3s8',
      rewards: '117772518003560190',
      mid_rewards: '26883432525417952780'
    },
    {
      address: 'erd1rta5cv5z25ja6kugwf4zru6skl5t7hs77nh330tnfcu3fncltghqcztxjt',
      rewards: '236206394172878061',
      mid_rewards: '26816750463326321530'
    },
    {
      address: 'erd1g0cd7vg6zt75l6fjk7yxqdj2mqwjx2z2w375t0wpnlrd9ah2yqwsv0wzd7',
      rewards: '116561757735966688',
      mid_rewards: '26792106405165529193'
    },
    {
      address: 'erd19q55squj9zcr0zfdlftuzzcj7evm6s2lzs80eh0sezxlqrte5k6q2cv8k4',
      rewards: '115905106582939681',
      mid_rewards: '26742576036709986977'
    },
    {
      address: 'erd1n8kfja7muc952dskwdk3ft3mxfajx6lpgxddmd2y6m5t00kx9pusflpmff',
      rewards: '115215035352916927',
      mid_rewards: '26690524833988363972'
    },
    {
      address: 'erd1y0np92a87hnc3w2jflxrflkp59tys27vwl644vtyd00xv3nfv4rs4ws20l',
      rewards: '115055568624634647',
      mid_rewards: '26678496459756762931'
    },
    {
      address: 'erd12rmnh7ddlq75sa9nlte5dkutfrrh7wj0clgy8g44suklswkecf2sajdt0u',
      rewards: '114077388233171817',
      mid_rewards: '26604713546284671858'
    },
    {
      address: 'erd1u7sk9p3ph743ua4u8jckek6an5d32hf6cn9jvv9xta2nphvk7fhssvve3t',
      rewards: '233312317138751670',
      mid_rewards: '26598453881985958858'
    },
    {
      address: 'erd14tkmpjczyxwslzvgj8wf4pevlqv5rsp5652ap8jz97hqs60ledxq00gup7',
      rewards: '113971022404672604',
      mid_rewards: '26596690505965075625'
    },
    {
      address: 'erd16ma74jhhlequj6x3y47dqdat0fmqn8nhajknvetmu77lg35r6u0qw5tv2l',
      rewards: '113431957273744423',
      mid_rewards: '26556029502884022969'
    },
    {
      address: 'erd16ld8gxp3kfmnwt3upr8mzhjmhgwlsdlp6e4dnvmqz64yqqfjc0xq3au2x3',
      rewards: '113223039995422483',
      mid_rewards: '26540271136018581458'
    },
    {
      address: 'erd14m9wxyytex6sv0dtjhzxhz07u4dyjsg0hr9es6yawuysyh5e57mqzlefmw',
      rewards: '230899776373671889',
      mid_rewards: '26416478974217080437'
    },
    {
      address: 'erd1qm3sjq4kj0na47z448n9yl25ewhpkxu5u57tzsldv7gn5z4rlvaqu7xpsp',
      rewards: '110363789720398707',
      mid_rewards: '26324601493201836947'
    },
    {
      address: 'erd18ajpqvwwnvhpjwgwur4qfkd72hndrap86j3qrst8ngnpcrhpnv8qmnhd6m',
      rewards: '109931801685293751',
      mid_rewards: '26292017180437744120'
    },
    {
      address: 'erd13xehacffm4h5ty5v8f7whv9v4sf3g7mz4eu6gfrtmqgy6z352q5qcuhqmq',
      rewards: '229114975421289907',
      mid_rewards: '26281853688959039626'
    },
    {
      address: 'erd1zqunv7jdgrlcdfwe3xskllmxgd0cajn873tylrsfk3kfa805mn5sp6hzr7',
      rewards: '109321736352396889',
      mid_rewards: '26246000721651305611'
    },
    {
      address: 'erd1de83u8vv7zrtvfdrx3ucdsflsnc6vzw3ew06cmvnyfcz9u0ht8vqs79f4l',
      rewards: '109228005662502283',
      mid_rewards: '26238930733904126458'
    },
    {
      address: 'erd1k3pm9c3u7uqpzct20hhq47k9c0l4y4shpq24gp9tculmpkrvha5q3yt93s',
      rewards: '109004783267999130',
      mid_rewards: '26222093350163455797'
    },
    {
      address: 'erd19r57s9gm7v6sn0fzngtqy7kg7jntzlrwzfm4k2thk0u9xpfezgxqn77l4a',
      rewards: '228284504973567590',
      mid_rewards: '26219212350285514574'
    },
    {
      address: 'erd1xpevsejnq52hx2mvhxvr0ry9c4jkhe5srrdvtcx652zlqf4vjz8srlttkx',
      rewards: '108522562383970418',
      mid_rewards: '26185720036947150420'
    },
    {
      address: 'erd1mcau6srhnc8vm60xg62vkyw0w079vfkw0utg50tf2s5kzaw6y2fq60uh23',
      rewards: '108277257352386375',
      mid_rewards: '26167216987737007088'
    },
    {
      address: 'erd1ly299k3gvcsx2dskqtc8jrh88s36dcuytup44slf9ftdtu66qeyq2e58f4',
      rewards: '107205574564918396',
      mid_rewards: '26086381306437946899'
    },
    {
      address: 'erd1etr3c8rmcdlr0s4vf3jphzcyk48fncq2xxzn9tneuvchycn3effsclpvdz',
      rewards: '226217242202050728',
      mid_rewards: '26063281326185958431'
    },
    {
      address: 'erd1mnzltcuyp8m2qstd8cknpa8lxup47l4pesypgtxw9gje2ja9he7q3rvew5',
      rewards: '106129394819634209',
      mid_rewards: '26005206425281338220'
    },
    {
      address: 'erd1x5779mqpxzdtcek4duwfma9nqnyjx78654vcuad565hlvg8thpysmyyjva',
      rewards: '105631431853805087',
      mid_rewards: '25967645706685117940'
    },
    {
      address: 'erd1yg8uzl6yuez307yj0ttvr6zpwemnjxdrd5ssxzr76vm3qfxzheqsk7lnwt',
      rewards: '105280528599285728',
      mid_rewards: '25941177516675135677'
    },
    {
      address: 'erd1zzcvnshsj49qcq7ylm5pvnuq4hm5nwk999hjeukeafklsjpwcgpq7m9yzx',
      rewards: '104396393768824902',
      mid_rewards: '25874488341280811826'
    },
    {
      address: 'erd1nr4uqly5nrzj35ks6ugmah4yt0d2uthr80g8t4jhzwk5p8plnrzqp3cyer',
      rewards: '103414313094084843',
      mid_rewards: '25800411234359258864'
    },
    {
      address: 'erd1tqlduff43dvggv2gc5z0etvfxs29r02h77gjlp08ujya2scydslqa6zqww',
      rewards: '103370015095730822',
      mid_rewards: '25797069892201853982'
    },
    {
      address: 'erd1st2dqune2levr2mu7jyh90h55e0e03e759vshal9uzj4z4zdnfpqegp2ap',
      rewards: '222301601736199971',
      mid_rewards: '25767929503351281407'
    },
    {
      address: 'erd1mnwaaavp8z8y0l3gcn86l3dadz25jp9yqe9jya3hadnea9574u0ss45qj8',
      rewards: '102123483935451734',
      mid_rewards: '25703045618620172683'
    },
    {
      address: 'erd15tcjmxw2xwevh43g982ysj7dprkn35atan56jxazemlxt9l5d5xqtj3yxy',
      rewards: '101977146960647834',
      mid_rewards: '25692007605137222991'
    },
    {
      address: 'erd1llsyp59fdxk4u8wwksvnncxg8krqm3hfgc9fq8q90rkexlpfsysqveyrzh',
      rewards: '101807937440240561',
      mid_rewards: '25679244344381000540'
    },
    {
      address: 'erd1hxj97x3ga0q0fvdqp70zvcjf0lupxd33jvuxvvg2yhn3g4cc4khsm7qvrg',
      rewards: '220808914870892671',
      mid_rewards: '25655338015334236646'
    },
    {
      address: 'erd1taqqs9dunqvmtl090p0yqxvewllphs5rl0ryvnuwk3a3hgdmdtpqc2dqxf',
      rewards: '220708991840678575',
      mid_rewards: '25647800947165112608'
    },
    {
      address: 'erd12alcs93juykdtswg8t3w5xlss77ev4vh8qs3x7dt0xsps7yyfvpqn5wtst',
      rewards: '101165060349448961',
      mid_rewards: '25630752936071198324'
    },
    {
      address: 'erd1r3hzd8jlx4kjcwzrm6hnsxgsfnvkshdj3785aq68rupz96m3305qkaatdm',
      rewards: '101067384459661936',
      mid_rewards: '25623385366870911996'
    },
    {
      address: 'erd1jaacy2ma8cvv7f8w0z7yq03fprldgd6ppklsvt4566cvfgvsfv4q9x25w7',
      rewards: '100293834075394697',
      mid_rewards: '25565037436809321422'
    },
    {
      address: 'erd1ywmypen9mu99ga756pe68xz3cns3s2dcg8t4hvh7dgk3kknlskestp9hl6',
      rewards: '99742118517533578',
      mid_rewards: '25523422227976523799'
    },
    {
      address: 'erd1aed05pxk5r8m3wpxetahe3htrcjzemqhgqnm65pqyar9kh4lsfss2e5ue8',
      rewards: '218244480040999172',
      mid_rewards: '25461905929790290740'
    },
    {
      address: 'erd1mhh6j0mwjehzqtz0gyr4k0r4n5ke57jhev2xqhhx9jcpt7hrnczqmt2qke',
      rewards: '98780738038827451',
      mid_rewards: '25450906510739487903'
    },
    {
      address: 'erd1azug0fpmgnlqy5gqzmgk7g67cylm6l35rvpf40e3cw97lqhjxrdsvyljsx',
      rewards: '98756555557734106',
      mid_rewards: '25449082456683995672'
    },
    {
      address: 'erd1m6u8pzfwyu28zdpf9d36lqm5wtsxx3fweyh0ugyc5n59uctkk6qslnfd4a',
      rewards: '97127559921112819',
      mid_rewards: '25326209369927983427'
    },
    {
      address: 'erd1sdqdp2rt6ue2ztpfysy2he347s5m8a2lhp7q7c4kp6ht5lu6wtvq402lga',
      rewards: '215699418803567122',
      mid_rewards: '25269935169896196572'
    },
    {
      address: 'erd1uklj5yw0vprf8ja0m7r87ggvlw99rcqef9s7kq0rps633586kdks7reluf',
      rewards: '95977792763893720',
      mid_rewards: '25239483883080629770'
    },
    {
      address: 'erd189x7gauhj2rcr9hpqgm7353vyckvz8rmyc7p7hpsjgymasdxdnlqqgpq3e',
      rewards: '94356881791372219',
      mid_rewards: '25117220612343146965'
    },
    {
      address: 'erd15vxk694u53dlq4u0vdghhdnj3ra5qmr2h6gfjxpajup5s2sefx5sv5knp2',
      rewards: '94317335452921255',
      mid_rewards: '25114237681900529949'
    },
    {
      address: 'erd1k6mqg4sdqqwwgs8v06eds75nmf7axd4gyjqsz8c2xe3h5h7g4easu8250z',
      rewards: '93888108283667378',
      mid_rewards: '25081861617766215502'
    },
    {
      address: 'erd1yfytw5xj7phuysckcsmjtnm5q47r4ape2rkjyw8gfup7prvuvqeqsdxr30',
      rewards: '212813400629775784',
      mid_rewards: '25052246458228927297'
    },
    {
      address: 'erd1mck5rk0drvtvh6jcfmfx254h7kg8thl5qeg9hz46c4lwl8kjd82qk5snv2',
      rewards: '93332316368999809',
      mid_rewards: '25039938934479670256'
    },
    {
      address: 'erd12zh4pkm7tpuahevvr4zs487c4nmaxs68fhjkwg4xf9lj0c6jad3qgzamns',
      rewards: '93102458069715497',
      mid_rewards: '25022601012809032416'
    },
    {
      address: 'erd1jvgud9awal8vhgvhdlluhhprfngy8zu4nq8z20ehszwr7rufmcnqgchenr',
      rewards: '92962477657271425',
      mid_rewards: '25012042466809451269'
    },
    {
      address: 'erd1u9vxyc3tkrsfghqrgxr4swvxtfvk0kehlj2msqdddza9v84m74uqayel78',
      rewards: '91968521719396305',
      mid_rewards: '24937069623763969049'
    },
    {
      address: 'erd12maxud2fwy6pg2p080kanpaatffyt4s6hnhqv2wmvl6rtvl46trs28wzke',
      rewards: '211212660646056726',
      mid_rewards: '24931504659741804688'
    },
    {
      address: 'erd1yns6y8090vnw0jn5qkxv8xucvyvklq2u4grx2zwhxm0yq52ff0asn0e748',
      rewards: '91318345401160766',
      mid_rewards: '24888027643932176016'
    },
    {
      address: 'erd147cpn8ackjrxm73uyyum4ej0vlvrlhvpvqshp8lph3g56tne3sysm3zghk',
      rewards: '210627187411644726',
      mid_rewards: '24887343151934185368'
    },
    {
      address: 'erd1j569vmypfuma2fusp6ghgtrsd8vu93k0aum2ryh373etv99mczpswlvuhu',
      rewards: '90884994097853202',
      mid_rewards: '24855340501566600525'
    },
    {
      address: 'erd1rl92sqdxrcsarry05qtagqfjwr7cr8yzqmcscfwdhxxmf5fy5westx4vdm',
      rewards: '210008171923303145',
      mid_rewards: '24840651594208427587'
    },
    {
      address: 'erd166td0llyuw945n9cmkj8t0z3ecps3r09sw50ntx4p8k63uvyry7q85vy4h',
      rewards: '209931616359407183',
      mid_rewards: '24834877104558010646'
    },
    {
      address: 'erd129wqrl6mvf8la362vtc492qhmh97la9h4mhqkrcq8wzeukdfvgqq0432m2',
      rewards: '90506688003521958',
      mid_rewards: '24826805349903761708'
    },
    {
      address: 'erd1rm2zjrtj3pwsnqs3dv7hc72h7ksku028mac92mr2hr60s9ptjtdsmr4gk5',
      rewards: '209810191964876857',
      mid_rewards: '24825718215591084827'
    },
    {
      address: 'erd1uut495rlqqeyrft9rtnqs9keqwafph6qz92hkep34k34nyh620xsk56qmm',
      rewards: '209521860387284015',
      mid_rewards: '24803969728270673676'
    },
    {
      address: 'erd1eswveghjjsjt8f9zdtq0fjsrjz6trggsuz8p60l5ktdqal2nxecq2wvdly',
      rewards: '209404531290048975',
      mid_rewards: '24795119742414684995'
    },
    {
      address: 'erd14e4adpzwnvmcrrz6vxnngfcjzng68qpgfk7ut0ynfzmay4rmlfksnzt9gx',
      rewards: '90055188400291651',
      mid_rewards: '24792749304159472163'
    },
    {
      address: 'erd126kj94ppkgyg9a8t45r8jd6zpm2l7utkps0n04u0vjhghr4lus9q6tv790',
      rewards: '89802180111652588',
      mid_rewards: '24773665207983243319'
    },
    {
      address: 'erd1e2fzgvfshgktgyq3eqp55a73jcv3eedrsfjxgkty9dfg5g9l3phqyp4ez4',
      rewards: '89598086046296281',
      mid_rewards: '24758270649989873529'
    },
    {
      address: 'erd1wyszqr056q66g3lg79lcluyrf6tjsjfzpcqyythzulkpeekh4snsn5n4kl',
      rewards: '89278563832148501',
      mid_rewards: '24734169492284574704'
    },
    {
      address: 'erd1sfjqxtr3v9a048lecv9mjdsq4s5z3c60qeeahtpdc3gntqx4snpskvdhl8',
      rewards: '89055267040626333',
      mid_rewards: '24717326496870572138'
    },
    {
      address: 'erd17zmkad38lydt8fm6tvl6tsjvp2vh7eh7qyzt0h23a8cra4x9uuxs8d4z4e',
      rewards: '88611738734323192',
      mid_rewards: '24683871716001933889'
    },
    {
      address: 'erd1yasmx3l4j96j66aye3wcnyrglntzhnfkqkqmywcghgjqcjdahxwq5fgm7j',
      rewards: '88493941524346164',
      mid_rewards: '24674986420992093093'
    },
    {
      address: 'erd1zy6tmjc7y7rfxkwc3sd39v2p33nz9dlr37hd7f24j9u3eucmtz4q87zr80',
      rewards: '88419873559098980',
      mid_rewards: '24669399567770966661'
    },
    {
      address: 'erd1c5y77ega7wykkna3lyyzd65whp5urdq76j6hpuz9wyj22fg2klaqedey8q',
      rewards: '207696604206430767',
      mid_rewards: '24666292956141867353'
    },
    {
      address: 'erd1yqp52nd642kxtwjgk35szaj8u2magd6l6nsu3nkz59jchkuvpkcs7mx64m',
      rewards: '88261024599757691',
      mid_rewards: '24657417791071596582'
    },
    {
      address: 'erd1mxh9sd23p0uqnrdjkkp8057auu0lvv6ejdph9nut5h3x0zj2re3qfmmg9s',
      rewards: '87470900332592038',
      mid_rewards: '24597819713922144741'
    },
    {
      address: 'erd1rkw3qc0esse3c8d22zgn56hkfgsyjda3wlmp3qmqx5h5hftwqvzqfean87',
      rewards: '206519599237310280',
      mid_rewards: '24577512955488850716'
    },
    {
      address: 'erd1t3az9fr7pgr2tp9w2ucadznc0afzc5xyerk2trnv7y74tgu23ehqq08ynr',
      rewards: '87150866833142070',
      mid_rewards: '24573679990611217210'
    },
    {
      address: 'erd1vpnmzpvd0976ehv85xwwynt6xstvdkcnc09mkc3z8m28wdsmnt0src8xng',
      rewards: '86851578690351181',
      mid_rewards: '24551105063393815398'
    },
    {
      address: 'erd1qz3nyht83st6kxnxtc0hpyqdn3cwr72hqv5flrjqv8r920rtl55sg0d88k',
      rewards: '206162107582379283',
      mid_rewards: '24550547810743592667'
    },
    {
      address: 'erd1hrmt0xhrn7vevyfd8rew7ftl5naxht6feazlghjg8d92uzzhhhlslskgzp',
      rewards: '86573167513987442',
      mid_rewards: '24530104859428788953'
    },
    {
      address: 'erd1jdz4nwclc08nsuuamap5s5zzfwutsflnhp7w677z6jajn80q0uysmryma0',
      rewards: '86070940579748608',
      mid_rewards: '24492222515072159567'
    },
    {
      address: 'erd1l85arv2s8yqcav3ufgx37jhh4xpq7p78rdmxa53www5gu4f2kwhqrq9d99',
      rewards: '85993619621327671',
      mid_rewards: '24486390292677863156'
    },
    {
      address: 'erd10hn5w8d0ww4jezsasve42q2wrj924xd6sarcleysm4hdv67esmkqfptpxp',
      rewards: '205293537059163575',
      mid_rewards: '24485032631418646392'
    },
    {
      address: 'erd1ynr5mvscdcc88k3zykel9tsjp2hr0l2vgxkpzq6h06wmsfj652xsml6uy2',
      rewards: '85884013769188426',
      mid_rewards: '24478122861460671330'
    },
    {
      address: 'erd1cf8ja8zlftfwss820zly4ls99zc4rrcccqa69wme22p9xtc4w0esggucqd',
      rewards: '205069277154524473',
      mid_rewards: '24468116989596690066'
    },
    {
      address: 'erd1tdu2436yxp9st0zzqr964hn4u4p03ajh8ujwhaxp9hahdn9q2kgss87ztu',
      rewards: '204643446038557577',
      mid_rewards: '24435997085479491900'
    },
    {
      address: 'erd1kcj6mr5svngg2wqnkjlw0kme0xwgeehf3v4jpj3v5dla8syrsfzqg3xn22',
      rewards: '84629315781280944',
      mid_rewards: '24383482574369103419'
    },
    {
      address: 'erd1afw8gme4datvnrehqqp3edq682ygfjkr3n6y6ruv6t4uh2rpkrzswagmmk',
      rewards: '203403213038187851',
      mid_rewards: '24342447874157984221'
    },
    {
      address: 'erd1xul76hyhv985sc8u6xfj54dymaxnfwxksldnth7lxhw5wdsyshnsd2h3n4',
      rewards: '203302381345469604',
      mid_rewards: '24334842266721968066'
    },
    {
      address: 'erd170h6cjnyh2xh6rur5qentvvmznz2h5w7dyut99999qxzqrt6cqfsfr5m6y',
      rewards: '83901035185887340',
      mid_rewards: '24328549287398413696'
    },
    {
      address: 'erd15qpx4rhpyjtgvmmzgmvm7g08wuyvwls3fflmmp8ax6n76enq7g6suql3wd',
      rewards: '83678438713469959',
      mid_rewards: '24311759116171403959'
    },
    {
      address: 'erd1n2jtglyye0ymnlnhnnqdeflkhhzskgw4l6zjwu6jehd0rnvtjp3sxwgchl',
      rewards: '202929856604316535',
      mid_rewards: '24306743195239247123'
    },
    {
      address: 'erd1rjtjjca8v254wq5nee6j3dlsj0kq2lupzyx62c8dl9g72hhvsm4qg98l9c',
      rewards: '83607181509988537',
      mid_rewards: '24306384275165983202'
    },
    {
      address: 'erd17jr6hayr87ckdcxhh6g7kxenavp2q9dk9ns2rtw4gtddhghrmphqwk5ajd',
      rewards: '202833486561153659',
      mid_rewards: '24299474124403187174'
    },
    {
      address: 'erd16vyfty4r2tsak3km4eak042zrv4508avf3s0e60cxcrmeka3eyxszywplt',
      rewards: '83384639263624038',
      mid_rewards: '24289598194141764938'
    },
    {
      address: 'erd1cuj85lqd9qsqklwsnuw90mmmu28ky6qqvg6k43eafkz8kdlsnsgqshyd3g',
      rewards: '83062742822871589',
      mid_rewards: '24265317951517504021'
    },
    {
      address: 'erd1xf8w54g25wcxav3f679vjh2akwuktek6kz7q7jy07lejz8vlhfksgduc8q',
      rewards: '82685676131997258',
      mid_rewards: '24236876286494569799'
    },
    {
      address: 'erd1f47ycyusan4skfpvgpeqtd460fsjxc7d2ex4vdush86gf2sy7t8szh7svd',
      rewards: '201896975642947812',
      mid_rewards: '24228834286754922220'
    },
    {
      address: 'erd1e3l0xxnr82hulapp2vp4e55rgzdzg9x7rn6hd02k2jcr0tcahkeqtqdcrh',
      rewards: '82415778217275548',
      mid_rewards: '24216518227120235619'
    },
    {
      address: 'erd1veshww039ajqs7p7s9zucsqvydgu75dfvyktglagetrmjs4565jq3uds09',
      rewards: '81996123746291773',
      mid_rewards: '24184864219545551370'
    },
    {
      address: 'erd1hqc6jjgdrhyuqx9kfvfvccaa7lu0c9kdpdg8pa39d2az5w7q6g2s82yr55',
      rewards: '81982374115244467',
      mid_rewards: '24183827102213522838'
    },
    {
      address: 'erd1spj6pk8l0vnlsss2d5r7jzqu40frjxc3rytgaauus8qq5z8wta2sqs57fp',
      rewards: '81706258119927848',
      mid_rewards: '24163000020860726628'
    },
    {
      address: 'erd1qh2ryh6x2junsha9jcqpzqdpdwpl7tqkc4ckdpgtymj8djrkplrq4wxdvu',
      rewards: '200961192351011689',
      mid_rewards: '24158249333038667783'
    },
    {
      address: 'erd150akm5zzwxygwsr642677fkcjr9cg4t9l830u7ml89u80d7claxqkdt978',
      rewards: '81230805335053498',
      mid_rewards: '24127137216829266018'
    },
    {
      address: 'erd1xl37a33nzmxzsehk9qgucpekjtkdvp7ncrhc4rxu20e68c5rdwyq4d3afy',
      rewards: '80745232580822354',
      mid_rewards: '24090511076270198354'
    },
    {
      address: 'erd1h7ea89xs05qhtr00j48yjj2zdp26wvqev0q6dyqwus2uep9at55scjhulx',
      rewards: '80496524561715755',
      mid_rewards: '24071751344002293180'
    },
    {
      address: 'erd1djw9nguhrcwsunzzc2660rvy7tgd6jq29cjuug0sskjdm47lglesha0w73',
      rewards: '80359641845207911',
      mid_rewards: '24061426453301080629'
    },
    {
      address: 'erd1x5s34nvkk7h0gcwzcsk8g7exe34t230p4lwyq6y5kpqra0gazkcqjnpm8n',
      rewards: '79862986770759476',
      mid_rewards: '24023964387302494013'
    },
    {
      address: 'erd1qhsls7dj4cs76t9pfwul9luwcn25k8c39rqf8kf8xwlxq4t5mwcqarprms',
      rewards: '77982755434370453',
      mid_rewards: '23882140908513636053'
    },
    {
      address: 'erd1tlx56w38jtrsfx40nhf3cpstf9pe0wts9xjhxsctewjkusntkf0q6j5w4n',
      rewards: '197290438414324051',
      mid_rewards: '23881368992304242716'
    },
    {
      address: 'erd12t3j8g0jassh6uf33xl0qh43wtujcvjl4f6jlyzrfyjxwe0ywk2qdxhxvl',
      rewards: '77635188406083573',
      mid_rewards: '23855924365841489096'
    },
    {
      address: 'erd15qar08vzt3pkxu7tj4p4w00rke69cjx3uunlxf2ac8urs54clmsqg2d6fe',
      rewards: '196821123949965039',
      mid_rewards: '23845969194049017148'
    },
    {
      address: 'erd1gctncn3l25pu4jzxtl93vy0gvp0l34vc479cau0aqck6nlpelvxqcc99fd',
      rewards: '196741735989225891',
      mid_rewards: '23839981060276285619'
    },
    {
      address: 'erd1f4plzf2kwpece7raqnr39j6mpv0gw78mpy6ccupy2nwc3tn0z45qqn7hyy',
      rewards: '77237740892178955',
      mid_rewards: '23825945401036983033'
    },
    {
      address: 'erd1kesuvvfp84zp56qfhx695yhchq9a23zzqxwqhyjhhr853vyjcwwsgga8je',
      rewards: '196402325534573285',
      mid_rewards: '23814379757668178779'
    },
    {
      address: 'erd1mmmhrd6z60x6hm5m9crjaf6veypugme2pltrpustjdxfzwpcaq0qh5w5hg',
      rewards: '76874999481509277',
      mid_rewards: '23798584273836139815'
    },
    {
      address: 'erd1ydkmuptr8e5528fs4gc3aq4x7c2fhwnaj7nr6jphsp3dy0rc66sqv0zdxr',
      rewards: '76706060278553105',
      mid_rewards: '23785841402784391766'
    },
    {
      address: 'erd1ndf4x9zpdtpd5kjucfnn9untdl2l4wm48zeraepn6ht34zzxns8qxku2sg',
      rewards: '76688272607509018',
      mid_rewards: '23784499701187252602'
    },
    {
      address: 'erd1ztx7w3gg5m8nsa8mt5jyruxtsqjujrfpr8hsr52xe0dum6tqytfqrtn0tu',
      rewards: '195438073076064691',
      mid_rewards: '23741647410616122646'
    },
    {
      address: 'erd1uhcw3g88l30f4yyyf66jf5xxv6j9eupsewkfn6yas7z6xps4ngpqr9heps',
      rewards: '75763798381658276',
      mid_rewards: '23714767776065427450'
    },
    {
      address: 'erd1lmcq88sv9wcjz3dmdga2t4zmctq8uvc0z9vjlqaqkuy06wa6lh5q6csknr',
      rewards: '75274051050694394',
      mid_rewards: '23677826752447424622'
    },
    {
      address: 'erd1dks363uvgprau50t88l2p8anvkjrqf5y63x0af5ngesh97r97sxstqkkth',
      rewards: '74880874474389825',
      mid_rewards: '23648169939080566847'
    },
    {
      address: 'erd1axt9z80emzyh8ntrjw9cuem4rx5j3k9zwu8y7978352zphxxgfrs0tyj9w',
      rewards: '192760381179081238',
      mid_rewards: '23539672487315324785'
    },
    {
      address: 'erd1ck5j425r8pnyvl2xcwyj6clvaqn37224nklwkec6je859qqwgnushtgg57',
      rewards: '73403487157230198',
      mid_rewards: '23536732476688032617'
    },
    {
      address: 'erd1qddxnpguc9jyze2kyq4myk6g40ks37a74dwqqd4mjvxhlcajxyds9q575a',
      rewards: '72746351065436306',
      mid_rewards: '23487165529912797414'
    },
    {
      address: 'erd1mrcq6yy6fq4y8z7pcjllecs826hthc2gvvkftcsj5ykfmm95j8pqfeed06',
      rewards: '191815836787981288',
      mid_rewards: '23468426694936624495'
    },
    {
      address: 'erd1dvu7vp9rwuhjc6eskns5my93fgkmtt0rm9ez6qru9dgwr00f5sdsyd9f3r',
      rewards: '72426025247978360',
      mid_rewards: '23463003757423132288'
    },
    {
      address: 'erd1rm43e3czc7uq2m8w4kgdhm7cyh0dyxj2gmzwqnu70z5pgjjd8dfstvlqt2',
      rewards: '191416793301233627',
      mid_rewards: '23438327347913041284'
    },
    {
      address: 'erd15sa2qj2fqn66gkvyp0dhznnvy4yymhq80dj5tgq7pr4yedqx0qusdjqx2z',
      rewards: '71250624102359601',
      mid_rewards: '23374344731154477964'
    },
    {
      address: 'erd1rcuwl3uqgqwtgx6pdftx0689rrw0gzspzcmwjjmnax2jyhmgdznsq8mppd',
      rewards: '71197357818000081',
      mid_rewards: '23370326922492416265'
    },
    {
      address: 'erd1r5dwxdfl8sqdn5wwlsv94rjwrmml8u00l2l7gcsslrf5w3q6r3psyk7c4p',
      rewards: '70966768880164995',
      mid_rewards: '23352933889677206703'
    },
    {
      address: 'erd140zntm98rkum9g7kt6rppc6pk5wc05pz25gplqhljpev0ag7g55sq5m0uy',
      rewards: '70244121026755555',
      mid_rewards: '23298425473331664835'
    },
    {
      address: 'erd1ux999nrpe0t45u3kjhws2e8kzx37afj8qctqzsx2xcltkdy8864q3av9pv',
      rewards: '189404980428295063',
      mid_rewards: '23286578839742597641'
    },
    {
      address: 'erd1wpxnkplaf9vmm2qkw3crp6djzcngnzlzu7pyk874hpjdunf6rfssmulp58',
      rewards: '69879180857413677',
      mid_rewards: '23270898496536745894'
    },
    {
      address: 'erd1rzxmxum5qa97asay5z8epp0e59l04ugsztl3waxzk07f8ps6sy8sxmqp66',
      rewards: '69724588137399637',
      mid_rewards: '23259237762602840877'
    },
    {
      address: 'erd17nmjyrj6d8m8uxesl57mj32wwsp6mgaxc8ylcfh2lwllwzlptd4scm3lm3',
      rewards: '68927024684367681',
      mid_rewards: '23199078557044082649'
    },
    {
      address: 'erd12urp4p6p62y2y5dxdfzz4rkeq0e53usn02ynx9wj43w2pyzn6xzs6eegrq',
      rewards: '188051562180638174',
      mid_rewards: '23184492207941399929'
    },
    {
      address: 'erd12tjnhcd9lmrd45qlzuqjpy44mmyhrln8hy2j5yysqphkc42f6l7qyk4gmq',
      rewards: '67482712085264187',
      mid_rewards: '23090135878928301323'
    },
    {
      address: 'erd1r7gtwqjcjvfa4enyutpezdadfkyt875a0wnfa3xlugyfkn3w55lsjgerw4',
      rewards: '67130282648710518',
      mid_rewards: '23063552570931940539'
    },
    {
      address: 'erd18ttgrerpyzk0h2wavk6ynfnqrsw2mpde8028krn8pzt7n9upsxysuw234q',
      rewards: '66877587088185604',
      mid_rewards: '23044492063443021241'
    },
    {
      address: 'erd1s53lr6kd6lt7v9ff2x5eqlrzx40xth5st6dmupnsfdq7xc7x7gxsadds0a',
      rewards: '186031747422352815',
      mid_rewards: '23032140127649383449'
    },
    {
      address: 'erd1j0cg27jprvq7wdrxmas9hw5wdl5al8zrahmcuzy9et7yxjdv07mqndmppf',
      rewards: '66614820077208365',
      mid_rewards: '23024671879146278111'
    },
    {
      address: 'erd1mxqux7lwzdle2s5kj5kwm53xqqeeqgwx5fp87glvs4nsf4469fmsdsexpv',
      rewards: '66533736365525975',
      mid_rewards: '23018555837018188596'
    },
    {
      address: 'erd1mz05crs03kujj56fh2t5g4eyayal99rpz983h808ltuu3rysl6qqfru8k8',
      rewards: '185088918853371308',
      mid_rewards: '22961023757569477410'
    },
    {
      address: 'erd1nxwc94uy00p6zp43vsyayvs0heax0qlwc3mmsse6yxkyt9hxh2lsstjzrq',
      rewards: '65584814087463083',
      mid_rewards: '22946979826146256918'
    },
    {
      address: 'erd1kxqnedkqaluztnxqfe5s39dz08x0r9j0tsnxuwyr3q7pync0pfksxsq9hf',
      rewards: '65521090526155137',
      mid_rewards: '22942173238270286056'
    },
    {
      address: 'erd1n2yd8n7320lcayntuskw0d0vns6yz7lpsg6yyg9jzzpnjhm436tsmp6ndx',
      rewards: '184730155285096083',
      mid_rewards: '22933962674004508581'
    },
    {
      address: 'erd1tg2aecegfztcq5tgef406azhnrg0pkkkgceqcsswq6g300jtwtfqkskura',
      rewards: '65366965405031964',
      mid_rewards: '22930547774731091049'
    },
    {
      address: 'erd15v4ggyxfr8wjyk82wahx9qkuzujym9y3jap5cplncn2mvkz48z3sx6592x',
      rewards: '65227085481942901',
      mid_rewards: '22919996808516844186'
    },
    {
      address: 'erd199lvrj9dqt0znyhagnvdmkds95nl5ny5jvgmdyegnnj06y545mrsqs7ujw',
      rewards: '65188778442905716',
      mid_rewards: '22917107356866289364'
    },
    {
      address: 'erd15u6mdgyv894fehnvwdwe4j0tk8l3s5x30rw0xkwdgdjmpj3atmmqpujnzc',
      rewards: '64979060046326353',
      mid_rewards: '22901288562660876379'
    },
    {
      address: 'erd1ahzvf28duvfy03dd3ylsyf0r74gzkgrv27jmq60ws8h3j8xw6w9qfv0usg',
      rewards: '184202692260955896',
      mid_rewards: '22894176803208567827'
    },
    {
      address: 'erd1e38e0cg9ncdcvw5plf532n8qt0gn8dahxrduml4fsynlevwdxvls52z5v8',
      rewards: '64733211165707832',
      mid_rewards: '22882744491603839589'
    },
    {
      address: 'erd1wf2wuwqyj5h5zsgrk5daeymtjxgwwdngymjdayxv5fec4pdx47rsglsnf9',
      rewards: '64381870218222739',
      mid_rewards: '22856243286965369630'
    },
    {
      address: 'erd1qsxyhyf3dcdngzh80dpaxefs0jtk0rsrpfje28dzgjq9pf9yw3ys3x6639',
      rewards: '63797342707341152',
      mid_rewards: '22812153113891120535'
    },
    {
      address: 'erd1c9kyd0vu339jy3w6qqxuzak5cj2sd5phd26lsy88n9clm7va7tqqjd49fs',
      rewards: '63029558371122968',
      mid_rewards: '22754240109563057620'
    },
    {
      address: 'erd1lzrec03dgwqm2qt4kqa4w2fpcaqz9pm8phu8law9xx9r7hkksscqez9tdr',
      rewards: '62602612855283708',
      mid_rewards: '22722036147668711642'
    },
    {
      address: 'erd1snkuusjqqx8l0ekq69xjnpfjyk2dv7qmug7n4kdyc0jknk399r4q2raqhy',
      rewards: '62588331102270331',
      mid_rewards: '22720958893047772113'
    },
    {
      address: 'erd190q4mdwuz364t6h5ew0256tgm6am3aswut0scsr93uqakl9hgmzqes2hu5',
      rewards: '62289348739394982',
      mid_rewards: '22698407030423820238'
    },
    {
      address: 'erd192t0676r2eqqcgmpqt5ef7zs8yw4ezk5zms5lj5x96wcf4gqlz5qpuwqy4',
      rewards: '60950048470499646',
      mid_rewards: '22597385299958261360'
    },
    {
      address: 'erd13gfznnp9uj26eg3k9g2hpq553jq9wczffmr2ps50vtu564lcp4sqw6ny6q',
      rewards: '60938205369043077',
      mid_rewards: '22596491989749185849'
    },
    {
      address: 'erd13ytugl0fajr90mu6428zp0f05rxj2wy7nrnj2q90nu8a56zfu7jqw0kc3a',
      rewards: '60783560948732806',
      mid_rewards: '22584827356127128641'
    },
    {
      address: 'erd1439fm94t62dtexp4yz2akvjvfjz3wktlmy6we4rnnxdx0cm3x9zskm4ee6',
      rewards: '60209485036543401',
      mid_rewards: '22541525533963080333'
    },
    {
      address: 'erd12j66mn3l8zhjhtujn3y035ru7eaakwrhhhke32l8el3383hcz8sq3u0zq0',
      rewards: '59461228818372248',
      mid_rewards: '22485085510954937507'
    },
    {
      address: 'erd1qvclvljfrg4n6kapdlze5h4c5rz2xvhv6aujmv8zx0zym7rg9uksyt8ay5',
      rewards: '59402315356719392',
      mid_rewards: '22480641742830559597'
    },
    {
      address: 'erd1l66artk5u7gwa6x0pcjf8q6mjgr5cqp9ww3lsefeygs0emwjv33s2mwetp',
      rewards: '178598740409318035',
      mid_rewards: '22471477781453670413'
    },
    {
      address: 'erd1kgmyld5ha43j6pumlk99xa3s30pvrexhkqjs4jzd3yp7n04kne9qpuh5pv',
      rewards: '59265131108713855',
      mid_rewards: '22470294107988698181'
    },
    {
      address: 'erd1arjggwxdgfdv8w888at9d7l47asc4eyzpkwg24204rvgue4frt2qs39t4v',
      rewards: '59036459384778039',
      mid_rewards: '22453045688200361693'
    },
    {
      address: 'erd1gfy4ldq36wwwgfk9av9dzsjjq7449auqqjagatktts0qmqnetzeqpxgsp5',
      rewards: '58957617677976742',
      mid_rewards: '22447098757673352537'
    },
    {
      address: 'erd19yg7gyapy4f2tyyq4vg0pq28ny3ezpmrqrkgkynvmvltt3kwha8s9cscrw',
      rewards: '58939368170670426',
      mid_rewards: '22445722220349315027'
    },
    {
      address: 'erd1ldjh5dusayq8j72havth5wy8nj0krq3pkz5te66kjkyg0chy96ms60s5um',
      rewards: '178172816611391796',
      mid_rewards: '22439350886453148158'
    },
    {
      address: 'erd1e4s9cp3yhpvs7fwvmpv90dcl8w60zwkny7pu65d4xssq6msapk8qu65azw',
      rewards: '58719833967004833',
      mid_rewards: '22429163032192824188'
    },
    {
      address: 'erd1mjkzsfje7h5jv4a7zh5ymg9p85aw3ln5fg03v0tdjzumqvk2qsjs5wlnw7',
      rewards: '58686947688742847',
      mid_rewards: '22426682461692126899'
    },
    {
      address: 'erd1w00faxwa7f08m43cspckujuvmne5u4nk375gfvnnw6e6mhnt3s9qu8z45f',
      rewards: '57712512310482756',
      mid_rewards: '22353182029843569812'
    },
    {
      address: 'erd1cxkaes2hkrkgye5ktngpsxhpr2kur26q3rxlfxmduxwqywvacqnqls9yge',
      rewards: '57676357603519616',
      mid_rewards: '22350454925887334421'
    },
    {
      address: 'erd1n3nug456gr0glhnunlfe7uzw0w7tsgwv24n75hx7gfu57wqfgrpq37swg6',
      rewards: '176838774027605373',
      mid_rewards: '22338725736545572352'
    },
    {
      address: 'erd1uv0cetevau9lehj8f5aznwmmuvu40t89c0n2qxj2hkjdkjeh78gs0hq8vy',
      rewards: '57467012569154332',
      mid_rewards: '22334664293922930932'
    },
    {
      address: 'erd129dgv7wlxr3mdxxsmxz2zl96syg4hvwj0s3h0r6s6ad60a00pw8qce87zu',
      rewards: '176384078946839310',
      mid_rewards: '22304428659960161459'
    },
    {
      address: 'erd1hqpv0k3wh3rudg6f9wvjsdetkg9glf7fr86gh28nl62kn6xdud7qxtrs9e',
      rewards: '56951686781708884',
      mid_rewards: '22295793919586185195'
    },
    {
      address: 'erd1ku30rqyajy7aerhdnzegljf387mhfh55yr4n8nzhugnv544736rs33t6r5',
      rewards: '176215501017826955',
      mid_rewards: '22291713039346439987'
    },
    {
      address: 'erd1m2cqsyjyanf6vcx29t756m6ndm9w2v4vyym5rq3gzht2qkk0v9us88rdmd',
      rewards: '176183669638130425',
      mid_rewards: '22289312038514339792'
    },
    {
      address: 'erd1nzakwv0mscx7hrj8n28a5v6sux53gumcctc78pgqcjjqupqr0a0s903qak',
      rewards: '56843588815904433',
      mid_rewards: '22287640226333827723'
    },
    {
      address: 'erd1aagnwtcuqtwlkzxjaj2wjeg72cltyykuy2nrk8hwz52dtqqrvt0su58h0q',
      rewards: '56833028808363202',
      mid_rewards: '22286843698280843456'
    },
    {
      address: 'erd1l5w0asqck2j60qgregkxmvxyeg6juy5xnn67pdt7ed8sslue345q2vmxn2',
      rewards: '56654688439691207',
      mid_rewards: '22273391709153737099'
    },
    {
      address: 'erd1glv7kzwhj67japtghwv6qvz0usju00hsnn32x5s49h5k8mwr2h5qndakdz',
      rewards: '175816140867089868',
      mid_rewards: '22261589806757438106'
    },
    {
      address: 'erd1laa4hqh6cxn8neuqjgjwkx6cfkpces3wvae766d6f344mqzhgxaqce8tka',
      rewards: '175711092464497689',
      mid_rewards: '22253666138212775142'
    },
    {
      address: 'erd1wmrg3s52u5msgrva9xhmfa6yw680m42z7h5r4va6r5uqsjqpcmkswnd9rg',
      rewards: '55959801022328243',
      mid_rewards: '22220977227494108928'
    },
    {
      address: 'erd1ajsjqzdpwefv6ztutz2faf795ewcfwu9k0zdkkcmr55djt9kl2csa63nee',
      rewards: '55709393066251183',
      mid_rewards: '22202089271124091092'
    },
    {
      address: 'erd1vcuxelpcwzgna6esf4ygg0h77skm3aqc05gzum0zrcnyk0jdd34st4y967',
      rewards: '55398570188130784',
      mid_rewards: '22178644293365737449'
    },
    {
      address: 'erd1u5m278nvldjc7v36qgs7k7q82swr6vhp2met7al9fs9dzsuzxluqj3c67z',
      rewards: '55095074704285090',
      mid_rewards: '22155752011717901779'
    },
    {
      address: 'erd1vcfplajvahgj6sf8fv62eef086t9xtq52ye83jwzfedlu7drc3qs284wnn',
      rewards: '54782160710615930',
      mid_rewards: '22132149303750538687'
    },
    {
      address: 'erd1l0q0gkyxpqxse4j6xqflzutjagjw7m8vslzvkk8kqm422kg69pssd2d0av',
      rewards: '54610276524490566',
      mid_rewards: '22119184296331873376'
    },
    {
      address: 'erd1akssuplm0e49zpd63z87k953l9hhgnp7mkcq88t07x9n6cz3txmq5syssw',
      rewards: '173885867055339395',
      mid_rewards: '22115991687154117021'
    },
    {
      address: 'erd15ratyvsn97t8y5pyqzev3lcfvf296rcr38jrvhnay33g0s58r26sl0jut2',
      rewards: '54440243585246489',
      mid_rewards: '22106358926131097101'
    },
    {
      address: 'erd1f8acr67xpaluytrks6pdj0yccf3ra9l2q229vel68w0zy4vl4m5q26zaqk',
      rewards: '54312519551861352',
      mid_rewards: '22096724863349007349'
    },
    {
      address: 'erd1udwyw3tgtx0s273wstjsl8wuvq7nttkqpv8jtmq7cwjr2nhctsxqgu4n79',
      rewards: '54299695392351042',
      mid_rewards: '22095757553168022749'
    },
    {
      address: 'erd1eukppe25dgzdnmf5flfvxx90ywtamyp2wgjrh3e5fkp7wckfr68sq5mt27',
      rewards: '173507245693197552',
      mid_rewards: '22087432755237867914'
    },
    {
      address: 'erd15mfavlxtlukg4ykalcv8skyvd23g08mt8rghauvcz57trpu02vkq6gykmc',
      rewards: '54169010528233631',
      mid_rewards: '22085900158657315759'
    },
    {
      address: 'erd1npxhpvv2pup9ekxva2f5aa5exgljqgzzse5rgrljwcrmve3n9tesrja4ml',
      rewards: '54031762019789099',
      mid_rewards: '22075547676731571424'
    },
    {
      address: 'erd1e9nzk8q9rm44hxfqsgtt9ttfhzn4yqucljvru62dt4rafuvxh6rq66g0ya',
      rewards: '53420381349170391',
      mid_rewards: '22029432003679375239'
    },
    {
      address: 'erd1dz4tzt3cg06vmredxveqlkp9quvnczl3a60gp4lwwxnj5nyypt4qr9vur3',
      rewards: '53363065858705643',
      mid_rewards: '22025108768506722877'
    },
    {
      address: 'erd1ky25gaq3xns8rgxlahy2suac3aj9zdrvslqvx87z30f58xuf86asksws39',
      rewards: '172577100994194438',
      mid_rewards: '22017273113476454841'
    },
    {
      address: 'erd1pgscg3yux4jx86n5nfqdlgsezdhyh63mq07j9tm2fff3u69rmwzqt5uzt0',
      rewards: '53158588603236451',
      mid_rewards: '22009685306966329338'
    },
    {
      address: 'erd14vh0fdhqdq4ldxrap5tcsu0dml6dxl5t67thsnkkrm3nsgpq7spq8qc25t',
      rewards: '172363020187995330',
      mid_rewards: '22001125268214291355'
    },
    {
      address: 'erd10fnwwf7sm8jfxfur5afe3az9mzlm7raf5kvwh98gp7kl4g0ftccsjn4m9t',
      rewards: '53001635631741411',
      mid_rewards: '21997846542239418372'
    },
    {
      address: 'erd1r355tl0vq5glw2mkl30w8rfjmkxz8jpkgrauy96hv8mam9xpkraqluuy8q',
      rewards: '52864292913732202',
      mid_rewards: '21987486954205005869'
    },
    {
      address: 'erd1szhs9g338mz3x5k626hv789wmehudptlrjaaxuwgkrqp8gds06mqsr8q8r',
      rewards: '171498108672559028',
      mid_rewards: '21935886083232247301'
    },
    {
      address: 'erd1g7slvxn9kswlkuu3jwxh8m5n277nftd77cj8l59plzzczkwd07xspxcet7',
      rewards: '52129819661158011',
      mid_rewards: '21932086562911938266'
    },
    {
      address: 'erd1dcg3qqktxenw4rh4ghn7p5fjmtksxwkycsnkuvjn6k5tes92mmussphavn',
      rewards: '52079174827835988',
      mid_rewards: '21928266486996064328'
    },
    {
      address: 'erd1mvg6fm648anp0v5tuu4sp37z3g7aq63d69m8mcy7m4se32pvzk9qx3rjtf',
      rewards: '51882029006288358',
      mid_rewards: '21913396026271657313'
    },
    {
      address: 'erd12jk48uah90mkgu0uy6qwhlr52r5cqhpwgrqewxf353tdvr4axdqq8rxyxn',
      rewards: '51880104351134445',
      mid_rewards: '21913250851960329715'
    },
    {
      address: 'erd1w46hds5upstdjlne323564z0jvxr49dq6543r0numtwuq2fyh43spj8853',
      rewards: '51764028612127947',
      mid_rewards: '21904495405335073060'
    },
    {
      address: 'erd14k8gzw40tg25huhvx9peshdszect27q20qjnyzuyasqpgepcxxqssv7nxj',
      rewards: '170865724927311865',
      mid_rewards: '21888186174745069946'
    },
    {
      address: 'erd16s5qee0y0hmusu9crflkjmw5d8zxm8v5ehzpkzwadpdnwgevpqfsqzar2g',
      rewards: '170656748920385419',
      mid_rewards: '21872423378055045545'
    },
    {
      address: 'erd148f39tzp8jfe6rpgqf8akdmatfu93jp7rf2u3hnpnv5c4jrrp9xsw2stjr',
      rewards: '51325055577184812',
      mid_rewards: '21871384222841060366'
    },
    {
      address: 'erd1ry74ulzrfvj0cntn2jp7wk6yax32tkmm5emtkthzmekf3u90cr0q380hu0',
      rewards: '51298031616155642',
      mid_rewards: '21869345839537029294'
    },
    {
      address: 'erd18fng4z6tjuccdzs5pwh4xdqz9g2smle02ww5svc6prev22jcmcnq2ff4aj',
      rewards: '50939276654180364',
      mid_rewards: '21842285405134413183'
    },
    {
      address: 'erd19enwk6qgldvntdkx5wlrckpt046er6esru6mmzd4na5wdsu0t02qwps863',
      rewards: '50770358003089666',
      mid_rewards: '21829544084283962555'
    },
    {
      address: 'erd1sg4jaufpj0wq2f8xa7ugegs2ez6g4cakd4uszffus2688tqn5h7s32ffga',
      rewards: '50517241944865287',
      mid_rewards: '21810451859183807519'
    },
    {
      address: 'erd10dv7p3k2n9ygxe6cp8qj7mr5lutexgxphqnlzp22sfsnredd9g4sgdx59x',
      rewards: '50457276001305541',
      mid_rewards: '21805928703676340815'
    },
    {
      address: 'erd1lmsfrz39d27lcfh2kf6hmgwyaea85ggwj53hj7h9nqtrgkjlz9rs7nat60',
      rewards: '50109010373648048',
      mid_rewards: '21779659466534581241'
    },
    {
      address: 'erd1n4x5hjcm9j2yfa0dguc7uz2gkpr83gjq4xkv70d6e2mvxs3y8fesucajkg',
      rewards: '50014035993945414',
      mid_rewards: '21772495668833437847'
    },
    {
      address: 'erd10f2ns5hq8uhtj66cn0r4w2al32lg9xdsxuv5hmplxzqctl243rmqm6a8xp',
      rewards: '49910540337337595',
      mid_rewards: '21764689121960409336'
    },
    {
      address: 'erd1gd5al4alueauvl5znurs2a3aaghyttavmu8zyaszzh0ayxzawzwsfs72kd',
      rewards: '168678087603976297',
      mid_rewards: '21723175449990505508'
    },
    {
      address: 'erd16xrjzrzmh7ewpw53v08mqsdg3qsnqly744rl3q2592zvexztjy8sl3gawu',
      rewards: '49152310149396387',
      mid_rewards: '21707496774989386107'
    },
    {
      address: 'erd1ggtm6rjy5jpn6xzwm5nt857u67xt7f27374nlzljlnfe3qu85c3qjksxa5',
      rewards: '48812542114312798',
      mid_rewards: '21681868500540268350'
    },
    {
      address: 'erd15lw2zp3q949nzu9zc6nw5tts96ztrgxvzxmp6phtr6fqwr2m860qjydhmp',
      rewards: '168034631490826471',
      mid_rewards: '21674640366754352023'
    },
    {
      address: 'erd16pdehnttzjuux3wxheenyhwnljasun0t5lg6sng2c6mha7mlh57s2vfkce',
      rewards: '48430849615796626',
      mid_rewards: '21653077916679913882'
    },
    {
      address: 'erd1ju45q5rhuvmjpuvrq8exa9qe59454f5d294zy79ayr44j3lwpeyqq6vwap',
      rewards: '167710402615858861',
      mid_rewards: '21650184191558370658'
    },
    {
      address: 'erd1esv5enxcpfzh3zprjtek5m47dem7q50zxaamyy7wl37sgcxlsjjqw2ja23',
      rewards: '48109811550734341',
      mid_rewards: '21628862420251576197'
    },
    {
      address: 'erd1lyw8ktejzpcu3mlw7hcur4epj9r5qez8cq2ktw2r8xcu97pyt6vqy2a5zw',
      rewards: '167278301389824074',
      mid_rewards: '21617591340945171026'
    },
    {
      address: 'erd19dsh0h6k5mvp53seqy2xunxwa3ttwqwu5xp8uqs0dt3fqrcqe9hqakj22n',
      rewards: '47955375581213051',
      mid_rewards: '21617213509809681673'
    },
    {
      address: 'erd1988a7f5yvqxytxzkz9cmmycdydtwr0mk0w4zprh76ad0wur9hauq3gupss',
      rewards: '167233957746627255',
      mid_rewards: '21614246555854830660'
    },
    {
      address: 'erd15pznpcynca89uhkf2v6rmwdcnr6q5qqsen9cxx5mtu77wecct2espk6g58',
      rewards: '47636818393988855',
      mid_rewards: '21593185142868358965'
    },
    {
      address: 'erd1f6um7nj3ee8vhgl0anewdfrqzg53lkhzz22cu3d5jjt0fslfgy3q7aq0r2',
      rewards: '166750326929196471',
      mid_rewards: '21577766893139890458'
    },
    {
      address: 'erd1tqdgk85ae7uq53rld43sdu82a74alm6cnm0yamzd9gn8n7lmvgjsxf3q56',
      rewards: '166733493539343613',
      mid_rewards: '21576497171769685918'
    },
    {
      address: 'erd18pj9jufxfdduht5hewsj6azfgx349dha522kn7mjlxcemr6vjnsse6rvu2',
      rewards: '166482175576584531',
      mid_rewards: '21557540574743134123'
    },
    {
      address: 'erd1uy9snk7kksqedmxuzp3a0pqw6660q3h9q8zwux6z3m354ttjhc4qzlh5ga',
      rewards: '166221835235114814',
      mid_rewards: '21537903431067386371'
    },
    {
      address: 'erd1fk9yaqp9a8w8jj4yjlce0kyetcznph5r980a4k95psvy5gw5mtfqzchwn8',
      rewards: '166061015020874383',
      mid_rewards: '21525772965096666942'
    },
    {
      address: 'erd12jqn5xxkma6uxv9fa683kmn6fkcvqrtlglah83fkwludwtrjhses97upym',
      rewards: '46727276963051568',
      mid_rewards: '21524579579637052039'
    },
    {
      address: 'erd16a0h7has756gqe8tgrjan9t9hx2f3a95w5d4yh37v2kwm3g7c5psew9ehv',
      rewards: '165206278919905606',
      mid_rewards: '21461301298797017769'
    },
    {
      address: 'erd1l2ma5a489ec34rg28tyvc2ggrf0yxmj8026r8qx6pwddnzdc8e6q78j3jk',
      rewards: '45775668521367299',
      mid_rewards: '21452800954830331146'
    },
    {
      address: 'erd106qgztpnnep0qz2kenrcdrh35mun7ava85e2s457ffjh4qfm5seqmx8dt3',
      rewards: '45540917779540662',
      mid_rewards: '21435094002387948114'
    },
    {
      address: 'erd1c8sus5n8n7jpp7w939hzcnr5c64da709nemefxspsnnxv7pmn9fq04z0tj',
      rewards: '45540408336421274',
      mid_rewards: '21435055575735845075'
    },
    {
      address: 'erd13fzlpnu07du8p3wwyhz0grx4ccvrfmsvyk42lj5pyn3xtr5tlrxqwm09yq',
      rewards: '45215126521875580',
      mid_rewards: '21410519978635213862'
    },
    {
      address: 'erd10fugum6mumyl6y7dg3zc057pfs9jndzfglq4g5m343vq4j8sgu0q0027qt',
      rewards: '45090582993413829',
      mid_rewards: '21401125817328974402'
    },
    {
      address: 'erd1dgavkflclfrxaaptm49fw8svdz0u4q7glx78qrlqj3xzrnc5tlds0x0xrh',
      rewards: '44538946358205475',
      mid_rewards: '21359516561532355761'
    },
    {
      address: 'erd12sywl5g7f3s48vy9chval2j9hw729hjj6eg9x4u62gwh8da029mqz5uf7n',
      rewards: '44427310783157840',
      mid_rewards: '21351096030875603403'
    },
    {
      address: 'erd1cf3qenjcm8j5esmn53phx9m23wajkdazkw888nmdtqg60vu9pgksv03fu6',
      rewards: '44269500475766180',
      mid_rewards: '21339192598383085079'
    },
    {
      address: 'erd1nsjyz57c8d5u59z25wy5yqf7q6qq4ar9klwjt7sx7k8496utv90qfm0s2f',
      rewards: '43908628632143325',
      mid_rewards: '21311972490267116101'
    },
    {
      address: 'erd13ufdnh9dx3wpx3gzz5kemhk0aw39cuu58gw5msp9rj2lhqmxl08skg4m8u',
      rewards: '43871830732675223',
      mid_rewards: '21309196871111277762'
    },
    {
      address: 'erd12r58x4gt8wc026xpyrk999yralk9w6lgpgca774ltkngtka8w58qxwkxyz',
      rewards: '43871465632030388',
      mid_rewards: '21309169332030018752'
    },
    {
      address: 'erd1g9r9j9hkp3cj72vmj9cf93hxjwn8lt0u2d446zm2dca433h5ecnqq3v9al',
      rewards: '43400625273278695',
      mid_rewards: '21273654437484860031'
    },
    {
      address: 'erd1tser3nk5nq073rkkz4yp84pe8es5vngmtq3z2gnvvleh908jddusdmj0rv',
      rewards: '43286295482876805',
      mid_rewards: '21265030685561260463'
    },
    {
      address: 'erd1cs2v5u3fyl9yxlhjlrk8thl490y8jm7g5mjgdecfpgnht2spg5tsw75rrs',
      rewards: '162579997956071477',
      mid_rewards: '21263204237356038402'
    },
    {
      address: 'erd1emvfpwnn2wmpe0a3sx4df4y97tgagg74u9l2ujrw5dqvqz3d6uuqurt39y',
      rewards: '43206079022863363',
      mid_rewards: '21258980059132981517'
    },
    {
      address: 'erd1yralcv7mnc2839yrqhpu0yyhh6zdnc6wgvl5hdxfztnmlkl8jtcss5a8gp',
      rewards: '162356766761189595',
      mid_rewards: '21246366189813897225'
    },
    {
      address: 'erd1rgq4ghd53ggmtcz2d3lv2n8y5g3rmmjw85pwfpyk6pnztk6v4q9syptv7p',
      rewards: '161904619333403979',
      mid_rewards: '21212261279480287934'
    },
    {
      address: 'erd14h0zphxwhp40avsqex5s4ne5lwr2d72y6nfphzmztat4ksmtpfcq4cju3e',
      rewards: '161879423306731053',
      mid_rewards: '21210360774959778294'
    },
    {
      address: 'erd14h55junrjd5f4ywm3ze8u96588wy3hhwdht8nlufsta59xjtyp3s4fv3nq',
      rewards: '42544745342507499',
      mid_rewards: '21209096493545549251'
    },
    {
      address: 'erd188xrgtqv6287q7l76qa0q56n9s3kuey36ueqf00eylv80yv9gn3s3e9edj',
      rewards: '41973852451111737',
      mid_rewards: '21166034762626272284'
    },
    {
      address: 'erd1j2xkjr7qclnpuwlnywlpfy4639x25ava2mp2jplnu3uyu8utarksyzc54t',
      rewards: '161185192891411562',
      mid_rewards: '21157995850135829543'
    },
    {
      address: 'erd12ljlljfsxnnm0runj0dmz42p4yns75rz42hpmtyu67n20yt95khs7nualx',
      rewards: '161093350285197104',
      mid_rewards: '21151068278159827419'
    },
    {
      address: 'erd1a463zt83skqeeddns7w5evfh2zxmeqzn03t2pfrfzcur26mvgqzsf3jlls',
      rewards: '41747293203736261',
      mid_rewards: '21148945684281113059'
    },
    {
      address: 'erd1cuypvs06k6p4wn3uw4fw4l5pe973ly7vhw405nzx82njpaf6w9usjsj3ra',
      rewards: '161029166127372586',
      mid_rewards: '21146226948069409837'
    },
    {
      address: 'erd1wua4uaqmyz5czwwts0pgm2kk9uq05wyxvj98fqd3n05380l60c6qcxgt6m',
      rewards: '41679076262204018',
      mid_rewards: '21143800166400840318'
    },
    {
      address: 'erd1gppya0r7mml6upgevjda5mdgstzhyvfs7txk9wzzd77muprj3e0s43gws8',
      rewards: '41342292165913407',
      mid_rewards: '21118396966692220135'
    },
    {
      address: 'erd1q9c7fass2nyr623rvhhxkxjx8smxwwqmv73x9nv2r4ntu2knlqfq576h06',
      rewards: '41317912160404426',
      mid_rewards: '21116558013619128808'
    },
    {
      address: 'erd10j33jt5t3rwuyy6kzu75sr3g038a00c5p6kzd8qxs52txfw9yruqlenvms',
      rewards: '41310210343594674',
      mid_rewards: '21115977075288927755'
    },
    {
      address: 'erd15fwxvqxeef3up275zmwtpz8vqmmnamj9dxtnvuvs6qk3kp7f6laqzey0r4',
      rewards: '41109033296108973',
      mid_rewards: '21100802544275266282'
    },
    {
      address: 'erd1s7ycqq7nmj3vysvsx3ha42q3dcmyadu09yhukv6ceq9l8j5qjrqqzvvv98',
      rewards: '160325016509657535',
      mid_rewards: '21093113830316578835'
    },
    {
      address: 'erd1etedcggetwur09msk4chcxu42j43remxd6hd3ch3rtpvz2725f4qugqsdt',
      rewards: '40944926986903903',
      mid_rewards: '21088424212305030703'
    },
    {
      address: 'erd1ya6v2w6d30wx7ftcsny4kdt4zxl6akk49zy26paqknmvf6lr5zgqd6mcqj',
      rewards: '159867515528537315',
      mid_rewards: '21058605108205609538'
    },
    {
      address: 'erd1xmy5qnn7j3h9pane0e35n4x62hsym5kr0ez8n49evdd08yqxqwasum03vg',
      rewards: '40478567216665658',
      mid_rewards: '21053247282901554483'
    },
    {
      address: 'erd10hduajla806gvgd4sc5mf8ytsh30cxfwvk56mtdjgtcz3mrfjs8qg7qfcy',
      rewards: '40416960684128813',
      mid_rewards: '21048600379836278385'
    },
    {
      address: 'erd1u8q90jfdftnwjzkvgz3tr3920qwfzew8z9j6velvhvj3x0hmq2asxxkhfp',
      rewards: '40324517952514683',
      mid_rewards: '21041627541158119018'
    },
    {
      address: 'erd15krpu8muk542lz5y72t0e99zkx4ukxfgxmmg8uftzzdc4vtduunqsrn4tg',
      rewards: '40258529222796418',
      mid_rewards: '21036650094485266792'
    },
    {
      address: 'erd1leta4mxkcvmy8ukp35gsajn9lzcyey2nea2f6lhe0f2suut93dpqvw3wfd',
      rewards: '40136973585220247',
      mid_rewards: '21027481306020886405'
    },
    {
      address: 'erd18dsg667kxn5cf6ycceu2dhe8rhcu95vxdt9hm6482qc5hl2zdj2qvt8nhe',
      rewards: '40123973475953921',
      mid_rewards: '21026500724171672850'
    },
    {
      address: 'erd1t6hzm3d6fw43gnrgddqd94uvpz6u0x2632wjnnf5x3m805r7p02qgfea0h',
      rewards: '40062166619523931',
      mid_rewards: '21021838710927739208'
    },
    {
      address: 'erd1f9zuvhm9t8c0l87dlwrvxltf0n29kpxy7d2m03j5zw4e54u4rl5q4w4lxr',
      rewards: '39169066537535384',
      mid_rewards: '20954473297915590949'
    },
    {
      address: 'erd1zqfrvxc66rxh6t6ugr0kg28rwmfg3ttg20ard9t379mcvff4uz8s0aqkgm',
      rewards: '158444561446434689',
      mid_rewards: '20951273476094758390'
    },
    {
      address: 'erd1ungnpz23nme73q6zk9ezq2eg6mtnxskm9npsk9vfq4kepg77xfrq9jy25d',
      rewards: '38998930737066906',
      mid_rewards: '20941640169022363005'
    },
    {
      address: 'erd15ycfr3h76kllm523x836e523w9svymg6ldpj9ktmu0mstr6quxqst6683a',
      rewards: '38908799417349870',
      mid_rewards: '20934841677228980799'
    },
    {
      address: 'erd1hwvpneldptwnasfjyr52yt2fjt97lv3kncrqlhhnqmzy895ydarqq2qd2l',
      rewards: '38784173583403744',
      mid_rewards: '20925441307723839664'
    },
    {
      address: 'erd1jxqrjvwqup6kcfrgnmr8hujq2nvvavkwt8gagmdfcu5542rwh9tqu4gx4t',
      rewards: '38685439566506770',
      mid_rewards: '20917993925329916233'
    },
    {
      address: 'erd15ada7f5wjyrvcjeef5nxqd9ddpyu7jq6xy5tf9fu949csxzvrxescsfrp2',
      rewards: '38551787807324076',
      mid_rewards: '20907912741665600076'
    },
    {
      address: 'erd1w2vzq6j60u04ua9dk0yrxkr4768ha909n5lxpwhnfnzxzukgtrdq5sc5g8',
      rewards: '157508352688323624',
      mid_rewards: '20880656430001428083'
    },
    {
      address: 'erd1zvjz9sctw90y3q23e2zlf68yhygmm6qt4lu4h3n00686598swkvswdvpu2',
      rewards: '157433714089837968',
      mid_rewards: '20875026534634674999'
    },
    {
      address: 'erd1raqw43el7d942fs5dkspqfnhmjt9kpwvn8axf74avcfk08ppa89qx2nnem',
      rewards: '37624278689634507',
      mid_rewards: '20837951898479279213'
    },
    {
      address: 'erd1sn879r6mls64yfr4p8agj5gkr3dn2uzanwtrghpuy6gfnvwtyxmsajphvj',
      rewards: '37457173238184430',
      mid_rewards: '20825347344991330607'
    },
    {
      address: 'erd1y2dsnspvhpuvyqxh0pzvmmge0wau7jkrvehl0kk6002s8y0gdcssv50pma',
      rewards: '156643122205568706',
      mid_rewards: '20815393185716748985'
    },
    {
      address: 'erd1ejcam8c9w98yvksl8yxxzarawfrve07myayu5ru7ppmgz8v98e3se8yl08',
      rewards: '156494718578104880',
      mid_rewards: '20804199287229647704'
    },
    {
      address: 'erd10yxq90yw0n4v4p0wstldnmnyltwp80m7vu6qx7gvsfrnmjulqz4qjepz6a',
      rewards: '36789815911237597',
      mid_rewards: '20775009423337178094'
    },
    {
      address: 'erd1t3wmfucxkfnpsrpfxkjpmm5almwmax4p3rknynldmgyws4pfp32qlc4z2t',
      rewards: '36670972307345363',
      mid_rewards: '20766045200153784454'
    },
    {
      address: 'erd1a2j4sxg2e8xp9xvxs55sgs288dnywahwr6uxuk20h3d098km7p2qw36m59',
      rewards: '36650594986885678',
      mid_rewards: '20764508164566696486'
    },
    {
      address: 'erd17hst69cr0wjvkml59c3vkrhl7kel2r58laj2kxa09kv7udxpegqstcw2ys',
      rewards: '36494313603046861',
      mid_rewards: '20752720056849842656'
    },
    {
      address: 'erd175qyedcczapg382ux7hfqks4hj8zpvrxku3we93ezw3k8zjfy84qy5gu0g',
      rewards: '36266699351062524',
      mid_rewards: '20735551400837366015'
    },
    {
      address: 'erd1sxj5cex5a2syfgtc2c36m02f2kugv9pcv7wumfu2dlwn43v7ufyq0dcfuj',
      rewards: '35871285110886396',
      mid_rewards: '20705725803306303149'
    },
    {
      address: 'erd13c7l3evc33585hpf5vmg9exn4a0eglwg02s56lqd64evpmgnd4rq67mjan',
      rewards: '35633504708239952',
      mid_rewards: '20687790327368592927'
    },
    {
      address: 'erd12c2x70ac6k8pkaz375n2rtv9qsg5tv8cunu06xkkyu43r908k57qj6ly3k',
      rewards: '154947999752146168',
      mid_rewards: '20687532236553338524'
    },
    {
      address: 'erd1644zfvzlad8mlzmz9259lfaxrjjrnp96amtr38sjdv5652awq02q9qw2vq',
      rewards: '34954234374320213',
      mid_rewards: '20636553822620416350'
    },
    {
      address: 'erd193ardy2x5w4q8ufnlvvl3qcatvl33wwsfemt6lpm35npg6antcvsafkm9d',
      rewards: '34744771448959637',
      mid_rewards: '20620754298286894972'
    },
    {
      address: 'erd18qzkj35ztcl5q4rr3w86hnkgwm35qpxr4vrxy9dsqahm0uwksn9szsc9mx',
      rewards: '34678852244553776',
      mid_rewards: '20615782095820688059'
    },
    {
      address: 'erd1mwekfc7qsxh0jdqajjdz438daylhlvuwlsrzthgwxm646lrzy4mql4cg2w',
      rewards: '34624275597942680',
      mid_rewards: '20611665448186317232'
    },
    {
      address: 'erd1wyk40yyxq5j944qv860njply3ku7hyzaklzylzzft48kya4mdqmspvauq9',
      rewards: '34314475733726549',
      mid_rewards: '20588297635076772868'
    },
    {
      address: 'erd1z9zqlsg7y2gdw482wzudd0t9r2x20vuezut6t4sl0tq63s8yed0scke8g4',
      rewards: '34242162568085892',
      mid_rewards: '20582843144177217427'
    },
    {
      address: 'erd1hw6aa70pj5e4juatfg7e4d62jja30aqfsd6ux8sfk349qlfht3pqszh3s6',
      rewards: '33885783359671765',
      mid_rewards: '20555961909869965401'
    },
    {
      address: 'erd1hdzkvu9vxw7ahsxxtypzfvwagd5wm4p6mfp22lua6fpu6r544fhst5npqx',
      rewards: '33465761644720710',
      mid_rewards: '20524280201545912780'
    },
    {
      address: 'erd12jf2g7cu67qgu54rjajfjujr26fvxzawjcvt87pvexdq438l7cuswndj4q',
      rewards: '152679385756941109',
      mid_rewards: '20516413543548797570'
    },
    {
      address: 'erd1vm7h3l3h055mgr7lure48vrj6vejt9wjhfdzgevkp5654rh5v6qquv9sqt',
      rewards: '33306139340840068',
      mid_rewards: '20512240092443103427'
    },
    {
      address: 'erd19yrsmank4uz9et8p00tu52te9wl3gt0gplpsd7jpylqrmntfxjmq5w3wnk',
      rewards: '33204827884518247',
      mid_rewards: '20504598297043437108'
    },
    {
      address: 'erd14htnpthjutd8pz6ru65vrqflwpg0egaca3r32qew8ghjmadshp3s6hf04p',
      rewards: '152379368778694060',
      mid_rewards: '20493783641191977121'
    },
    {
      address: 'erd1suq04u46ajpsyrwyt8a7pfzvxy3whdld66k99uzp4mppsjpc4h3sgaj5t9',
      rewards: '32656200673765297',
      mid_rewards: '20463216038338696183'
    },
    {
      address: 'erd1ankcmw7r40nfyx4442yta93ervymk3sw3qptwg45vxrac9fdf2wq2lz56y',
      rewards: '32621387179022088',
      mid_rewards: '20460590100328982058'
    },
    {
      address: 'erd1vl3gty29zezeyet9nyup67qg9vrq943fxwwk75etfwuut78rgy8swwr0zx',
      rewards: '32529366139978499',
      mid_rewards: '20453649069389676995'
    },
    {
      address: 'erd1y2h95v8lg52294y5rnrn7c0tmvsfwxvy48svncmm7us97mxqk5xs00l0ch',
      rewards: '151322370161670036',
      mid_rewards: '20414055568353208725'
    },
    {
      address: 'erd1gspjpt79ylf7a7cpvqvklvg6h3njylvyaqvezqx43948nwg0xwjqcj2hsn',
      rewards: '151181489403859090',
      mid_rewards: '20403429110437912605'
    },
    {
      address: 'erd17gwsczg8aqw5da96lsfa93ktr5zuf7llzsvyts8wvfqqemtud37s2vfztd',
      rewards: '151014661039845271',
      mid_rewards: '20390845457305882046'
    },
    {
      address: 'erd1yqx4sdem5nycy3tjq4jdg79zxv9pv2mdrgwevvsjx8a9flyeswfs8jtujs',
      rewards: '31555537781333979',
      mid_rewards: '20380194424265289015'
    },
    {
      address: 'erd17kgv9p7uwzv4k0xk98gqz2snfgxv6s4ct5re45srf7erdpqfhsnsen8jmt',
      rewards: '150329197889604901',
      mid_rewards: '20339141836231594741'
    },
    {
      address: 'erd1ujm6h6w0z8ef638uy29575ajgwhrwtz50rwrqsayj7m5qdmkdl3s376ktk',
      rewards: '30924292943995678',
      mid_rewards: '20332580422165548622'
    },
    {
      address: 'erd18saqmjhzrvn32nt08xuwpzdrrup09tw9jjgw0cd7j5wd94ztn7vq3taca4',
      rewards: '30826039713257658',
      mid_rewards: '20325169304865338255'
    },
    {
      address: 'erd10g5jj9e8ttfjflxg3e2ljhegxjsu8wywpjupzqrrffghyrv6kxdsc8m6ap',
      rewards: '30459165198940390',
      mid_rewards: '20297496422868076277'
    },
    {
      address: 'erd1n8a24d27ykp0t5sz4w9ugx5wfpjyannjgy30rchnzj2utxr3636shhw0dl',
      rewards: '30366265770223827',
      mid_rewards: '20290489136103361651'
    },
    {
      address: 'erd1eqvgec0wzra4a5x2v5qphz6elgdyw8g4r5lw93v8cn3vyr6scqcq74620n',
      rewards: '149468117023548273',
      mid_rewards: '20274191592301926246'
    },
    {
      address: 'erd1593vmkpggmxzkcwv7x4m3lc3phk6ylkfqf9jy25sah89xhx2yneqefe9u2',
      rewards: '30140279903930724',
      mid_rewards: '20273443307170229582'
    },
    {
      address: 'erd134lj2kph76h668dkrjyzamzl59s7a5ggqdmjpsr88ammtds637sq97n5du',
      rewards: '30066831468189952',
      mid_rewards: '20267903184278563799'
    },
    {
      address: 'erd13ypx9eg829dv5spgqac4cy38y7lycme5l5yxyxux7yzgrvth9x0q8rtvzr',
      rewards: '29760806435107909',
      mid_rewards: '20244820101921515564'
    },
    {
      address: 'erd1knv6efw0cwhy5ddnvww9sjtywx333u7j3lx2pjfgv7n5evt6j4ksxxanlr',
      rewards: '29541131801158203',
      mid_rewards: '20228250321285772431'
    },
    {
      address: 'erd19gzq4t6cggahytrj3napm89f8ek6yr2rv0v7q2fp7nct3th67g8s43xt80',
      rewards: '29501750293533614',
      mid_rewards: '20225279823824542185'
    },
    {
      address: 'erd1k8nchk4csl5aqdv5f2df7paaz440az5mcvyttmc5ppldr0rqeaxsa778eh',
      rewards: '29487727123250427',
      mid_rewards: '20224222073772875869'
    },
    {
      address: 'erd18vs5q5gpe88m8p0q6a56w847vaesvhmcrhndw4taddehar45dzcs352cw3',
      rewards: '148723630160744718',
      mid_rewards: '20218035887016117985'
    },
    {
      address: 'erd1sj4hfgcp59laqa3f4885yggpzxmnjeq7f94evyfhdj670yf4y2esrdqzyc',
      rewards: '29181450576055338',
      mid_rewards: '20201120020023432280'
    },
    {
      address: 'erd1glhm7zhmnltd2ux2r978p6u8ldndaa8yj4d7vyh8gnhlr9dgmvrqasmrgu',
      rewards: '29141856313810677',
      mid_rewards: '20198133474749487158'
    },
    {
      address: 'erd1tnru9vvhqhkn7cx6ew2w6nfr2h2kvzdqag4jts0ndekjdkkh6d9qd8jtgp',
      rewards: '28956964987446674',
      mid_rewards: '20184187355144232566'
    },
    {
      address: 'erd12czywche8w87xddduyrufqt7m3w6ehe9ec3mde4h4zc7zad445fsmz5983',
      rewards: '28845047547867173',
      mid_rewards: '20175745563801264223'
    },
    {
      address: 'erd1fttmn3ka2mwh2htusfvyt8dtln7smgchyt2cd9t82aeqcswxyhxqsx7m58',
      rewards: '28721258301837618',
      mid_rewards: '20166408297067757926'
    },
    {
      address: 'erd1f72h43n5q7dmrs6pqrzy569pmv3jdr0ndf9dlcptkzpqfa0wxfkqq9w96d',
      rewards: '147810855154139109',
      mid_rewards: '20149186419249590852'
    },
    {
      address: 'erd13ulkmmh6mhs44tyvgn63pmwhhdr7fvgdkcqyhx7zax2zm5pvqe0qjshjf5',
      rewards: '28112037599109501',
      mid_rewards: '20120455547669894702'
    },
    {
      address: 'erd10u3zvf4x77zqey93zc7qmfdgyre3tnnwejakpvnukv0lv0rlw0vswxvghw',
      rewards: '147322402452774462',
      mid_rewards: '20112343047909769470'
    },
    {
      address: 'erd1zvlvnmh70xlxwyfjc4077qqyax8qmp9p0cg3xqdn5r9nn92lfypqt0rz9u',
      rewards: '27535810173963387',
      mid_rewards: '20076991439596514736'
    },
    {
      address: 'erd1pk7ajkltg6x4fs7u8fjphu2x3pduzpqxt63a8hpfhveeahca2nnq7aktes',
      rewards: '27428078866794679',
      mid_rewards: '20068865402942705885'
    },
    {
      address: 'erd14qfz0eea3ms59nrzntc5jdxeamw4g60d9wf8mfnv02l7z74vlf6s7tnt5u',
      rewards: '146725682040735843',
      mid_rewards: '20067333179676125804'
    },
    {
      address: 'erd1dya3m60nu58pjws3jneua7cw5z9jtphw4e0vxpz4ugwee6ej9f7shns2cj',
      rewards: '146307820843425909',
      mid_rewards: '20035814436473395404'
    },
    {
      address: 'erd1djty2wuarghl3za66gar8l42pkhawhtp7f3cd6e6u6jaj7ekn73s33cxy9',
      rewards: '26886868918294895',
      mid_rewards: '20028042618976777437'
    },
    {
      address: 'erd1jtn7up94jllgz9wg2ldhset4hg95tdt8x54vk77dz7uvcf004t3q209ycc',
      rewards: '26867036358498210',
      mid_rewards: '20026546673999572805'
    },
    {
      address: 'erd10ud4zdcy8jmfn0xhzx3q9gl5szn5svtpdq8vcqx67cjwpqs2n3esw3y9p7',
      rewards: '26846183125682525',
      mid_rewards: '20024973740943582874'
    },
    {
      address: 'erd16w4w70t3wd7qs7g5wn822ws6pt7puam5qvg45r3l4eyrndlp4e0s9vs4gj',
      rewards: '26756772968441535',
      mid_rewards: '20018229645526404702'
    },
    {
      address: 'erd14s9j55etqlatkadd28um497klxqr43xaxerstj28xqjuzxmwkwfsa3capp',
      rewards: '26558235319737208',
      mid_rewards: '20003254201034620069'
    },
    {
      address: 'erd1nr3p8zrur88tyxxeelgtn74xx57sx09mdevvldfrp3rhtt5gx06sq723xf',
      rewards: '26471091682728272',
      mid_rewards: '19996681066380532125'
    },
    {
      address: 'erd1qjx70ahmu2cga26ucrakyl36gv67un2hsrh8lmgvlmr3aplwfq2qlntrrt',
      rewards: '26426937800357050',
      mid_rewards: '19993350594709983867'
    },
    {
      address: 'erd1d8p4upfy2j7ta9pklva5uhmjwnd7kgek9uy26dmkcpmsewreuvys7z369k',
      rewards: '26329381661899662',
      mid_rewards: '19985992058201489246'
    },
    {
      address: 'erd1drsq9ps0jjrjqt5s9d2m8a48w37ra0jg3w0ejg9stcscx2afle9q4m3lwv',
      rewards: '145592221643183925',
      mid_rewards: '19981837691148135841'
    },
    {
      address: 'erd1feeyz9a7wy0jdzxdgckutfd7jam7n4z9n54l2ds65xy868z9r42qcdgpqq',
      rewards: '26251784381652035',
      mid_rewards: '19980138993200239093'
    },
    {
      address: 'erd15y03vsqpgns4nmyrtw5qt4t97rgp6hcgwuvqyk43wf8snx0rqz2s29e00f',
      rewards: '26157624855012609',
      mid_rewards: '19973036658838148359'
    },
    {
      address: 'erd1g6pr86rrjaf0asn96ttg3x3xd6awj0eznkwn4wz7qs76t3lvpj0qq2yuh9',
      rewards: '26149293952477485',
      mid_rewards: '19972408269364940609'
    },
    {
      address: 'erd19q6ulxmszwpfdsyxrhjsum84hd8tytnc3jdemyejecuzmsdqcfms3de72l',
      rewards: '145371403751485597',
      mid_rewards: '19965181676022027666'
    },
    {
      address: 'erd1az02j8tyzzguptc6wf66nufmdjmesmf7vknlduq2n5ue6knzhzese3tt8a',
      rewards: '145197809044002877',
      mid_rewards: '19952087646134292797'
    },
    {
      address: 'erd1vq57wx7v2hfwg7tma5yl95au8nl3ystlnvtgkx0egc65gvyx78mqfyrp0a',
      rewards: '25864662592946537',
      mid_rewards: '19950938884827074826'
    },
    {
      address: 'erd1hqx9aw7z7eps2e226vzzkyd07f8rn3atntt2uerr6jcv6nd5cershau2ux',
      rewards: '25853646042531737',
      mid_rewards: '19950107920320824034'
    },
    {
      address: 'erd1qpcnljpazgk0d0sc3v6j85m96mpy7zq3jqc3mpqvjv22vtapfktsdlt0j4',
      rewards: '145168882642473941',
      mid_rewards: '19949905764142284425'
    },
    {
      address: 'erd1d9hjktp2eagg0zhl3hk6rvxugd60y8muesz8g28rxcydlrfnl8ws7jm5t8',
      rewards: '25830620756953319',
      mid_rewards: '19948371152063834129'
    },
    {
      address: 'erd1prgmxzmu8u8cel92dtznrveup75euykk8p0kpq26fn9vaud78quqkn29ph',
      rewards: '25054152600807241',
      mid_rewards: '19889803138148645004'
    },
    {
      address: 'erd10j2uatsdmmc669a5wj42sqm643jssj993nvrf9wcfxpu7mart3dq6jm3es',
      rewards: '25048142732110592',
      mid_rewards: '19889349821331119807'
    },
    {
      address: 'erd1jfn6cwdsrugte0s4tptpd94eahl4nkdn3yy83j59p3zzhr93vc0q49vn34',
      rewards: '143828452349952891',
      mid_rewards: '19848798797419563626'
    },
    {
      address: 'erd1trvew8d25hysftevdefxsnv0xlfy5s2g9xc2rutr302gneujzyks5c32ts',
      rewards: '24435461384673772',
      mid_rewards: '19843136039866647643'
    },
    {
      address: 'erd1x2yvhzm9muyu3ue4awuf4svvynd5wwhxzlukzp3a4h8ng8qrmkvqf462ph',
      rewards: '143430691317255510',
      mid_rewards: '19818796184287857185'
    },
    {
      address: 'erd1q9n9sftmvurw2z0majdu4qu6588el4rp69w2gmtuh8xd7qk6s3usjvsccd',
      rewards: '23873745214928413',
      mid_rewards: '19800766497489891545'
    },
    {
      address: 'erd15579km79tp2n36ehe3h45kdak43aft9f30fxtpk5s59thhlq2qasu7cvc0',
      rewards: '23779622401424750',
      mid_rewards: '19793666932353337259'
    },
    {
      address: 'erd1fdlthe4qqt9q7wad0rlpzm2jycpxcvtp5k3zaqege5v5qf0gmc9smjek8g',
      rewards: '142887791955344862',
      mid_rewards: '19777845969998646587'
    },
    {
      address: 'erd16spug24dyjmgtycnqjjcfd3pvvuv9mejjhkc4wu2gka23pxtdy3szt0lpn',
      rewards: '23525948496106405',
      mid_rewards: '19774532629550312716'
    },
    {
      address: 'erd1mxsw34u7ry4h2xhvay2q3m6hkke5e90trnekzv7fe74srl2ckhdsd4hg7u',
      rewards: '23252876875049913',
      mid_rewards: '19753935181509093829'
    },
    {
      address: 'erd1q9mfkxsguryyjems6phruplam9fadqzyyzv5cmjj42x9dwavyu3qymyq0z',
      rewards: '142563322187085614',
      mid_rewards: '19753371624525436139'
    },
    {
      address: 'erd1pkyfpmf8g04wjnshq8r38d9jjddpphvrnza27hy45svm466cwlnsh2ae73',
      rewards: '142452974559856099',
      mid_rewards: '19745048242148541247'
    },
    {
      address: 'erd18qkvaag63t5g2047laqpss2q4e3vmd7lfasgenz6gjzxkag7jahszt0fez',
      rewards: '23095509147657473',
      mid_rewards: '19742065132267836649'
    },
    {
      address: 'erd18zy9kr8jwjl6czlvfay5uw0u65wkk4t4qlz3hmw8sx74ta3y8x9qfcfcp4',
      rewards: '142169318314004636',
      mid_rewards: '19723652409205930098'
    },
    {
      address: 'erd1s3tjyksf94yxpe6cem697xxlshe3cu6r7kuvtadgf3lfkv9fcfrqr2a4rj',
      rewards: '22790120184482204',
      mid_rewards: '19719030027861791423'
    },
    {
      address: 'erd1kmw0zkzrh39u8qmuykd6qx37xv07dq67ym7cdhxljz8z26rzmdxsufjgt0',
      rewards: '22707753808788052',
      mid_rewards: '19712817236004695306'
    },
    {
      address: 'erd1dlu3ykrglxn577g0jpwappkf40h2u6nccnyktak5t8h0svdtql2sk3xlxp',
      rewards: '22625238546081036',
      mid_rewards: '19706593213787960887'
    },
    {
      address: 'erd1yh6yl4kq2pt944wc7dtgxa40jz0t8eyqythpsc3vxq4a8e4c668sugphms',
      rewards: '22266554734812339',
      mid_rewards: '19679538146193423287'
    },
    {
      address: 'erd1p9aqegus4ujmdg4vq0xy05rgr5h45rpyuqqydvpctkjk9grxd5usnz7l5e',
      rewards: '21965153186444305',
      mid_rewards: '19656803807458278073'
    },
    {
      address: 'erd15s29vzgqpt2sy93fexc4tgdc3s9crutc5grw8ljue02axtu8acysfcxvzw',
      rewards: '21863792827289252',
      mid_rewards: '19649158323379566061'
    },
    {
      address: 'erd1ey5svdwal45zqe9revvjzphzj4zkluv33uelk7sk37tufsmaajrqj54nmt',
      rewards: '141164828217744828',
      mid_rewards: '19647884987876746645'
    },
    {
      address: 'erd1cs2re9pml9uhr63lvxdsg0xl6359grjpgwn8dz4zm4k3fpy8537qr57dvc',
      rewards: '21579259794192009',
      mid_rewards: '19627696355480607981'
    },
    {
      address: 'erd1vhqqpccwljg78jjmgvqtkgvu80as9ecvxzxrfm352737kaxc5tksdd2pa9',
      rewards: '21521467110665935',
      mid_rewards: '19623337126237065847'
    },
    {
      address: 'erd1yjre0e85lh36qgc45g6kfza990ctk7dquldukgvpg0ct5zj504lsdjffsx',
      rewards: '21506098650156179',
      mid_rewards: '19622177902639979804'
    },
    {
      address: 'erd13v3tnhgh3l4paza8aclp786wpuafkgjqf3wdjv44tu8jp06lqlss4adx9z',
      rewards: '21489415540578451',
      mid_rewards: '19620919516721429429'
    },
    {
      address: 'erd1fjcpw5sy5xvgh8z32dxjgvukxwj4uf7jt7446ldjz7wl38vayr5qut4nn0',
      rewards: '21171168360654744',
      mid_rewards: '19596914533239872757'
    },
    {
      address: 'erd1ss9k4em8ux7xxelfawsp8g69m5cqpr7t29kst0894lsqsjxzz07q70kfpl',
      rewards: '21097991298130653',
      mid_rewards: '19591394879687747786'
    },
    {
      address: 'erd1pw6mqqv4920gmf8w82xj0py4zetfwtlvh4sm0gayp9wlr7tzrems9s3d7r',
      rewards: '21096709827285517',
      mid_rewards: '19591298219957795236'
    },
    {
      address: 'erd14sqlsjgwxympwr54uha5ugu757ud796kunzdynpz7grsl2pa9j9syp60vx',
      rewards: '20844549202184215',
      mid_rewards: '19572278061973341567'
    },
    {
      address: 'erd1k0fl9cfyuak445zr6ughsw3vpexcd2acl97zg70nm8fpndflt4csygq9yn',
      rewards: '20814166657458596',
      mid_rewards: '19569986344936160019'
    },
    {
      address: 'erd1vjt569upszsj8nal3p9l7m27z6c95n5uyz6rucrkpdfutp84qqaqjcw00g',
      rewards: '20531147959868999',
      mid_rewards: '19548638601455012307'
    },
    {
      address: 'erd1jgwfnp3gv9amf2jgyvu09jjpj7rmyc2sxdgqng6wgnll7yfn678srn430y',
      rewards: '139426494438901981',
      mid_rewards: '19516764662925059426'
    },
    {
      address: 'erd1lakrankl6m6ldc85m26v4afts9m8uj96t8mtya6kvzpluta02hnqyegyce',
      rewards: '20054439703360051',
      mid_rewards: '19512681098781265809'
    },
    {
      address: 'erd17zhy499pgn6nx4y2072q74w7qy2fzu9rt364cxs04shmt84k8esswrenw7',
      rewards: '19680180965570044',
      mid_rewards: '19484451234118738056'
    },
    {
      address: 'erd1xs72pgv5d9cgdp9vf3xykl92tm8308fuhdpar09592qw70tc9xhqgu8gza',
      rewards: '19448613540450146',
      mid_rewards: '19466984395241478059'
    },
    {
      address: 'erd1ug3rsh68z975nslg6dfpfnt03qad68craln2p3s6pn60fuprdejqf368hn',
      rewards: '19427520452822660',
      mid_rewards: '19465393370239483656'
    },
    {
      address: 'erd1hulc3apa0qsr59xjzsskg7x6vs0enfy48wt4dqnkvkdn4stmgefq9ffpv8',
      rewards: '138423612593544307',
      mid_rewards: '19441118549933468092'
    },
    {
      address: 'erd1q8de6mcuy44rvevx84xjesudd02wmf38rxwk06m8tjjwcaf47n2qh8rhgx',
      rewards: '138390634081112711',
      mid_rewards: '19438631022325661625'
    },
    {
      address: 'erd1td58ydt094wthtvx94pfp2vek785l038xvkhw7cuyk4fuxtgtpkqdefwdh',
      rewards: '19069339672389678',
      mid_rewards: '19438376245626577338'
    },
    {
      address: 'erd1vvpsmdz2dcwzyz9f28wtvyqkut4dcgcaj6hjk3j3lrmmdftkvurqsjkjct',
      rewards: '18939994448712768',
      mid_rewards: '19428619898505051175'
    },
    {
      address: 'erd1z4m2wlat8gxd02pqkcun39wrly8l0vue4sqldzxwnmxtxtc28h2qjeqw2e',
      rewards: '138171410568076416',
      mid_rewards: '19422095269171567228'
    },
    {
      address: 'erd1h65av9ahz9kcuv0zmuqrd4lgn5sc6lk77d2eput89m7lc3dxxcashs0h4w',
      rewards: '18767920218359022',
      mid_rewards: '19415640556289879046'
    },
    {
      address: 'erd1wa59gwmx6cjmdtxet0pzg8p8spjppzv4yqkkfthftgunwns5qg8qtd6c45',
      rewards: '18766030489639471',
      mid_rewards: '19415498016435454194'
    },
    {
      address: 'erd14e8pvd2c5sj3n8sawx088k2dnk8exmawpcvddsdh2vmdmfzrqkzqtjjwly',
      rewards: '18590142859781858',
      mid_rewards: '19402231034304287055'
    },
    {
      address: 'erd14e56wedext6jnz5dx7wvgn8a8ht9lz68h7cturs3x62ujt72e3uszk704r',
      rewards: '137619555768999924',
      mid_rewards: '19380469557549472990'
    },
    {
      address: 'erd14437u02xkxrnq8cgprt4jhd6svga5ta65n4r99jd42negx5mgq5sx2vd62',
      rewards: '18118986121732977',
      mid_rewards: '19366692275667686188'
    },
    {
      address: 'erd1tpk4em4texdnc37jufmt86w0vej2tyqhvdfylexnnacedjc2yzeqz46kuh',
      rewards: '18066888669401111',
      mid_rewards: '19362762630531608521'
    },
    {
      address: 'erd1pwduel0y7y4ssetss9g2amdlvnzr5rfa6awe3jkngsjp3tsje96szvt353',
      rewards: '17955336112694152',
      mid_rewards: '19354348361843609732'
    },
    {
      address: 'erd1zrpg0y65m4kwpxzw4h00l8gtaevdzhgfg36h2mp8trrr9ml4h2fqacnug2',
      rewards: '17764879686191790',
      mid_rewards: '19339982473752342030'
    },
    {
      address: 'erd1980evnyqhu0ty9p0r4kupaketx5w20yjg2gs7wdqplv2ew0kmmrqscnfxj',
      rewards: '17581885932689998',
      mid_rewards: '19326179485675301908'
    },
    {
      address: 'erd1u44v93m860lmlnky468fqgw8xchm5cxa79ppwzjgjy0xngkmkr5spkg5p3',
      rewards: '17376611265418852',
      mid_rewards: '19310695876368199194'
    },
    {
      address: 'erd1v0zlkh6htt9lchmg4c2mgxwnyk8mtvq2zxjsc07e3j9jgzd33sxsde7d5r',
      rewards: '17258672792974884',
      mid_rewards: '19301799926108604821'
    },
    {
      address: 'erd1w42xzs2duep5w3qtfjs898scrxh5jgmlr3yqp76dhf3hyepfa90sx3th6l',
      rewards: '16305479404997934',
      mid_rewards: '19229901750801596438'
    },
    {
      address: 'erd1l8yyy08gnrxwk223ul8jg8arklu2hu3eujm2n77qaqe88tha8weqvu8ja7',
      rewards: '16139214529580804',
      mid_rewards: '19217360600903872017'
    },
    {
      address: 'erd138hdrk39plv3afyv0x3fcsknfu9hkdj9xu7u0mpdqmjpvt5avc7s72unc8',
      rewards: '135009576643351606',
      mid_rewards: '19183602123206723416'
    },
    {
      address: 'erd142rf8tvvlacjqtfc83mfzv7qzyked7rmdcrtqnvs354g6h2pedpqjjxq32',
      rewards: '15444588192817104',
      mid_rewards: '19164965812224631573'
    },
    {
      address: 'erd1k7k74a4hhvevd7pgq585xzx2fnxg8vcm79a5vsd277p9rkm2y5pq85ufa7',
      rewards: '15430623656787116',
      mid_rewards: '19163912484880748034'
    },
    {
      address: 'erd1ccfjchz7et60su5f0udh9q556fgmu7zw7ew3ueznsgqe8gekr22s4327e0',
      rewards: '15372904737210872',
      mid_rewards: '19159558819558927462'
    },
    {
      address: 'erd1wj8aar8jknekxxzmees5naehm9rx22g49gqk2mrqgrth7ama3xvsv6jzpg',
      rewards: '15257187421875632',
      mid_rewards: '19150830408379232367'
    },
    {
      address: 'erd1hcsgw2adlu6jtz9lvp3sqklc3ju5pzzjgxws8mdfs66krhd466mqzj4akq',
      rewards: '14534592031148874',
      mid_rewards: '19096325949227691343'
    },
    {
      address: 'erd1whshag535az2xen8x7089wrexz3zqd8p9yphqvmrxeajzwf9ujms4yel6k',
      rewards: '14481958313569767',
      mid_rewards: '19092355854280228579'
    },
    {
      address: 'erd1y7lge2plpjnjyk52wwgnq23t5tj6s5ar8gzm6zjf9vce7xvyp08q4mu2e5',
      rewards: '133798045065716181',
      mid_rewards: '19092217824010436260'
    },
    {
      address: 'erd1jjvjcwjhq4tkm0kjj8fg55mkr9jpactfz4skv64h9y26s3jma02sjte5en',
      rewards: '133567167882668271',
      mid_rewards: '19074803049222291897'
    },
    {
      address: 'erd1kxj8kput7ww7m9st9v5h9wrqeu5zj9gx29q5lyqy6vg5qkdwxxxqnjnd5q',
      rewards: '133542252489841644',
      mid_rewards: '19072923712558937781'
    },
    {
      address: 'erd12e64d3tl3wetlmxnmfrrp5779munlrek5lu2zht7wp76s20m0gzsup09xy',
      rewards: '133535694001458935',
      mid_rewards: '19072429014050285943'
    },
    {
      address: 'erd132gcmtk8pxntl0m8wcw8dwttzpdwqyxhjuxz7esp6705khp4yd6q9nh477',
      rewards: '14190083007167004',
      mid_rewards: '19070340067964220159'
    },
    {
      address: 'erd17pgws5nc9v3xa3gn2nwhq45wptgj99vzj05jzerzelc34y28lwjsldnkkj',
      rewards: '133049386111126206',
      mid_rewards: '19035747423102060160'
    },
    {
      address: 'erd1ptj3vncpuce8e28gw2zcxe9mfrl3s5yky3k38fg3j4p4haa6w9qqwvqq8u',
      rewards: '132892580078676949',
      mid_rewards: '19023919741802086903'
    },
    {
      address: 'erd1g8ejvzhes2m9s4fa08yp4uvdnju6kxlkk72x3p3rjptvrfttr94s9cnxrx',
      rewards: '132819087143169142',
      mid_rewards: '19018376262349106532'
    },
    {
      address: 'erd142gu6z0v6z3ara855rxzdra9s0x0uv0n5u0gnte9v6zymxk9r5fq0t2wlx',
      rewards: '13408850974341333',
      mid_rewards: '19011412720838194043'
    },
    {
      address: 'erd1anjs9ghk4e088ht6lp38uvs6mytrzj2a03wf3lc29awgfrdvw2asuteqg2',
      rewards: '13228885970093708',
      mid_rewards: '18997838187498234342'
    },
    {
      address: 'erd1rrttw2vqkp8a52yvahm3y25eqf5mswc3f0cvmxsjzemnqlhy3phq9gg3mu',
      rewards: '13205989830578864',
      mid_rewards: '18996111160565970536'
    },
    {
      address: 'erd10gku723tfuwnyz4wld2hnlhx4wntxcyu9sawtdc9et9xulzndmcq9ephcu',
      rewards: '132517181404622992',
      mid_rewards: '18995603893184594626'
    },
    {
      address: 'erd15m5pll0lav0kxw7gqhvaszvzs7j6htnse9wxp3g52hts4m62upvs7vwmk6',
      rewards: '13109364938778182',
      mid_rewards: '18988822866818517321'
    },
    {
      address: 'erd1y538fuywxl5khmsljz0hjnmlz0wqxkdy9vlhjlvsn44a5m7vnclqf700ec',
      rewards: '13076739132726179',
      mid_rewards: '18986361943408171454'
    },
    {
      address: 'erd10f00tzz8hh64xn7ku8lls4hpfeu9gwy5q3yxkvgz8ajkz620rttq0szr63',
      rewards: '12925551871666849',
      mid_rewards: '18974958078949039254'
    },
    {
      address: 'erd1tu9kszkf584tlacaxv9vu8ar3vveackm9xqptud8jsd2s0kdysrqksxkfc',
      rewards: '131420190959521427',
      mid_rewards: '18912859287182425485'
    },
    {
      address: 'erd18pwuzfyc59furhcu9xxlt39c9lvtet4n34fl6hnrestwf9urps4s67mrn2',
      rewards: '131377865890740457',
      mid_rewards: '18909666760614911196'
    },
    {
      address: 'erd17fja9eh9dzvkh68whnxgsyy7zta2mmhz669ecnt89l7w8wjcpursan30ya',
      rewards: '130629309941689158',
      mid_rewards: '18853204129284430550'
    },
    {
      address: 'erd1wzp0y6lpxdvlwq62asvqaz6498hxhm2692t5nfvtl7e90xste4mqnfw99k',
      rewards: '130600241492580231',
      mid_rewards: '18851011532822581169'
    },
    {
      address: 'erd14275faxyy4297tem5xluvtjkalqr7n8aznz89qmkjnt6qgzz5ppsqe74g9',
      rewards: '130119690595239254',
      mid_rewards: '18814764184596328834'
    },
    {
      address: 'erd12nzlra6df9faaa9pnejrtq9hllkecgyjv5qtlpktee0yfdmxcuzsq3xsa9',
      rewards: '130077261744904085',
      mid_rewards: '18811563829917046721'
    },
    {
      address: 'erd1rkvxl09n55dha2q63asgtqf8pwxh376kv50fjjfwgcvkwhuezvtqx5s67q',
      rewards: '10720560237240862',
      mid_rewards: '18808638340392187009'
    },
    {
      address: 'erd1jje0u0dmdtwjyamygytxltvay3n5r8lzufuqmnjnfe93fk5jdhds2zj9h4',
      rewards: '10699471929273385',
      mid_rewards: '18807047675913920078'
    },
    {
      address: 'erd16jv5j4cgdz9d5n075z055z2mya72r9avjkt0ype8qmsvfac4gzkqy7mkls',
      rewards: '129969232771024398',
      mid_rewards: '18803415340638577462'
    },
    {
      address: 'erd1k7puu9r0afx9r9ckp40tl40zgc29c904tjw3desjwdnz65fz2sdqnh9xlv',
      rewards: '10587550800253741',
      mid_rewards: '18798605606281134021'
    },
    {
      address: 'erd1jdgm34wy449mdywhq9fw22u4z7g66d2xmmx2z88w8u3pzgdnvsrstcnl5l',
      rewards: '10500936265554917',
      mid_rewards: '18792072381147115782'
    },
    {
      address: 'erd1zryr56u2gtm8c7asvdj9wvn4y2jl3427sjuuwrhqug8j7zavlgxqcfg7c7',
      rewards: '10310927952694592',
      mid_rewards: '18777740293702809154'
    },
    {
      address: 'erd1ntatnq40caszrmffqlerawsumggneqr9s24r05wst82650tkqfuq8e655l',
      rewards: '129436315717828973',
      mid_rewards: '18763218079308366132'
    },
    {
      address: 'erd1w7ntde4xwl9nqhuuls73dm7tkldxgf6ywy9p4kx5entkzrt8n72qs4zxeh',
      rewards: '10068632187125735',
      mid_rewards: '18759464229633597682'
    },
    {
      address: 'erd1nhnaal7hfr4gsz5e5y2c5av84l408vyu3m6ppq7tytjzdw064jcstta3zh',
      rewards: '10037725568482186',
      mid_rewards: '18757132982361628067'
    },
    {
      address: 'erd1v0gpzy653m95p6xnkuqhrvneymu4dkjjx9kx3fuqwl2qhvufu3mqnqgz2l',
      rewards: '10003681406073953',
      mid_rewards: '18754565074119836327'
    },
    {
      address: 'erd10n4khdm8mk282vpt0ysuc9gr28gy2xxs4epluz4ahsfzws0vlrksssku94',
      rewards: '9855304478903417',
      mid_rewards: '18743373189602189646'
    },
    {
      address: 'erd1cc73f8pe5seqw62xesyynsadty3ksenlhx4tf00jj7k2hxd7v97sz673lu',
      rewards: '9817436502398942',
      mid_rewards: '18740516855884832538'
    },
    {
      address: 'erd129pl3mf22dc9w68nep0zyxx0swy0n2kh2cn0gck5nf0eftk88jhsk53rvu',
      rewards: '9779197976759377',
      mid_rewards: '18737632572113466866'
    },
    {
      address: 'erd1nwxa4ktcpxl8hq0qnxsz2uw7qr5qaqpwt54kkjm2ljknu535ajxsxsfhcu',
      rewards: '9656498847123522',
      mid_rewards: '18728377531484933489'
    },
    {
      address: 'erd1eqwd4qt7h7rar2nesknqudu9ajqfpnzggeyl32gdy3p6a5skmsgqyrxac5',
      rewards: '9604816495539751',
      mid_rewards: '18724479196874855113'
    },
    {
      address: 'erd1nk576md6r09x9y0az07cv7dsxl59wsmywd7udlsqgyam7szqa7estuvs2x',
      rewards: '9374371737003843',
      mid_rewards: '18707097039322376803'
    },
    {
      address: 'erd1e4fmeu98zt9zmtme8gywpw54xnwn7n706kavflxv845cxmaljp3qlwrgta',
      rewards: '128648309445970653',
      mid_rewards: '18703779759874218262'
    },
    {
      address: 'erd1m9ajw5sznkjsg2qxa53mqywt7ptevr59q95q4gcasjdnxtqxqupq9qy8jx',
      rewards: '9290742784501413',
      mid_rewards: '18700789012888703525'
    },
    {
      address: 'erd1amwxald4q9hzhlsgdkuwkjggvp5kgjtsjjvtdlwqzahw9jlv9ueq85z8pn',
      rewards: '9256790282014120',
      mid_rewards: '18698228018439167896'
    },
    {
      address: 'erd1nq2sx592sdd3l2j8vccnzsljax2883yqayzftxl0d7sk0c0gf59qtlfhze',
      rewards: '8969815657916268',
      mid_rewards: '18676581884409806439'
    },
    {
      address: 'erd1a48mx3x5kfwk7a03xn8977jt9mqj5j4dkm47q59n9k5ewc8gzthq3hcjp9',
      rewards: '8950945381616844',
      mid_rewards: '18675158523263389757'
    },
    {
      address: 'erd1ch8smtrkq2cx7lq0egz53xtnqp7ylh3tcdqxnmy4wxjecdkqnfjqvpnadp',
      rewards: '8630472875162261',
      mid_rewards: '18650985686207678699'
    },
    {
      address: 'erd1c0qvwd9rsxm6yr2w3sufhr0c36tn904fcqrf48p4uv4eytt7hnasu999f2',
      rewards: '127864513891232504',
      mid_rewards: '18644659049522857690'
    },
    {
      address: 'erd13x5zlrcphcgp2mvcadycrekgqr9gz4mpyjmxs6gqds60ynu5epvquur377',
      rewards: '127817052623527212',
      mid_rewards: '18641079105947073615'
    },
    {
      address: 'erd17mmehtyg934q2pat3qapm7lk8u5q298gu696lxmfc7l5z3peg83qrq3k9g',
      rewards: '8478946051555758',
      mid_rewards: '18639556208973791363'
    },
    {
      address: 'erd1gnsl0q6cdnwfvrcn6ywavthjyn99n459nykp9kfad9e9lxzclpkq4flgdf',
      rewards: '8341126820333615',
      mid_rewards: '18629160678148596028'
    },
    {
      address: 'erd1ym0j3lmx5sg4tkxjtj4xlms5yagtz83xun7c9dw2xen5yenl05zqt7y3t2',
      rewards: '127647218815526850',
      mid_rewards: '18628268755964912274'
    },
    {
      address: 'erd1f6tu70ea884azvny6l0aarh6rcpm53tll8yep8f50j7swfh70elqsr2zdu',
      rewards: '7880001389114457',
      mid_rewards: '18594378568336986020'
    },
    {
      address: 'erd1khem7auhpp40v0faehpuetgl2dxmwva826qj6xuda3t8g7dm4nrquee0vt',
      rewards: '7830625351506308',
      mid_rewards: '18590654196081896497'
    },
    {
      address: 'erd185wsd5xt27s70v75q9s00jndmt95qg377hx3yh39uffaqze3sphsvyevnx',
      rewards: '126556580582121394',
      mid_rewards: '18546003289281033409'
    },
    {
      address: 'erd1arahaz2dvj5dg74ww9pr3am94qew9n799z3kdquqmjjwm2vsw58qcdt00y',
      rewards: '6799039415489560',
      mid_rewards: '18512842969726883186'
    },
    {
      address: 'erd1wye43zpd0wtvkgggmlx2ejgs6w2ey50hrss4r9k9y5mmfxx52y6q9aer8v',
      rewards: '6721184753043495',
      mid_rewards: '18506970490710956038'
    },
    {
      address: 'erd1l3d52jetawchcvkh6geh53yrwjplggxrzrw0srpjlj0d58zdrquq02dl9c',
      rewards: '125884160435882663',
      mid_rewards: '18495283485551755352'
    },
    {
      address: 'erd1lapgsyqd6ys8zpzlan0an5xc789gurjx62key59g84wgq3vxegwsvluwfp',
      rewards: '6444336849751427',
      mid_rewards: '18486088202462485576'
    },
    {
      address: 'erd1r9pzdda0lf7ck8uudhxqq3uurxf0vh2xyqwu08dn3tjngtnzy8csmvjcvt',
      rewards: '125638338558357900',
      mid_rewards: '18476741451304030642'
    },
    {
      address: 'erd1y3zu46ezn72amx79hamgm5yds7g8c58pa0jsa6srutx655l0fjfsafchjy',
      rewards: '6201566531455620',
      mid_rewards: '18467776343479476932'
    },
    {
      address: 'erd19sqnq45x3whtsflv32e5lnlp846ga3zqgceyzyk6r85fjk9uvhhq60hf0h',
      rewards: '125418636899737762',
      mid_rewards: '18460169632231474117'
    },
    {
      address: 'erd1yau2m9f9trs7aru050wk6drynhte63zqejr5md95h35e7s7t8lgsu5nfhf',
      rewards: '125238140230512911',
      mid_rewards: '18446554996072695748'
    },
    {
      address: 'erd196085dc0d9n4mz3ezu6u7eenc8qz7sgg0y3tz60pd4md3r53nqcqf9vxx2',
      rewards: '5842321805873951',
      mid_rewards: '18440678966825607873'
    },
    {
      address: 'erd1xqxnxkw3e8vr622gfx4m0cpl3zj4sm99t4jhlxvnc4ymkvv8c00sanmt8e',
      rewards: '5836948546443741',
      mid_rewards: '18440273668642305099'
    },
    {
      address: 'erd1yyp9n8wj4uzcrv6kygs2ym28sdpmwdv9yh6j0mxdegs4v00u5l3sjupyj0',
      rewards: '124958084414149816',
      mid_rewards: '18425430738986359281'
    },
    {
      address: 'erd1d3he7qjz3unynzp7h8uv2v4letfftlcreav7vns74yrt7wcqrstse27evz',
      rewards: '5452912315277404',
      mid_rewards: '18411306299983524818'
    },
    {
      address: 'erd1xc9z8qqpcxyfrf57kc3tc4q0j2j9k0lxasqk9kz95kp4vst78q5q6hhcuw',
      rewards: '5132426856175883',
      mid_rewards: '18387132485925988124'
    },
    {
      address: 'erd12awrxw8ggdthn6px43y7aycqjkcvnyxtlz8qgg8e6xg59d9da3sqa2ggfh',
      rewards: '124255141279011510',
      mid_rewards: '18372408624692954039'
    },
    {
      address: 'erd1vfm4cc5vj0jzkjftr89rxc8c25f2837p9p02856ney44zjdxqdyqfy4rra',
      rewards: '4888047663949227',
      mid_rewards: '18368699271611117007'
    },
    {
      address: 'erd1vp0yad9fqruask76rm8azkrj92z30pssg3ua78lla5lf38lncmrqlnf5km',
      rewards: '123912820312818491',
      mid_rewards: '18346587785869421054'
    },
    {
      address: 'erd1hzgs7txw6mlv92f3f5d9m7v766accsjtp87fwhaah3tlqzhn3lfs2nv2v8',
      rewards: '4350155615890568',
      mid_rewards: '18328126752691690303'
    },
    {
      address: 'erd1s8wjv54xraqpf38p4n84w7fh92xvmsu0wt63wkasck69zm6qapvshmzvns',
      rewards: '4250979502815534',
      mid_rewards: '18320646023540525742'
    },
    {
      address: 'erd1mc3n4ke4mjy782m498k6grusldmr7wetetjkkndsjd9gj7c8h6aqk0vaq8',
      rewards: '123532931651016819',
      mid_rewards: '18317933263137857668'
    },
    {
      address: 'erd1eh6x5rzfkx3mtegrt58x04stgmu64gyj4sxcmq47n4ak7nqagttsczchym',
      rewards: '123168192444640794',
      mid_rewards: '18290421444726044783'
    },
    {
      address: 'erd1z0h9vn8psa0d6v4k33t9fe9l72aj5wzn3dxxgxt0pghqtecpej0ql7yhtr',
      rewards: '3696377998747501',
      mid_rewards: '18278813131424431660'
    },
    {
      address: 'erd14r4aacx9jzr0pexqyvw8587a8qem4trku3q5mcuqj77kr6qpdcequyd5fe',
      rewards: '123001871923994779',
      mid_rewards: '18277876097578872520'
    },
    {
      address: 'erd1gydzdeaf4yr3hvv55fpz9en39wtqpcjaqwlrwcgzf3k0d43z2fnq44s0yh',
      rewards: '3621911119453138',
      mid_rewards: '18273196188619745090'
    },
    {
      address: 'erd19qmwe0nc474hdavyuaguks5jr3mc2z387htn8rq7fvee2eaz0ksq97wjlm',
      rewards: '3276922421712277',
      mid_rewards: '18247174126169487347'
    },
    {
      address: 'erd1ca2dm43z8faqcr9w6ehk78vpmayfcz22w0rjd7eg3ymvh7ztpu7spjt3z6',
      rewards: '2914255944340461',
      mid_rewards: '18219818651092813232'
    },
    {
      address: 'erd16e3h2c8t9k6r3vvt2y84a0gvg89aq2eghlrhwdvv7uprwhrxkmlsh4rd22',
      rewards: '121913949818692161',
      mid_rewards: '18195815505012835166'
    },
    {
      address: 'erd1fpggyflu5fymxvrqug53h7e40cav6z872q96dxa6q78mxehdfxjssjl9cs',
      rewards: '121907929171135234',
      mid_rewards: '18195361375159471017'
    },
    {
      address: 'erd1kz6lfdlyw85jts504w555gvp098nepf2y26j9k2pm8yfw9z7km4sw0dwe9',
      rewards: '121889983003384980',
      mid_rewards: '18194007718355645239'
    },
    {
      address: 'erd1sld4dj9fsj7pntfyptl4u473stm9qzsf7wkrdtjukf77tqe2rlmqwnudky',
      rewards: '121268381802691909',
      mid_rewards: '18147121123607719800'
    },
    {
      address: 'erd1m0eax8m6lcwlpp9zf2d5qz7l0u2ltq9j82cq6hzcl7tyer2e5q2sl497yv',
      rewards: '119545589867325187',
      mid_rewards: '18017173100311641151'
    },
    {
      address: 'erd1w5f2mmt0z568xk5yqs78x0fp29rgdq0msrtvs98kspz7v03xf4lq2crytz',
      rewards: '119539594856872755',
      mid_rewards: '18016720904232741445'
    },
    {
      address: 'erd16avaqc4mwfckzuqqtqywjny348s38n5e3yg7vtwqu3t6q4pz6syqh4v3qx',
      rewards: '119247971447972095',
      mid_rewards: '17994724118227681507'
    },
    {
      address: 'erd199w8y4vqu9uegm07qcsnrlqm60jgzarsxv8xkkywa8uvkaq5larqhttx9k',
      rewards: '119190844292781889',
      mid_rewards: '17990415088947302751'
    },
    {
      address: 'erd1plagwtpuxasrautahja3f3jut8hcc6ar30pywdzc4v75s9fggd2qd7s3lw',
      rewards: '118684027969172889',
      mid_rewards: '17952186572737563222'
    },
    {
      address: 'erd1472gf498gh8x27258exxm9t67rk7fcl7phsxrs9gjvz5wfy8d2qqhytfp2',
      rewards: '118665294534040312',
      mid_rewards: '17950773533347809228'
    },
    {
      address: 'erd1gs5lfg5gu9h2sfhnzdq60pcegzwag56qpfl953y72sx4tr8uksdscj6tw9',
      rewards: '118224265386188194',
      mid_rewards: '17917507260849768267'
    },
    {
      address: 'erd1y4yutu6mkamq8jkaa3wxwwprelxzvgtvqc98g0j5gnsnr0vjydssanjru0',
      rewards: '117505051105177440',
      mid_rewards: '17863257834540628122'
    },
    {
      address: 'erd157k9t08tfa4glc4e9v8mxncs64k88elv5hyjjza04fypma9628sqkszlyl',
      rewards: '117370727340191739',
      mid_rewards: '17853125962325970183'
    },
    {
      address: 'erd1qq8yq65lpvg5pngxhxug6l4u0h9uu2pyaf27p864a0v26eh0vezspv3ekz',
      rewards: '117012410775940884',
      mid_rewards: '17826098595710901000'
    },
    {
      address: 'erd1fujrlvvr5dtqxvprt2v26erry3n9h0khcgxgt8w4979mlzjxwjpsj0cm3r',
      rewards: '116887721692115296',
      mid_rewards: '17816693455347108236'
    },
    {
      address: 'erd13xhzwwkrdl5w4ql3zj7w3pnauej42u7j0n60axxqhqpngc8cex6qm6jnuj',
      rewards: '116011738837788028',
      mid_rewards: '17750619173233142802'
    },
    {
      address: 'erd1pdjlw8hhv955hk9pspmv7d3ey32x0cqqlgnjhaufej4wezxfcu9sxrh7zy',
      rewards: '115984373391199529',
      mid_rewards: '17748555032103974527'
    },
    {
      address: 'erd15nj9w3gjjm3utfdffttv40nxp7pcu60jv8kmfdhcf9u7f92lz4kq4yqlu0',
      rewards: '115286640926473075',
      mid_rewards: '17695925952109237161'
    },
    {
      address: 'erd1wx6cne8yvsuhtw6jjtc4vm52474d5k2xk0a7e2mgrsyhwg6wtcds9t7yxh',
      rewards: '115043884725481685',
      mid_rewards: '17677615157976699195'
    },
    {
      address: 'erd195vjg8s57jfdyyk7pmpqk96mf2zj2pnm2cps86c3zhpvlekxsfrqw5fk0f',
      rewards: '114559898015599674',
      mid_rewards: '17641108650742932580'
    },
    {
      address: 'erd1n7mg2nxwm0zawmtpsn9cxdrmuge9k76fdyd6texjdw92h5z9c7aqfdknr6',
      rewards: '114345949348880268',
      mid_rewards: '17624970772595099120'
    },
    {
      address: 'erd15e3nvsza3h9magjz4y964e4gq0s9y73fjveglk80l43qwukgekvsd8fr8n',
      rewards: '113777188965465525',
      mid_rewards: '17582069894063802216'
    },
    {
      address: 'erd1nv3d0heuf3da2ymuqwxn77w20ptvmv6dcjrl0yqyrr3sf2q35wys3992kp',
      rewards: '113636380936684647',
      mid_rewards: '17571448922007535013'
    },
    {
      address: 'erd1lxsjzq68ke45hx7sq72e40k6l2m7t9gta7mff4phpt47je0lww2qew2ky9',
      rewards: '113380215718929912',
      mid_rewards: '17552126702648903362'
    },
    {
      address: 'erd150s4kzlhd0rt7zttn8zg37ay49zqau085fagcemt3a302mp268vslr3wn6',
      rewards: '112856448537409599',
      mid_rewards: '17512619604601433708'
    },
    {
      address: 'erd1uea2j2xa6jjtgn9m8ke0la3v6v3tm3medqm2e9s3spclv7f7emfsu3sn3w',
      rewards: '111834505172879317',
      mid_rewards: '17435535705254652915'
    },
    {
      address: 'erd1966gqle752ykfrf440g3rlw73ejd3mulhjclv029z6z2wd2upl5qez5tdc',
      rewards: '111712139176918549',
      mid_rewards: '17426305792479159841'
    },
    {
      address: 'erd1r2z4f80qltzv86t943h2746zw0akqpyz4wt9m53wamved8zkg67qnwxfqm',
      rewards: '110987351252539647',
      mid_rewards: '17371635953278956356'
    },
    {
      address: 'erd1gnlmfpraj5kztf5r6atqjq3t96amtzes2a6r6e5sqfw4tft62zmqh72mu9',
      rewards: '110837643473312928',
      mid_rewards: '17360343684268876066'
    },
    {
      address: 'erd1ccng7ez3t3p6m8839rc63l5gdvnl0r88kzhz4p3egey4kexqz8asz2e2w2',
      rewards: '109406953793387568',
      mid_rewards: '17252428565768611471'
    },
    {
      address: 'erd1xswt89l7nnqrxq5w6rfdszmztquah0qfpn93mw4ka5zd0euev3pqs2yx29',
      rewards: '109393725893366384',
      mid_rewards: '17251430801949996245'
    },
    {
      address: 'erd1ew9wm5fqj9vklrquc45mkfcl5anyykvnm8zapl40zhj4hfvymk0ssjnsh5',
      rewards: '108985951722430859',
      mid_rewards: '17220672910427251703'
    },
    {
      address: 'erd1fjthl9cehcpntqsmjlh2c8gr98pj09uuadqqjp9d4x9d6sfvlnuq2p8v4u',
      rewards: '107881675660553537',
      mid_rewards: '17137378759538630072'
    },
    {
      address: 'erd12dk8wvyza7ky5fyu8qveukqaj049d3c062wd0e7tnhct67fqvlcqzrppv0',
      rewards: '107730081483677753',
      mid_rewards: '17125944201932571310'
    },
    {
      address: 'erd1hqhddlp4d7nt0ythwkdyuu2xsm0sn0fl45zajw58r6786fwcnrvs23drjk',
      rewards: '107696615873245049',
      mid_rewards: '17123419933136757144'
    },
    {
      address: 'erd1j2lqsumqt2a7qv6llu827tgs6am58py3wmytyangjd9vrqdtdy7qyqxhkp',
      rewards: '107406835729719082',
      mid_rewards: '17101562182314608295'
    },
    {
      address: 'erd1z6ddsds23an06cgn5g846nf7umvctp364vs5xzk5dwhrh338ekqslpqulk',
      rewards: '107244831906302513',
      mid_rewards: '17089342438196228224'
    },
    {
      address: 'erd168tcf4w5tpck88dct62rzpmkk2lu0ju8hwq4mzwq8dlacfdnpqssywf4fu',
      rewards: '107185087051634911',
      mid_rewards: '17084835959145109522'
    },
    {
      address: 'erd1va88c0ekzsm7s0hmek95rw0sdlw37e2z6ay8e8eqat3zhwh7nhnq3zyg3m',
      rewards: '107036006418524810',
      mid_rewards: '17073590994975793404'
    },
    {
      address: 'erd1jlhmfzlmlp002r6y4wdlgaatcsa9crej5846hw7sxz2mqyna4szsj69ldz',
      rewards: '106433256990927060',
      mid_rewards: '17028126365700931139'
    },
    {
      address: 'erd1pfs8xwfaypzyc8sm3dyufxamawhj7se68zdpw5njw9ppwgz7qfdqept4zn',
      rewards: '106281600982033244',
      mid_rewards: '17016687144183720531'
    },
    {
      address: 'erd12rg85akg6m6zn5zt6xulema2qqkt2r766ne2zkpld8z093qd6q9s5f33w4',
      rewards: '106260208036542527',
      mid_rewards: '17015073501281214330'
    },
    {
      address: 'erd1xtngp9tr4j37jl7vazd87knvggz6rch9dzfthcn5klhpwxn3ykeqa9dltz',
      rewards: '106087352619977716',
      mid_rewards: '17002035235175193802'
    },
    {
      address: 'erd1zavzcgnzcdluans08gycd9lmaef8dsqnjwy8y0grdujh4r3zu4yql4rftg',
      rewards: '105700933296049343',
      mid_rewards: '16972888112834381193'
    },
    {
      address: 'erd1kgk69mfpt2rt8mhemwxp692x97qfa8q5eal4qkpzrgfccy5e0yhsuyttle',
      rewards: '105636067187436835',
      mid_rewards: '16967995344055944886'
    },
    {
      address: 'erd19fenw4c54f3snujuagthxasq6v66h07h9z7fmm8tgdvarl4qpkqq82fjwf',
      rewards: '105576893189531767',
      mid_rewards: '16963531924010590975'
    },
    {
      address: 'erd1wxqrmumkan3cpldpadryzg9jsg3utnvzlcw6vc85kgct83gs0k8qtm7ww0',
      rewards: '105472590124422705',
      mid_rewards: '16955664475332431456'
    },
    {
      address: 'erd1xvnvmkm9jr2dft66y0w8smqxrj889v2v0mglw9gx5qwgxztcdzesj2g5rx',
      rewards: '105345296020234656',
      mid_rewards: '16946062841567550310'
    },
    {
      address: 'erd1qw5g0pxxp9xkgndrntmey6j9mshmanqpr6uvvz0llr3s2drh35mqmqk7r5',
      rewards: '105287677833468375',
      mid_rewards: '16941716774394564214'
    },
    {
      address: 'erd1sn8ty9qf4mkkk6ytsdl5uklhe9mjg998xz7kncd5aj6y0wxcftys02r6rs',
      rewards: '104217973749014876',
      mid_rewards: '16861030344168801472'
    },
    {
      address: 'erd1na8u0m343avhysk70n9new7tzrywrpcgyxnrgp7kerf0xytttg0q36rhgs',
      rewards: '103810462865632069',
      mid_rewards: '16830292312094160792'
    },
    {
      address: 'erd1chnsnuy4jfzg2a77cf2xqxua62shqm9zual2jzqw6ldv0z87sddqw0w8fk',
      rewards: '102848151355404278',
      mid_rewards: '16757706368323448428'
    },
    {
      address: 'erd1e539pyctu08m685uwn4g90nmalat59ke59lydg8gufg2nnrxpd2q96r3n5',
      rewards: '102828157586639503',
      mid_rewards: '16756198263557060411'
    },
    {
      address: 'erd1lhzfqylmcdlvyfasdx5n2hp2hqx3qpe00skxshpm7y3khdzt5j8qrftl39',
      rewards: '102378071397007031',
      mid_rewards: '16722248829818183673'
    },
    {
      address: 'erd1my48xjw749c8dx40a3dlezsnymr4p3v637u9uvvpk8yc4pecvv6sxcsuaa',
      rewards: '102217060583804801',
      mid_rewards: '16710103987208115284'
    },
    {
      address: 'erd1ngd3dn7lssu5g4mg3mdyhh5n4rsu9p27klwnasge0lczmx9h8n0qxq8azj',
      rewards: '102105891006308927',
      mid_rewards: '16701718606159083410'
    },
    {
      address: 'erd1y28qvcr029p2gmvpy47n3n279nkn72quplmlwauu48z8yv4xy98quyzjtv',
      rewards: '102019186402531412',
      mid_rewards: '16695178587228033899'
    },
    {
      address: 'erd1r7hs8mmpfj5c05xkk8hvmx2myw579uhe7j9u3nvgjpjjj3vnu3lsnfs6lp',
      rewards: '102012426590293911',
      mid_rewards: '16694668703114878405'
    },
    {
      address: 'erd1em43dka2hhp3j22pyg2ca67j88jccmewt94wgr04l2w406rwc6lqe8e7fw',
      rewards: '101830852769614276',
      mid_rewards: '16680972818780121153'
    },
    {
      address: 'erd10sgrwn0xdqzh7derz2dsr8cu5gqgdclxcfhrapj5jwysypqmpdrs3040dx',
      rewards: '101755726301325437',
      mid_rewards: '16675306124009303072'
    },
    {
      address: 'erd1xxzl3tfaw4cf3yx67nf0wfqjd92z5uuqr55xcfhkj2al8v7a0rasqyxy3f',
      rewards: '101457273507306923',
      mid_rewards: '16652794206096451916'
    },
    {
      address: 'erd179uxqk9pruar34meqnkyngne48uex02nndfe6eefvu4rtplwv0uswahj4h',
      rewards: '100947104120740636',
      mid_rewards: '16614312772575955416'
    },
    {
      address: 'erd1gmrkehmv627cax8lzpnvatazyg6ursc7gvq2rgxxdnx2h5ltm7nszzl506',
      rewards: '100834071257567511',
      mid_rewards: '16605786846237835500'
    },
    {
      address: 'erd1q6ceanwwxcv4u6whk9zk5zgpv9gklkhrsjn3h3ylgfh2n7n8aw5qdpf5rl',
      rewards: '100426180084758188',
      mid_rewards: '16575020129411286208'
    },
    {
      address: 'erd107q86htrkz8azx29405jkxhf7rxyjxw4tmlh9qyluv7udth7zhds6fpfem',
      rewards: '100354056855786902',
      mid_rewards: '16569579965195197014'
    },
    {
      address: 'erd1xzdl7az9e6yuhhuvqqcjgsvtpmpce4ereytclkswv0ynu3kcd3cqxmayd9',
      rewards: '100115570032146487',
      mid_rewards: '16551591204812687112'
    },
    {
      address: 'erd1xf7zzreuq5p8tdyjgjhu6z3ppuy4ernplnxmkucezwug7uum6aeq80nem3',
      rewards: '99449972230561952',
      mid_rewards: '16501386001937904362'
    },
    {
      address: 'erd1hja06xwg73enrfwwsgcgzd5umaq7auflmsheuse009e3c2flu4eslxfj90',
      rewards: '98787541364721499',
      mid_rewards: '16451419677032887329'
    },
    {
      address: 'erd16l70ceg7yp4rn0xgdhy2cnjrxl0a2pdqge8hppcfqs2rh6ssl7zsaxegcc',
      rewards: '98714452646076093',
      mid_rewards: '16445906687148132602'
    },
    {
      address: 'erd1cuqxqgplzgkx07fnuaud4hn5gzk65xpuwkjwlypt5xk5vngq9mwsen8w8n',
      rewards: '98578988327452888',
      mid_rewards: '16435688784410801449'
    },
    {
      address: 'erd12q5xycu4f4kyytfmfhccdcr26e8v3ju29y5rcxwvcuhxh0vsk68qwhxnq8',
      rewards: '97881748953146839',
      mid_rewards: '16383096897604703094'
    },
    {
      address: 'erd1eahkervaq8ts6p8yx9w8uuxjgezlftvqnn26j2l02hn5f9jtay6qez6xvg',
      rewards: '97682481218578677',
      mid_rewards: '16368066383656825626'
    },
    {
      address: 'erd18cdjw6s32ar3nuktld2wagd38petg3scpxkzc298szetexr6sq9qyvq8aw',
      rewards: '97090954599969651',
      mid_rewards: '16323448276712359404'
    },
    {
      address: 'erd1fn99h3mrlzzf4ct7u9dr6kh7qgcxwhm2xtv7aw78wayv3u4g9jxqd26dz9',
      rewards: '97089817072157694',
      mid_rewards: '16323362474423891726'
    },
    {
      address: 'erd1jmr2hchupgqrjcwhl0frwut3mp59jeapc08pn5knm5vh2s47jdeqt2n85j',
      rewards: '96680479219675943',
      mid_rewards: '16292486636373870592'
    },
    {
      address: 'erd1s7thzxc384pskj2z08gq7nmnlufqsvhel02k9k279fp7f2r6gc5sqjmkdv',
      rewards: '96434076102123131',
      mid_rewards: '16273900759923756278'
    },
    {
      address: 'erd17ehpvsh93zqlj8ata64l9v0xhzeqspnuvxa2ydwspafshyqy333q3hw9zx',
      rewards: '96000628516269757',
      mid_rewards: '16241206355087159724'
    },
    {
      address: 'erd1vkvcrsdt2tqzcrycgd0u5aw0q9jqvxsa7kjdklwynhrfq7cyrvasp0uqnw',
      rewards: '95628188949160226',
      mid_rewards: '16213113708175140954'
    },
    {
      address: 'erd1zhx9jp8286qp4zlw5pf4zeys7xgfvtrmyurrxa2hpqt8fe4wgyxqu2wu5v',
      rewards: '95449012885533691',
      mid_rewards: '16199598683631399761'
    },
    {
      address: 'erd1jpfyls6etyvmraeq9y782y4qsff4ldy7q0g92de93z3aax9egdlscg2jes',
      rewards: '95097920300985901',
      mid_rewards: '16173116212696112399'
    },
    {
      address: 'erd1j3fx42h6qg8yds94yus2jcs8zmqsmrdp7ldgkzragu2eyc2ufklqlyvyva',
      rewards: '94424092629996698',
      mid_rewards: '16122290241149752468'
    },
    {
      address: 'erd13w6e509q8uj9mvwy3rp7660cyu0nn36ldtxjxgjqzlu0wh7wut5s7ulw9z',
      rewards: '94060467133860583',
      mid_rewards: '16094862428496980996'
    },
    {
      address: 'erd1ggmw6yu83fr94a50fa4dgmm5urwnma8730vk2etq56vhgqzk4lyqrzmfuv',
      rewards: '93822363568102807',
      mid_rewards: '16076902576773281931'
    },
    {
      address: 'erd12csgx5h6ngamekk0r7ngwmsy3lvjdfz43ygaknh9ujvuk37pxspqyym8e2',
      rewards: '93587338353367617',
      mid_rewards: '16059174921185508799'
    },
    {
      address: 'erd1u94mykq37twmpw3066dlshdxht9ujjlqtet50hakxdwnahx6jm5sgy0qmn',
      rewards: '92880524610078965',
      mid_rewards: '16005860851800043014'
    },
    {
      address: 'erd1w9fpxcqfprj42t8u24tej2zhsfr3va09r9cgzral7fuk4tr5fddq3mcqnh',
      rewards: '92476114191901047',
      mid_rewards: '15975356683906214066'
    },
    {
      address: 'erd1y8x3gjzsympkc5f9d8tgl7avltwmmre0nteppchpmrn69zkdt94sn2wdn5',
      rewards: '92381898233132476',
      mid_rewards: '15968250092939781137'
    },
    {
      address: 'erd10ha20ntv4p8lg5w5asktsh3ff57rnxjr37f5k7hlxhlmcdk7y36spr7e7h',
      rewards: '92079851628948183',
      mid_rewards: '15945467098457811421'
    },
    {
      address: 'erd19gyu2qrent8x8m86psgz2sjxryp8pf8sytjx076xkjljyl3e3pns67eade',
      rewards: '92033125172558739',
      mid_rewards: '15941942580773006870'
    },
    {
      address: 'erd1khn6d5v2z6grc69a269xyf6jrj223jxkfk6upltcha33vrckgujs6jqfes',
      rewards: '91701786113144799',
      mid_rewards: '15916950093329966821'
    },
    {
      address: 'erd170clk9tmqkmleqcx9yqex6mvjlg5hgwtyxu6d5kwfuxdwr7xqc2qg4k3j8',
      rewards: '91198516298893761',
      mid_rewards: '15878989085849057106'
    },
    {
      address: 'erd1hyelnh9fle2a7zpcsgwq50hu4muexhpxfc6mtxxzcejh96l0gpvs5wzdvw',
      rewards: '91074881868357720',
      mid_rewards: '15869663496653008905'
    },
    {
      address: 'erd1ewe6vsewyt9c90n3vnq5f0lhvu55t8egxxz8wxtzhht3qa7m85dqkgpnh8',
      rewards: '90891041183306435',
      mid_rewards: '15855796625597145647'
    },
    {
      address: 'erd16u83a5dak4uqsgwckc05z96q5qhels2ym9dl5dvmhva8y887pdxqdnxsw0',
      rewards: '90657656256191421',
      mid_rewards: '15838192694836209209'
    },
    {
      address: 'erd13cjhwt4gtynmflwy0g5j4gew9z5wss3y0hdpd3trp7eflzd3c67qsaqdhq',
      rewards: '90445284205359295',
      mid_rewards: '15822173738836688231'
    },
    {
      address: 'erd16hjls4v6r9wnff268yze9qjd8h4hrfrsc95x8px258eh4antkt8qy87lrm',
      rewards: '89926482749602001',
      mid_rewards: '15783041199221892789'
    },
    {
      address: 'erd1fa52pz6njvayg47r6ewmwn7grmf8ngssuzevw2kwwsmdu0sqw66satenpy',
      rewards: '89799021545434779',
      mid_rewards: '15773426961316290654'
    },
    {
      address: 'erd1ywaj43pc0gmhruty8a30f0zgjsl9uyrqg72cqmdzc9tcyc9d76jqzss59r',
      rewards: '89667591862321574',
      mid_rewards: '15763513386047925196'
    },
    {
      address: 'erd14cfnm4h6dmw09m9j0w6sq2nfwclw3t3q7kk9yn7xf5kymgu0jt4sprxzfa',
      rewards: '89649812665601932',
      mid_rewards: '15762172323658393052'
    },
    {
      address: 'erd1qyvvlgft94vxe2kflunrw87thkn9f27ychy0jhvzh0z0klm527psxs3yyc',
      rewards: '89596997648204272',
      mid_rewards: '15758188553494230434'
    },
    {
      address: 'erd18qd0eg2693x2u788p5f9qufwy7zl5ls4ud43ze98yjsadfl7vyaqhk09av',
      rewards: '88868299050157081',
      mid_rewards: '15703223737110469373'
    },
    {
      address: 'erd1tgym0lmv7mcklgeqsz0sxxy0z7s5k4cehwd30cll8x5hz4rcpzaq6hyvku',
      rewards: '88653261567739700',
      mid_rewards: '15687003730967501391'
    },
    {
      address: 'erd1gca7gjjkx0h2fpj40s46t7866k8sqed57p35z4rljhxn20ftjuyqd8n6zm',
      rewards: '88588332737245870',
      mid_rewards: '15682106231156647365'
    },
    {
      address: 'erd13p3qjv83nvrwqtxg7l2gal4e2dqj2cwj9wg9rp0lac96dva36xnqmkxs7u',
      rewards: '88474286740858308',
      mid_rewards: '15673503885457692872'
    },
    {
      address: 'erd16t7m6q007807khvlqtfxyg4pmsrnsuyylwrasp3lqsun7cczlvzs75n9jf',
      rewards: '88126848155972900',
      mid_rewards: '15647297031109355696'
    },
    {
      address: 'erd12ggcu7qjfhkqupyhnd3vzy3g5usrd2gxd94lzhc3ypz6y8smc4fsulyhrv',
      rewards: '88126848155972900',
      mid_rewards: '15647297031109355696'
    },
    {
      address: 'erd13j2q0c682hss3zdv83vq6g0hws68tqedpnz0p5kma2dcz03ylsgs589gc5',
      rewards: '87988001384040608',
      mid_rewards: '15636823994184091644'
    },
    {
      address: 'erd126ykekev9akmw4xr243ejq6tgr4kn68dk7srxem3j04lt08gqq5szypf00',
      rewards: '87976089337115330',
      mid_rewards: '15635925483505249567'
    },
    {
      address: 'erd1zxudyszzzapq36aduzcpz4exzxw0ceuu9pstz9hacarulpd9j6cs8mwfcw',
      rewards: '87863227790802401',
      mid_rewards: '15627412479381868846'
    },
    {
      address: 'erd1dxd6zak6292jcrj0yd2trnxfetfc0q3cuk69r4xh2yj34c5dfreq66x4xc',
      rewards: '87775388037799196',
      mid_rewards: '15620786837576114451'
    },
    {
      address: 'erd1kyw35937zw4jjr0e6pd23xhfpa0dseq35jgctrwz76a9aax8kh9q2kccrq',
      rewards: '87729899327855247',
      mid_rewards: '15617355681544932677'
    },
    {
      address: 'erd10y0lmy2s5hyt8en3cz62ekghexmdwj4vtf7ddnqtq39m269d2z3q4t0ccj',
      rewards: '87719192657518486',
      mid_rewards: '15616548090902218940'
    },
    {
      address: 'erd1x6xzhze4rjagk2lrhzse0fywels2a7faa568gs3apw2h2gg0n3ms8egll7',
      rewards: '87468269980701650',
      mid_rewards: '15597621309795847119'
    },
    {
      address: 'erd1yz28mmcv2d52m9wyj2huvdplysvg2njhua6qcs48ekmnal3r86qsap0s8t',
      rewards: '86948410075519724',
      mid_rewards: '15558408932675624463'
    },
    {
      address: 'erd1ng8jhz7s96ncxvxz87ea5rsn4r33rxxufmt9jq9xd0j9cx6f57vsmktfmp',
      rewards: '86895702370628950',
      mid_rewards: '15554433256958538424'
    },
    {
      address: 'erd17qlaa7yuw2esl7t9suly24tjn47szjmje3celmns6dvcctkuxj5sf0h04k',
      rewards: '86819929765850812',
      mid_rewards: '15548717824927091131'
    },
    {
      address: 'erd1c6g4qc3kdlcjegxprll5ajfqtqydmyrtkkh0sksw5rn78q3jr2ps4cd2kq',
      rewards: '86688945837308647',
      mid_rewards: '15538837872363936160'
    },
    {
      address: 'erd1w3jakjhm0vzptnllz58xxtqs2qe8m4n6y3nykwa746gs64feaquqqhmp8x',
      rewards: '86655603955341167',
      mid_rewards: '15536322936250235980'
    },
    {
      address: 'erd1dr06dx3v08xtgx6elswac2sqpqfjf9wgery60cyzl36d4a3n7v5sql9udf',
      rewards: '86611819366258189',
      mid_rewards: '15533020319906752276'
    },
    {
      address: 'erd1309n4n4r3yv3539zlrq0mz3kwkhe8e9nfcmck5a5djztjmva45jsnkau63',
      rewards: '86393984526357029',
      mid_rewards: '15516589312616166202'
    },
    {
      address: 'erd1wa0heghe4f0mt7umrp7c5nq806yrv6z72uwykecxew5fk3c8kvtq4k5pwg',
      rewards: '85117839456399711',
      mid_rewards: '15420331299169702311'
    },
    {
      address: 'erd1mvm3s6psg268zwykf0a9xa0zkjmk3lelp5eqd5c0fzmae2u3ammssr9cmr',
      rewards: '84870005670753412',
      mid_rewards: '15401637509229325558'
    },
    {
      address: 'erd1zpwxh3qp5pgg9jl4v9h5sxqfad77crvffpqgnkjkmrx9mdxrma7s3u0vsd',
      rewards: '84833761044987602',
      mid_rewards: '15398903622811189665'
    },
    {
      address: 'erd10u3s2udnx3fskkdnyggy9kcttsypxkejskwehy2je3z6rx08vksstmtvkm',
      rewards: '84763693315779637',
      mid_rewards: '15393618502350324612'
    },
    {
      address: 'erd13my70vz76pxemahn3ystspxfjwexvdrs25f5kv3lne2wy54yarhs4xus3p',
      rewards: '84688558809730079',
      mid_rewards: '15387951201301350871'
    },
    {
      address: 'erd1zfg0ea9v9p3darnl62lla9n60llvvt6ghqj7mg9qd653rm72wqqq8nct55',
      rewards: '84500024921077345',
      mid_rewards: '15373730327815818406'
    },
    {
      address: 'erd1sh3h77j70agvtgc8p0g4cdcf3g9yz56zjkh9eyx0msxlyjulg40s47nj2y',
      rewards: '84406935891373381',
      mid_rewards: '15366708739687705246'
    },
    {
      address: 'erd10w4w8x2f70a2pxwtftspwl9r7rdh0q7cnhktzfve49rcm98x4rcsnnvkcq',
      rewards: '83683504752674112',
      mid_rewards: '15312141241120450686'
    },
    {
      address: 'erd1kq8xx8f8da35w7pqjvvqseghr2tlx4vh4de0pg32ef9phg9xl3ds76hxzl',
      rewards: '83111388687301311',
      mid_rewards: '15268987247730471135'
    },
    {
      address: 'erd10twtldyg98g58yzqwnspg7xedmqpurk9vr9nw49r9cumx5dkd88s2ggk8m',
      rewards: '82816371089812687',
      mid_rewards: '15246734442360190438'
    },
    {
      address: 'erd1vwr8kydpsl3ut0rm8eqw6a20qyjqr4dz2g6ggwqz2l0mru85p3ls2n372l',
      rewards: '81504064679721430',
      mid_rewards: '15147748824625782016'
    },
    {
      address: 'erd16u8ptpc29887dpfx66fas93p2ngyweyhdstnjvsvx5ru0q3l3rcsqcxwg4',
      rewards: '81498902082630696',
      mid_rewards: '15147359416437107064'
    },
    {
      address: 'erd1dnmvp538u4cgexuk6fns5gyythqwk0uv38as6xdjk3nfjrg8jkzsk9w72d',
      rewards: '81190775916718381',
      mid_rewards: '15124117848280136495'
    },
    {
      address: 'erd1f0w8r7cx2r9lfpygjf73wwar59mgtlws7sm6rm54dlp797yfmnxqssn53v',
      rewards: '79954517989736034',
      mid_rewards: '15030868471731791249'
    },
    {
      address: 'erd1e8vhv03r2cnuzs7yw5spgy0kjhq446tn2z844g49hl6vqmxng26qr3s8l6',
      rewards: '79908578724441976',
      mid_rewards: '15027403330878687451'
    },
    {
      address: 'erd15yxcm35aa54gp4wffstxxh33gfkwukdsgauk4mss8jx2r0klqs6qvynupc',
      rewards: '79893527413560132',
      mid_rewards: '15026268029478118701'
    },
    {
      address: 'erd1g5zr9egshwa4k2u7u57ymlp94kec76au9vwqnkhlspxum8rj0ulskzmkph',
      rewards: '79325221433497006',
      mid_rewards: '14983401426018645356'
    },
    {
      address: 'erd1e55h6mfcnmg287yxw554c9wp2e4gmc0vhrttkw9uh0lj2mz9v4zqh3lrd3',
      rewards: '78886905242551406',
      mid_rewards: '14950339788439106271'
    },
    {
      address: 'erd1tq8s7xkn40hq4m6lga3tt8qrxqpapmrx536fu0vzc4p3c2amw3wsvn35wr',
      rewards: '78637057969859917',
      mid_rewards: '14931494123709857229'
    },
    {
      address: 'erd175thenxqnydpz2w8rt3ewegx5zpc8yl64dntmanc9pkce5ujkawsqyzj3v',
      rewards: '78590430109328126',
      mid_rewards: '14927977042986269042'
    },
    {
      address: 'erd16kcn62xaq32cf9wv9sj9gkkp43np2e88vmke7tzh35xqg4gvzllslr0jd0',
      rewards: '78244402627560417',
      mid_rewards: '14901876626366741460'
    },
    {
      address: 'erd1g0euwj9qze05vxunu394r279cyy0x8lz8358r3xn2qdcj86z5mxs64zajk',
      rewards: '78237723595572726',
      mid_rewards: '14901372835405967678'
    },
    {
      address: 'erd18f3a97wmlfezpkhj27thql40vp9vdjpdlejfczpemeau2muxjp5s4n26u7',
      rewards: '77808963651693675',
      mid_rewards: '14869032013492519260'
    },
    {
      address: 'erd1qq2y9ymalfwrwzm90slxq6n3djk70dlt35dxf769xdxuer8vtuvq735r2n',
      rewards: '77693164376764807',
      mid_rewards: '14860297420204025378'
    },
    {
      address: 'erd1hmyqwh7cn0xd5tkfydey2p448tc47pfh40rhdj7s25n2fjpz022qv6h30f',
      rewards: '77613119280556071',
      mid_rewards: '14854259719531450820'
    },
    {
      address: 'erd1y3kj4rr26zavxns89q95yxtw4gpuedtyuu3vxu2kn9sgrzzut98s47e96x',
      rewards: '77492384436868550',
      mid_rewards: '14845152842515094982'
    },
    {
      address: 'erd1vtykady9k6zt75zdwwztmn7tmjsfvemc28hf26s00e6gxqvrve8s57s7f8',
      rewards: '77391093007355136',
      mid_rewards: '14837512557712333602'
    },
    {
      address: 'erd17c8f2hvxp35w56qwzxk33u5nrfzmp7jkrvqgg9zg0w7hc8uvq06sn4np8p',
      rewards: '77346064958926986',
      mid_rewards: '14834116148798408279'
    },
    {
      address: 'erd1zakz28v6ektrf0ggtlf2mz0euupkgp4xf3ucw9xn3kcdcmehnx3qryl8lt',
      rewards: '77221275518809764',
      mid_rewards: '14824703438686083817'
    },
    {
      address: 'erd1ah6hmc632609aup4ljul4ldladnx69cl2cawf3yk49j3ca58jr5qhuhr2v',
      rewards: '77199710680701661',
      mid_rewards: '14823076830140199592'
    },
    {
      address: 'erd158247edj7jgtl53vw0hc2v49dqelcdus6mnqxgllyrs2js0lemqscaqvhg',
      rewards: '76812865976714581',
      mid_rewards: '14793897621917950128'
    },
    {
      address: 'erd13f00l8dfvdtsny82jnf242drfams3u30a67rwn9n03c6jlp5sfxs30zvaw',
      rewards: '76659109299125039',
      mid_rewards: '14782299949609900731'
    },
    {
      address: 'erd1pu6v3jdxwuxjrgf6rgq2l87y4t93lu5z6qrgq3kz0t7mmyssv0esy2wzpf',
      rewards: '76659109299125039',
      mid_rewards: '14782299949609900731'
    },
    {
      address: 'erd1xl3lhs4d90380nsv26znpgum67g69llyc3u2z3u3pxr2m0aqdy7quy4jsd',
      rewards: '76084298611196688',
      mid_rewards: '14738942704238393757'
    },
    {
      address: 'erd1dh2rrsnpqwknu5vukt5hx38vy37m23hlwfzg5nndqw7qema42rjq60fljr',
      rewards: '75798771492321534',
      mid_rewards: '14717405753702720013'
    },
    {
      address: 'erd1y2kl9p9sr9zuxhujmey9ghhrunpkq7tvmfsftn4tem3cdnxuss7syfnv00',
      rewards: '75704765502140678',
      mid_rewards: '14710315000402094374'
    },
    {
      address: 'erd152mcd08jw9hvf2zs6yxzrx3lp2nz3jr4fgy273e889hyw92866pqm0w38a',
      rewards: '75704765502140678',
      mid_rewards: '14710315000402094374'
    },
    {
      address: 'erd1h6v2f82gsy3qguvjxg4yvx5hd94llgvtpfcj2xyr4z9tp30yc3ssjpex3h',
      rewards: '75704765502140678',
      mid_rewards: '14710315000402094374'
    },
    {
      address: 'erd14u6hkudrcjdlmnuav0p5647rvmuw9agawx9u3q8ep25qp0p0mgqs8xsau4',
      rewards: '75704765502140678',
      mid_rewards: '14710315000402094374'
    },
    {
      address: 'erd1juu5aamkp38fgvqatel0dd2fzxau0t0x2wu2vqvzzca6tp7mslms4rwam2',
      rewards: '75478637162477044',
      mid_rewards: '14693258424882277772'
    },
    {
      address: 'erd18h3waqtqtqrtpyzrkvwugv42p4xrw5nxe993s923cyyy24fy24nqcf6qqz',
      rewards: '75469230582500483',
      mid_rewards: '14692548898416059217'
    },
    {
      address: 'erd1dz7jjtccyg52jvxrk2jkew2n0c9y2rddsh0rfglqe7vlrej7fgmsswnure',
      rewards: '75287334421718519',
      mid_rewards: '14678828700373844428'
    },
    {
      address: 'erd1hd00nqcgh4u05a4cf7ah5fnp4pzy35hsdye6qlz7qgfaxgat0gzqu9ytqg',
      rewards: '75227598787637435',
      mid_rewards: '14674322916819939897'
    },
    {
      address: 'erd1flrxxk7s2tj2uzera308f4t3vlgxdx3mmg4y058yhl67nm88nvfqy7qnk3',
      rewards: '75121487615503035',
      mid_rewards: '14666319084908827519'
    },
    {
      address: 'erd15ldtzkrvvkmaruh2c7e9wzlt023c6zrr5fk4vqh8aj948f5c2hps608pm4',
      rewards: '75018937927165055',
      mid_rewards: '14658583891229555528'
    },
    {
      address: 'erd1lpx0zplyr7jnc8xl4d9dnf7lukpjruz939jmh77dczu77jh5yx8qx538fq',
      rewards: '74555069829992775',
      mid_rewards: '14623594905583520514'
    },
    {
      address: 'erd1eh3q566p6ewfst5rcf3xj4ms63jglq4mrpyz3ygxsxpgh0248tgqu8xlqw',
      rewards: '74396587191419528',
      mid_rewards: '14611640759997764411'
    },
    {
      address: 'erd18u4npwf697vas4sxd299u525x5whgccwn89kau8yy4xzqsfj0ntqcs3m4w',
      rewards: '74095393361230691',
      mid_rewards: '14588922089182949672'
    },
    {
      address: 'erd196ccy2ez0d8y8eeugeswzl9k2ddl2ms0pe27z35w8mpua34uytwqstehsr',
      rewards: '73498628986793496',
      mid_rewards: '14543908904921016676'
    },
    {
      address: 'erd1s33ftrh0l8jh2uh6l4r03l3r5zvnghh8lg0kf6n42kj49xdwcyzqjvq90c',
      rewards: '73408350239949085',
      mid_rewards: '14537099292885317732'
    },
    {
      address: 'erd1yh4v3sapg2gun8xnvw50e5m78yexh3zgsyum2n8pqane9xlgw0cq3ywe7h',
      rewards: '73192923289267494',
      mid_rewards: '14520849909642288116'
    },
    {
      address: 'erd16z7yxwxfj0pmmyyjpjrn82u67jc46n73hm29cjnvg26p4e84498qnvnhhj',
      rewards: '72956473730541327',
      mid_rewards: '14503014817583330373'
    },
    {
      address: 'erd1z4jl4ztt9ddklw5gstul7tcd2jeencfw2y0zc4vaxmdla6c8zv7st9wju7',
      rewards: '72853266981797847',
      mid_rewards: '14495230062666204856'
    },
    {
      address: 'erd1775q7whz5cej49gf33gzjtpj4ful3k2rgfqg2saq5p0kprmf37gsk2nm30',
      rewards: '72799130823793945',
      mid_rewards: '14491146640532031833'
    },
    {
      address: 'erd1trvusfdamd67ksgf6jv3tqarsrja02zlelumwr4etxtsr7fwze0q5s5qea',
      rewards: '72790641946000263',
      mid_rewards: '14490506335184273086'
    },
    {
      address: 'erd1tzs4mee36ju2v6v6f5gq07uuz44xfuwq23wua9n6ggz6vsdkscqqkh60re',
      rewards: '72676574882055051',
      mid_rewards: '14481902400386010608'
    },
    {
      address: 'erd1x5078p607xwc0t36m42etlg8d0ue5kfsard3twjf0hrnhqx0vt6sse0dzt',
      rewards: '72487418112791107',
      mid_rewards: '14467634543801408224'
    },
    {
      address: 'erd1yfl3w8kqu5yetuv3fg6hxnkwxmxfrv4rzp0x7dr3u92glclzsqgsg8sq6y',
      rewards: '72404205190301695',
      mid_rewards: '14461357897987015604'
    },
    {
      address: 'erd1d3e27u5yvf5su6pgrts487w8mn5uanua5r0vu0darzmt5tdumsxsldj6xy',
      rewards: '72010638151542689',
      mid_rewards: '14431671632529581016'
    },
    {
      address: 'erd1r0st6nlj4hqr2yt27escf9pdvzsn2hzfjjnu8k3t5s02xmj7hkksu6h4t5',
      rewards: '71862686549976112',
      mid_rewards: '14420511829785918213'
    },
    {
      address: 'erd1cjt05shucy6zufwe4q4gd7knm9nt4l57rrvlga6hqzrnm0mv9m6shdnq8c',
      rewards: '71823741546661450',
      mid_rewards: '14417574257294367000'
    },
    {
      address: 'erd128662rl8lazjsx47664htdq98c235s09n9sq5zup55ueupnxjwmqd07kw8',
      rewards: '71724963577662238',
      mid_rewards: '14410123559648794030'
    },
    {
      address: 'erd1gsymm7s6cvawzqdcv5e8dtu9ekf7pnrfe4s7djq9nc8yjdkr8yhs7qlwgq',
      rewards: '71645760012292467',
      mid_rewards: '14404149334586257613'
    },
    {
      address: 'erd1rj2ud4amdrrdgly85j8gksj3zzjqh0jkhy5gfw5svsn46tue77aq3a26u8',
      rewards: '71553673712052920',
      mid_rewards: '14397203381077233836'
    },
    {
      address: 'erd13any39nttn6x3szt036dn2xxn6n75e5486l84mehsn5vhrs76zcsfecwdu',
      rewards: '71411136214392458',
      mid_rewards: '14386451957364187671'
    },
    {
      address: 'erd1v7wymhyusvpumalezsjj5zzryruage4kyqv8qneptgexd57kzz5q3sa8sx',
      rewards: '71326318239991477',
      mid_rewards: '14380054244508027417'
    },
    {
      address: 'erd1qwv7mw7setxgxzwryy9vhgkl9gq9xrlx6mxejef7cl6fa0jwp3lsq220tj',
      rewards: '70800666082653428',
      mid_rewards: '14340404965111523551'
    },
    {
      address: 'erd1kzf6a3numt6lw6qecx23n3uwc2ea2hz0sa6qlxc0a7zy99ys8mqsmlt0wp',
      rewards: '70349544832419293',
      mid_rewards: '14306377458056643552'
    },
    {
      address: 'erd1j4tsmht8dmrv4grysc354fgdlvks5mrg3gqnmm4mhvx6ytjcn0tq8jrn6s',
      rewards: '70238201926273755',
      mid_rewards: '14297979003046129718'
    },
    {
      address: 'erd1qa5vq70ljkg4y7xv4n7gj8ztvedt5jlwsfldc22ncnpfw0e9w7ussxs28p',
      rewards: '70215273140719135',
      mid_rewards: '14296249513664251280'
    },
    {
      address: 'erd1hxh8n0nxysx9c6zrwq5j73l6vzg50kr5fl8ux7sjrwn6jlhhdvasdu7j9l',
      rewards: '70084364193167969',
      mid_rewards: '14286375216822698596'
    },
    {
      address: 'erd18g8xvg7smadhxva44s96nhuxwvzd4nfqek3pxwktum2tpnuw8tfqq6gkk9',
      rewards: '69851228687320119',
      mid_rewards: '14268790099593431649'
    },
    {
      address: 'erd1gsmkhp7t5en3ju38s7numjjw0pkphr8tc07kyqq0wqe7nr7x03gstr36kj',
      rewards: '69823122094347923',
      mid_rewards: '14266670054727104330'
    },
    {
      address: 'erd14ykeklk2teu838l9k4kylfqcymwp4a4h9av3f8knpvw6ucv9efps4m3xpf',
      rewards: '69725007214721717',
      mid_rewards: '14259269373076801516'
    },
    {
      address: 'erd159fynn43r25qn7vm73d0ee84kpqenrgcgszz55dvr2p4vjqjj73sv96shu',
      rewards: '69283018263614399',
      mid_rewards: '14225930703829503756'
    },
    {
      address: 'erd1pf7qthjwxxgtnn66k0rt8438jpck3unjcr3jucnwtzhhncw03j4q7dcf0l',
      rewards: '69161158513124016',
      mid_rewards: '14216738976511481563'
    },
    {
      address: 'erd1kzqsz927u9smz4y7wqc7v3cc5w6n7m0zcveg59twt6y44x00wn6sun45pa',
      rewards: '68655471838560135',
      mid_rewards: '14178595668304762009'
    },
    {
      address: 'erd128mqcankj6ez6z8lrymrwleh3ls6thjtv23yhgqdavazwrn7xm6q7dlrf4',
      rewards: '68612775157366763',
      mid_rewards: '14175375111481572273'
    },
    {
      address: 'erd1fhnmc4lfckp5h6nptgnt9ajrqfmeygw7d8yrqgx6rvtagqwnszjszh559h',
      rewards: '68254441300533143',
      mid_rewards: '14148346440508790551'
    },
    {
      address: 'erd10av04zap5uura289ck7wstluzjgz9724nuk7p453c27yumf736uqxgvq05',
      rewards: '68204156399102602',
      mid_rewards: '14144553513801627848'
    },
    {
      address: 'erd1v3x80e3428g6sskjnkwce6dpn9gq8f3y0z3aetkhp32kc928lmhqhscd70',
      rewards: '68185258025214735',
      mid_rewards: '14143128033289545122'
    },
    {
      address: 'erd1mgzc33yn7q0lnzj2y3f7gjasun99nch68d7ycmt37hglv5knnefqrs5fll',
      rewards: '68140051756736507',
      mid_rewards: '14139718181461972520'
    },
    {
      address: 'erd1lz8ru23x46wjzrt3u4uf6c8uurw9x09a5q450wv9dujrwpk306ps7vgg3g',
      rewards: '68138154961777745',
      mid_rewards: '14139575108610034296'
    },
    {
      address: 'erd1qygn0y2ejqv6dxk976e42gg4vflx5zymjlhl98zknhn6zfypkjhqz98zpf',
      rewards: '68113931100386319',
      mid_rewards: '14137747933290837123'
    },
    {
      address: 'erd187yle94skajy47wnxun252z94g3khj65nrtkj2pxnzxcn6mc486qr97t6h',
      rewards: '67721988247101682',
      mid_rewards: '14108184178095685327'
    },
    {
      address: 'erd1lgz88zmlj4nrmxjnqmh3dsp7legjzeavmduj6pwpcchglqvf9lmqzzqx0w',
      rewards: '67631214192799576',
      mid_rewards: '14101337205643020204'
    },
    {
      address: 'erd1jj2qjunt3xa84znamfmwyyl7yry3akvp560sqnsl56cew68mpr6q6gz5rx',
      rewards: '67554681727957243',
      mid_rewards: '14095564458325091289'
    },
    {
      address: 'erd13djeym4gnx4ura9l9avjuh4ln8rf3dyyzt5a5qle4l2whykcz26q06x023',
      rewards: '67458207892992432',
      mid_rewards: '14088287558604289712'
    },
    {
      address: 'erd1e9hagfypwx8lu920aqlkhujuwtmxvgt0qsqqa6qws0evcw0hkn4qhl82y8',
      rewards: '67342437245615737',
      mid_rewards: '14079555124655957761'
    },
    {
      address: 'erd18zk4gampj3g6hr6xgs3tnae2uszuyjzz7qf50jxptgg2pnnvp6tqxexqj5',
      rewards: '66763946171510813',
      mid_rewards: '14035920272396007772'
    },
    {
      address: 'erd19m3tzmqw0jx8lgpygss4wu3xpxar00853aj6mlhn60exl2g06e0s7shfqs',
      rewards: '66530497466089295',
      mid_rewards: '14018311530917834257'
    },
    {
      address: 'erd1383kzapu64zd50zl5fsarmdsujgftdfe2q0vlzyzczkqsywrftksy6rkvq',
      rewards: '66468606898998409',
      mid_rewards: '14013643203484305847'
    },
    {
      address: 'erd1h9mrqkydsh4xa25jyyex26q9zn8ur672jf8rva3j7k0d857759rsffddtc',
      rewards: '66448013662729786',
      mid_rewards: '14012089881640013004'
    },
    {
      address: 'erd1x0jm8temk867prcy5uqpmshs5jdxk4lwx6qjhjpn96dxhz4y5dwq2vysrt',
      rewards: '66387059720991441',
      mid_rewards: '14007492202675770460'
    },
    {
      address: 'erd16352tg8qdpne92we9xzhryg4ze8tufuptdky5w4w43y99dcguggs7gwzpl',
      rewards: '66362787474555150',
      mid_rewards: '14005661377733651202'
    },
    {
      address: 'erd180hc58p2ddr628vgxx7cc38yrahq73new3u5pk8p52mp96la4vyspyczhr',
      rewards: '66117591725136089',
      mid_rewards: '13987166571539410950'
    },
    {
      address: 'erd1matsqw5m7yq0jsy4mphkwh0spd6tusc7trxu9xllk2ppx7dtq56s8uj6gz',
      rewards: '66076267587750158',
      mid_rewards: '13984049543964880173'
    },
    {
      address: 'erd10e93ttxyyteqlkmu4mdwu5sqrnmma93k2nhcvkwy9mk9uqf5640swx4962',
      rewards: '65702312001091497',
      mid_rewards: '13955842545609925423'
    },
    {
      address: 'erd1wuf4ngmtvpuv5hf7zr4ewpx7n3tgqgfpfzhyhcjhde5zy747pc4scsj8hf',
      rewards: '65640872110102892',
      mid_rewards: '13951208212106503105'
    },
    {
      address: 'erd12f6faajrfj499gcptu7wutkj6lce80s554m9ptlc30xa0pwqzfsstkc5nt',
      rewards: '65499270810573350',
      mid_rewards: '13940527404637954649'
    },
    {
      address: 'erd1ghzpe468vnwnpxalyahn99f4fc49h5ycq974t6q5s7qcnpflc7qs994slu',
      rewards: '65088080778615719',
      mid_rewards: '13909511859025610303'
    },
    {
      address: 'erd10nxtqfj6tr2cphr2q75un55ysfvdx2ngsg5c5q393d2u3g3fnjpqekrmp7',
      rewards: '65032596183152371',
      mid_rewards: '13905326725954210207'
    },
    {
      address: 'erd14re4g69vlrttkz5euczadu67t3777r84svm6fgtfs9mx68qf0aeqpw4we8',
      rewards: '64980790088499142',
      mid_rewards: '13901419057560438890'
    },
    {
      address: 'erd16tjxj0aajw34xwy33mgmq2sntzyyhcdhu0lyc5la4u0xxvew0r0qyj9czx',
      rewards: '64402493380051307',
      mid_rewards: '13857798866056913897'
    },
    {
      address: 'erd1z4tpedehmg24zc6svcj5fale02zj8g38mrn9d57accnxrt6kcgkqswyhxe',
      rewards: '63810752150055654',
      mid_rewards: '13813164571246172882'
    },
    {
      address: 'erd17fclrx69mm5xwfeeglyz9xtjypenjhzxg68rjsvrle3kz40cug2qpp46yh',
      rewards: '63271336875479702',
      mid_rewards: '13772477157271289431'
    },
    {
      address: 'erd1m7m6xvawssdqf5zdajgqe8gakv0z24ka04xjrtq9587p8z2nmwysteu6cn',
      rewards: '63177023008942208',
      mid_rewards: '13765363181245305381'
    },
    {
      address: 'erd1l875qa9m9g646h3z9jq53anxfeft5dwn2n6ten5lc079hhs3lk5qj73guz',
      rewards: '62833171520835914',
      mid_rewards: '13739426897083796001'
    },
    {
      address: 'erd17m0mywaytapqcvr480zqtd5fcf3nw4xk5ekfzuest78haeqht4ps0n9qgp',
      rewards: '62155919286625507',
      mid_rewards: '13688342615051931514'
    },
    {
      address: 'erd18ndpga9l2e6rm99lte5r89azwhwhz6xfnmenta24cfftk4sa9n5stf2pse',
      rewards: '61928498950666927',
      mid_rewards: '13671188585880755467'
    },
    {
      address: 'erd1z4sy8k7a0ln3x0annekt9jv8cea7z7pr0hv4ugdny76lek26mrjs6pt98f',
      rewards: '61569784084621605',
      mid_rewards: '13644131175863576180'
    },
    {
      address: 'erd1rfq0y25zurrrawgta98nxk7esyqfuw2r6j7u3cpmrg36tf92kens964c6d',
      rewards: '61441134477589474',
      mid_rewards: '13634427298228414104'
    },
    {
      address: 'erd19trhtyyj48mcdy6994tvyjsrmhkj8xy8uev0v0phhqdxqscd420sw3kvp4',
      rewards: '61321930444199893',
      mid_rewards: '13625435888302526297'
    },
    {
      address: 'erd1xchp6gk0t3gvtuyay58t0gqjh8ggtmry4lehpxrvsl93jxrsvf5sqpz640',
      rewards: '61090187384321224',
      mid_rewards: '13607955801516882332'
    },
    {
      address: 'erd1ylxk3hcdl8glz6kgjd5mh4rjnsggh5ztnfz07w0z0942mxktad5s63m5lz',
      rewards: '61021369033579755',
      mid_rewards: '13602764920098316535'
    },
    {
      address: 'erd1keletc0lav550xad24q0zjhhyyxjt8nrv9mrrj4n866x5va2zvdsmp4yte',
      rewards: '60656817544222258',
      mid_rewards: '13575267260944505723'
    },
    {
      address: 'erd1smatp04wkqs7hap83xj30ctzdgm797vmk68gfuxrhx8xugyjzl9q98zad9',
      rewards: '60501676122426251',
      mid_rewards: '13563565139127083322'
    },
    {
      address: 'erd1ru57avfm8xhptktv3ev5cmewrp6xtluu8dl2vrvael42hl64tk0q8g45gu',
      rewards: '60396529200836819',
      mid_rewards: '13555634039418687046'
    },
    {
      address: 'erd1xj3rn7tal5mny3mqxd8r44hwf8jxh422wgktzj30fltjyv76vdpsv7h9vp',
      rewards: '60326758811053535',
      mid_rewards: '13550371346895689640'
    },
    {
      address: 'erd1slfmlcq30pn0nc5l8t4vk3zra2d2dd4832av3kpvslj5emg82k5q4qlaq7',
      rewards: '60263310677235691',
      mid_rewards: '13545585534167991420'
    },
    {
      address: 'erd16736ezku5zdw3ca5cmq49g9c7uf3kkdcp9e9v7xtssf40wswyzrqh8wfmz',
      rewards: '59617939975147829',
      mid_rewards: '13496906035902480744'
    },
    {
      address: 'erd1h6tc3vrt6wlptry2nt0gt4gc027krc4uhgrx0caf4p4l6tw9lfhqxc2d0h',
      rewards: '59611622918661468',
      mid_rewards: '13496429548297332102'
    },
    {
      address: 'erd15g0afazph3s246qr4yua7c365ksg5vjt53hunqar8grm4j4u6zcs08qs03',
      rewards: '59589883465463511',
      mid_rewards: '13494789768755404547'
    },
    {
      address: 'erd16zx0k2x2ufvnmxs59xrctqy9jdzdm393zwcw3u92mjza0ful0lqqam6yhv',
      rewards: '59546657874995768',
      mid_rewards: '13491529316972587638'
    },
    {
      address: 'erd1f66kdxdhnv20szlrvlu8s08htx9tkg66qkvmlfjcqjr2k0h2wrds8azy0m',
      rewards: '59399962125296481',
      mid_rewards: '13480464241551683219'
    },
    {
      address: 'erd14h6tdnx9apxrw2a2uj3xamd5jx036dcd327mkg8wlaz725vzhj6qu73pa2',
      rewards: '59302449981532457',
      mid_rewards: '13473109023507433064'
    },
    {
      address: 'erd1gezgpgyuq4vs4tdnfsfetnvjmvw43k8u4j30xcsz7rcat0g8426ssd9etd',
      rewards: '59268163548521792',
      mid_rewards: '13470522841099595796'
    },
    {
      address: 'erd1d3dv5v4a7tt4wjze83sl0qryutrt8pddp3kacwckqzzkly7m6dzsze9tem',
      rewards: '59248744104504846',
      mid_rewards: '13469058056924730347'
    },
    {
      address: 'erd1xj8sva8raa9cxfgxz5sgxv497h5fngqz0v6mnfuyrvqkel70345qz6g0u4',
      rewards: '59010396907838088',
      mid_rewards: '13451079828428777993'
    },
    {
      address: 'erd1ftfr29whgcv3ag8729ketucvxqsa0pykc3stsznk5tsj8tl7xhuqxkyfsl',
      rewards: '58967301269226627',
      mid_rewards: '13447829178750615066'
    },
    {
      address: 'erd1tfu0wcy8u0uqt3x63luaq7tewtqhdhj85shqfgql9wa2u2atls2sz664uh',
      rewards: '58537677741376406',
      mid_rewards: '13415423217787174618'
    },
    {
      address: 'erd1ux0fthpnmaedwqax48khdpzywjtv2zj9az6rp4us67s40jxy2qdss73r8p',
      rewards: '58415744861025856',
      mid_rewards: '13406225974376014575'
    },
    {
      address: 'erd1xxcwny35eul0nef5astkfa5dj2mvrpjc7uyvngrd5fq94dzy0zvqjm3lry',
      rewards: '58226635624663519',
      mid_rewards: '13391961703138242853'
    },
    {
      address: 'erd1ssla756t9tzxpg3geq9memfugewzx0jksw5psgpfsnmwyaknx9zq9xsw82',
      rewards: '57990163218754904',
      mid_rewards: '13374124887745122665'
    },
    {
      address: 'erd1426rdmaa6yvh950xrm28s58zky7pgpzmshump3nsjlzsx7nedz4sz448es',
      rewards: '57712918683205877',
      mid_rewards: '13353212682025651091'
    },
    {
      address: 'erd13qzgkwwgw39pgev30zq72mu7v6yw4seq8jzn56e8ywxhc7gsmjdq80rpun',
      rewards: '57701128120121264',
      mid_rewards: '13352323334719722919'
    },
    {
      address: 'erd1f2xtgwggznjeqvmvp23l3d0le327vpledu4a37u4g3xvyl8a6p2swm7t33',
      rewards: '57545566102821186',
      mid_rewards: '13340589487913786678'
    },
    {
      address: 'erd19d0rw99yeyln9nqq3xalyfw4gj95swcgqumjdttqxwmmz3h3rnlqqfu9kn',
      rewards: '57536618871950896',
      mid_rewards: '13339914609571428785'
    },
    {
      address: 'erd1729tqnan5rd8rynt4auktjh8vtl4d9drlezg9vcd8c63l5zkfs5styactk',
      rewards: '57504721840015649',
      mid_rewards: '13337508656673747658'
    },
    {
      address: 'erd1kdka3xxumv8ucaduqfc3empmtjuzfyg69yxq4tykjvxzpx2ug4gqmdmw2q',
      rewards: '57478326861511205',
      mid_rewards: '13335517716728428688'
    },
    {
      address: 'erd1m3st3l5c7dfgv3eugkshrqt3hmm5cc6x5vs9la2wjxqz775gljkst2shex',
      rewards: '57346827357698732',
      mid_rewards: '13325598874972759239'
    },
    {
      address: 'erd1f5w6zxtyhvmu2k2d3uvfqsmf806tw5vtwy09hpwstenzkv7ydl8qd4u5ze',
      rewards: '57335095243748804',
      mid_rewards: '13324713936411357763'
    },
    {
      address: 'erd1wtt85h4h77y2cjjgf28c6n4ppyerkft2wkjwt5layx8hduufsjfqrexpj3',
      rewards: '57232791164226758',
      mid_rewards: '13316997268695366368'
    },
    {
      address: 'erd17zqe8r29vslkmg3nrm2gekyq03f54mf4g097z3hrjxgayvwhmp9qjcwwzr',
      rewards: '57094925195026848',
      mid_rewards: '13306598212483443248'
    },
    {
      address: 'erd1ncsqp96966mhu7w4cvelvuhulq73p3khgetl8y50qzk3wcszsr7qwkqr8j',
      rewards: '57062102912170248',
      mid_rewards: '13304122469075477950'
    },
    {
      address: 'erd166fk9v4uesnkx2wzzlrje25fewfxydczeq7jpzxs8a2qkef43vlsxvyk2z',
      rewards: '56974301911628130',
      mid_rewards: '13297499750318997663'
    },
    {
      address: 'erd1akp9jarulzcmlnd45xu5u47gaythm39s0lpmhllnyddkw7d72vnserwkrh',
      rewards: '56766738504330800',
      mid_rewards: '13281843504237751984'
    },
    {
      address: 'erd16ysfwcujmp6ssc3rk2p2anx0z4ha0q2z8vwgfard8qh7puyf7y6qhaqeu6',
      rewards: '56708684630862261',
      mid_rewards: '13277464573766202349'
    },
    {
      address: 'erd1umzkv2pvt08dhpmnqsha5sauvnutvv9jec336m05kat0qr6jh79quayd3k',
      rewards: '56410961140606683',
      mid_rewards: '13255007666316559422'
    },
    {
      address: 'erd12dskhwkuh52e8qmsllqk8ya76vcewv2dsu3jflz8c8s2zvsdysds5yqthq',
      rewards: '56169826876092691',
      mid_rewards: '13236819212807298644'
    },
    {
      address: 'erd1368vdc8d3m2m90p4jq2lnyfw9y35zcjzu58g2ldclju920v694aqrzcp09',
      rewards: '56115205516241141',
      mid_rewards: '13232699192509582418'
    },
    {
      address: 'erd1n0y8vt9v8zf08s8hvy74cjlw49vuurj9fckq4hryc7qz5kzczj8qqccxr3',
      rewards: '56052381821604562',
      mid_rewards: '13227960480441928056'
    },
    {
      address: 'erd1lr98wy3h9r4fn7h6njvgt3qpt403ctd9jwuqgm3dj5pwpv90ztnqgwa7pa',
      rewards: '55786290219184611',
      mid_rewards: '13207889526404870627'
    },
    {
      address: 'erd1em2xccd4lpqxg4rg7ll8xw62lwmlsppdjeuvww4aus4jwhnaqj3s00uyel',
      rewards: '55655245748540078',
      mid_rewards: '13198005007227275801'
    },
    {
      address: 'erd1swxunsw4ehhm27gh8gcswqslqtlfc64esfkwv6jcypj59n55alkqmg20qv',
      rewards: '55650614296069391',
      mid_rewards: '13197655662607533660'
    },
    {
      address: 'erd1aekxce37t7nge7zx3e7u2qeqrm9s2jqef4fkwfwqzta9yp873dws77clvu',
      rewards: '55582792802623971',
      mid_rewards: '13192539972877801876'
    },
    {
      address: 'erd1majnx06sxpm7dws57pgyy6w2qse5ygan3z9a4kwra5slgyufep5q9qn5kt',
      rewards: '55503575468561209',
      mid_rewards: '13186564709260115053'
    },
    {
      address: 'erd1rlnx369kzazsu98erqkphpxmdm6jlq652ps8apvfxkjtkp80sc2qvudm74',
      rewards: '55424442020709924',
      mid_rewards: '13180595773073581961'
    },
    {
      address: 'erd16ptw79slwrkyjupp7x9pllne2a8q5q525mu5uq2u6z9ler6pdzyqrl50de',
      rewards: '55200539694028201',
      mid_rewards: '13163707102906055720'
    },
    {
      address: 'erd1sqxjr9xyr2vs4phxxg9shchv3kdujxa3n68uamny2acfqtqrf6ks9ec2er',
      rewards: '54835424420045644',
      mid_rewards: '13136166918188892029'
    },
    {
      address: 'erd1g25zlf9znn0ah78l0qvgf842h3gkp55run0cxg0aq4xjzzeqn8qslhw6rd',
      rewards: '54801902812126675',
      mid_rewards: '13133638425573300034'
    },
    {
      address: 'erd1ax9cje8gjcj3904c77n4r689ks99v8ggcy5mw3sej4qcx7ajc4yqsv905p',
      rewards: '54709861607087823',
      mid_rewards: '13126695873538400994'
    },
    {
      address: 'erd1scymajup9r5k8f492xt2gv4sw5tusxdexhl0pgjz93k8cmxtt43sas5v9d',
      rewards: '54329825172268428',
      mid_rewards: '13098030204474448076'
    },
    {
      address: 'erd13grlh6rmrwz00envmy56uxtm3fq7rg49f9s6yw57mtlu6h2j9xyq40ttk5',
      rewards: '53923560005230689',
      mid_rewards: '13067386135212905163'
    },
    {
      address: 'erd1xjcr7j83ye0y5myyaqmpw4rus28hvjra304872hmhthxadwlx8vq0hlwxg',
      rewards: '53507601732710024',
      mid_rewards: '13036010927227498598'
    },
    {
      address: 'erd1km29ggfnhx9sz2v646snawmg3jc2gkasc0r04t72zgmdctz0uj3suqc0j7',
      rewards: '53288604139614043',
      mid_rewards: '13019492214929623860'
    },
    {
      address: 'erd1rkqcqepc8r67ahkzzrt6whfhc4k86xuy22rjtn7glkgac4vjr5hscp59aj',
      rewards: '53125718604562570',
      mid_rewards: '13007205964414434740'
    },
    {
      address: 'erd14tfdm774ptxn3nwq9ye5g4vk8wxyj48esave4r62zawx5h7dq8zsw2u4ru',
      rewards: '52881574627757803',
      mid_rewards: '12988790492102237163'
    },
    {
      address: 'erd1sa4spdnhq4jv9fycfukx2ld5vsd53n9q77qsjm8fnspjxsffkphqqlmlzz',
      rewards: '52611779724950500',
      mid_rewards: '12968440202786711788'
    },
    {
      address: 'erd13eyhwy3cxtwh3hs3rh03whgzz6c8kel4ussz79meygwmgh3rqq4qemv9ky',
      rewards: '52584395056399076',
      mid_rewards: '12966374611769118395'
    },
    {
      address: 'erd1sj2lxf7mgsa5ydwda6jnt82vll7u38eyy0y8dr6cr3j3h3pgrkvqz4pa6e',
      rewards: '52377413971165136',
      mid_rewards: '12950762289506823677'
    },
    {
      address: 'erd1e2dqawlvgcsr6get2z3375d0fv4tverkzpy0scrjlpuna8slc43qve7lxq',
      rewards: '52281585822385014',
      mid_rewards: '12943534093080742401'
    },
    {
      address: 'erd19895yvnd0nrg4qytfdyx037mfll3yl4v5k8p8th2t5zkushu959stpnyev',
      rewards: '52112892314304946',
      mid_rewards: '12930809754483685054'
    },
    {
      address: 'erd1l72adzvzg238lt5myxuzjrvgtcyhc0wne0qvdgu78n2ht270ee8qmz5hzd',
      rewards: '52082554301047517',
      mid_rewards: '12928521396398996240'
    },
    {
      address: 'erd1ul8v5j42s298aphl77ts3dmmwhzswh8x6fjj82nwhvkdz2zudl5qndnw5h',
      rewards: '52033518617067151',
      mid_rewards: '12924822696588874737'
    },
    {
      address: 'erd1ezxnz5lywd5zpcnl7x3u74vc60tgjxdnga3s0608gmnx6rsxmwhqudsllw',
      rewards: '51177339552165397',
      mid_rewards: '12860242189339295077'
    },
    {
      address: 'erd1n26053kfzhzs7ye3v604m89w4qv6dewcu0cfflkfmvnx23r5ks2q86arpf',
      rewards: '51052945503154457',
      mid_rewards: '12850859303079541214'
    },
    {
      address: 'erd1aulxurcr9qzpayh3pl0a76hnd5lx6srlu072tq20cf8wuzxlgw2s6sfnxj',
      rewards: '51052945503154457',
      mid_rewards: '12850859303079541214'
    },
    {
      address: 'erd1k2tun3ha8lmdvq5vxq5tpw4y345dl7r25fqtdsrvpahr0pjrxmpslzd993',
      rewards: '51026910558001665',
      mid_rewards: '12848895519995946165'
    },
    {
      address: 'erd1ss4d72uvnk0av20spwcct2jn8jsl6qs5ypt4jqy5vxfhcc8jxg8qndvnzc',
      rewards: '50945163321629249',
      mid_rewards: '12842729429037172596'
    },
    {
      address: 'erd1c9uqhxpysx2rvrvr5k28ksze5n9te8r9cupuax3qxmxgthln986sttmrhr',
      rewards: '50792619467698901',
      mid_rewards: '12831223238488402174'
    },
    {
      address: 'erd1vzfkel3qkxzl2m256xre3zug5xmzycfp64yqmjk20kvlc4m4ek6q58uvlz',
      rewards: '50584668331103587',
      mid_rewards: '12815537746475124505'
    },
    {
      address: 'erd1ztnnxuujffy0mt6x978x7lxkzx70jae8xel3r3v949ezg7cpyyzq96fvav',
      rewards: '50557512044939262',
      mid_rewards: '12813489382053006692'
    },
    {
      address: 'erd1ljtj0qa95h3dqmenuv08twt30ttedaf2kvymhw5l2adpq0873z8qmug4up',
      rewards: '50382320627198926',
      mid_rewards: '12800274914323943291'
    },
    {
      address: 'erd1l5y44h3kjclpew7ep022ew0u8l2tumhcmsz86wkhzvykr4fq844qrjqgsw',
      rewards: '50177681130463292',
      mid_rewards: '12784839215129403373'
    },
    {
      address: 'erd1yugfxfx7ffpuazrvmtnr3lk3qvvzjw3ggp5dp2mygm2ywr954wrs7chusc',
      rewards: '50129041245589993',
      mid_rewards: '12781170369946837205'
    },
    {
      address: 'erd1jkz8cx0hsux3xvlv7yxmwcxz0gfav2v247ydurwyqvgnlq2vqj9s2976fg',
      rewards: '49957167085179584',
      mid_rewards: '12768206118755208826'
    },
    {
      address: 'erd154t5u0kwzf73mkq7w0jcs26n424crz4v4r0ny9fyrzpj0ayyy0usfhzzvy',
      rewards: '49499244055734850',
      mid_rewards: '12733665562071311637'
    },
    {
      address: 'erd1xwtv0prxz8m7cqxuflljmhkjrgv33x8wlymjsjs5lc9ktkjyqqjqplzruc',
      rewards: '49073237591731130',
      mid_rewards: '12701532431672804419'
    },
    {
      address: 'erd1clcu5vndrek785jw0z7k30zzmay3l7n96q262y5xkapg4c3zfhtq83l77x',
      rewards: '48781808648238592',
      mid_rewards: '12679550313948264114'
    },
    {
      address: 'erd1e4md5n4f2shjeydre7azp9jc685swvf4kav25qceegne359cvprqxtv8lh',
      rewards: '48758997225142265',
      mid_rewards: '12677829677068624198'
    },
    {
      address: 'erd1q48yhy2m535g8eg3y9pdg4nupk8ajth7ud7c5azj903wksy8k8cq4500k0',
      rewards: '48669256645911356',
      mid_rewards: '12671060658337398592'
    },
    {
      address: 'erd183tydt4ny7xk5zmcyzclzjchq0ry4cm2vwa9c9kyep4hfy2len0qdq8pwd',
      rewards: '48496836097684698',
      mid_rewards: '12658055193801769096'
    },
    {
      address: 'erd1guhsaq6vzrl53krzr709ya7pjerwpdnkulx3243dhz9gdauqzz5qjswnnu',
      rewards: '48467150295608516',
      mid_rewards: '12655816031184063129'
    },
    {
      address: 'erd1gggqncl5z07g5k8mckk9y4s2cm22mfy4n3dpxqcxhur2x78rvccqx0l722',
      rewards: '48381420137150652',
      mid_rewards: '12649349513434728755'
    },
    {
      address: 'erd1exy2257klqzx5kz0d72yhdnunyrhekwkdy362v56vsxdpx6unk2sw7r7km',
      rewards: '48276359076611732',
      mid_rewards: '12641424890117104407'
    },
    {
      address: 'erd1r4k28eetme87txmcsq2px2s2cmq0c49yn6u9ne2zxuzd3t9l8tss99zkjj',
      rewards: '48104814443911380',
      mid_rewards: '12628485494785121130'
    },
    {
      address: 'erd1fqmpvu8kxprgvqt65vdqac24alvmr7slrvkuxmkx8fypwjmgep7qmtst5p',
      rewards: '48065595097484251',
      mid_rewards: '12625527228938534916'
    },
    {
      address: 'erd1cyq7yvl8l79cqp2pd4wllflwf3gxnf9kup9z8ez0sza58k4dpvxsuftweq',
      rewards: '48056064140009037',
      mid_rewards: '12624808320834429237'
    },
    {
      address: 'erd1r48xrdakk35chdhrj9hlpxuglacl9k2nhqrl4mw33pghnge79nzsvrawtx',
      rewards: '47961729670970524',
      mid_rewards: '12617692790787772456'
    },
    {
      address: 'erd1ld3lketc69cxx3edtyvpxx2ugvawqawn82lh84zhnvd24fe3tq7s9g7v32',
      rewards: '47674635533182111',
      mid_rewards: '12596037641991435139'
    },
    {
      address: 'erd1yusue8xk5hrfkt3478smw7r5dafpkfy7gutknw7qvvl7v24s42uqcc9pf4',
      rewards: '47662804345900680',
      mid_rewards: '12595145230453566872'
    },
    {
      address: 'erd1he7eyj9w6hyvrsgfg6pvm040ezkm3ns7pl7nnq4lsa9gmqj6fu9splng3f',
      rewards: '47662480044902619',
      mid_rewards: '12595120768838216901'
    },
    {
      address: 'erd1e6upqyeqex9x58594h85td76sc3m33g2rpkmllgrvzgvl4z8eyzsm26sck',
      rewards: '47423679645338854',
      mid_rewards: '12577108355819218483'
    },
    {
      address: 'erd1d7m9s6pv8z7qtmfu4r70ey6dxgz4e3naz5tsl8e9x4farqwhm2sqxz8jew',
      rewards: '47339876661000417',
      mid_rewards: '12570787202383604090'
    },
    {
      address: 'erd1m53drkyajurkskue3x75l3n96zfuu2sztfjcl2hpxvz5k27a7jjsp5ccgx',
      rewards: '47290794205996983',
      mid_rewards: '12567084974694189416'
    },
    {
      address: 'erd1l73ec83jyg3z6865jdwdxx994d8hsvanm5uha9ydtc5f0wkcmdaqvaqyd8',
      rewards: '47205016797863517',
      mid_rewards: '12560614892961404798'
    },
    {
      address: 'erd1g99mf3j2xuqelattuflr4d5zd5ja03zy6t0nylhkg8z5uxzclats6can7y',
      rewards: '47046526807404575',
      mid_rewards: '12548660192832181227'
    },
    {
      address: 'erd13g432xj5ep03enkn0ug95l7y9hut6n2fnn28kamv5ypmjsdfgfssuma556',
      rewards: '46969955707105269',
      mid_rewards: '12542884531290450984'
    },
    {
      address: 'erd19rca4q4ugz6h8lkxnea274dsrpzl3xlvgwwzql3ss4qw82qnhyusk0ezly',
      rewards: '46772356640711622',
      mid_rewards: '12527979882878836978'
    },
    {
      address: 'erd1p5h2fvney4e5w0nn3y5fxua7dpf65nmt4zf0ymqvfjtrcegnfc0sl7dude',
      rewards: '46756679189938940',
      mid_rewards: '12526797352535845822'
    },
    {
      address: 'erd1utu49zmrfe596rfjl6ma6trtxp625x4zvhpw2avd0vjtga7kgasqju5wfa',
      rewards: '46727364243072892',
      mid_rewards: '12524586163059003036'
    },
    {
      address: 'erd1kpym6606rfvu795gfem59jj9y32me3rvlg480wyflgt4kaluh2cq2wehyf',
      rewards: '46651457289422817',
      mid_rewards: '12518860597261555408'
    },
    {
      address: 'erd1f7d6q5h74g0h6hktvydkmmc7qcsyljy57ntxfpm7y8qdxz64xdrq482gru',
      rewards: '46352060283869200',
      mid_rewards: '12496277458663233680'
    },
    {
      address: 'erd1flvezfygssfr94xtaxr8ftqujde55gle8ugflftj0xu86655my9qyecsnv',
      rewards: '46335693137975923',
      mid_rewards: '12495042905486980774'
    },
    {
      address: 'erd1mstkmckmhwfpz98lpecmh68wmnr5ueedvrnc6vg7f7qevxknfa5q50nv4a',
      rewards: '46294978394900606',
      mid_rewards: '12491971843756871778'
    },
    {
      address: 'erd1ssa4gq64mpjnveaxk3t0sxpduxumph4kp79e030wd60asx2mauzq9m8c6z',
      rewards: '46167119914277138',
      mid_rewards: '12482327639789128629'
    },
    {
      address: 'erd16g33zv5gd0ctgqsutdyhjd0jen88u8nwjgwnp7nuyxzr8nm2ctzspw5qm4',
      rewards: '45961593563933067',
      mid_rewards: '12466825046345199941'
    },
    {
      address: 'erd1w6tk4w5ud38et98ukrkshsvutnqnesxzq6he9a2wq56dvz64jn8sqsxqek',
      rewards: '45726918745559203',
      mid_rewards: '12449123820713122393'
    },
    {
      address: 'erd1was48xaulusgazzh08yaqwu6t022dq75en09ulhsc8raq33eklnsazv9hk',
      rewards: '45717285433588306',
      mid_rewards: '12448397192138473275'
    },
    {
      address: 'erd15wpf7zq7ye4lrcyyn2eyea6ef4psfa29qdavp2lcz8n2rjf9vduqkutc5v',
      rewards: '45716484270545231',
      mid_rewards: '12448336761420376545'
    },
    {
      address: 'erd10m94rzagk754w97r2rp6amk93ql8lxqc4pguy2htajfazlcak8tqtanw5t',
      rewards: '45698988134479386',
      mid_rewards: '12447017049939029367'
    },
    {
      address: 'erd1j0j6pqde33cssnt0rqvpde08f9vgepwye0zlrkhsnh2cevz8x0js7zk4jq',
      rewards: '45641652710035806',
      mid_rewards: '12442692311171489853'
    },
    {
      address: 'erd1y5ccpwt2wu2wnju85aswauj00wu75ywxdhahfcjwr6ajzlcl4khqdptkx9',
      rewards: '45185480302929723',
      mid_rewards: '12408283801723115178'
    },
    {
      address: 'erd1tvdvvkjz46fvnw9pegesdts95hvjk3mk3cmjhqaepw6dwv2u45vq7l0wx0',
      rewards: '45151676475928416',
      mid_rewards: '12405734021678012172'
    },
    {
      address: 'erd1j7vvtqc0yywmer9q9rwrf8frxq7307e8cyg6uzcktv0q9xkhxkvqcu8j74',
      rewards: '45040587553768924',
      mid_rewards: '12397354724359299648'
    },
    {
      address: 'erd1r9020rfrj0anumat9yxsmmxfrajc49a6lwzps566yws76m9wy2xqt9c28a',
      rewards: '44910231630495738',
      mid_rewards: '12387522141441688073'
    },
    {
      address: 'erd1eaav6ee9j4k3xpc5jrad87sfkff3j2f4uahx2ctsgjg85mlnxwksmpw3qy',
      rewards: '44793869823209544',
      mid_rewards: '12378745117046817415'
    },
    {
      address: 'erd1ly8zehf3k9wrrzgdqcf0qfp3ydzrt0hkfju9mztyvusxu3dsk2gqm49lqz',
      rewards: '44635158793058220',
      mid_rewards: '12366773744172321850'
    },
    {
      address: 'erd10wdslzrl5trcpxwh83lag42rwgh9knqc4ravwd8zmkrnhaxqe4mq3f9n76',
      rewards: '44472374746017038',
      mid_rewards: '12354495148769775663'
    },
    {
      address: 'erd1zle65ujt4tlxqg3pcmlys0zwyy4z6gakrtlru90plxhdvmjsszxse53dfh',
      rewards: '44345638493499136',
      mid_rewards: '12344935593052939587'
    },
    {
      address: 'erd1k20ehxuqcjylrqn2qw86rylq4lx03k0dz0fc2fx5u2vr3avt3feqtu4p6a',
      rewards: '44195437103917779',
      mid_rewards: '12333606091636236712'
    },
    {
      address: 'erd10k99ezjy7ut92cw4xz8gl03rqwwscxtg5ns0p2rtnvq3lzfmh5wstg6mlq',
      rewards: '44000721166854988',
      mid_rewards: '12318918914034510106'
    },
    {
      address: 'erd195qjduwkgy904ac58xsjdu0m7rseekfuxjj0n483lt73xtrnrwkq3wj3a5',
      rewards: '43950843473442423',
      mid_rewards: '12315156702514666313'
    },
    {
      address: 'erd1th76ck5nnkagt5qwvs4quw0p4f5hdgm4sjmdfyq8jhke8fpq7tlqjlkcau',
      rewards: '43817525060274292',
      mid_rewards: '12305100662719889381'
    },
    {
      address: 'erd16vvv7fzztljm8t6tus9sldwpa2tc6l45qqqd5w5k4nqxzznl4xdstmtwdr',
      rewards: '43635123885776381',
      mid_rewards: '12291342372129887763'
    },
    {
      address: 'erd1hzc0ajluffqcql956ch7mmvmn04vv3psax2t88efakpkqmyh84psqh3qj2',
      rewards: '43602210389675481',
      mid_rewards: '12288859748621922065'
    },
    {
      address: 'erd1l44afq0af5quzhrqeh2kw5svcq2g3nrz7r2kvy7j49rcgc06qkqsk7xs97',
      rewards: '43592621272556981',
      mid_rewards: '12288136453609260877'
    },
    {
      address: 'erd1c6k5g2trmp7wzygfu9xlwh343eyf4hxdy5lpwsfjkc7vdr6j7aqsw5r2z4',
      rewards: '43471847998272409',
      mid_rewards: '12279026677821429305'
    },
    {
      address: 'erd1gnt4yl29m55tmz77a4xuwmnm0u24lmapwhqu3hhxzxlvhz7wsejqneun56',
      rewards: '43340143796512198',
      mid_rewards: '12269092395957679913'
    },
    {
      address: 'erd16vqshr94p7tyjpenn6a3aqg0aut7rnmdq59ljhuddsljpl0pp08qa7gc8g',
      rewards: '43199433903413903',
      mid_rewards: '12258478826152203812'
    },
    {
      address: 'erd16ex34jd7sg4khmx3vjcxadefmy9mgrzdnxzvq63qcnulds57cjgsrrulvv',
      rewards: '43018006596866284',
      mid_rewards: '12244793993193674628'
    },
    {
      address: 'erd1lm9klqan8mqruy9m20t59kntcndapae56p3fgd93hm7lmyg0eu3sg65pyd',
      rewards: '42852628300536225',
      mid_rewards: '12232319716838538502'
    },
    {
      address: 'erd1xp7k84280yqng82yf74teyv3n2d8kv9vk4decwlgp8qxlt9s3vhsqxqhh4',
      rewards: '42776077419883908',
      mid_rewards: '12226545580439284275'
    },
    {
      address: 'erd1lz34q9pa2t6xdctn6dc78sqy6hrf0hlmqddvvpzyparc4n0t9tasdgvepl',
      rewards: '42775590980776862',
      mid_rewards: '12226508888950824828'
    },
    {
      address: 'erd1zlmll6e862mna3q5u9sr6uhe4dg0nh39qlx9kjd22v2r5sft3tys0qurh8',
      rewards: '42727159376557344',
      mid_rewards: '12222855754115337743'
    },
    {
      address: 'erd1mq2remtevpx90q407t6h6w8wwkff9ew5xsdk5xgrwqd34zcsv5lsj3p4e0',
      rewards: '42690421548446923',
      mid_rewards: '12220084666066261113'
    },
    {
      address: 'erd16pvc8kryyu0pvwvj0jm2l78ecavmygq9y77rrap46fy9c2hdk5qqtxa5kg',
      rewards: '42679096736312802',
      mid_rewards: '12219230449767230662'
    },
    {
      address: 'erd16x9dnqc775wlvg0gpspksvtrahp2z0tll3qpzy6glhttdc0frnkswm2s0h',
      rewards: '42431675801143583',
      mid_rewards: '12200567800617748062'
    },
    {
      address: 'erd14eerkgduk4jtt88njq7qkfmy0km5g73amczl6632ckz0dve33ygsjluxde',
      rewards: '42269356498840855',
      mid_rewards: '12188324260324794372'
    },
    {
      address: 'erd1r7dma3tcr7428wd5mq0dk6kevm86ett4pa7rh30u24r304fua2cqxag5km',
      rewards: '42247991540677924',
      mid_rewards: '12186712728471131893'
    },
    {
      address: 'erd1n9wwpq3cwdmm69zrl4up09rtpgyrcjr43gwp5jsy7rpal9v4y5tqt9uwth',
      rewards: '42211690267177925',
      mid_rewards: '12183974569185837207'
    },
    {
      address: 'erd1aypa9ax8ahlrj3nrwh6zls03k702vaqv3wd2nhffajfa58s3wtqsm4n900',
      rewards: '41812037031787077',
      mid_rewards: '12153829229590973036'
    },
    {
      address: 'erd1r49m6zzu8mtnx65djhu5ydmykaeufwgx78nzjgz3zk8jr5p8hhuseam5q8',
      rewards: '41629855842832285',
      mid_rewards: '12140087532233093755'
    },
    {
      address: 'erd1hdhhcqz95ztpeqjv0ttgucezr0drlfxazvr7yvea5pgtfxxfmvjs4qpvs7',
      rewards: '41312251804420136',
      mid_rewards: '12116131060104771868'
    },
    {
      address: 'erd146g27rsgxpts9mkvy8y9ywmd6dy9gqx3cel62vvk5dhc22c4c88seuvnhm',
      rewards: '41291315759203621',
      mid_rewards: '12114551880613811268'
    },
    {
      address: 'erd15rg638nugyewhw4h4hteujch9p9juu5avw0vwvgam44rkcrq9hnq88gpxu',
      rewards: '41198537907496326',
      mid_rewards: '12107553764249600788'
    },
    {
      address: 'erd1zzexzdn4uv06ecxcjk8h8fjcsrwrn5ktwz3pjear2erd2k9c9t2s6y7uxf',
      rewards: '41187666814814412',
      mid_rewards: '12106733771436723775'
    },
    {
      address: 'erd1r6lja74xqakhtd32grwse49zgv57ttjpg4yqh3cmj74u9lqeqvhskjzyja',
      rewards: '41148314269388125',
      mid_rewards: '12103765458557590991'
    },
    {
      address: 'erd1pkswa5v4s2fvgad0slh6ju9lc8fharqdmnty3putv8dascfltd7qcrtex2',
      rewards: '41147340446158236',
      mid_rewards: '12103692004299322165'
    },
    {
      address: 'erd13424rzq3vvfgw86f4rgklfge5e7jx9qmyp07fnfq3mdrfr9z77rsqqawty',
      rewards: '41067967314290446',
      mid_rewards: '12097704989049658411'
    },
    {
      address: 'erd16zyhrq5wwexe02zh07hda4cew3ulaeeneddk47vx48mqe45g8arqq7hzed',
      rewards: '41010717500525107',
      mid_rewards: '12093386707787626134'
    },
    {
      address: 'erd1r642pljg4e2qe0juf7xk3qfj8fwxyfr8ndvnszp7nwz55mkyluws3pvwe4',
      rewards: '40880025225346471',
      mid_rewards: '12083528754269916066'
    },
    {
      address: 'erd1tzlskg4wdf67g24zrpp7856x3lxc625p3pyv6tjsajz9gwjj2spqkpqk65',
      rewards: '40867762464274055',
      mid_rewards: '12082603789665195325'
    },
    {
      address: 'erd1p6kslt9yvdnkx0j8sk0v5r0s0rfg2xg3vuqu5rnz7vy53wvu53nsmp43ky',
      rewards: '40820131893097386',
      mid_rewards: '12079011075742051850'
    },
    {
      address: 'erd17ads00qt6phlz6ydqtak0sprjdymcr87lkkx34xxjq3tl4j5aupqfk52xa',
      rewards: '40670413574511865',
      mid_rewards: '12067718011761426939'
    },
    {
      address: 'erd105fzs3nmph59nrtshrl4fdmcesy92x6nhx9jenum8h3twry2l6uszw4l4w',
      rewards: '40628806842005977',
      mid_rewards: '12064579668393341723'
    },
    {
      address: 'erd1vrnd76vslvtacmp40z9hkejqz67zwfm8q9mu99kax38x7l5s2uzq6awdnq',
      rewards: '40483342134019057',
      mid_rewards: '12053607448896494703'
    },
    {
      address: 'erd1l380v8w0nwfesj738klucks25vsaqvx88xs0fdwh985nev80x7lsw6wval',
      rewards: '40429067313826980',
      mid_rewards: '12049513567648316475'
    },
    {
      address: 'erd1k7yyy4ah03tqsq4atfdqffp77xektgs2lmqa9pjukjm2pqq0hfdqlls98j',
      rewards: '40296093774479424',
      mid_rewards: '12039483541250950036'
    },
    {
      address: 'erd1y63eg2u9eenkj488s8wcy35gy7ps2hphh4qnwtf592fv7z5y5keqmzsshf',
      rewards: '40239381061007858',
      mid_rewards: '12035205772786809797'
    },
    {
      address: 'erd1cw60zu20n4zefckzsulqn68w2lsty7jv8yh4vr5mv4y823096uaq8gr6hs',
      rewards: '40129527468125958',
      mid_rewards: '12026919654797793103'
    },
    {
      address: 'erd1r5vxkhcgc9v0r39zaqttcajns6gpr9txg9yppshrl7k64ccq3u0se30qex',
      rewards: '39395524751443499',
      mid_rewards: '11971554755433707287'
    },
    {
      address: 'erd1s77q8zhdg3y3r43crg4y5m98qzuqg5n70vqupx7vcmn5cky8a4pshny2f4',
      rewards: '39325460318139876',
      mid_rewards: '11966269883578750715'
    },
    {
      address: 'erd1zswuzu5v537pcpg0sn7tsw7jwk4fy7rsglxt5wsxn7wl7d38a0fsj9wfgq',
      rewards: '39229451072633100',
      mid_rewards: '11959028027254935434'
    },
    {
      address: 'erd1wmdyne3kyxcgmj0jaafmf8zr4m98k9xjhwdhd6fn366sezkgghfqxr9saw',
      rewards: '39061941652379258',
      mid_rewards: '11946393002909511303'
    },
    {
      address: 'erd1y8etdpfzpmhg28nwwmeh4x4maez8m5flcgg049w5mnvxkl723lsqsnglsp',
      rewards: '39000690973297799',
      mid_rewards: '11941772941421654505'
    },
    {
      address: 'erd1a6u8yy6cyeqlwjuvfdm0y6aznct0juhzyp0hnkxuhpjhqmru4wnqwyalew',
      rewards: '38857662191166715',
      mid_rewards: '11930984460740484211'
    },
    {
      address: 'erd19yfnte7394u97v4t6gusmquhtdt3mtm6r78rwyjhuqdfmud3wp8snfttrc',
      rewards: '38612304327156979',
      mid_rewards: '11912477426447090950'
    },
    {
      address: 'erd1swcevlc6rvxpekv6kjq5e04p0f82284qp6qy6u65479luw8vt5sqvwht8l',
      rewards: '38329098071341320',
      mid_rewards: '11891115535685456644'
    },
    {
      address: 'erd1p6n5yg240cxhfczwv9v08xddewqg2hw8n4ykrwuplhvp8nydwj2qze47nh',
      rewards: '38246815165902503',
      mid_rewards: '11884909039884466973'
    },
    {
      address: 'erd1zey4apd22jeknumx3fw54n0dv7mqk6y7gamghfgl058x7caudtvqekjsul',
      rewards: '37824301666046493',
      mid_rewards: '11853039379367099155'
    },
    {
      address: 'erd1al43l396zxva9zd4wm968wx0744ygd4cmdtzdrz6q55n4v84vemqxzsnem',
      rewards: '37544728988886033',
      mid_rewards: '11831951564861593494'
    },
    {
      address: 'erd1jnhf6dqzeuagr0530uq4fmjp2kmeucfkhr8pjy9k5pc7a6fpug8sa8t36x',
      rewards: '37534924867747511',
      mid_rewards: '11831212052366815627'
    },
    {
      address: 'erd19svu2xlu5l0zmvznz990e0u7xvek34297ww3mdkgf87x326gsncskxlyp6',
      rewards: '37276162663210398',
      mid_rewards: '11811693945569911154'
    },
    {
      address: 'erd17u03vjemec5cgcm75ek6304yfkgnrmat9rlm9v6seaqjcfj78lgqdr3ylw',
      rewards: '37227303503792879',
      mid_rewards: '11808008560784973054'
    },
    {
      address: 'erd1s5vuqmd2dfg52086v4xr2hvanj7t7k7yvan04dca7dt8n2mw7njsacxy69',
      rewards: '37124891573212784',
      mid_rewards: '11800283757999669953'
    },
    {
      address: 'erd17ty4kzem2rahp6556nfg802jjff47uxgu9662nyslv3z4yku8fps2hs2gk',
      rewards: '36881956204082044',
      mid_rewards: '11781959449440306433'
    },
    {
      address: 'erd1famgggwtqpwyqrw7s3cx5uydkhrkkxmpz2n44shavp5jmv0zuyhqs7teu3',
      rewards: '36863840251147049',
      mid_rewards: '11780592985954089636'
    },
    {
      address: 'erd1swg6cdrhgqt56n57jk3ujrjy5qn8zth09frkqalwae4t2wlqngkquqd4d8',
      rewards: '36733721523449368',
      mid_rewards: '11770778294399641941'
    },
    {
      address: 'erd1mzjp67y7um9jn3hdz3kt3ndk697tyqy8c09tpmku8dj0dvrktkkqu2nfm3',
      rewards: '36626708662924643',
      mid_rewards: '11762706449270249194'
    },
    {
      address: 'erd1adfz2ghv9dw5zg46r3jxxezyaxqr3qc5src4l7ajgqee3s05v3wqvfzzzc',
      rewards: '36553046042216839',
      mid_rewards: '11757150170676600965'
    },
    {
      address: 'erd17zx3q725jepd6l52j7upm4urcke2hjen2wwgwcgv4kyyey7tj50q4ye5rm',
      rewards: '36202278288829145',
      mid_rewards: '11730692201346117357'
    },
    {
      address: 'erd1jjpt6dfxacx68td9lc07avrhsmml5u7msdf8prcyfqhp3pvccg6s5v2hlw',
      rewards: '36198807172194675',
      mid_rewards: '11730430379395352595'
    },
    {
      address: 'erd1v9gc6h9llh7pu5uw5etdthgxxuhcc34cycyflusl7sdd9g3rg4lsa2q3xx',
      rewards: '36170043071064044',
      mid_rewards: '11728260739517732467'
    },
    {
      address: 'erd1408fef7a2cpf06etxj53azxfc08jjv2dgked8mqdc9gxswupazhsevgl7d',
      rewards: '35813141521030222',
      mid_rewards: '11701340105640763863'
    },
    {
      address: 'erd16kj9kx8k7j35lkw8axftxu5mn4gkkntfqky0af7n42ts4634v07qdspkfn',
      rewards: '35620302314104949',
      mid_rewards: '11686794487426810181'
    },
    {
      address: 'erd1g8kdk8nq57xzu0z6tjk7lxlmddhveasmewg43gggg6ywkffr6dhs5m3q5h',
      rewards: '35538287141134897',
      mid_rewards: '11680608186348336892'
    },
    {
      address: 'erd14ew8d0x3lgm230rvdj23a9cd3wf82utypjyxp5rleeljcn4y63nqv2r45r',
      rewards: '35470262127895893',
      mid_rewards: '11675477145377207383'
    },
    {
      address: 'erd1ppvhf4wnahwzhclqn7gxywjzlmnk5lnxpg59f04f9pyrw5gzcsmque3sry',
      rewards: '35433883274037282',
      mid_rewards: '11672733134303289085'
    },
    {
      address: 'erd1u0uqc4frt750zjqhzqyzcxtr2z4shyeg30zpzmr2afekl9snhsxscmxx64',
      rewards: '35382240739902569',
      mid_rewards: '11668837803073184552'
    },
    {
      address: 'erd1394dxt9cj3h8haxk33r065ntx8h4nf6pqqldj3ndssc58lkzrsyqm5sk3f',
      rewards: '34852005961229402',
      mid_rewards: '11628842862327919926'
    },
    {
      address: 'erd1z44rc5d4j5qdmmrum4ccf0nefej5qyw5vlj63w5gkz5zyypv8c4scj4qlz',
      rewards: '34781684788078343',
      mid_rewards: '11623538624910012455'
    },
    {
      address: 'erd1h0h8gejpzqjdl63usynz999cdv5ekfupsnf39tx6fnx746zer4qstqkzj8',
      rewards: '34777884726071946',
      mid_rewards: '11623251991024633426'
    },
    {
      address: 'erd150jqslaqvaldmervkygytlp6j4fm4l7pzgz3fsvdq4e8z3j0zx5qensel6',
      rewards: '34734263131187587',
      mid_rewards: '11619961669128020789'
    },
    {
      address: 'erd1lqaxvnntdssff4vk04t7z7avfcjjcs5uj983vup68d5tl9xguvms5xshdn',
      rewards: '34691672355374234',
      mid_rewards: '11616749100614102398'
    },
    {
      address: 'erd1ye43syv79pdgm6aw8syr8v7f02usfltewz6jedk5yme5sl3zcn9qndqft9',
      rewards: '34403374877605808',
      mid_rewards: '11595003185400448097'
    },
    {
      address: 'erd17p949epdcys2wnprssvngklq6tu0tvyts70059pnnjpg4ln736zqnxgfhw',
      rewards: '33775850962728829',
      mid_rewards: '11547669847789994304'
    },
    {
      address: 'erd1mfc37q0ayhl6skeznc773szcp3fefqqp59ayyej8lu2xq7yydmcq30c539',
      rewards: '33570509515209909',
      mid_rewards: '11532181201333009874'
    },
    {
      address: 'erd1ud724u54xeq6nh8m6g02qyg2q2yvpg6x5c9wfqrzetuey577mqeqar0yf7',
      rewards: '33548675309996996',
      mid_rewards: '11530534274766073620'
    },
    {
      address: 'erd1lrr2rpqwlav3nydjdtvtnlagf77lmn0sx3rktuanc2a26xgewrxswtvd68',
      rewards: '33366036992578687',
      mid_rewards: '11516758096784616447'
    },
    {
      address: 'erd14h928jwvn8nx773dmdmgelcxhn5ucxmhyxgdzvtr8fduzrrxtx2se9h036',
      rewards: '33341250009113507',
      mid_rewards: '11514888445877475948'
    },
    {
      address: 'erd1wxlsa9xre5grvtngejsve3tuhffz9r25q8487klcz3d36zgj5v9sh5f6as',
      rewards: '33279557262166152',
      mid_rewards: '11510235039767928851'
    },
    {
      address: 'erd1mn4ch27kw4tytnfx909sl5e0fxasg0eftt97tewvkc8aple2rl2q23nt4r',
      rewards: '33139296288228556',
      mid_rewards: '11499655331368670763'
    },
    {
      address: 'erd1rdgcpexfu9lts9ft5mr27qp76452ejext5pt7ssxqaf8nedelk2q693raa',
      rewards: '33125714997896172',
      mid_rewards: '11498630911764496236'
    },
    {
      address: 'erd19lu9x4kjq2pmy23wjvqv30gsu5tv7yzw8m0at2edlmjxm07tu04qs865rf',
      rewards: '32789014596768658',
      mid_rewards: '11473234025076491386'
    },
    {
      address: 'erd1ycusfqns4l0yqlf9rfrg2qjzgv7kvev23fputqmljwkm7luc6dsq0ztyzx',
      rewards: '32741447824023169',
      mid_rewards: '11469646123388563922'
    },
    {
      address: 'erd1k22l2l52sn85znzrh3mupzp64r94jw9umsxy5rl2frgahv5d837q67z6h3',
      rewards: '32713103391569498',
      mid_rewards: '11467508138590057351'
    },
    {
      address: 'erd1vst4ks54qfvz8q8cdguazdeu9jx3lqlt8vvh7har8kkhvuyvgm6quv6m83',
      rewards: '32655117471505483',
      mid_rewards: '11463134333758123769'
    },
    {
      address: 'erd12pnpfcxw3h6uxn0mu8tw6ppzhwm2wuqnjfc8a2qcfee575xdzd4qwzfjyy',
      rewards: '32294229858796367',
      mid_rewards: '11435913036199862466'
    },
    {
      address: 'erd1qqghn25gww9dlmntrunk7553qf6z2hx6fdsg702axzy5pxf2ancsn6hesu',
      rewards: '32196981569557076',
      mid_rewards: '11428577720369700328'
    },
    {
      address: 'erd1fm5u2yzcr6encx2gf3qaq7e76nqaac6ckcgnq7xl8zdtlp6we5wq2flznl',
      rewards: '32048746853536142',
      mid_rewards: '11417396562659744159'
    },
    {
      address: 'erd128h45g5hw5ktdglwqecsng7j3yfjpvajda5yf5hjkngkfkctapaqf7p9us',
      rewards: '32012913689215990',
      mid_rewards: '11414693712259613785'
    },
    {
      address: 'erd1azhsuh0uuj65m6qdt58nmarhvu8sddpnyfalzgwalnmr7zeas7xqppedfk',
      rewards: '31936932378611995',
      mid_rewards: '11408962537810893846'
    },
    {
      address: 'erd1ahpywvymsqwqmnt0dt5sjn8lkw2pmym4c98zppkmhn4cqt5frksq2wyp5r',
      rewards: '31936776954840578',
      mid_rewards: '11408950814391800546'
    },
    {
      address: 'erd1pg3vx8233rqgquwjqfhlz02fns2j24455jt8pfnyy50rsfs8dczsazl4a8',
      rewards: '31767171615421170',
      mid_rewards: '11396157697506608580'
    },
    {
      address: 'erd1qvg0vc6kmzmzypjfn94wxtn8pjgxkvhdc638atpakd6w4v9hrdzsrxvtcg',
      rewards: '31751692407285175',
      mid_rewards: '11394990120355724743'
    },
    {
      address: 'erd148x0kn45jh9nhmddc5ux0j8qkactxkwavgz502p48dy05zgl05xsp0a9aw',
      rewards: '31736705607965404',
      mid_rewards: '11393859684980936028'
    },
    {
      address: 'erd1xuwy45ccjcfllkrvct0kwz4c2e8n776w3wmsewlru25xe64eqhvqcje3ds',
      rewards: '31455834186645212',
      mid_rewards: '11372673907841138968'
    },
    {
      address: 'erd1dj7fdms3j3705wasyd4ks2jecag4m2ex32n9djn9aldfrm3wgmcsd8ekgv',
      rewards: '31414608375965554',
      mid_rewards: '11369564296926075355'
    },
    {
      address: 'erd1rntxg2exda7ay0dlekkwh9aumzwygqh8fcw0a40mklguf7dd0lgsyqkg0w',
      rewards: '31360762206683293',
      mid_rewards: '11365502748275508688'
    },
    {
      address: 'erd15x8a67jud33cdnsw02rgrq8zyadp2dr38dhhhtghfa76nvd8rvwqjy3x98',
      rewards: '31253848523752161',
      mid_rewards: '11357438383986940708'
    },
    {
      address: 'erd1344vsp46lctz4tn2qjkv6rgv569nmra7t3ew7f7laq9plcpzdcgsyy5mc6',
      rewards: '31204813887111789',
      mid_rewards: '11353739763176354289'
    },
    {
      address: 'erd1jusc70punkjpaqk9ekkxfvg2j4mg4e45fjr0zr3ufnh9xc33z50qhv02vg',
      rewards: '31080148628374953',
      mid_rewards: '11344336419908963369'
    },
    {
      address: 'erd16e98z32qfhlymtjv66y62uzw8gnaaqu0vrr7y9ur2yn59377mcmq353dxw',
      rewards: '30987579476724750',
      mid_rewards: '11337354045526894866'
    },
    {
      address: 'erd13jqrzq5xranufpvq895v7mtqk6dg3sum0z8nsgjjqd6dhv32jdksajfdxe',
      rewards: '30981090659269742',
      mid_rewards: '11336864602208466578'
    },
    {
      address: 'erd1enn2zpen74umzvt5pw5s4h34mwtqw3ayq4aydee8eusfg3wcxg5ssg8t5m',
      rewards: '30967912455422359',
      mid_rewards: '11335870586909575785'
    },
    {
      address: 'erd10pv3zmwum9g8v5mesj3t2jgygp6tv99fr4cndvkrlvy4zmq6dhaqu7ae8g',
      rewards: '30931892597439476',
      mid_rewards: '11333153654441880685'
    },
    {
      address: 'erd1hhsqzjupnm26gqlmzv33czrn4tw6v07gscymd66yfwhh0vq36pjsrx7jrj',
      rewards: '30653925945187449',
      mid_rewards: '11312186980370069189'
    },
    {
      address: 'erd19rum64qqdt29snvuq4njf3t6rqlvte89jdlx7vpvxqndw3a0z8gq2a7p89',
      rewards: '30515161080756071',
      mid_rewards: '11301720121624316193'
    },
    {
      address: 'erd105da670jy73chg63rrkv0yy66zjasfgsecf6u4smad4754ukpnyq6k6ckp',
      rewards: '30409811221549198',
      mid_rewards: '11293773714587334553'
    },
    {
      address: 'erd16dvn6ntnlq9azg5x6ntlr6zum68nsz69jjvmcp9suyvqa4cthycsmpta86',
      rewards: '30347723024163017',
      mid_rewards: '11289090480149837879'
    },
    {
      address: 'erd1gzp5zqp5uu4tvhc4ut3agva7pchg057zqrt98r045z6e62s4m5wqzz7s5g',
      rewards: '30167987928214555',
      mid_rewards: '11275533288502976616'
    },
    {
      address: 'erd1a9unu5n5n9sttmfvmjjd664jtft0kkhtyc2zr0a8wn7ve9mfdu0qy9d4cv',
      rewards: '30099106936133069',
      mid_rewards: '11270337682127122176'
    },
    {
      address: 'erd1gp6fdcrmcdvzsr7m4dn26jzncvd2wdgamkmecjjvj74hevkte0kqel52dt',
      rewards: '30033298655201442',
      mid_rewards: '11265373846478705581'
    },
    {
      address: 'erd1kqlsc7yn4fqraqe9egzcqr38yhr9qwp9tfraynkwu27szshf3xysn003jd',
      rewards: '29937591878727362',
      mid_rewards: '11258154805012622238'
    },
    {
      address: 'erd1qpe0asy5dmx8q7e39ltkvkhe9kv7ttwkscaeh078yjtkrudjxt9su77ma5',
      rewards: '29809067428678721',
      mid_rewards: '11248460367810905634'
    },
    {
      address: 'erd16fnr7gln5k56r8nwmje5tmturydjfuanu940lcksy89gqukjws3saj8xut',
      rewards: '29781012197902264',
      mid_rewards: '11246344197130236728'
    },
    {
      address: 'erd12zhaasz029pl839ar9jmd7pvzpg37qwakhvzh7dvjcwydl4m054sl8hkwc',
      rewards: '29703973089942225',
      mid_rewards: '11240533234360800930'
    },
    {
      address: 'erd1e9dhh9prmge9cg54xtc4fnn86rnkp260qkcydav2a4macqccmv5shzle2j',
      rewards: '29604430217621994',
      mid_rewards: '11233024841022243498'
    },
    {
      address: 'erd1tu3333trft7jdc9u9y0l7uzuzmgp857a4rqvfkka7c8re3pja6gq4n0x8m',
      rewards: '29228395383869638',
      mid_rewards: '11204661007680879164'
    },
    {
      address: 'erd1d50zy7s0zr4sjaxkp2vfyzmlelp9zwkr9husk0l4zfrn89m4znhsl9k9lv',
      rewards: '29098652985577336',
      mid_rewards: '11194874702178939185'
    },
    {
      address: 'erd1d3ywlkfal4suhe8mhh7malrvcqkkmcey3pcmu0xdllx7rduh7y7q948g0t',
      rewards: '28884290209220381',
      mid_rewards: '11178705588263325159'
    },
    {
      address: 'erd1wl02203j4n2wua6yng2a5xhcafyqskz5jccfu4zn0ks2mfnuepmqv80a30',
      rewards: '28784145952053081',
      mid_rewards: '11171151833224081454'
    },
    {
      address: 'erd1ecsffpyajmwwmrgg6v98mj68360dq7tu2yrh7jc463j2stnvkf9s4rjn2p',
      rewards: '28673187026429743',
      mid_rewards: '11162782341380169317'
    },
    {
      address: 'erd1teku5t356ukdsac9mrk4fukz4z3z955fsrt47275hyfn94rytrzqkvrjq9',
      rewards: '28653630571300639',
      mid_rewards: '11161307222629880667'
    },
    {
      address: 'erd1yarv43las4j4wdspcnwajt8u0qa9097tdvq2ngdp08hcp6e7tesszh0c8k',
      rewards: '28636556023238672',
      mid_rewards: '11160019311000056258'
    },
    {
      address: 'erd1tvdm5ghrqwd7et58hdygzkcq90g833n09lj38f0y4kq5g924lm5qddsk04',
      rewards: '28505542363119324',
      mid_rewards: '11150137115821524995'
    },
    {
      address: 'erd1yrcc2dj5rafvf492xdrd98skh90z6l5gwwa0yn2sg02vfh2c40fqvq25ek',
      rewards: '28487122648990443',
      mid_rewards: '11148747740011487074'
    },
    {
      address: 'erd1frdr34g7stt3s0ysy6pwqnu84qtzggg9p89k0ujy7w30utdfvskq49y68g',
      rewards: '28423843897971038',
      mid_rewards: '11143974703614688511'
    },
    {
      address: 'erd1e4m0xvy9c8y4wmry5e6t2c6qfzupdf5vhetwltjkvnm543m7q5aqwt76hx',
      rewards: '28292623270847212',
      mid_rewards: '11134076897175988618'
    },
    {
      address: 'erd19scm7vtrgej7jxk94ufyn0p9gu5v9dg5x8ydrf3h9tqnvcx984gs39wmf9',
      rewards: '28085734943713535',
      mid_rewards: '11118471571540231574'
    },
    {
      address: 'erd1g742l5f9ywggaacy2h9a7vn2htfapvdr7leddcrt04qww02yjk2qfmlwem',
      rewards: '28061202052860441',
      mid_rewards: '11116621086518417607'
    },
    {
      address: 'erd1hwnl7zkrkwespzv5c2ler8jmz7xvusqscd9xqsrx2z9wkhgmfxzq3jasul',
      rewards: '27961776757069322',
      mid_rewards: '11109121561829190640'
    },
    {
      address: 'erd1cdruaxl4dln5tvj6e40wu29cls4pq824ff9uxexkgvly4gu9jlzqdhjft5',
      rewards: '27889464555601380',
      mid_rewards: '11103667143655967299'
    },
    {
      address: 'erd1fcwxzeeefj5cmtt35pnsm7axvlhgswkr8m53l0thge20ctwd00lsn27ewz',
      rewards: '27621080199503914',
      mid_rewards: '11083423250100108101'
    },
    {
      address: 'erd1qje8mkvg8l3e5hvrlvxr2awq0wdchhnm6thh4r5u2t3nap03k7fser04ak',
      rewards: '27551592565006020',
      mid_rewards: '11078181885451741782'
    },
    {
      address: 'erd166vr0kcq9ajvq47tq0503a374gmrxee0yxqfc205gm0q28f66d7s6a7ekj',
      rewards: '27543742930188243',
      mid_rewards: '11077589797395589451'
    },
    {
      address: 'erd1l5dmkywupd83v4nqg9urk8eegnlj6capkk9s5krp0waysv83236qw3e23a',
      rewards: '27188176482437340',
      mid_rewards: '11050769868600297745'
    },
    {
      address: 'erd1j5dq8ye7p28lkffsxpn4kcpf4vdr7xu2twvxfn3fvp79zgnx8exsl4hgqf',
      rewards: '27123638104695727',
      mid_rewards: '11045901820148194311'
    },
    {
      address: 'erd1jmg4k2a88wsr2f2k6ymanzkrucmz4kqnwweuktr3ukjsccp2zkuqf8gw8c',
      rewards: '27112928482618159',
      mid_rewards: '11045094006859393559'
    },
    {
      address: 'erd1l39c4skznpu599szf53nnmqpylshwgayxukzrvnfca7emfsv2hmq7kte42',
      rewards: '27103599226467135',
      mid_rewards: '11044390312831832249'
    },
    {
      address: 'erd1txyuzdx2kh8vh69w9zmneeqppm48ecm6xkej9vxuev7tmyyrcyrs86a7em',
      rewards: '27014185756320125',
      mid_rewards: '11037645967526330463'
    },
    {
      address: 'erd1a6swp8ylz5ufqqfuxulf22zasjey3mrfklsmyypke6007nrtkx8q7u6zpq',
      rewards: '26904638381988013',
      mid_rewards: '11029382947216391929'
    },
    {
      address: 'erd175kzzd3pfweqtxameq5l08yudl3g77uwrv03e9e2r7yys8cjh5pssvttje',
      rewards: '26817193321271263',
      mid_rewards: '11022787076552109773'
    },
    {
      address: 'erd1t43qq46pj4m87a7y9se5zcs96s0560pu4x7q2dsuxz7tmhm7uewsw9vqft',
      rewards: '26798697033626711',
      mid_rewards: '11021391924898341681'
    },
    {
      address: 'erd1vs339yfntu3hy67fy9l4ecl8fckuve9jvzt83adlh6l8wg4apd2senu27f',
      rewards: '26768711665984808',
      mid_rewards: '11019130166427756516'
    },
    {
      address: 'erd1gqw2h9xqcla7nmuaf7dt466txt6at9c50v0cu5p353dqnfawttpsf38wcu',
      rewards: '26764008975849279',
      mid_rewards: '11018775448440783887'
    },
    {
      address: 'erd1fj88jp8frg4ugycetaunavnxpdqfpaqx30k9u73ct3zetcpvyycsp35wwe',
      rewards: '26610265440603186',
      mid_rewards: '11007178767443128750'
    },
    {
      address: 'erd1079rhj26huffu5fc85av83q6ml4tkhqsk8vehj9xckf8dhzyhkmsrsejtg',
      rewards: '26567592823243390',
      mid_rewards: '11003960025724561884'
    },
    {
      address: 'erd1c9lrt30ugs7nr7yjqxmp62jlsf0ucy49rlgrcp0vhhs9xa4g3xyqzgzfwk',
      rewards: '26503707574785351',
      mid_rewards: '10999141241990742123'
    },
    {
      address: 'erd1lkapzhd6chwrjvf4m203l0dw5yhsw805dp79npj9wkrtf33fg5tskwdyhq',
      rewards: '26495200468208657',
      mid_rewards: '10998499561668866726'
    },
    {
      address: 'erd1dlfrcu2g29fnpjmzcx76xwvvjgnufdetj689xcksz79n3c5g4a8q34kmky',
      rewards: '26461936671194189',
      mid_rewards: '10995990515404709473'
    },
    {
      address: 'erd1h5fn6rnmu5jx45z6g8txc8kkwelhq6hfg7k4tdg2j082hv2kmdzqnqu723',
      rewards: '26432742464805456',
      mid_rewards: '10993788433229820459'
    },
    {
      address: 'erd1v2tra5yrtframmpnf3s7cmatumjkwkutzxzu5w087fn29ngpzr7qv79zgl',
      rewards: '26423261228384154',
      mid_rewards: '10993073275522114614'
    },
    {
      address: 'erd1xryfcj96nfpnwl00agh6n6uhf53t69fj4hd3hwdj3upqx0ql78yq6wnzcc',
      rewards: '25989298553416922',
      mid_rewards: '10960340018163171576'
    },
    {
      address: 'erd1hf05ajuazak04lkplwetwnnt577mrywf3l2mxn8tfanxe5duevssy2jv6v',
      rewards: '25776778442753436',
      mid_rewards: '10944309894197270092'
    },
    {
      address: 'erd1ce34qhqj0xnev3uc7umjq4plj3x34h87ttwmnfj4ps5zw007rc4qt0n2e9',
      rewards: '25597985882667332',
      mid_rewards: '10930823796841997219'
    },
    {
      address: 'erd19pvmk2cstveuvctp6hju00c8u27ry8v83yvkf39v9dr440mhskwsx0g9kc',
      rewards: '25579767828740562',
      mid_rewards: '10929449632006717102'
    },
    {
      address: 'erd1xnd94duevzzfn8de99h4kd7afnmnrx2svquls3uq3e6jczq3562stc67pk',
      rewards: '25540421575011903',
      mid_rewards: '10926481793702402757'
    },
    {
      address: 'erd1cvcwg434ud3gjt8zd469l394l45ss60uzq8w5wu8ykg6y2ys52dszqz2ty',
      rewards: '25508660623611985',
      mid_rewards: '10924086105187908048'
    },
    {
      address: 'erd13aq7ggh47m9c3lnhlppj3kfppn8fsfyzrkxhdq2eklp6rpegzhlsfrv4rx',
      rewards: '25218688545762449',
      mid_rewards: '10902213877001755779'
    },
    {
      address: 'erd1jhwzthv5u0twch3n6tvmemg50pjjxys7f0dtsns0vxhy4ryv7cvq4zkf4z',
      rewards: '25218688545762449',
      mid_rewards: '10902213877001755779'
    },
    {
      address: 'erd17w98rq96hm23tqk30kf90zunlnm59jrqd8sxwpah5x0sr643vyvq82z8l9',
      rewards: '25132948578885738',
      mid_rewards: '10895746619415755896'
    },
    {
      address: 'erd1zs7k00mtysq2te5q7pj86w4zjz4vldecdwhcqvlculkvlc7qkjgq49vf0y',
      rewards: '25036845288466280',
      mid_rewards: '10888497669402764808'
    },
    {
      address: 'erd1nkpc94w2eexu8w5rldu9maexhg2aa4qxcnrvufeqs8vkn2l7jqgs0am50z',
      rewards: '24781054135215639',
      mid_rewards: '10869203665257992918'
    },
    {
      address: 'erd1ty5enrf7ll93avek8q87th640cv9xcsu2266hqtqfdwa8xgc6chqrtasd5',
      rewards: '24696945265945190',
      mid_rewards: '10862859439307668526'
    },
    {
      address: 'erd1uh3j69htq0kx8wa8t7p5df9xd4pek2fpnvuetyk0k8qjws29mewsjnp25f',
      rewards: '24666348445457202',
      mid_rewards: '10860551559719926754'
    },
    {
      address: 'erd1dw32ztuzd6twcqf4nky8qhzttcp6x33n74jl5hpa2usyudfa90xsym45tl',
      rewards: '24496878321286923',
      mid_rewards: '10847768641950474240'
    },
    {
      address: 'erd1xtd4fyrsx49qqg4gtyj97ngrgwzp3ucxxwltcr4z7mdvqqzfxagqg78n3d',
      rewards: '24483073471322422',
      mid_rewards: '10846727359525151077'
    },
    {
      address: 'erd1csa8t83scrru5qltseqxz3wpxkfcvz90tc8c678ysatwa2tkjc4sw7ljap',
      rewards: '24470378236793153',
      mid_rewards: '10845769773992915890'
    },
    {
      address: 'erd1yx47h74fzq8z4aj07e0daftquk24ks0dnct4fpahf553clgw4qgsrcp27y',
      rewards: '24242377787490634',
      mid_rewards: '10828571987603711943'
    },
    {
      address: 'erd137z9pqcxqg4zw5t8e0q6sca060cx90a29wxkxvzqxwkur07wd87q5l4e2c',
      rewards: '24124414204436737',
      mid_rewards: '10819674143282474346'
    },
    {
      address: 'erd1vw2zrp9a2camyej9fftn00y8spe8uyqq792yvk5l8z49s9vvvgtqgx0upz',
      rewards: '24075680999752959',
      mid_rewards: '10815998259104277212'
    },
    {
      address: 'erd12epzx8cyfl6trfaag8pn4cg38dqyha7wc7xuyy3kfcdq7wh9zwks849dxg',
      rewards: '24037068046290492',
      mid_rewards: '10813085732714372227'
    },
    {
      address: 'erd1wua5enthk8lspt4zw260wusqqczemu5zwt37hpvvdeq223u0el4smwu0p0',
      rewards: '23939713014582005',
      mid_rewards: '10805742365434357667'
    },
    {
      address: 'erd1mhcp89ypl4gr4w3nmn8mpvk9h4t7d6xlfszm3rqpr449dvkd60aqhre4ql',
      rewards: '23741650459156562',
      mid_rewards: '10790802756629520969'
    },
    {
      address: 'erd1r28026e5s33eakuj86jxjvs7kcl4wrt7835skv6xvgsn6srtrgvqv9yp9t',
      rewards: '23471017090763271',
      mid_rewards: '10770389222912124316'
    },
    {
      address: 'erd14ygusxjvwplnwh7g5qlee8l7ahu30jlj7dpgwjesnu6t0vf4yrrsg8z3ph',
      rewards: '23467894384482483',
      mid_rewards: '10770153681115002848'
    },
    {
      address: 'erd1tefa7wancr93akc6j2reazgu9nqp6chkja08e4ks45xwekgstrksrvg75m',
      rewards: '23315186854072507',
      mid_rewards: '10758635144655765187'
    },
    {
      address: 'erd1qhe87lgl3rc245dzutugnc0udxp25g3dhzwk4nr5hvvv2w4ulm7qznrmlk',
      rewards: '23188214640652665',
      mid_rewards: '10749057790705635352'
    },
    {
      address: 'erd16ttp56demc8n2mq20a879wng7czapf3jvey0nughmedfpshurwgsxmnukv',
      rewards: '22932670413567683',
      mid_rewards: '10729782411890172678'
    },
    {
      address: 'erd1trne3l2fu3um7mx5g0m3pxxkkmr92g6ckjrdg20l46xvh6djw75s228zq7',
      rewards: '22916114884108917',
      mid_rewards: '10728533649179120927'
    },
    {
      address: 'erd1t66ea4frzsfsp8w585k9kdy55x4tr8zxaredykzlylprjvh2w7lqsk9xlj',
      rewards: '22753642521930784',
      mid_rewards: '10716278563772769320'
    },
    {
      address: 'erd1nwezyzwrh6e8aec39xkfy7zqwsf4z9c5mqzp9vhc8jpzxvkn9yeshq054a',
      rewards: '22694077349240585',
      mid_rewards: '10711785637906632576'
    },
    {
      address: 'erd1pdcvgsmy8mdrcnyky3h6j64kvlmu2hldkkrdp0yxz5ysarnrfwqqexmrds',
      rewards: '22493929677146470',
      mid_rewards: '10696688751380747135'
    },
    {
      address: 'erd1zujgsmy4yp8m3k0xt0t6cpd79nu5l0zzjpevzke8r6l0t2k909fshhk4f3',
      rewards: '22473744953342326',
      mid_rewards: '10695166243116528055'
    },
    {
      address: 'erd1nvfmuj6qpu30lkacvk936wr4h585s7tkq5a4zhd29ed9fe66grzqutlvpj',
      rewards: '22390127148524987',
      mid_rewards: '10688859057538684296'
    },
    {
      address: 'erd1tjuqgp8h3jvlh2qnv6thptxuv8hc3w79qlx6lwgywm0kfdvqzcrqa9zk7j',
      rewards: '22359271340553908',
      mid_rewards: '10686531642851668369'
    },
    {
      address: 'erd1zxmm4aveg22p7mk6hs7nnyfewwvqx7sxsyyenqpejx9khgfd6y8sqep3nu',
      rewards: '22343251607897759',
      mid_rewards: '10685323294617814422'
    },
    {
      address: 'erd1rlfrynuk6893fwf2vn0vmyucsg050s56zuqjwh0cvetwk8mdkydqk5u923',
      rewards: '22225127472950580',
      mid_rewards: '10676413340069717656'
    },
    {
      address: 'erd1r9pe53v22wka0w5phzje7ay04hkwk0awmdp2vt2587kq2nrshthsr920rx',
      rewards: '22104443942273328',
      mid_rewards: '10667310333529022251'
    },
    {
      address: 'erd1cdp9t37ecghf2g2a2xqunmypf3txtmke787wpsdltyw45gaweffq6kw9d5',
      rewards: '22058971853854112',
      mid_rewards: '10663880431238491846'
    },
    {
      address: 'erd1tv6qj957hx2la4jrnfvysjmfqs7cr7ne0vy6pa3dtss8na5lq6wscjh5c6',
      rewards: '21744363522330043',
      mid_rewards: '10640149921503241865'
    },
    {
      address: 'erd1hdc0wga0lrzjr4rgpr4htgk293kzp3h52d63z79sunxcesrm65nqtpyzaw',
      rewards: '21665847442105449',
      mid_rewards: '10634227552578308130'
    },
    {
      address: 'erd16chvdxp06q2yeg8697cwr3u3d99mkgqznku46n0523hsffw8c3psrswt62',
      rewards: '21472067421028061',
      mid_rewards: '10619610969939198663'
    },
    {
      address: 'erd1wsuurfg7ytnrwcftg7qrz70te624mlpr57hjpxdr75yd2mc9yehshavtdk',
      rewards: '21447621887321185',
      mid_rewards: '10617767074156769196'
    },
    {
      address: 'erd1j99m2d0rrud0g4exreclk5r6q65yg9xmhyvms9rqc3xwwtn4j8xsg9ex70',
      rewards: '21383017789035514',
      mid_rewards: '10612894068486899090'
    },
    {
      address: 'erd1lkmds04t7tg5hdmlzxjzhrd4jydpv22vxthgrltewy6y7ydyeywssspx04',
      rewards: '21334205334409797',
      mid_rewards: '10609212206585513282'
    },
    {
      address: 'erd1ru79wecy9v046fkdcyncut67dsnrwqar3r44jhqep9m0ec6s4amqz2l0e2',
      rewards: '21310068380285454',
      mid_rewards: '10607391586571884739'
    },
    {
      address: 'erd16lzumcn5m72umw4pem09264ahdq87je5ytvnc9t0yffldsggv2cs8cug9l',
      rewards: '21187180204501812',
      mid_rewards: '10598122286430805275'
    },
    {
      address: 'erd16f8pr44eenza439f0k3k9d5axx6l8zwlk3ew8uyvx7ztctzyzzss69aa7v',
      rewards: '21138483383044192',
      mid_rewards: '10594449146593479089'
    },
    {
      address: 'erd1n4ue6jmgauhh7q32hlda0cpkvhwgpu6guqu6jfc6ljp6gwlxa5ws4k5292',
      rewards: '21131807116536588',
      mid_rewards: '10593945564229381082'
    },
    {
      address: 'erd1v84ktutaqlrexaj9878ce8wxnxk688372j4nm99p9wwhz7g9u3vqxmd9zh',
      rewards: '21085556638670509',
      mid_rewards: '10590456949004399400'
    },
    {
      address: 'erd1mvvg6y5vc58dy0zs4wq5y5kncyg5htfs790pvjn7f57lt4zvhhpqwyk55k',
      rewards: '21026799094213941',
      mid_rewards: '10586024941517530616'
    },
    {
      address: 'erd1nrjly45fneplg4x8xcd4svgrnggrf2acf03y6uhrzc85wuy7d8cqj9qt80',
      rewards: '20951171017327356',
      mid_rewards: '10580320411042697856'
    },
    {
      address: 'erd1zvuh2pdw495j4w4awwehs549xjcmvn0hjgusmhgs2prtzs2uhwyqhc4eqg',
      rewards: '20767593413735177',
      mid_rewards: '10566473383889557185'
    },
    {
      address: 'erd1plpcrwuc0n5ts6cn9qvj7469ayyhdwecshgktlyj3c47u9c70ayqnjkqy3',
      rewards: '20756911235964661',
      mid_rewards: '10565667640690230922'
    },
    {
      address: 'erd159lqat3e83uad96jws3rw58s9we3zuq4mgth4p2l335qh66c7pysn4hxj8',
      rewards: '20682166263702377',
      mid_rewards: '10560029721683640910'
    },
    {
      address: 'erd1e29esep45xnl6958y6vpfshr65dzdhls0ns58r7hr7zmlpfg6ucst0zrjk',
      rewards: '20654922613303630',
      mid_rewards: '10557974767487484309'
    },
    {
      address: 'erd1zj28a6dan74gnys9cwky56k8u0hjxzghr6uu9t3ajflufwrncc5seeqj3j',
      rewards: '20648595642388244',
      mid_rewards: '10557497532049456107'
    },
    {
      address: 'erd1q00mnqkual64n2zs49pjs907764m7gpuzwjcczr5gaxmzvdn53vqnkacxh',
      rewards: '20617478193847477',
      mid_rewards: '10555150382144189475'
    },
    {
      address: 'erd1hynhnj6vh922paaqzqphda7rtwcrpgdz3wyzfcxtgjawdqc3vk0srmxpnn',
      rewards: '20609199485229721',
      mid_rewards: '10554525929592353839'
    },
    {
      address: 'erd1z49jk249urda0n2fa2xqny53gv3fjhyl4c36x38rl2da62cxy7vqcahmut',
      rewards: '20551832417682724',
      mid_rewards: '10550198804025424579'
    },
    {
      address: 'erd1z3wa4ujwr2r5t930w7nl5869479j2k5jer8hekjysu0ju5ar343qwjjw7d',
      rewards: '20391391133954352',
      mid_rewards: '10538096920305409822'
    },
    {
      address: 'erd1xmt2ltcmg0kgggzn4972qfywlxcu8vmj8sayfjkvragmarg5qlus53mxga',
      rewards: '20377259002119849',
      mid_rewards: '10537030951421324968'
    },
    {
      address: 'erd1c0enznx8kd29qfsam7zaxxlw7kjfpcmgj8962tf58qdp4rgx9quqd9af3v',
      rewards: '20289385124337179',
      mid_rewards: '10530402735626485844'
    },
    {
      address: 'erd1u48d4p5jwzxjpu5hzyy5uyp88cf8h9aafygvgfnaa3wagn84swuqrkefgt',
      rewards: '20238597905019865',
      mid_rewards: '10526571919714531548'
    },
    {
      address: 'erd177pmxxwjmclp9dfkg4za7gw8837mrnt2pjdwfulwmje5ydvczeaqhnlpxq',
      rewards: '20051949340555300',
      mid_rewards: '10512493253855175773'
    },
    {
      address: 'erd1xxm8ke7mw3037396sks5n0t4z96xlpqehxxw2gm8tnhfx0g9zadqltaux7',
      rewards: '20043622565696574',
      mid_rewards: '10511865175727393849'
    },
    {
      address: 'erd1fpdruvjmya23tka5rpka0mts94pjkqv74495v5atyhghq2vqk6lq8ql6ar',
      rewards: '19960337444238930',
      mid_rewards: '10505583084035868209'
    },
    {
      address: 'erd14luyqlwcrdm45sv4rzd9kvxea38hskp8nlvl0zu476h4cpssmn8sumf8zm',
      rewards: '19776907939507599',
      mid_rewards: '10491747227793053108'
    },
    {
      address: 'erd17ypwg4f67drrl8v8h9dvnaynr3ktr87ptmpytl8tc0z0hpczckwqmy0wvt',
      rewards: '19726485189965158',
      mid_rewards: '10487943903376632097'
    },
    {
      address: 'erd1we4le7xulhvsyjxx2ker287lcnrc58g43hd8lzkzrejn2huhwq7qu000x9',
      rewards: '19726230975126147',
      mid_rewards: '10487924728271882737'
    },
    {
      address: 'erd1xhs7r43lzy7zcqtfnetyhk9m89x3rsmsxsuf586f493kj58dfrjs3udad6',
      rewards: '19664611333912803',
      mid_rewards: '10483276836435667965'
    },
    {
      address: 'erd1v2k2pd0f03ux8kep9zec2swazqm2lscu6naxv0vvp2l0fdzcd3tsyl0zr7',
      rewards: '19535246087249199',
      mid_rewards: '10473518979005503856'
    },
    {
      address: 'erd1c5hv26494xefg5d2jnmq65j8ra4wyn80yr4c3x94h5daz3n62afqat482v',
      rewards: '19528066075433682',
      mid_rewards: '10472977399768037601'
    },
    {
      address: 'erd1usparlmtdge74egwne03u6we9tmsrr20ge2qrrqq0rqr5nj43ylquxux3l',
      rewards: '19527029594871993',
      mid_rewards: '10472899219346240105'
    },
    {
      address: 'erd1t53sl7k4d2szcu20fxj3n9nk0hhjws0ck3rpedunhudsk5s87vls7x8usf',
      rewards: '19476719042275149',
      mid_rewards: '10469104357803948514'
    },
    {
      address: 'erd1np4787cxksjwhz5k7pjm35cngmpds6ezfsghg6tkg3yq9mac4nes557vc4',
      rewards: '19447012290530427',
      mid_rewards: '10466863614979161474'
    },
    {
      address: 'erd1fl9j6a3gq97vrlv2x369egal6zw6yjrmdt858k7pnssvzd03l8hqdxa8x0',
      rewards: '19427967506314573',
      mid_rewards: '10465427090920657693'
    },
    {
      address: 'erd18q8wnczup5pgmmd2at00pst3wlq7n3ngnex83l76f3jqlrscuh2sm6eml9',
      rewards: '19421610604902699',
      mid_rewards: '10464947597863020854'
    },
    {
      address: 'erd12p26vwjq24exa3p4aetyyvlv5mk6ktfsve3rwn2pxjdzc0c5hzdqufe4fl',
      rewards: '19321370917441332',
      mid_rewards: '10457386644637030396'
    },
    {
      address: 'erd13zzl5r0h686umqzspz7wt0a0aj6d2pv7yax03a0e66pcfvrz2t0qrgv85s',
      rewards: '19317917373747783',
      mid_rewards: '10457126148191040357'
    },
    {
      address: 'erd1gfs9yj86ky72pezhl85elc7d59a0xkr0td6mg4vcmq928u2nvq9qrvsh7l',
      rewards: '19291455644131821',
      mid_rewards: '10455130173293550722'
    },
    {
      address: 'erd14tx2d78l99zftrwmyjstdl3agd59fplne6fd0ssjg434n3k9jh4syhmqpk',
      rewards: '19188596254450212',
      mid_rewards: '10447371619232452841'
    },
    {
      address: 'erd1fcu0ud9hulce63zcztz6rcqzuteh0uyq0acc9f60u7vchel9e7tsjvaean',
      rewards: '19160823005996380',
      mid_rewards: '10445276718122808341'
    },
    {
      address: 'erd16h78vn9txtdkn7ny386nhhth8t4slafyhnaxsu3uscduutn27f8q47uvrr',
      rewards: '19160611278057656',
      mid_rewards: '10445260747751372930'
    },
    {
      address: 'erd13z4jdlyh4r38xv0k5nxhrgmymtl3h2sru6hszvmyhs5e0tapvxdqhrxu7s',
      rewards: '19147344688666936',
      mid_rewards: '10444260065642399730'
    },
    {
      address: 'erd1etnj4zqqftafxeyquvxd2gjw5zj0ut4djg6u95p9dxlgwnadeqzs9hnnr0',
      rewards: '18979245945548417',
      mid_rewards: '10431580589416411358'
    },
    {
      address: 'erd1whn3qpx553k4dh7xayvzh7rnnmvs47drezvkmtkav7l48mr9xd0st3rhx0',
      rewards: '18963415826579563',
      mid_rewards: '10430386543503892936'
    },
    {
      address: 'erd1tnvf5l7vqv2q8cc03jn66x8c20m4se8d0f6ac04knl3jmgzj3rnqxs8yng',
      rewards: '18958911981977281',
      mid_rewards: '10430046824184754913'
    },
    {
      address: 'erd138hchqjy3jeevthvl2jpccj4mmal0p2fh08ylek4xus095rptxssfse23p',
      rewards: '18833349365812132',
      mid_rewards: '10420575794378086978'
    },
    {
      address: 'erd1x3qvkp7fk8kjcx4s7kr5yx8q4qadvcsdr5lcs8eq33yq96047ljssaeczq',
      rewards: '18832532763990889',
      mid_rewards: '10420514199132420868'
    },
    {
      address: 'erd1c084jc5530qhf6uthgu6w6yu6apj6l4efjwj2hqzeucacw3eau6qs40dxl',
      rewards: '18794867698462907',
      mid_rewards: '10417673170734156010'
    },
    {
      address: 'erd1emedz2rlgflma9yfzj4ygrq2htz889zvuzwnkd373t8pkjk6yx5q9ywsn3',
      rewards: '18734031123922664',
      mid_rewards: '10413084344629669806'
    },
    {
      address: 'erd1l8yhd0rq2aq6055urp9sxl7xw0xee8mw6jax9zy5tc2phmn6zcssswgud9',
      rewards: '18628849356295618',
      mid_rewards: '10405150616528596108'
    },
    {
      address: 'erd1cgvxa4m9gz05gjgachh62rsg7x4at5uxf74fxatcs74tu5fzv0dsxqp079',
      rewards: '18602956302921170',
      mid_rewards: '10403197536162920296'
    },
    {
      address: 'erd1ujwcqe88tjyrpat74en774zn9pvhklcemqwtha7y643v23ysh4vqx049ag',
      rewards: '18421052404272203',
      mid_rewards: '10389476754463154688'
    },
    {
      address: 'erd1ymxmp67huq9w2dqa8tvr9c5xkay5zngd5e905908hmrllvnssh8s3t59w2',
      rewards: '18350033645648747',
      mid_rewards: '10384119899052698538'
    },
    {
      address: 'erd15c4cvq77r75tmztmm9urrzpj6nhwv26vv5glv4tar8atta0hmz2q5d5ejk',
      rewards: '18169035989294010',
      mid_rewards: '10370467474066442518'
    },
    {
      address: 'erd13qn9fdlwwxt9923unzkg6dsq7la3r0m363d09pw6w96qqvnx0hcq3462g2',
      rewards: '18150110637263364',
      mid_rewards: '10369039958627068596'
    },
    {
      address: 'erd10a3mlvqk5c6xkqvy7u3stnatda4g550gknxz40zgkmjjm5uyqydq9jgn7m',
      rewards: '18107148197373711',
      mid_rewards: '10365799355960532079'
    },
    {
      address: 'erd1apz3sp3z0xnza6cfqy9st0kx5rgpmlwuckc8vy9x6jnz730e4kwq2lzez2',
      rewards: '18100019555910678',
      mid_rewards: '10365261651523977228'
    },
    {
      address: 'erd1m20smvqlqh5sgvu3tnsdtk8cdpcau8gw0ts64n2muslpp277eaqspg8lj3',
      rewards: '18090982614158049',
      mid_rewards: '10364580006402887220'
    },
    {
      address: 'erd1eae27e42rhj8l3ekvhc42l7evafv66j4ydg0sl5zpq8tka4e6n3qnqy9q0',
      rewards: '18059104348888631',
      mid_rewards: '10362175469051145375'
    },
    {
      address: 'erd1sethekct50xtgnk6v2ksnc3gmpty5zemn70dxuauuwk7rnpcfjzqn3e8ph',
      rewards: '18054872868421205',
      mid_rewards: '10361856293815256586'
    },
    {
      address: 'erd1f9s3a4f3w2e2cue3yhlyqrqp67035kfw975w9gzguj43clrdd8cqmmen0n',
      rewards: '18023187301476334',
      mid_rewards: '10359466291455148551'
    },
    {
      address: 'erd160w6pflar4skt8rlrsg2fwjxlaqxuuc3wqvxqq6hz7a3ganlq76s268sj6',
      rewards: '18002434205959079',
      mid_rewards: '10357900911629309083'
    },
    {
      address: 'erd1p5zeqk5fmqmmkfarcxdrkrnhtw8vp6qwh49zj2rwpxwgsjthhkdqfe7p7x',
      rewards: '17991767715178405',
      mid_rewards: '10357096351679845782'
    },
    {
      address: 'erd1vdtnvjrem0cd6gxxu07qhz4lfsg6ml4z28rdyffk7sc6ylfx50gqxuezhn',
      rewards: '17931871522962591',
      mid_rewards: '10352578457428297529'
    },
    {
      address: 'erd176wszxakltyun5j7vcgf2fjdc3ketwjjxnalepyf5scfxe6f9xwsjygp8h',
      rewards: '17632980856024441',
      mid_rewards: '10330033511313262766'
    },
    {
      address: 'erd1y64lkcmp4tmej82k6ups9dlnx5z9z7caj9xw8wj0tmug2juz6sxscyptff',
      rewards: '17493614686924596',
      mid_rewards: '10319521296914594342'
    },
    {
      address: 'erd1pxhqvgx95us7hc8grwmvfv5sunn5cpf83rj4h3k7ya5zh26wmaqqcke04t',
      rewards: '17418737525506958',
      mid_rewards: '10313873407046702513'
    },
    {
      address: 'erd19qgn68djs6ttgsz6u3rnjrac4axk2e5r5ykes430nzty0323fdts8le9z3',
      rewards: '17418737525506958',
      mid_rewards: '10313873407046702513'
    },
    {
      address: 'erd1qt7gewcjeydxcssmmvurqsmtrdw5ru2z8pddjg6e9seshwt9y08sap8mvl',
      rewards: '17378877752668591',
      mid_rewards: '10310866834643474992'
    },
    {
      address: 'erd1mxn3mvtvpw2n6l8h6qhvfurt3xjqnw7h6gty2dywxj92hww8c2nqd9996r',
      rewards: '17377159695457767',
      mid_rewards: '10310737243754480826'
    },
    {
      address: 'erd1d879dffz6ga5ytfdkmkufsayxd6vrft6xpwkaxpq28a44xlv5qjsw9zmhj',
      rewards: '17178438460635800',
      mid_rewards: '10295747951593339161'
    },
    {
      address: 'erd1cymykq8qf78z0gvzyy20vq3a060jjztt39ke4ge7ajmwfk3zfgyqkg6eve',
      rewards: '17174031411249973',
      mid_rewards: '10295415533415322493'
    },
    {
      address: 'erd1tk5tm8nvl3rtkplm2zh7yxtsnvlk0ld3dmcu6lnqyz5z7vhthqesfs23m8',
      rewards: '17100331412751098',
      mid_rewards: '10289856435462026045'
    },
    {
      address: 'erd1jj8az3kcuw30a9j2j80r37c4r50x5526a8mdttccgmpc7ecdyhjqawu5uy',
      rewards: '17079935101936511',
      mid_rewards: '10288317967456414084'
    },
    {
      address: 'erd1j9rhn5vx4dvm24t63glehnay9xjx97s4fghwfxycrpzdpxpsyswsfxpzuc',
      rewards: '17013921649786925',
      mid_rewards: '10283338656001741554'
    },
    {
      address: 'erd1awg2lfc58jy2x2a7wpy5zcz4lhme0275pr6kuhczalsuh8qhhvjsyk3zq0',
      rewards: '16992281312534017',
      mid_rewards: '10281706352650566831'
    },
    {
      address: 'erd1466smlegdlcfnyvmrrsj2wrd084lxzywpm59x5f9ln3zrgmqz73s2l7yh7',
      rewards: '16973445099503277',
      mid_rewards: '10280285560853554230'
    },
    {
      address: 'erd1yl9gk0xhrqq4mmehn0pqupesjkla8csg7vpz653zt4jrkx2r0kmqsf7rwc',
      rewards: '16968245497617700',
      mid_rewards: '10279893361439866200'
    },
    {
      address: 'erd1ze4sw6epzqcnwdfx2ql7taj9lmjz0euzu7zg5zkr9un8gwn2904q64uzku',
      rewards: '16952077633947426',
      mid_rewards: '10278673839870405542'
    },
    {
      address: 'erd15nje4xuydfxqu4rrctvpxanh6q40qt6mh3af7rsyt44jjlm5e8ksvuxgv7',
      rewards: '16942397590634666',
      mid_rewards: '10277943686409566510'
    },
    {
      address: 'erd1f6cyxmz5rc6ej6k89g0a6sxyaynsxw4k90ptggz3qp5w84rrahhshyuqcn',
      rewards: '16930332982262747',
      mid_rewards: '10277033668213179682'
    },
    {
      address: 'erd1a6wyly7kd78vu7n6h6jefwnyvc3nv7s75cwv269pd5h57a4tegcqpng3cl',
      rewards: '16837648127414221',
      mid_rewards: '10270042566484759916'
    },
    {
      address: 'erd1vr7al2gw6xasp5sr5ruqgm7xcn3du3ml8sdz80vqeae9rlhesmfqp4c6cd',
      rewards: '16739609697530576',
      mid_rewards: '10262647651342137661'
    },
    {
      address: 'erd1uw8udlj4vpntc4yuxftzh4c423h5gfhm8j6mf9v5f9s8999ehqvqpx6aw4',
      rewards: '16679856556302875',
      mid_rewards: '10258140547246239793'
    },
    {
      address: 'erd1sjw2fd3uhq47ya2jukntdysvy6y0avzhprjh3hscqk6yry69f5zqxyq78c',
      rewards: '16664539222180990',
      mid_rewards: '10256985180048122028'
    },
    {
      address: 'erd1yk2r8k4nyj6dc0975zssuwzqcyzsp7v39hgj5cfyckrmjmp6m5fscfxwzh',
      rewards: '16643559571278553',
      mid_rewards: '10255402711435257785'
    },
    {
      address: 'erd1j0uqrtgqeh2zgckxf7qcz86syr6328qmxwzp90sgk8dkfe7wl4qstuwwrt',
      rewards: '16540679195336551',
      mid_rewards: '10247642574407001502'
    },
    {
      address: 'erd1xm57u2mkdqpgqltuvct2ttwk0cclxwjn5345shp0xt86fdx5r3lsdwmlwr',
      rewards: '16443237936152794',
      mid_rewards: '10240292703097257570'
    },
    {
      address: 'erd1dn9v5faqdyac6gextp7xu7hgehkqle0a9s4p2ucygdqt0fly5kys4uqn45',
      rewards: '16322161760101370',
      mid_rewards: '10231160079811102337'
    },
    {
      address: 'erd1pln5gmwrzcmn4m8rdljmwrysp2ca0dkfmemjk65h2r5dahnz4f6qzfj603',
      rewards: '16277685062066353',
      mid_rewards: '10227805258562094831'
    },
    {
      address: 'erd1tc2jhmdxmue7jzckg02mup37652mpz8wc3pyzd30p2pj5a4p4kvshll5yr',
      rewards: '16258390156571834',
      mid_rewards: '10226349868170936733'
    },
    {
      address: 'erd1a26yskf0xxzappcgvr4puldel9qssax8l8mpxg838f0cf629wpxs0sxr0f',
      rewards: '16200078668136136',
      mid_rewards: '10221951506127258993'
    },
    {
      address: 'erd1a95w3c5zgy2flrj55dezqa5uk6u0kjepf6nkwcqefec38qnhlncqppfhpn',
      rewards: '16170065880804005',
      mid_rewards: '10219687679424015331'
    },
    {
      address: 'erd1rtymjs726aa4ckdsexh2ljyfqwaf9ayp86p2adnqzuy8657276zqq7g2ka',
      rewards: '16106111941982243',
      mid_rewards: '10214863714462676420'
    },
    {
      address: 'erd179lnc8lt77h3cd5jwfe4llg6dagtme7uhjx3kyengs4ajjwzafxskq9t69',
      rewards: '16031532290588556',
      mid_rewards: '10209238265400740054'
    },
    {
      address: 'erd1d402j6udny6hvzl4v8rjyvy98y43u2z0qvnehwme4a7c0hw9xdus5mlvk7',
      rewards: '16031532290588556',
      mid_rewards: '10209238265400740054'
    },
    {
      address: 'erd1jsrk6y5qvqdwp6as7yvnpz0w87j20dakmv05ke5kfl6yzqjhqgaq8kygm8',
      rewards: '16031532290588556',
      mid_rewards: '10209238265400740054'
    },
    {
      address: 'erd1gzu9k7lhg0k5ynxf7vfq9kj80qa90jxxsm20vyghek9j8pdc29eq8agtgd',
      rewards: '16030513996779060',
      mid_rewards: '10209161456782727530'
    },
    {
      address: 'erd14smhk7j2cnxs3yy7l9c6ek6s2xh2597586ky5d6un0j46j57dgzsjkdsu7',
      rewards: '16030513996779060',
      mid_rewards: '10209161456782727530'
    },
    {
      address: 'erd1u4q04c5eljuthwgft92mlr2magptsqv6rhuek5x44x5jnheejq7q2qkdc0',
      rewards: '16030513996779060',
      mid_rewards: '10209161456782727530'
    },
    {
      address: 'erd1epyeqprdcvhlxm7lc2hueam3r3yqrk5n673nwy88zuw3f2m220nql6zs6m',
      rewards: '16030513996779060',
      mid_rewards: '10209161456782727530'
    },
    {
      address: 'erd10g37lzneuc0lelv2hn7v5akhpak2qnw94x93a232rmu28576cx9q2y9nf3',
      rewards: '16030513996779060',
      mid_rewards: '10209161456782727530'
    },
    {
      address: 'erd1wf03qn40gn8u88rd50rxmwu3a5pp9gls82mq95f38mg92e04h5cq8ucee5',
      rewards: '16030513996779060',
      mid_rewards: '10209161456782727530'
    },
    {
      address: 'erd1yqhrgpqv49y39r4vhn0u40enrxh4fvzdrn4ad6d7xeae3h454rfqepkqch',
      rewards: '16030513996779060',
      mid_rewards: '10209161456782727530'
    },
    {
      address: 'erd16ndwwu2qrj3zxh57n2lmx4jy7clgxusnrdwzkjexw4yu7vskr2ysn7k568',
      rewards: '16024086017106617',
      mid_rewards: '10208676602381523513'
    },
    {
      address: 'erd1rgmyxtk05ac7cuakmtgqwqdyphmgxp0ff8lgyxg80csu96a8te4qd9m62j',
      rewards: '16011318063331323',
      mid_rewards: '10207713531728257434'
    },
    {
      address: 'erd1tq2m5f893refh2xn629t3wp7rs8c33npf03arw7659c6l9wjhatq7uzm5s',
      rewards: '15982377555426656',
      mid_rewards: '10205530585710115388'
    },
    {
      address: 'erd17gm7y8tw7c62kr2s7f3hxzvdyk4flvnlyfwxre6ay7leuf7crj0s3qucqa',
      rewards: '15938276291896033',
      mid_rewards: '10202204083012362743'
    },
    {
      address: 'erd10vrf5auuh3r5jc2rjfnzy3ve63s7czfs3guw7az9ttskmfwzxpfqsx3n4r',
      rewards: '15883458998947407',
      mid_rewards: '10198069283728199796'
    },
    {
      address: 'erd1g3qk85mq6k6vdmzxwll0cjrvw6hft46sr4kxn0q8jh3d6zmr0u3q0ut2en',
      rewards: '15791504449614455',
      mid_rewards: '10191133268023926564'
    },
    {
      address: 'erd1hygnnrpg9q93ka555nqms5s60sdvlewdq929457c4hupy2en65gscltze6',
      rewards: '15784745157449831',
      mid_rewards: '10190623423139212386'
    },
    {
      address: 'erd1hg833s279cr4lt3rn4h0f7kp59jkvauy8gfx7cndm6gs4n59jm5qs56uy8',
      rewards: '15776405778137720',
      mid_rewards: '10189994394273405467'
    },
    {
      address: 'erd1luqguf2tv8ut9uhm4xst6fuhkvhh32jvuhyf07p2jq39f9sandcs5n9qgt',
      rewards: '15575445092083542',
      mid_rewards: '10174836183129698539'
    },
    {
      address: 'erd10fry2lx5009rens2upgv3dslav0gm48zlmqvg00ed3r0dl2lhuvsnu3egk',
      rewards: '15499213298894330',
      mid_rewards: '10169086115095426661'
    },
    {
      address: 'erd1nu9fh3z6pvjeef06mu9mdlfyfy08hsat0ewqs2jvevgek5w56efqnlrs9c',
      rewards: '15466119767831830',
      mid_rewards: '10166589911777326127'
    },
    {
      address: 'erd1yrnswwu0s4tljncyrpsq66epjtlckysv29h3dzl94au8etrmquqqcslmn8',
      rewards: '15453147730836257',
      mid_rewards: '10165611447384097185'
    },
    {
      address: 'erd1ggk3vg869uzemkxr908py3l6er6hggxycg8kf6hkd8c9um409mpse32vt2',
      rewards: '15320104496867879',
      mid_rewards: '10155576164009364956'
    },
    {
      address: 'erd1dv5kfd6rheuc24fy6defu7efgd2pwyenkwqtu08t0x5ndhu9e64sqmsmx4',
      rewards: '15140953100428133',
      mid_rewards: '10142063000080418678'
    },
    {
      address: 'erd1xw22c5mc4m2rhp2xd0a4v4r0xn2tgzs9q3p64093yrm070xep9zs6629jv',
      rewards: '15039357549791257',
      mid_rewards: '10134399775804802118'
    },
    {
      address: 'erd134xyhgpaqsdzwwx7khxjf543upgcthkjyzmp48j3a0kuzag0c6cqt8d8un',
      rewards: '14979028030296268',
      mid_rewards: '10129849196222998315'
    },
    {
      address: 'erd1mmu8hghzln5sumpz3vk35vhynwnp9tecyqsxgs7z6whw22l8du6s7cpm9x',
      rewards: '14912641947765606',
      mid_rewards: '10124841777728556887'
    },
    {
      address: 'erd1cen56az946p46kng9gf3d64rrmpqwkylt7a3v9lpef0yrzcsekeqknzdft',
      rewards: '14898673197409305',
      mid_rewards: '10123788132503353697'
    },
    {
      address: 'erd1p6cutqqw8ngpzy5qkevg5apvkct9f7l0q8asa0rq7sqyrsjt9z3qdxc3st',
      rewards: '14878321612509932',
      mid_rewards: '10122253038117128298'
    },
    {
      address: 'erd1nelkzpwcncnreyphvpuzu635sq5j2rrefgs8hspxp9czqch9n33sfd8qlw',
      rewards: '14793744795611035',
      mid_rewards: '10115873515467257909'
    },
    {
      address: 'erd1erkskv045s2zsg79gwpn7sch4ahc0kahulm7t9uc9zy0gknnhyys9e5zkh',
      rewards: '14764236394737124',
      mid_rewards: '10113647733998541682'
    },
    {
      address: 'erd1dxev6xxzux7putej7ysktu42yjm74gtzj883fag9m5tfy6ktzfnqy3lenl',
      rewards: '14436082996858848',
      mid_rewards: '10088895536988113722'
    },
    {
      address: 'erd1yes87rqzyq3mt8wxynrc5dsf9ue5cj4gq230m7aysr8mn6ync4dqrclmlf',
      rewards: '14198955876060736',
      mid_rewards: '10071009337276454490'
    },
    {
      address: 'erd1uzjmdlzz567850f5wrm0scccfwsgp772cdugx9rtu2nz5lftsjsqc8gzyk',
      rewards: '14042554651242419',
      mid_rewards: '10059212190105632832'
    },
    {
      address: 'erd1gduemqr9xfnjsm96mnp6gm7z6t9787u7vqwzfs4t7ede98f2uuvqltd59h',
      rewards: '14029143449058901',
      mid_rewards: '10058200600036051246'
    },
    {
      address: 'erd1fns6t2v6g8sfetv02u8zg942hfysnj7rey0pujysl76p96w8zygqfcvygn',
      rewards: '14012088270040356',
      mid_rewards: '10056914149388748380'
    },
    {
      address: 'erd1nr060mwz7ftaudtnrtpqehghqlvj8eggwvtge025u66evwnlt96qyw3kgt',
      rewards: '13907163391547329',
      mid_rewards: '10048999798111124290'
    },
    {
      address: 'erd1jzaxzrxwmdztrvccpus5rs3m6q50qc5lyuyr5ecl9p3nmf5zexgs6f5kfr',
      rewards: '13844979781664095',
      mid_rewards: '10044309366829287187'
    },
    {
      address: 'erd1x4375n47r37pa5e428ffuajzn3lqcmxdjg9kqly056qyf573jxjq3zd4jr',
      rewards: '13823816055020639',
      mid_rewards: '10042713013615391834'
    },
    {
      address: 'erd120e47ywnql3kq70gdswy69339fq3uwt47ffqnf9m9s8p6aha0gwsufxgms',
      rewards: '13742506975932861',
      mid_rewards: '10036579972308095399'
    },
    {
      address: 'erd132ya0eyltdlexmmkm3plclc8atftye2ya9cszayk7ugrqz9thatsmfcrtk',
      rewards: '13704154735034884',
      mid_rewards: '10033687111138179219'
    },
    {
      address: 'erd1ky404flkh6l9uemvedg0ye8sdjx3cnw5du4rnuyyal5308ttskkst78q7x',
      rewards: '13631018949002480',
      mid_rewards: '10028170571019773788'
    },
    {
      address: 'erd1ed90hkl2lmcr3cy0zyskvc2m99su0hdl2ez7tp0pnhtf7wuxrp2sly2yag',
      rewards: '13629763305058930',
      mid_rewards: '10028075859380440926'
    },
    {
      address: 'erd1nq53ckpuf8v22xrudn2x8x2ru9z6zmhapslx3ga03gm7u0jgmzjqlngvys',
      rewards: '13629763305058930',
      mid_rewards: '10028075859380440926'
    },
    {
      address: 'erd1ft6q64q8mggh5j7mm278x8shcz9lmkkrkcu777thznatpp5f7sls74czl5',
      rewards: '13629763305058930',
      mid_rewards: '10028075859380440926'
    },
    {
      address: 'erd19z5a0297rn69vuf0eu55flt98agjl7rnv3dkyh3945pqy5lfzvzs2dz92y',
      rewards: '13629763305058930',
      mid_rewards: '10028075859380440926'
    },
    {
      address: 'erd13ke87lnzfch58ch7cmtf0z4h6mks3j5dru84fdx8ucp3tsz77m7sevzedc',
      rewards: '13629763305058930',
      mid_rewards: '10028075859380440926'
    },
    {
      address: 'erd1zjy0nuwyuglm6up4u5v6fwwamzn4qanykc76sz74rhnf8f5nt2aq8yz6q0',
      rewards: '13629763305058930',
      mid_rewards: '10028075859380440926'
    },
    {
      address: 'erd1zr0egqca0w8k4m5fuqxk73mtrgzqyw740lcnn9nxhmygkadnf6zq0t6e07',
      rewards: '13629763305058930',
      mid_rewards: '10028075859380440926'
    },
    {
      address: 'erd1xd0hq0pezlugypx8v3gxngvqgy4jna6psx75d8y3x2x0hllhgzuqhfafxw',
      rewards: '13570347799040938',
      mid_rewards: '10023594222682663599'
    },
    {
      address: 'erd1m804895twd2xuek5n8p0p6fw4qh6el886mn48l9g2k8sks8vlceq98xkdd',
      rewards: '13407478974709279',
      mid_rewards: '10011309232635998336'
    },
    {
      address: 'erd1a2jfydcdx5vmxhmjsjlr8kped5evcg39ew8g4s7hprfr2c2hudrse8lflp',
      rewards: '13399348516813352',
      mid_rewards: '10010695962449170576'
    },
    {
      address: 'erd1dngzzadv6260wlv7f47dzc4gu6qtmk3s7rh05jll96zdwaz7q65s490hfm',
      rewards: '13393517790294232',
      mid_rewards: '10010256158100203512'
    },
    {
      address: 'erd1t4lqrvpspy5zza0j50sr6dcj9dqcl9wgaw6r2aye920lpuf044ns3czmtm',
      rewards: '13321094883317959',
      mid_rewards: '10004793389550083069'
    },
    {
      address: 'erd1ch5ggetgv0rj90xrztyl2fjcnc3tt7wj9737qycc5tfnseaet47q0qpe0c',
      rewards: '13313201567593772',
      mid_rewards: '10004198006698240535'
    },
    {
      address: 'erd1q2r9sppw9jyxjz3gf3hfrul2s86wg936f6l7clrstj70t5lkxreq3a3cag',
      rewards: '13182729896496199',
      mid_rewards: '9994356693068189962'
    },
    {
      address: 'erd10fq0tc334rq97jwcr3vmp2aq9rjfswuqcepfm9ycl7wxk9wh9jss9at03p',
      rewards: '13162722721166879',
      mid_rewards: '9992847577061543588'
    },
    {
      address: 'erd1uhvpypjdwftyz0ek74sc9lp9pd64hrlauuhdre80vtxjpql29nmshw2m3a',
      rewards: '13144909406839999',
      mid_rewards: '9991503941223918755'
    },
    {
      address: 'erd18x59twvwx8csmjd8ahjf89sfstdv6r3ccp24exdmaehfj4xmwz4sg40z66',
      rewards: '13118848769812538',
      mid_rewards: '9989538220234614101'
    },
    {
      address: 'erd1sruhynzuxner6qhpxlwl33gq64e83sdh7euenh44pptjfvdthp3q3dwscn',
      rewards: '13114295533749238',
      mid_rewards: '9989194775379852632'
    },
    {
      address: 'erd1r6ua3503scavwgq4agedalq0nuxvjsnqg23sw749tvw29r6a3zkse0zyme',
      rewards: '12812110103370629',
      mid_rewards: '9966401309413101302'
    },
    {
      address: 'erd1xl6apu64ruy5j9xfrrdk626802wl5fzx7606ud3vryksekkr45fscltyfy',
      rewards: '12764370808929569',
      mid_rewards: '9962800394631221569'
    },
    {
      address: 'erd1gvkly0fmnhv74ljcu2ppecuynq3u27vdazqd92g9g83uq05jh7zsyqdquh',
      rewards: '12697047805626040',
      mid_rewards: '9957722305384311599'
    },
    {
      address: 'erd1xsv2w04y604qkx95nqef06xpum4lne7xeddzxkftt5sj7ftx5ngstmwj2l',
      rewards: '12690714858820789',
      mid_rewards: '9957244619192446297'
    },
    {
      address: 'erd109ext5w4eq9gr3vvytqa55t4kwekwye2uwxtfk3ddjmzlst5knjs37cp0u',
      rewards: '12686225226462102',
      mid_rewards: '9956905971884921434'
    },
    {
      address: 'erd1r2qvad5rcj29p23nj2aklkck3pm8mjv7fuamjn0f4gsfhm7vr22qdm23wu',
      rewards: '12657563654132440',
      mid_rewards: '9954744065625472674'
    },
    {
      address: 'erd1wqf0ayqzeg6079arur8rpu7mymtt0hpspgautvrp7fum633f4r3qlsxech',
      rewards: '12555319780804344',
      mid_rewards: '9947031939186772735'
    },
    {
      address: 'erd1y6hx2qg6v0eg0x8hhp563nma9hmx3ceuf966spfh4re6qvwtu3ds4m0j0w',
      rewards: '12453801101082981',
      mid_rewards: '9939374513187381416'
    },
    {
      address: 'erd1e9l699qprphv55jj0nv329yua3pr2mtkwueyx8mz22s9845axw3syyhuh3',
      rewards: '12393717160079818',
      mid_rewards: '9934842457281548982'
    },
    {
      address: 'erd1djwusluq97r5gaaqnvm53l202sd6mntqfwndehxay8zjepgh0svq4tn9gt',
      rewards: '12371935529638093',
      mid_rewards: '9933199496363308239'
    },
    {
      address: 'erd13ntxfr23uu7pzkqe76ke99hu0rlxanswcc0gd2qwm3tnuz3rp5gsnm2txx',
      rewards: '12351951830722676',
      mid_rewards: '9931692151152959519'
    },
    {
      address: 'erd1vflmx0x5ayah2fnf054zetcf7z3k4fc4pcj3va5xquyke5pasaxqfkku9j',
      rewards: '12231715041719764',
      mid_rewards: '9922622841773431813'
    },
    {
      address: 'erd134t3d7zfp0qg3rqzaemn7t4tr2ce634k282r6l8sv2uza2yjlmhq8et4v5',
      rewards: '12209845242334132',
      mid_rewards: '9920973230382930542'
    },
    {
      address: 'erd18hvqwpjph3cfxccxrh83nglv5qymjdnc69puf3mhm8z3h8ry0r5sch373j',
      rewards: '12206314503984608',
      mid_rewards: '9920706911241380441'
    },
    {
      address: 'erd1gwk07pl79mmaapajhrpj3j86d35kehvzl33rn7nkn0htlm9ak7rsq0ljla',
      rewards: '12163293087693149',
      mid_rewards: '9917461860059223159'
    },
    {
      address: 'erd1vuvfsfz8e5nu2g33a066n63l5h79gfw8lv5zlr2etdjwzkmpksuqms05ma',
      rewards: '12132034514689608',
      mid_rewards: '9915104065313683173'
    },
    {
      address: 'erd169u8x4cx0yl38mafx49t75pq3avj6kpmnpd3wmwjaa0wvfp3jypqtc9n3d',
      rewards: '12107462872103146',
      mid_rewards: '9913250657297486025'
    },
    {
      address: 'erd17e5knwktv6q7x06h33ydnntz9veyer03yxg7289sw05h2r6prr7q6q30ur',
      rewards: '12052767280647239',
      mid_rewards: '9909125037803456963'
    },
    {
      address: 'erd1eduehrp276qlly6d8fd5fjt7qgsncextzpf33d09g36guuf0ypfqmqvl6g',
      rewards: '12041181016419286',
      mid_rewards: '9908251100502671963'
    },
    {
      address: 'erd1txwydeaqpld640d9fgaelymm209w37ry68k6suqg74chvtr8d4hq6s8lgf',
      rewards: '12031929092926888',
      mid_rewards: '9907553239580036664'
    },
    {
      address: 'erd1r4j8n277uzsfla40fc4v8f2067jjgp47pcndz2a4wse8p69jg6xq5qejmc',
      rewards: '11977444299852290',
      mid_rewards: '9903443520342099344'
    },
    {
      address: 'erd10377jcwqy3azd7gzx2sgz2wl0xt93ykzsmcrwu6r6w7v9yf2le9qs8d307',
      rewards: '11968756896742230',
      mid_rewards: '9902788240480060637'
    },
    {
      address: 'erd1emdjcmq5unmpsqj6d7lgzxzwp9xylw3fgxtds5ncxzuf6tqy4caqegrh3s',
      rewards: '11966553726973818',
      mid_rewards: '9902622058162559902'
    },
    {
      address: 'erd1g77zzmrhxqce9tf4gt2x8t99ghqqnnyr7yvqa08jknhlpj49njlqfz0ucw',
      rewards: '11960675380225123',
      mid_rewards: '9902178661879723668'
    },
    {
      address: 'erd1w6nr5dl6qhggy9v4v7p82zfwp95zgjka6kcw95r6yleemqstzrps9xrehd',
      rewards: '11937139320395377',
      mid_rewards: '9900403366565027007'
    },
    {
      address: 'erd1v77jc4ktw2up4m7cd43y24e3uxqarntlwfwu53mw4j6czd4vc59slmerdn',
      rewards: '11924797144797206',
      mid_rewards: '9899472411822767886'
    },
    {
      address: 'erd13w0u3c02wm8j9rae76jrcug6v8uvujgh44mt8qqack2ysvp266gqzm5g0d',
      rewards: '11924797144797206',
      mid_rewards: '9899472411822767886'
    },
    {
      address: 'erd1gsvctjl9324nqrfkds8csax7ry9fxnjzrh4pfz3gj5rzqjql29lqezeshv',
      rewards: '11876912936826129',
      mid_rewards: '9895860566396050558'
    },
    {
      address: 'erd1laun79hj5xdlu9jp26le6x75dtrcpsc03xspz9z0k6lzf546m79qhjqpln',
      rewards: '11849564609036825',
      mid_rewards: '9893797716516319273'
    },
    {
      address: 'erd1vxukpwrgdursj7gs97led830rmhvzyrasyc3wp9py5y0zgdhrgwqtf2t6e',
      rewards: '11754587389383804',
      mid_rewards: '9886633704601299279'
    },
    {
      address: 'erd1h6du05ff4c9sqxnf8z6ecsengln30suxg0r42exjdvu6555mde6sdfh9sx',
      rewards: '11544749793631766',
      mid_rewards: '9870805919352597977'
    },
    {
      address: 'erd1u939uqq9ufs0ap46ggzzuv2z8lrw0qmfh9gwjunf533leppe9fzsr2z25d',
      rewards: '11544749793631766',
      mid_rewards: '9870805919352597977'
    },
    {
      address: 'erd142dpg8e0t2sycx9nqxyhyxefseuzz5s9zvzdpn72sfjw0jw0pzhq8uqaxl',
      rewards: '11544749793631766',
      mid_rewards: '9870805919352597977'
    },
    {
      address: 'erd1pjrh6hdd3rwayhr6gdfr3c9h6ax460vrlmgtterdxxn3qmef03tqzaam5y',
      rewards: '11544749793631766',
      mid_rewards: '9870805919352597977'
    },
    {
      address: 'erd10hdazrqywpn0s8dw6um7gnsplkqr67dthz52nnt8djekrr8njsaq0hcc6a',
      rewards: '11544749793631766',
      mid_rewards: '9870805919352597977'
    },
    {
      address: 'erd1rjqy3j9323w0pwgsdcaxwpv3d2uh4yd98fammwak3l79zc3e9rwqkf58d8',
      rewards: '11544749793631766',
      mid_rewards: '9870805919352597977'
    },
    {
      address: 'erd1nu508mh25htfd5vw9nkxl40cwxhl8zy2tnlrpfnwnxnr23lt47zq6akpcu',
      rewards: '11544749793631766',
      mid_rewards: '9870805919352597977'
    },
    {
      address: 'erd1jep54mt7lk9wv3m8x7zr4949t30dth9vn7qa84xzhvvcks80upfs88c9pa',
      rewards: '11544749793631766',
      mid_rewards: '9870805919352597977'
    },
    {
      address: 'erd18azz3g7tuchxd7d6kezkmrt3whtvw8jgl72dmpexhy78tyj3kxvsd634eh',
      rewards: '11544749793631766',
      mid_rewards: '9870805919352597977'
    },
    {
      address: 'erd143zet2vqrc9lcjsaec6nzhj4avdavrkc79m3au3tc52es73yhwtqhu82l7',
      rewards: '11544749793631766',
      mid_rewards: '9870805919352597977'
    },
    {
      address: 'erd1ssaqggrujlr8fsg9qq23zux420mehjfprhf53st39ers3kcqtrhqsw59a7',
      rewards: '11522291389128902',
      mid_rewards: '9869111910220317185'
    },
    {
      address: 'erd1haysk89ezfq36ne7lm5a9jtt02fsu5uvq4gn9epg6an2fuf2ngsqqwpjza',
      rewards: '11473274694252176',
      mid_rewards: '9865414642734338560'
    },
    {
      address: 'erd10ksnuv35nzag66nqe78vtsmmd80f5tjd9vjzum0plh47acqvrc5sffq264',
      rewards: '11412318965226667',
      mid_rewards: '9860816828957278951'
    },
    {
      address: 'erd1pepw5ejg6a7u2kax2qg4gtzakrcknnutxclhm3ff6jec55kavnjq0gv2s8',
      rewards: '11406992793830629',
      mid_rewards: '9860415082565017181'
    },
    {
      address: 'erd1tf38wlwh5l0msng9nljnr2zd5j3dm54lul3j6g9kj35znzzntxgq0a02rk',
      rewards: '11393012132424615',
      mid_rewards: '9859360538904353614'
    },
    {
      address: 'erd1h0vzwjapdvg53lecfw3d6rpytpjzvq4skfa20zqkgctqvl0yptqsqp3tkm',
      rewards: '11393012132424615',
      mid_rewards: '9859360538904353614'
    },
    {
      address: 'erd1vs86kywtmx5ndvfgusl2wywxv8xpuxkup9veyk7ks5jat0xl7ugqwx2rjg',
      rewards: '11393012132424615',
      mid_rewards: '9859360538904353614'
    },
    {
      address: 'erd10zq6hcxnf2xsllu2thtaqk2d7f5ewkw55k7nwvn8tshctywmfuxsnnqpue',
      rewards: '11393012132424615',
      mid_rewards: '9859360538904353614'
    },
    {
      address: 'erd1zg3z9j48nmum8mwky3mpkpa6dfrcu2lt2apu4cp52c2glcntwzzqfr4nzu',
      rewards: '11383504861381679',
      mid_rewards: '9858643417437966788'
    },
    {
      address: 'erd1weec83qqx9klsm6ma23wrgpt6qq6e2jtsp6g2gt9y5lk3qatsa4q7x646j',
      rewards: '11287165677479974',
      mid_rewards: '9851376674277064371'
    },
    {
      address: 'erd144vzm8t4m4w5tpkj785xs796nsm0c3x93ml5r23c3cxhteytvdusw6ufhr',
      rewards: '11267516933035989',
      mid_rewards: '9849894594260128287'
    },
    {
      address: 'erd1jy9l7qx9mdxt7rkan79m3fudpvzmve8aaxlvasky595uw7xng33st9ya24',
      rewards: '11222627643165096',
      mid_rewards: '9846508651729206507'
    },
    {
      address: 'erd1qhxjymsfk2yczcj8p3rlfnsfynu59l9cqd7fm77s26hwz7z39v7s6h2f5w',
      rewards: '11101843406584992',
      mid_rewards: '9837398049069246080'
    },
    {
      address: 'erd1qp7hpknz84y5kx4h9qdlak5j3laxm9256vyrcx7wxd69tqm70nas6y9w5h',
      rewards: '11086259311859613',
      mid_rewards: '9836222560455183832'
    },
    {
      address: 'erd1ejrsj3hdmrrcq6arpp093jg5dm6377wguxufjqcqn6e2pqs00v4qr4l6nu',
      rewards: '11007143745962044',
      mid_rewards: '9830254973081870933'
    },
    {
      address: 'erd163wy5926awlrrsfaypfe6zshf25ekgp6cd3xs52juflmzgvrhf6snkcst2',
      rewards: '11004117631091595',
      mid_rewards: '9830026717053032482'
    },
    {
      address: 'erd1a0efzrjjzp7evxgj3a77mpqh3kxhrnxw3ly44qp8aj6u5ydz8k7qarh3w7',
      rewards: '11002534282131682',
      mid_rewards: '9829907287037541494'
    },
    {
      address: 'erd18kvr0pkkwgjyya3g3d36rzd0clrgrhyfhjqskt07elmrz086krwslqeg86',
      rewards: '10990278039522837',
      mid_rewards: '9828982814112308328'
    },
    {
      address: 'erd10xua2mddd0uvwcjflf6q52dy50eyvxnmftadvktxglld46fdzheqm8pgts',
      rewards: '10929459266261849',
      mid_rewards: '9824395330735869453'
    },
    {
      address: 'erd1v6tpxqaxexpe3nctu43lyte2t79zldn7yk3dv8zctvax0qg9et8qctwfrr',
      rewards: '10921417168705334',
      mid_rewards: '9823788725458023819'
    },
    {
      address: 'erd1l6pcf93p5q73nzvjlcxlu9vclkmhjs8928skqrwe8t4fz5gudh6s6r6sa4',
      rewards: '10877433540011121',
      mid_rewards: '9820471095807647602'
    },
    {
      address: 'erd1r4cslu2dje4fp2tkrxqt0w0svmp4qrqdy5sgm3ltkm2yaqn8uzyq0cazud',
      rewards: '10876816502514160',
      mid_rewards: '9820424553447317494'
    },
    {
      address: 'erd1g5wyt8kagszu6a0qp9csh4mlpvuytu0757cafa9v0dj00gjvtatsh4mzzq',
      rewards: '10803714058796088',
      mid_rewards: '9814910528297638473'
    },
    {
      address: 'erd1eyfj9r5yycdx44rsrzqsyxv45s35p6tj6meqxzu4rwgdsx4wt0mqsntzx8',
      rewards: '10771232012069160',
      mid_rewards: '9812460448471906844'
    },
    {
      address: 'erd1ryhhvan7yzle5r74n6unt6dfcrals36lxsr8akhvd0h3jetrar3s09tln0',
      rewards: '10647503986955445',
      mid_rewards: '9803127799554884630'
    },
    {
      address: 'erd1wst2p97duakx4jaq05fra85fvplvg69hxmdlft4vud47k5ctwyhqm4svu5',
      rewards: '10571263136691188',
      mid_rewards: '9797377048356862807'
    },
    {
      address: 'erd17lamheulwtl40t8fjdkyrs2cx5m8eyptted5djl4x8x25dp38mzs0pqknf',
      rewards: '10537219591630829',
      mid_rewards: '9794809186680842746'
    },
    {
      address: 'erd1r5rfmzk0jtjr55ckqf5990rdfk3krm0hmh8g05f870dfeqkexh7sphtrtz',
      rewards: '10537219591630829',
      mid_rewards: '9794809186680842746'
    },
    {
      address: 'erd1fgs3mdawxjyar4ta8s8se5kztx68gvjqfvr4zlyrwl293c4a8nyqagth4d',
      rewards: '10525763112461474',
      mid_rewards: '9793945038903372752'
    },
    {
      address: 'erd19yurk50eyfsjrdn6ra3n2k9t62hsh73wjwn7mpu6gykv7n4rdv6q635jxl',
      rewards: '10487058547670580',
      mid_rewards: '9791025602386483637'
    },
    {
      address: 'erd1n7yk55w03tsv70rekwzwhxszxavrnnwvv7q7yz0sjzss90g8r98qdaftt8',
      rewards: '10316854537618290',
      mid_rewards: '9778187328530358981'
    },
    {
      address: 'erd19pxg5ynca6zrj60mw8g307x59w92lp55d6hxgcrvf5d9adjqzzlq44pqzj',
      rewards: '10316008754913567',
      mid_rewards: '9778123532207448189'
    },
    {
      address: 'erd1gu46kxm69x75sseck8e20hpn20c4h0kzpk3ddq7j4yu3yvq4nujqcndpsh',
      rewards: '10261960539085906',
      mid_rewards: '9774046743440736595'
    },
    {
      address: 'erd1tr9hwvlw9wdejfg0225st26k3eszvs6a4zpmu7g3a9p8aqsa635suu6d0e',
      rewards: '10172872563986493',
      mid_rewards: '9767326949816235619'
    },
    {
      address: 'erd1pcw244wzk4wvxxlhnfdkgpkxnea05f4g5g9tv25r2t95zf389xyszkugfc',
      rewards: '10088115174466533',
      mid_rewards: '9760933806801255074'
    },
    {
      address: 'erd165j72apnj3le09l45g6eddvp5atu8hsez939cusveh0vqxmwj8wqspdmew',
      rewards: '9911079002646210',
      mid_rewards: '9747580191598117469'
    },
    {
      address: 'erd1tqpvx4wexdaqsyxsjhqqxd2jjmajqhqtsg0uxfluuayhkxnqdawq72yvd0',
      rewards: '9850443486221375',
      mid_rewards: '9743006531053748276'
    },
    {
      address: 'erd19d3xet4sw3hyt3afrxgtfv9968fvmwvu6s9drcznad68sam362qs698u03',
      rewards: '9837982639896491',
      mid_rewards: '9742066625128213398'
    },
    {
      address: 'erd1ay8mn8mnl5cv799ps9sdy42lm2jpc9k08xscq5aq5vdx3808nres77cnjn',
      rewards: '9719742267357769',
      mid_rewards: '9733147902925158638'
    },
    {
      address: 'erd14yp3zh5gmp20ceufctsevqf3kt2xmns46a9nf2m7y9y5k3c3rssqtshu6q',
      rewards: '9719742267357769',
      mid_rewards: '9733147902925158638'
    },
    {
      address: 'erd1pjj5l5jxh2ej63e5ns7w5nx7faacdf0em2pr0w64xl0rqw0kpq0qagx3mk',
      rewards: '9719742267357769',
      mid_rewards: '9733147902925158638'
    },
    {
      address: 'erd152l2789tmztkvppqt4yxwh2vajxqxslrw2lfegf5alg5lvaqrc4s832tkm',
      rewards: '9718562882227782',
      mid_rewards: '9733058943391972771'
    },
    {
      address: 'erd130aulngv05fsa8mh7k5rtk6j8qe6apmd33upvjtqut6nl5truf2qtne5ex',
      rewards: '9717383497097798',
      mid_rewards: '9732969983858787131'
    },
    {
      address: 'erd1pfa6n57t0zqhk800l5kv2uv3jn5vwrmr9l5m35pgjtf5x2ytamgsmegsga',
      rewards: '9717383497097798',
      mid_rewards: '9732969983858787131'
    },
    {
      address: 'erd1gyehphqg5chcmn66zm8z45hthtnt4c6laxxvxjt0unxdgulkx62qjam3d6',
      rewards: '9716204111967812',
      mid_rewards: '9732881024325601340'
    },
    {
      address: 'erd19mgfn74xjzjme8gr7txrstasmelxk5d9rfhs7v96e8syl7ugghcqg5je0m',
      rewards: '9716204111967812',
      mid_rewards: '9732881024325601340'
    },
    {
      address: 'erd1kmc8eph3d8vrq46929rfcueckseuwemnzc50p5fv559mn4nplefqk3rg8f',
      rewards: '9687118837639105',
      mid_rewards: '9730687158758640047'
    },
    {
      address: 'erd1namj68lps6zqwedprqd8f6e9nzahu4gp67w7pn3clqequ4gtr0dss99fa7',
      rewards: '9640515904508932',
      mid_rewards: '9727171958277523206'
    },
    {
      address: 'erd1ksvhk6eeuez75lh8e7j5z8lz4kkg8z5yxsq9r0utthkvj00q7ehqmtrusu',
      rewards: '9530505713060309',
      mid_rewards: '9718874028256084662'
    },
    {
      address: 'erd1wxcsf77mqytwnvjwsd8y694cv4236jr4w3j6vnurjj92ejcktdes96sxsd',
      rewards: '9524967893222753',
      mid_rewards: '9718456317488761485'
    },
    {
      address: 'erd16qauc8u9t5fxtu5804v0xfr96hhacsp5w2cj6n4t8nzu8jwgy88qrq7rn7',
      rewards: '9470381906134643',
      mid_rewards: '9714338965313987552'
    },
    {
      address: 'erd1nycxkzq7kgessx85hscygmju4fhnc5ep6ze097m3g86x8ck9fw2sj0m92r',
      rewards: '9417018344526167',
      mid_rewards: '9710313819151700776'
    },
    {
      address: 'erd1qjp4735ghvq2ps2tg83tqdfcyzwcqzaac00yfs8j7su7028v5aws42jpu3',
      rewards: '9407702338790530',
      mid_rewards: '9709611124586263735'
    },
    {
      address: 'erd1et5fstvhuwqy7ucnudk7hw7zsjstcuej6etl3zy75t5gxqkyv7ms69fd5q',
      rewards: '9375682957139128',
      mid_rewards: '9707195943003772335'
    },
    {
      address: 'erd16ynay6j9rm8cnvvc45923wqvezsnqpd9q5n63m9sx76rhc2py6zsv9gvu5',
      rewards: '9332553146978594',
      mid_rewards: '9703942715808752124'
    },
    {
      address: 'erd1fwg8alqntj4dvk89qpwuf7dsnqsx5tw0md80mg0e3w03l75jlahqyqtqgk',
      rewards: '9286012156467492',
      mid_rewards: '9700432187581284034'
    },
    {
      address: 'erd15q6ex2yg0s72g4f2pqw5z229c8pypw7afxeq3vavpehzkcjtzdnqx9g6j2',
      rewards: '8944659830600010',
      mid_rewards: '9674684412076080090'
    },
    {
      address: 'erd12kn6fp6qr62gjfk9v72an4lq0dvx2cx85rpj20zqvhgdec5qe83szjnc40',
      rewards: '8914192841256010',
      mid_rewards: '9672386325487816178'
    },
    {
      address: 'erd1ha0vhe8cg5jmjvm55kk89zxuqynp62e4e0wgl40v5ryvlkxa44eqt9s9nr',
      rewards: '8889233420116203',
      mid_rewards: '9670503667824317268'
    },
    {
      address: 'erd1q744up6gktcwllgy8s8tg22eg0zumezmz8058j00vm45nmluwgnsenry84',
      rewards: '8853481199303157',
      mid_rewards: '9667806922890860580'
    },
    {
      address: 'erd1cusa6fx5q9xtrp4hrnlazpju8v3falfuuu6h5k4mmqpzkl56l6dqgewvjx',
      rewards: '8838500601757824',
      mid_rewards: '9666676955308097472'
    },
    {
      address: 'erd1vjp2svmwez8qpfvwp0crspak0kzuswavsr07l069r7vytuvyg4rs69x2n3',
      rewards: '8823660881200564',
      mid_rewards: '9665557613898903081'
    },
    {
      address: 'erd178fvqrz7jatj9qpsfv5f6grlmnw0hp8ku7nnf6j2zsa9akne29ksqqrz4j',
      rewards: '8798553518889589',
      mid_rewards: '9663663797219412320'
    },
    {
      address: 'erd1cd5lpn0lpct6j79qgqp68j98der4r64j7drc5l5csrl76xs0cjlsx8mrnx',
      rewards: '8776733222309827',
      mid_rewards: '9662017919763136280'
    },
    {
      address: 'erd1jyjsduthekmv00ada7g90dsg4g8gtyvvh4wt3w6tufa8azxuzn8qe7dh37',
      rewards: '8768684434573431',
      mid_rewards: '9661410809853458336'
    },
    {
      address: 'erd1p0a29aueyavgzayggz88lljrryl9gpztu5gs2wjeddqyvctgetuqlskg6j',
      rewards: '8716337330268865',
      mid_rewards: '9657462333783883511'
    },
    {
      address: 'erd10jcrxkp6v6y0thpgcyxy8u989yj0zq72gsjmm5zyqcj0ehksg4ls0pv5uu',
      rewards: '8687986873244947',
      mid_rewards: '9655323894559640010'
    },
    {
      address: 'erd1rf09vfsjz8mxkexe00cght6r3sh5ey9arfpqhh8xwd75j8uyz65s6y2wdm',
      rewards: '8588729642516955',
      mid_rewards: '9647837046806199739'
    },
    {
      address: 'erd1kk4enkwp59yzz8dazux9sg7d5srhppu75rgn5un4dxjrcrm73gjqtl688u',
      rewards: '8553867745945428',
      mid_rewards: '9645207457907608833'
    },
    {
      address: 'erd1j4prx7eghved2rkpa534hw62p42kt8wdh5vmmkgq643gejzf7vqqqtmqr3',
      rewards: '8527105093663672',
      mid_rewards: '9643188784792892755'
    },
    {
      address: 'erd17agx077wwh5nlg4m72prwpu0mvdrp0xlv4ul087anh2pla6q3r0spw048s',
      rewards: '8526379785441458',
      mid_rewards: '9643134075708282929'
    },
    {
      address: 'erd1j46w8qma5yv5safcw08jgjqyqv3arfalef8zsujltau6pqutq8asdgmh54',
      rewards: '8425087496465783',
      mid_rewards: '9635493726077366959'
    },
    {
      address: 'erd1uazpej836a0xd8j8aex3xfj5jhynaqx3pe879f6s9lry4xgek27qvdzqq9',
      rewards: '8421977664115128',
      mid_rewards: '9635259155344561785'
    },
    {
      address: 'erd16yfj4j6kf5e9mdp06sa399npyklqgqgtn7weqsu97tkxtvzfpcmsy77csz',
      rewards: '8421977664115128',
      mid_rewards: '9635259155344561785'
    },
    {
      address: 'erd15t2accg7w3qxqeh2x2lwga3kd6rfm32mfhdzcfpvgph53y8v7xysl9wrlj',
      rewards: '8421423683348512',
      mid_rewards: '9635217369273888967'
    },
    {
      address: 'erd163me45um5sdgjla2gml9lhxtakepjly9762myep8evfsp2kak0hqarm8xa',
      rewards: '8419304558210542',
      mid_rewards: '9635057526336884729'
    },
    {
      address: 'erd1y3r4j55avtxehqgsccsx5ma5mwsjkcj888s8q6kyjpaydpy4ttjsmna9vz',
      rewards: '8400490569304224',
      mid_rewards: '9633638410877553330'
    },
    {
      address: 'erd1lz4hmfk6g8v7y0vghl5xs9e4p4l2cdvmdumn8yhxmmrq0s2g6gvsluv484',
      rewards: '8307269818067028',
      mid_rewards: '9626606887160285357'
    },
    {
      address: 'erd17qt9vu3j92u9uuf6xzgzmd7at0ptd9rpw67ht97vvknt8ln7r6uque8723',
      rewards: '8275273636393795',
      mid_rewards: '9624193455522892773'
    },
    {
      address: 'erd1q4ze4z8xtdrlhdjvl699qrht98732f6w0zn8y8wg7ndd5mr5nmnqys3rmq',
      rewards: '8240052923459504',
      mid_rewards: '9621536801558515181'
    },
    {
      address: 'erd1xenu32pqhd2rv20jxklwt5asfwzmrqhpxr5pl43aj366ghqlg6rs3whzy7',
      rewards: '8220732967073086',
      mid_rewards: '9620079521610169560'
    },
    {
      address: 'erd1xh9cfvmqmjagdhwmvz3gs884jruetd90k8z9ausvwehrppfrqazswkghjd',
      rewards: '8198533442746384',
      mid_rewards: '9618405039483136578'
    },
    {
      address: 'erd14lcdcjt9vxhvfvcgak0k0lqh9ltsvnd8a6p7ujlscesxn9jptgfqhmvrnw',
      rewards: '8180519175686187',
      mid_rewards: '9617046246034232974'
    },
    {
      address: 'erd120xx3ynczqk2teayzqswtn89452paj6gt6u6nr03pf4wvyw5qsysretez4',
      rewards: '8170818139482265',
      mid_rewards: '9616314509106084994'
    },
    {
      address: 'erd1eetqzyzqdyyr396qt8xahy2c3x7w8kkacj2690s4jgqvhhlegytsdh5rl8',
      rewards: '8099125520446355',
      mid_rewards: '9610906825254435081'
    },
    {
      address: 'erd1zayvztvc67jxxkqamtmtcn2mr873j40n53klqp422ye8es0qxxds5k3qxw',
      rewards: '8065280698349261',
      mid_rewards: '9608353953000950440'
    },
    {
      address: 'erd1gtp8sq7k98fwjhrnp32s8qjwfu66je7kc355rfc92p5yy4x9pmws05yf8v',
      rewards: '7972482066814870',
      mid_rewards: '9601354269240584844'
    },
    {
      address: 'erd1rckn5emtxs6u7vf8ehvhtg9k36cvwk55jadsav3st72dasfrl6ys4mhxrf',
      rewards: '7921026248015759',
      mid_rewards: '9597473021712802367'
    },
    {
      address: 'erd1jsq2a3tzaf5yclh0qhuh5xh0gldnr9mpc7t66ssdw0cgasq3l9rqfm5w6s',
      rewards: '7828980393665183',
      mid_rewards: '9590530118986182628'
    },
    {
      address: 'erd1wgfrgqk6kcd547yz3at5njnrzeqvxffclmr83k5hvly0u0mv4h9qd7x268',
      rewards: '7783598378530469',
      mid_rewards: '9587107010809922516'
    },
    {
      address: 'erd1hnvnadv839j3kak6dzl8jt976sgektztljkp5ux7f5jvgp84eq5qt6eruj',
      rewards: '7639288313383728',
      mid_rewards: '9576221884566540426'
    },
    {
      address: 'erd1sa6uk8kaj9pr9ecxlqrpg6zpn3v5d07y5qxz5aumf8k343jj5qgq65jtel',
      rewards: '7607203424467094',
      mid_rewards: '9573801761853635261'
    },
    {
      address: 'erd1aejs6m6qjmvl3t4akw0gryvz93dzwgucc9dxxdrydaqm0382uzasqfnakw',
      rewards: '7537026000736825',
      mid_rewards: '9568508367273274299'
    },
    {
      address: 'erd1ntd63vhege5m850d40ugsteqgxav4wvht03k0nxs6at4u653t3vqtggdct',
      rewards: '7529226181936724',
      mid_rewards: '9567920036776518773'
    },
    {
      address: 'erd185mp096d8lmpngsjm0nvkcy8lhx2h0mp5qagfyequws83hay4v6qg4dfef',
      rewards: '7461663356256646',
      mid_rewards: '9562823858030154491'
    },
    {
      address: 'erd1puz6467s2rvez4jnhrv0dwg2n6ulhj72rzm4cqe05tq84d3zhy3s4ky52s',
      rewards: '7455232532642071',
      mid_rewards: '9562338789113981582'
    },
    {
      address: 'erd15tv9s3gjcxcu9t6grcrfaud8fvey3spa2qg8gwukazy6v9n96cxs2ev5wk',
      rewards: '7410052549976453',
      mid_rewards: '9558930919992108535'
    },
    {
      address: 'erd1dm074ash6kacehwfpdplg4j5rqrpwx3qpfe0v50mxa3mkddh48yq9tj522',
      rewards: '7406950355949369',
      mid_rewards: '9558696925408418627'
    },
    {
      address: 'erd14u7hfmdyk90u4jj9zyh3x75ex5g8lr6f06n5slt27ruejasv4w2qjyreg7',
      rewards: '7369703375759338',
      mid_rewards: '9555887432660002420'
    },
    {
      address: 'erd1f9aw54kyh45fysm9j30vh9dahu0rqvsslmxw3mlduzcpd34hyxyqk0y2mg',
      rewards: '7347361005703762',
      mid_rewards: '9554202175859764625'
    },
    {
      address: 'erd18art7csg32j9sjd95wdntxkcrh2y9l7qhuplf7ef6yxxallav7rq9rrtxz',
      rewards: '7295655100255955',
      mid_rewards: '9550302064611422725'
    },
    {
      address: 'erd1e670ty6nrxvttff3rec30cux6wlwkn2zwr9tz8z4c2r0hfjrpc0syksdrx',
      rewards: '7293414621014814',
      mid_rewards: '9550133068087440160'
    },
    {
      address: 'erd1jthlzfqn5n85sj60u20cxhm4ajtsda2nsc020aktvtsct7wmchmsv8m3gn',
      rewards: '7202028708498487',
      mid_rewards: '9543239943941211088'
    },
    {
      address: 'erd1z2dvt07hdsvy0tzqvvplyfugmlfdx8ayxx275wa3r4dg4n02vzuqzyly88',
      rewards: '7190510055794919',
      mid_rewards: '9542371106492454357'
    },
    {
      address: 'erd16fclwp9x6jcska9tmze4xwjg829p5us5hd8u30t75yd6qnscya7qqwl8js',
      rewards: '7160280676547436',
      mid_rewards: '9540090942534151562'
    },
    {
      address: 'erd170zvnfddd2kynsd82pc6zd32xmgartsum0gjeq4r9av7vqfv8lrst0hfz8',
      rewards: '7131252644051292',
      mid_rewards: '9537901394646440274'
    },
    {
      address: 'erd15p6w30usyj3arynjadsuqrmx9z22nzjunqlu5crv7vm9sc8lrwysw9nylp',
      rewards: '7122910115496603',
      mid_rewards: '9537272128237236796'
    },
    {
      address: 'erd1myqt2y33d8esxc3z3lwhmlj5htfrx7a5zypc7at36dxv6y4xsrpshrjms3',
      rewards: '7105086995189298',
      mid_rewards: '9535927752746873550'
    },
    {
      address: 'erd1ul4x79eax50gtjendfekzw4wxfuxkxgcalm7csn36ewyn47ewn6qjufl5x',
      rewards: '7035908596839012',
      mid_rewards: '9530709713391183854'
    },
    {
      address: 'erd184z4njtadedegc4rm0ay9mjjmqymfp3jhzupsad5nkxnwr5jretsr0q9jl',
      rewards: '7035123659231823',
      mid_rewards: '9530650506537256219'
    },
    {
      address: 'erd18mm2ja6qh0959l7vtfz3pd2hleh5ppwh70hpstg0epvdfd2uft3qad92wu',
      rewards: '6891170541682045',
      mid_rewards: '9519792304401012902'
    },
    {
      address: 'erd124h8l24z0t7v966wzr6sclqh09ltgkh447f7k4pvvm6ekvx3lmdqyjmf0u',
      rewards: '6888065567086467',
      mid_rewards: '9519558100082547704'
    },
    {
      address: 'erd1nh443ptwdksqwdg4fqse3kaz9wxygup44t8yn4q43yxpkxpsx3zq8wfnz9',
      rewards: '6887762625691795',
      mid_rewards: '9519535249595147551'
    },
    {
      address: 'erd14rppfdnlp3myampkhft0f3cwzzfewqa6zk72z90s5kapk64fy8fq2fwa5d',
      rewards: '6845236124275322',
      mid_rewards: '9516327529217937743'
    },
    {
      address: 'erd1ka7d07y8k7tdd4ws45m6gjwp3lmm08fu97rnts3lqpd968l9qqaq7rmq2w',
      rewards: '6842785860354486',
      mid_rewards: '9516142708900097934'
    },
    {
      address: 'erd17jt0wt2y8g8pea5fc4ge825wzhc0rh7tev2lpsplmchscspy9ecq42zmc9',
      rewards: '6814252856576895',
      mid_rewards: '9513990500404410826'
    },
    {
      address: 'erd15eysafju9n88vwuzphyyfp0gulgzje5jdhkl3zzk5r9jvyr37l8snrre2j',
      rewards: '6794755305923508',
      mid_rewards: '9512519824744448743'
    },
    {
      address: 'erd1g75pxwpewdl0k9a4pcvfzpx2kp3xawvghyd4xs6uswrwpt8lq9fqh5jmgl',
      rewards: '6789860474550591',
      mid_rewards: '9512150613786224239'
    },
    {
      address: 'erd1hs7pmm63ytsjkqnpwqk2ajzvnsrdl5995ch2aykln7e5qam74x0svfjcgn',
      rewards: '6740576386491243',
      mid_rewards: '9508433177169655170'
    },
    {
      address: 'erd1kzagcj3lhlqgfpwu668gsacc63lprkwc03kvycmzmz309mxqfa7qmzqaqm',
      rewards: '6740282185207120',
      mid_rewards: '9508410985937772712'
    },
    {
      address: 'erd1w2sh4l6549g98dnlqnulhf83xj6ew6lh7hftwnm9au4ee0pv2acszlf4ts',
      rewards: '6713759477668425',
      mid_rewards: '9506410411552462646'
    },
    {
      address: 'erd14tflxma4h3p0pxlsk48ek9z50lly7kkjma5nr88fh0695xcdyk0qpa5cv3',
      rewards: '6559424384906265',
      mid_rewards: '9494769110117306748'
    },
    {
      address: 'erd1zx4u88sl4dnhrtv5s0jemf8gj9q0xgdftfkvkga8t8w5ah78g8xsd27exp',
      rewards: '6558853339986325',
      mid_rewards: '9494726036919066083'
    },
    {
      address: 'erd1ta22uwxdtvk47yeh2vdacl53geh4djcuvq3ruv0v4lpyzyhvhcas7je2y0',
      rewards: '6558853339986325',
      mid_rewards: '9494726036919066083'
    },
    {
      address: 'erd1uhpqy2wc846w36c6dlnthty20q5646w685u8wtsmuxw4j73aprrqa0yx08',
      rewards: '6558853339986325',
      mid_rewards: '9494726036919066083'
    },
    {
      address: 'erd1ecg9692lny79pk3g84v8jhlhtnst4f7m99xwd4wg0m496pnmvu7q70wlhk',
      rewards: '6558853339986325',
      mid_rewards: '9494726036919066083'
    },
    {
      address: 'erd1a8aapal2kct4kgvky52mhn80mzlyd2ktldxc7ge0g4pywtwv5c8s2szyqd',
      rewards: '6558853339986325',
      mid_rewards: '9494726036919066083'
    },
    {
      address: 'erd1s7l6alrhlxccrz6sf8lg9zuxcv0jrk0myxw3ghzwel6wv9d4jqeqqt86hn',
      rewards: '6552521238110983',
      mid_rewards: '9494248414459198385'
    },
    {
      address: 'erd169c5krjxfn0r09p9jah782eux2zfwzmfz85lpmqlpcuvgacpz2kq7nw9tc',
      rewards: '6527836375963333',
      mid_rewards: '9492386466434267275'
    },
    {
      address: 'erd1xv2yxuv7skrxhgytn0hgp59qqy2z2t2d2v0z7n8tu0nc86tae6nq5gftwy',
      rewards: '6505565151915995',
      mid_rewards: '9490706576087717904'
    },
    {
      address: 'erd1vwdps5a3a0jd6jdxjedc4azme8u80y77kjdywagqjyvctrytkf4qvrv0n4',
      rewards: '6473253718148031',
      mid_rewards: '9488269365382343137'
    },
    {
      address: 'erd12p9y32j2keqq8n50vg7wfw3jryd02k9wpw8mtl2djl6j853w32asf8mjas',
      rewards: '6459719037054104',
      mid_rewards: '9487248461454252579'
    },
    {
      address: 'erd17dljrrfrllz3ykzjelpd5xylhlw88h297yqjm3svpw42c59e93uqlavd8d',
      rewards: '6398521677773240',
      mid_rewards: '9482632421811720002'
    },
    {
      address: 'erd1xrts5hwv9qv0ut40ypvhlplgc7v5ltz8m5v2v7t6ka7j608gcxjqzm66jj',
      rewards: '6384212520624724',
      mid_rewards: '9481553100131422725'
    },
    {
      address: 'erd1vskcuenuj3fh06l2mk62d32fnlx6wt0ztv84mcw788jk496s8e9q9phpwk',
      rewards: '6346337247596224',
      mid_rewards: '9478696216046459108'
    },
    {
      address: 'erd1uxnl6fwcwx2cs498drne369qtjl6vy4eg3arc9k9qzl9k5rl634qs8xg25',
      rewards: '6332432575209811',
      mid_rewards: '9477647404141724184'
    },
    {
      address: 'erd1elal8658k2wgv64g0z9gvxukar9p3t2hw47qssuut3fnkmt7zlms52qedp',
      rewards: '6272541391141745',
      mid_rewards: '9473129887648445439'
    },
    {
      address: 'erd17f7ghq2wk5mavurttkv3n9hjqa53tjptrpqmyngkfgmg4q90sw6q95lppx',
      rewards: '6247820812483128',
      mid_rewards: '9471265245572129531'
    },
    {
      address: 'erd1rcgwd58mg8dy8xm5vuprsxhzmuv63muhfz4exnvg5lfyqut3r6tsvwwszf',
      rewards: '6200102004147924',
      mid_rewards: '9467665876031382155'
    },
    {
      address: 'erd1p6nur5uutqqda0phfs0aj9v6dcvx9ntaxezf3ehs4sxwfpdvp2pqw9symg',
      rewards: '6183850430991956',
      mid_rewards: '9466440040360970733'
    },
    {
      address: 'erd1j8k08j7t8xvy2ehauq3yzttcj8dndyvv89vmdxwrptdx2jqwqfgs5r5pja',
      rewards: '6169541980722093',
      mid_rewards: '9465360771999638900'
    },
    {
      address: 'erd1sw822esd4d05nawdyqugm0n90cw3f4zfkeyhtahk3fpjtmguda2sp636xq',
      rewards: '6169305928977462',
      mid_rewards: '9465342966914195509'
    },
    {
      address: 'erd1z66ggq7r0qk09htet4d364v5ctzv9jlzd387u0q550dualfkuehscke324',
      rewards: '5987890473266688',
      mid_rewards: '9451659027849345996'
    },
    {
      address: 'erd1y28pvngw0rylwuruzgjjnmlavfeq2lenctmnnwdqkj5hzq9xnhdse29m9n',
      rewards: '5936141513494514',
      mid_rewards: '9447755669067607297'
    },
    {
      address: 'erd1eaqdcfcvlyl9t4pmuhf2qyqyxy40wfsfuzlktjyq8xrwzx23wr0qtl2g3x',
      rewards: '5923400029753434',
      mid_rewards: '9446794595015644067'
    },
    {
      address: 'erd1xchhc9p6shzx7u03ll8zwkddkavgfehhlk95ghkxr7dgl98theksnakupx',
      rewards: '5901785673751574',
      mid_rewards: '9445164251397474321'
    },
    {
      address: 'erd18zp8svfkkjas7k7g7kkkvq02pdg5qf9qzgcle5tu0vypgmk9gypqy7kykj',
      rewards: '5901785673751574',
      mid_rewards: '9445164251397474321'
    },
    {
      address: 'erd10gt74vnzj7ugyanrgu35qkvyt8686k0nlnm4x7qugmszsyemce7svc2jz4',
      rewards: '5901785673751574',
      mid_rewards: '9445164251397474321'
    },
    {
      address: 'erd1adycxcfr26r2cpywy5etrjmaz38dgxxt0qxpgv0ck0r90aa58zjskm8q06',
      rewards: '5826036735110440',
      mid_rewards: '9439450604472898955'
    },
    {
      address: 'erd140y98mcmzsefy93umxkwl035gjykxpmlwdxfewpvqfg25qt3lj6sne9d6y',
      rewards: '5819102109183722',
      mid_rewards: '9438927534383600609'
    },
    {
      address: 'erd1kqhhge3klu5g8lnasjvytd8dg3f6czt7a5zh30fl4wrs44n4dggqfl3r8t',
      rewards: '5788958254167236',
      mid_rewards: '9436653821410198444'
    },
    {
      address: 'erd1r2dhhlpz2ap0vlw23laawkruvcxe3hufd52nmjq9e7t6dnnpzqpq35ftad',
      rewards: '5787404936150809',
      mid_rewards: '9436536656590906492'
    },
    {
      address: 'erd16pexxf28saud6w44tv09n9znt844f92lt2y78eaqaj9nsnzgwl4sze7mpd',
      rewards: '5768914601917458',
      mid_rewards: '9435141953995438219'
    },
    {
      address: 'erd1gwvyeevqudny0kk53su90k5xjhs70zlx5vp9z95qqpfguzwrvmkskuxfre',
      rewards: '5710211430932454',
      mid_rewards: '9430714047830966200'
    },
    {
      address: 'erd1k35expd63uwp8luvek6fvvw4au6vchgmemjxnx58weujgr2gruyssgct20',
      rewards: '5698362730112275',
      mid_rewards: '9429820315268954215'
    },
    {
      address: 'erd189t3hywdtyr86ds55rvhuktxdh77g4sfdtqv63k9tuch4sycm4wqnt00np',
      rewards: '5367079358626648',
      mid_rewards: '9404832028296126019'
    },
    {
      address: 'erd19s7zd075dc6j2a39mh26r5rm2rwtc9pxp2g2fj5psf8vj3ycpg0q5fprem',
      rewards: '5361685773342982',
      mid_rewards: '9404425196959327346'
    },
    {
      address: 'erd179r5kdm4saqxjwx6arelxss3jcvl7y6xa7lxmk8j09ldpe9j0t2quu4gef',
      rewards: '5359739406725334',
      mid_rewards: '9404278384979667717'
    },
    {
      address: 'erd1emuq0gmtag9ctf4pa748w3xuu763ea8e0cw5jre4xj2hafmy93vs3mcvwc',
      rewards: '5359739406725334',
      mid_rewards: '9404278384979667717'
    },
    {
      address: 'erd16az3u33tpkw5dz9njn2unucfky2cddwnpd5nyr8ta4wwtax0zvrqpd3wzg',
      rewards: '5359090407128881',
      mid_rewards: '9404229431758476170'
    },
    {
      address: 'erd14aas7xzxpg594el0un3smkxdzlvev24mrmzh4sspugnvul9hu54qme6azm',
      rewards: '5333493045697226',
      mid_rewards: '9402298655063186620'
    },
    {
      address: 'erd1dj9guvnghrpuyxh879tcsjp75kyx2rvn5392h6vww825k9w907psz44wp0',
      rewards: '5313091094512022',
      mid_rewards: '9400759761611531355'
    },
    {
      address: 'erd1ga5vecylclkyyjcvm2ne5x030dhd6v82t30fzg20xqw5393qs2vsuk5ana',
      rewards: '5267379273358554',
      mid_rewards: '9397311776583152064'
    },
    {
      address: 'erd1gcwa4kxrcm3k604qjrlgsuw86x4l3gfklwqn7q4zj0vrejxuylaqwa4z76',
      rewards: '5244319823819863',
      mid_rewards: '9395572431381718490'
    },
    {
      address: 'erd1mj5saw6aznejcwr42qmvf3t5gh2hq5cyn8z854y3cjrkspr8f78sxmuuh4',
      rewards: '5226068836478928',
      mid_rewards: '9394195782420535948'
    },
    {
      address: 'erd1lh6ug2ncclw365r5m679vr89yru7msl782ft9h6hqfr0evyd8evq2wyw4c',
      rewards: '5200497234922510',
      mid_rewards: '9392266948760153099'
    },
    {
      address: 'erd1axl0ul3aa8xpd238ujhynfwsl7yg7a780xhaj04wwevjl4uvz86q9xna26',
      rewards: '5197859710683377',
      mid_rewards: '9392068003632633757'
    },
    {
      address: 'erd14n822ms38u8ussatm9cjlhlfknndq25mwenxh62z6zpmjun3q5uqawzkr2',
      rewards: '5190750464301071',
      mid_rewards: '9391531762142561532'
    },
    {
      address: 'erd1y8ekagxpjujgjhsrc9azxj43lq5c0wnrzpsygxzrhtqmf68vc8rsa8upc0',
      rewards: '5149929282465056',
      mid_rewards: '9388452671870949151'
    },
    {
      address: 'erd1w3ftdkjrxc4dts50kghf2agq3jay8f054795x8zgas2dx3sm0lzs2cynaa',
      rewards: '5141029735549185',
      mid_rewards: '9387781390269145056'
    },
    {
      address: 'erd1qpd7e9aasvnjjv2g65e9u3et9kczn6g7hj3g4uddgnulc4u97dms78p0sm',
      rewards: '5122336682296389',
      mid_rewards: '9386371396833662612'
    },
    {
      address: 'erd15qjufcrfrmjxels3uhdae70m32m944adfpuvecltujsa0l553yjqxk5mv6',
      rewards: '5110524061714740',
      mid_rewards: '9385480385758546853'
    },
    {
      address: 'erd1xd3ucud5z84jx0grwzgu3h3vmy8vehjrx8a7k4a98spc5dcg4x2sfn5uks',
      rewards: '5108242744370850',
      mid_rewards: '9385308308867969546'
    },
    {
      address: 'erd1l043ysyzc28gpk7hlk58vlxe9khyyxyytdza96c4azt09jeug4ksq34r6w',
      rewards: '5047066479181506',
      mid_rewards: '9380693860326161310'
    },
    {
      address: 'erd1hlpk868xj6kcza7zzut6u4da7j962zv7laexuh0fz6a9um3nn30suf2v63',
      rewards: '5001251587827742',
      mid_rewards: '9377238100842542103'
    },
    {
      address: 'erd19fvmhvjnj3uf5er270df5zvqp8yqvwr0tts6vums7a82ejyvfmkswrs9y5',
      rewards: '4992648586521593',
      mid_rewards: '9376589187302144275'
    },
    {
      address: 'erd1ljwz5jzan9lrqlhkcv483xz8pkvkk54z76cpdptkxmp6m7vatdxsq56gl0',
      rewards: '4985439366703538',
      mid_rewards: '9376045404941876989'
    },
    {
      address: 'erd1w7aj7wn7t5awudyu36hufnwqchyd42g4gh3qcma64lrf0dk546rqtq7vqt',
      rewards: '4983032571758623',
      mid_rewards: '9375863863434077834'
    },
    {
      address: 'erd1mhfqx9uz6txrw68zylvy8e0dttzm8fkfaj6srkwpvx7e8yu7c37shmdqll',
      rewards: '4979997117059348',
      mid_rewards: '9375634902913728280'
    },
    {
      address: 'erd1y02hac6h4ujaeeyes3pt90a44a2gpa6ax6fq70xjluyl8da8s4ws6l6zzj',
      rewards: '4974322072863292',
      mid_rewards: '9375206841486079223'
    },
    {
      address: 'erd16fuakmz7maed3ut4fphxulnf9d0sdu4l09gjsrja8qkz2jxxm35szz9aqq',
      rewards: '4971326908282819',
      mid_rewards: '9374980919998586281'
    },
    {
      address: 'erd1rv8gl2v4vx8kpdujzgxvkfaqprhvrmwqqlthpueekrrlr8ql7n5q4wgwev',
      rewards: '4963200650603124',
      mid_rewards: '9374367966628772554'
    },
    {
      address: 'erd1svyw32jeh7s2tt4fq282rz9cvz9y3kg5ud38005zs2x5fnfwfqnqc8aex4',
      rewards: '4941522136717673',
      mid_rewards: '9372732783662344694'
    },
    {
      address: 'erd1nflfukf7qjspesexgw3k06ah7a85wqr59k6u2aw0vprmyhx7yxpsjqrjtx',
      rewards: '4865671623666565',
      mid_rewards: '9367011475108107255'
    },
    {
      address: 'erd16c9mh3e4k8axfrdj6cgh7zdrgh44nsncpmvqwd6rxewg5mfpny5qavfnma',
      rewards: '4857246494722206',
      mid_rewards: '9366375978255667567'
    },
    {
      address: 'erd1v9fg9ype792kdgr3my53htar4p5j5d50pvwvprep0ctu82t6uvxqu52kg4',
      rewards: '4852360088538596',
      mid_rewards: '9366007402798848581'
    },
    {
      address: 'erd1xmafk3tjjyy0rjkx2wfjtxcykj3z4wj2tddx9lw29qsa6400rcrsze6sty',
      rewards: '4788186918399436',
      mid_rewards: '9361166901495682413'
    },
    {
      address: 'erd1ldnkkwvhmrzvs5hm43w2nmkksep2y4pntjsjx9ngcszxhruqc2ms5hnpq9',
      rewards: '4724892639851799',
      mid_rewards: '9356392693877009055'
    },
    {
      address: 'erd1zwd7xugaa7tnc7m0rzz873lm9zg6smths7edn5m0uks2qdnwpzkskz0qz0',
      rewards: '4694801541941574',
      mid_rewards: '9354122960305607038'
    },
    {
      address: 'erd1x9pm4ttfmjhy9v62xeh78rdpz5xd3qjquuq8ugfkjafvkhx73qeq72zat4',
      rewards: '4675773367394283',
      mid_rewards: '9352687689093458674'
    },
    {
      address: 'erd1h2y73msnmfg8zcy7k7fmm5yt93e48pm7w8zumvrt30x6h2lv6jcqpd9ukm',
      rewards: '4587061666097819',
      mid_rewards: '9345996277327444233'
    },
    {
      address: 'erd1j6cpshugv5cxyf778dvpg9jm2anvm2ml04zk4x46exp0w8hmqqsqzj5pa5',
      rewards: '4466429888685512',
      mid_rewards: '9336897174470264324'
    },
    {
      address: 'erd1snqa972ax0g7m7mtrnpnux94ch5jqkm7rk4j7nwkjq8ezhg34euqt6n3d0',
      rewards: '4446168963247899',
      mid_rewards: '9335368918412920637'
    },
    {
      address: 'erd1e7clfzde3pnm47sykd2ln2zqjc5qxe68yy4q2squs4vueavwmg4s5n4zfx',
      rewards: '4431486022673378',
      mid_rewards: '9334261402720129422'
    },
    {
      address: 'erd1eu4plrsqttantmmapfvnjsfdxd99p04p23cyz8c7qy5v8x8e9jmsdpl4mm',
      rewards: '4381522690698723',
      mid_rewards: '9330492731591534822'
    },
    {
      address: 'erd1vnahz6kc7xm47hxw9xhyrlveygn9a49dgj7anaj9l3ffq7hp5z3qttrf9r',
      rewards: '4380602409657841',
      mid_rewards: '9330423315953067710'
    },
    {
      address: 'erd1m02q4v2eq7spjgs3wttffzs77rjhw4qjnqavvvhsh0yjsrc0p26qv8cpzr',
      rewards: '4362785714158597',
      mid_rewards: '9329079425077875016'
    },
    {
      address: 'erd1l3rttsqrer42z4df6fzu9agys854f8a9xham493grqf6aq2e95dsc6psuu',
      rewards: '4350613198890329',
      mid_rewards: '9328161267600363923'
    },
    {
      address: 'erd10gfw0fsu7wrp7fmuz78h225llqzv8vlxmanyrmxwalep0csykz8qagl9zf',
      rewards: '4344184208118327',
      mid_rewards: '9327676336933195136'
    },
    {
      address: 'erd1t764ymmegfmt7rmk226lxkytlymkq5j3zxg4rp8x6eenp9g02zms54delt',
      rewards: '4310074954666770',
      mid_rewards: '9325103518956083308'
    },
    {
      address: 'erd15hah3xypch3sfkc25uhlwxymzwt2c35ycaa6426wg8kw8ttlxwmq80qpq9',
      rewards: '4267400945214622',
      mid_rewards: '9321884672233745717'
    },
    {
      address: 'erd17c5dd450zpnpuzvghmuyx40kqf4k5ds9ct9gynzanndrlshf8pkqzktvqg',
      rewards: '4200524098852610',
      mid_rewards: '9316840236042343937'
    },
    {
      address: 'erd1p3f3dzm8dkjuxjd73rucsqnx77apk950nrn5d03y7aktu54qxtzsqhag6f',
      rewards: '4171331345281366',
      mid_rewards: '9314638263451646160'
    },
    {
      address: 'erd1zqsqvqgn5q6l62a6nsksz0xwh50fcq2ufvvpuk6mq9zrpdrpztlqsqwce9',
      rewards: '4170746312472982',
      mid_rewards: '9314594135164618469'
    },
    {
      address: 'erd1wekxt8fzs775y40ka7us593zj6vchvl93cf4nqnzzqrqf4uk9npqg7a0sr',
      rewards: '4158713309532714',
      mid_rewards: '9313686500926087581'
    },
    {
      address: 'erd1ghs5dy7vqzsvvjd857ffw59n4hu6e3x8hd0q7yylmakjh8ghakwqhhgk87',
      rewards: '4144928413859391',
      mid_rewards: '9312646723627786215'
    },
    {
      address: 'erd128qp57sau326yyvu30r3jzyyvclwn3mlvj4wcv633uuxrjhc099qzsjlfn',
      rewards: '4126062411197902',
      mid_rewards: '9311223684836490043'
    },
    {
      address: 'erd10pp77l3wkftlu5zy78h05hjyrwrmy48hhh6mlu2955pvdgnh2j8s6emz88',
      rewards: '4126062411197902',
      mid_rewards: '9311223684836490043'
    },
    {
      address: 'erd1tdh8mpp0t6pcd5d930xv9djc8vg6as7a8t00wrnnyj7zjz648f2qkwvu8l',
      rewards: '4110366483536539',
      mid_rewards: '9310039760805084478'
    },
    {
      address: 'erd170ma04rj9k50xdxk4evd2wm0kjrfnhqznpgxkhvh5xx826ssutrst5fg7r',
      rewards: '4107198543692178',
      mid_rewards: '9309800807097300857'
    },
    {
      address: 'erd1666thh830jn598cv85uxpwc68fj6lf37ya338kspehy54pdhfl2su98gz7',
      rewards: '4082258610664428',
      mid_rewards: '9307919619397520485'
    },
    {
      address: 'erd1s22647pdzjc649gqgkh2czx6425ghpnkewfz6ttj0rqx603aqtns7s23zg',
      rewards: '4009076422555987',
      mid_rewards: '9302399579229031200'
    },
    {
      address: 'erd1fxtj807thyyk98zjs6sx4cxa7t4ekvt2wvw5mz2tt42nu2qtsd4sg97my3',
      rewards: '3980267378021642',
      mid_rewards: '9300226549327141200'
    },
    {
      address: 'erd1hjfpsdl443l9phnrrll2zd35tg0crjfnw2v3ullv0sm4ex8fvpes4wrsun',
      rewards: '3979932625302013',
      mid_rewards: '9300201299351612661'
    },
    {
      address: 'erd17886y55ec6jwfwlcy44ad9ptq467kavxf3sjexyqjzf46qae2ndq95dusy',
      rewards: '3971853328686677',
      mid_rewards: '9299591888195667049'
    },
    {
      address: 'erd1j2myku42xjr0rz23paur78x25e0ymv4h9rlstqh7hqryh8g7v0pqduj7h0',
      rewards: '3891233211991914',
      mid_rewards: '9293510814452914952'
    },
    {
      address: 'erd16fktnhkw8pazgckdtamplr5ummyk7an4lhrcvkfrenknmfehpy7ssp3ap5',
      rewards: '3866166238355749',
      mid_rewards: '9291620044240236209'
    },
    {
      address: 'erd19xm2stjd0jt2ma0ehrjyn4ylpz3x6sukyrc38u6qgutrklnrnjuqf4ln9s',
      rewards: '3866166238355749',
      mid_rewards: '9291620044240236209'
    },
    {
      address: 'erd1wx6grka363g2kujy4fdt5pmqpzn3cj2cecaa3gx92uujgmnug75syc86ku',
      rewards: '3866166238355749',
      mid_rewards: '9291620044240236209'
    },
    {
      address: 'erd1jmztuup7lc8exkwd93v5etyyqdjmhkxa8nuuscr0nsx9rhu7y55s9ggw9z',
      rewards: '3866166238355749',
      mid_rewards: '9291620044240236209'
    },
    {
      address: 'erd176fcw84wy74y2wzc592amlhss38c03ye392zkt2crer0ane29vws66k8u7',
      rewards: '3866166238355749',
      mid_rewards: '9291620044240236209'
    },
    {
      address: 'erd1la5m5vqsa8tkm6wwz76md8dcp87v55dusw04xngnrdjx8hcgw4vsleecyy',
      rewards: '3860603007718558',
      mid_rewards: '9291200416768338816'
    },
    {
      address: 'erd126p0tc5m3t6wcexe2meg6gwx45n64565hsvksdzqp6da49s3yqaqdtccsa',
      rewards: '3845898269817454',
      mid_rewards: '9290091256930689216'
    },
    {
      address: 'erd1jyxczmpyktfctzuhr9yrvv67xx5rkd3ss3dpg9mls97uejl7yngqn6mjtv',
      rewards: '3840923634240297',
      mid_rewards: '9289716026441969582'
    },
    {
      address: 'erd1yze5gdhasnrvdqkkn94gemlfdaeks0sr3aqllxl85vgt8v8eu8cq6heswu',
      rewards: '3822183893122868',
      mid_rewards: '9288302511399729859'
    },
    {
      address: 'erd1f9cgwe7crhqp4smkx2xa3e32plqhe3tqtlzpds9kztxarxmkhpyqd4g7f4',
      rewards: '3757768951610581',
      mid_rewards: '9283443773586755126'
    },
    {
      address: 'erd13letz0c8t28053aw8ez7sjp0epvsuxrk5hs3twqgn32scp8zfhsqsrv4hv',
      rewards: '3732116583153819',
      mid_rewards: '9281508847780923952'
    },
    {
      address: 'erd1893kxcn5tm6eefcwqjd6nex20wv43am75jfmqfeh0lce5uwsjqzqqdnp6d',
      rewards: '3685226646244681',
      mid_rewards: '9277971998966662883'
    },
    {
      address: 'erd15057vc9dzh6zvxec7nrd4lcyyw4gcnvjur3ct3csvw5fw28uma4qlx3c9n',
      rewards: '3610974573684235',
      mid_rewards: '9272371258763050864'
    },
    {
      address: 'erd1hhq9rfdcvpxsct4hyfsn3r4sa5lvpu3rq7qquk2vm2f5r7zym3ustnft9q',
      rewards: '3610974573684235',
      mid_rewards: '9272371258763050864'
    },
    {
      address: 'erd1w4qd66f9uw78s0l2zpyl6zgaq4mjja7wq8xyszjaatgg27m8rj4swfk3nv',
      rewards: '3596958333148460',
      mid_rewards: '9271314031413493634'
    },
    {
      address: 'erd1yewaye5qvtwtqaklmkgt29jkvejzykvgm3gfsny5sca2ppm6vuhqqapk3z',
      rewards: '3580660553121750',
      mid_rewards: '9270084710417087612'
    },
    {
      address: 'erd1clutw0lqv766hel4ymlt30f026vz6gvwsvsuu9wkr8p2yvurs89sy0ljzx',
      rewards: '3573384493826661',
      mid_rewards: '9269535886439350214'
    },
    {
      address: 'erd1222ezw37trhx66gtqpy2lmsxqz4cm83ukqhmak53qzeastxglp3s6zwthn',
      rewards: '3570086482295084',
      mid_rewards: '9269287121588216362'
    },
    {
      address: 'erd10nu6zkr0f3y5jfmjsdrdadr3j07l6n90zk7p3ndwag9qv0lrezsq8huh55',
      rewards: '3559677740870709',
      mid_rewards: '9268502003347684535'
    },
    {
      address: 'erd13tg3a6jjkhr5vedvlsrnnful4qcr5kvm0gvc3gar5setx7pzf5yqu6t5gm',
      rewards: '3555790268938562',
      mid_rewards: '9268208776241827462'
    },
    {
      address: 'erd1cputlem5jscdcr4fhrt3makgvxqq3f62xpx3ff2f6znfdx75fj2s4lmymu',
      rewards: '3529245577524884',
      mid_rewards: '9266206543640548431'
    },
    {
      address: 'erd15wmz5fp2tk7japs4d4tsds0l8ayplnkwg3cqz90mgvxrqcuqse6qxxz6w7',
      rewards: '3524820890623196',
      mid_rewards: '9265872795086950742'
    },
    {
      address: 'erd1ktjp5ueugvlk6rnrqxln74vd9dexjexz99z8jf6nhhk50nurxrtqzy4skr',
      rewards: '3494751097657384',
      mid_rewards: '9263604668520640906'
    },
    {
      address: 'erd1pdferxa0rpw6h2293y6y59dqcrs7wkaynrpsdaek96hcdr6ycvvqjzlg7h',
      rewards: '3478310515478434',
      mid_rewards: '9262364576137960626'
    },
    {
      address: 'erd1x43vlzdwhc5gwmq8j4ed67wvftkq5rjghpxa4ln8jnc7ks2t4maqe0wgfd',
      rewards: '3473271172260339',
      mid_rewards: '9261984464833479421'
    },
    {
      address: 'erd15tjmc2z5xycnasrp82nnks3cla963g4paq7ms7wxla35n6l2vdcsn5fnxj',
      rewards: '3469766349352731',
      mid_rewards: '9261720100461034453'
    },
    {
      address: 'erd1vscyde4npew42hnu0fxn9ed6ru3pj5vukknyz87azylm3rfx837swl8z00',
      rewards: '3461206963410429',
      mid_rewards: '9261074476772533947'
    },
    {
      address: 'erd18np6k8tg3dwld7tllvhpuha3mjrn0ten3ffxclflultzqv2s97nqhdxcdc',
      rewards: '3441319982086010',
      mid_rewards: '9259574426848116243'
    },
    {
      address: 'erd1phqsnu0nq4m5ffpq7qqfzej2wnxw83f7f52ckf72guvd29arm37svsagp4',
      rewards: '3440729424676545',
      mid_rewards: '9259529881847395367'
    },
    {
      address: 'erd1z4v2ceq77m9n8ll0g9enwnn9acpuavvww6pu4z2nj9yp2d6xmzlq08465m',
      rewards: '3416114885580967',
      mid_rewards: '9257673238201606802'
    },
    {
      address: 'erd1ekyf4nmp4mdsxx6mu2hd8vnh0k2h0gzv0vg22mvgn5zyvrp2zhxqh0f943',
      rewards: '3411831441119252',
      mid_rewards: '9257350143387153823'
    },
    {
      address: 'erd1utxsqkqa52fm4f0n0up6vwtmwel4c8d8ykjncnrek08l3gtne3rqqmgxjp',
      rewards: '3387195030043262',
      mid_rewards: '9255491849965462688'
    },
    {
      address: 'erd1fuq20etqszzqxdgj3d732u5l43ktyy9c33lmmh0cq52qc2suvfus596874',
      rewards: '3354979315495619',
      mid_rewards: '9253061859240177686'
    },
    {
      address: 'erd1uj2pxqgah20czkfk5lejnz6afdnmn86tgse2kzzzpd5yfegv9mmqawypsm',
      rewards: '3345634952989115',
      mid_rewards: '9252357025759271179'
    },
    {
      address: 'erd12zcq0pnpwrdj75s9gsa29cz0yca047njpjpwkfvcvk3uvyxfhm6q6xxlxg',
      rewards: '3345634952989115',
      mid_rewards: '9252357025759271179'
    },
    {
      address: 'erd1ue7np4vtdteg2ee82cyz9q8yfye6twfhz73ccc02j9wn792v4j7quf7p4n',
      rewards: '3332907844436193',
      mid_rewards: '9251397036009624028'
    },
    {
      address: 'erd1xstfvzy4nmuf80xnqsc75ytpu0jgnqxkw7unwg4phyf0pc6ptjgq4kr8m6',
      rewards: '3332565603859589',
      mid_rewards: '9251371221234485826'
    },
    {
      address: 'erd1lmxr236xazqcstghy8mrgqcydzx3spulelnwusej9p4fnvqyyg0skvk83a',
      rewards: '3309924914768172',
      mid_rewards: '9249663462605545845'
    },
    {
      address: 'erd1xqsj98sp4mdq7fzkpw3vhgyp9mn35l2mnppuf3l6tc2wq7ha7wsq6sql8q',
      rewards: '3270200169631944',
      mid_rewards: '9246667075171624811'
    },
    {
      address: 'erd1lzjsn2yftjeppl8tpc2aeluhp0t36nqhx2h2umjpcjt6rw5ymuxq6zkuhl',
      rewards: '3251003081588659',
      mid_rewards: '9245219063027468440'
    },
    {
      address: 'erd182uzns45lnuwqky9t2qev9kapn39k9gxhhf9kauxtjgdq7e6pxjss72nyu',
      rewards: '3244727072309550',
      mid_rewards: '9244745671561403526'
    },
    {
      address: 'erd1c8z2u3440f05v8ehtuctetjxye6mtymajzurwne0vevrtqnycdrsn3tycj',
      rewards: '3241157938042522',
      mid_rewards: '9244476456264212191'
    },
    {
      address: 'erd1a9fmpele467vpsfzss252xruxc4c4jnkfry67cplqtxc6zjglvasc59qty',
      rewards: '3239679793640359',
      mid_rewards: '9244364961695852514'
    },
    {
      address: 'erd1380gs227v9d8gt4ng4wkvnczmxehs6yq3djx3gct5cqequqz8uesyrl38m',
      rewards: '3234184622442170',
      mid_rewards: '9243950467861618143'
    },
    {
      address: 'erd1r3zk4y736m97qt6tdmzy6qfepgnvphjck4g928r6cfjhtrxacn0smhevna',
      rewards: '3221085900404648',
      mid_rewards: '9242962447775421003'
    },
    {
      address: 'erd14pxyk5erz0ds8l4kuh93ge772rahn93ffkydjw8wgm3l859j3x0s3ljcam',
      rewards: '3202723709859568',
      mid_rewards: '9241577410896773688'
    },
    {
      address: 'erd1anvgnaunfalx6gd4xfwsph9q4f0f990rfflkhfgle2uwey4up8wqnlfw9s',
      rewards: '3168750934540394',
      mid_rewards: '9239014887293092704'
    },
    {
      address: 'erd1lt3elaup395qfj3zdn2jvfmun2je7tjf0y2xzd86a62mcnw57lwst2l624',
      rewards: '3094583029640234',
      mid_rewards: '9233420495749963179'
    },
    {
      address: 'erd1nlpskncnley4cgyngxaljy20nduqd54mq2vc9ssvmty4ac406qqqn794sj',
      rewards: '3071621759509666',
      mid_rewards: '9231688556097483052'
    },
    {
      address: 'erd1te8dvru8j6eqcpar8u5x7em2x7k824lszz8vn8utnpd2lkxj05jswuhsr8',
      rewards: '3008700867700986',
      mid_rewards: '9226942512569699812'
    },
    {
      address: 'erd109kazdhgnff3e8rdxf0cdqsednwpyjuyuxkwl2xjecz85k89cldq2pgpsx',
      rewards: '3006397978316123',
      mid_rewards: '9226768808527273605'
    },
    {
      address: 'erd1u76wxr7afxfevrelrat5u5fx4k06s4qdlqcm2lzfpf5htde9wzhsamuf03',
      rewards: '3004661581058128',
      mid_rewards: '9226637834271647576'
    },
    {
      address: 'erd1wyryxwyr9q7rv3gzvhzxkn4wwvjargc8ullu4jv9ufrpyahlllvsf7hp98',
      rewards: '3001680068575735',
      mid_rewards: '9226412942544697924'
    },
    {
      address: 'erd1q8huqeka4f0u78sv5x0xkcr3r2zyy0qy89ed0rkcv0uzwfp3lw6sq0fypx',
      rewards: '2993917532112033',
      mid_rewards: '9225827424207565074'
    },
    {
      address: 'erd1xtepk9k3f75geka5v4snraj2ugqadfhgs4g0znf48dh4la2h7zcsppg5mj',
      rewards: '2993917532112033',
      mid_rewards: '9225827424207565074'
    },
    {
      address: 'erd1035540sv9sfd0xyftpn89ltttghxmjuarx4dptg0ss9u8udn4hks2g4cfs',
      rewards: '2993917532112033',
      mid_rewards: '9225827424207565074'
    },
    {
      address: 'erd15399j7m6nl2ye3mtr5wjg8y656zt9qunrrttrtpt5c3597p2evequwla6g',
      rewards: '2982528389553117',
      mid_rewards: '9224968355545711060'
    },
    {
      address: 'erd1d5lhe4ng8nnmxktyps50p0ezvhk9fv3tyn745f5qdvufhpee88dqp3temn',
      rewards: '2982528389553117',
      mid_rewards: '9224968355545711060'
    },
    {
      address: 'erd14wgmfe6cuzrlpenxwap9qgtfmmtx3qt04547rr7z8smx8n7f45lq7ddlxp',
      rewards: '2973179765779007',
      mid_rewards: '9224263200642762362'
    },
    {
      address: 'erd1gra5swp42f8w4vvy32wnpqeywp0jpx8w0wzz5zxtsp5v4kzh655qfumj7z',
      rewards: '2919257284198457',
      mid_rewards: '9220195895851763260'
    },
    {
      address: 'erd10apsn2ke9wv9r73r2m5ulev5mtxazwkx3w7594vpr965gkumhhfspnsw0p',
      rewards: '2853592944808687',
      mid_rewards: '9215242917532342998'
    },
    {
      address: 'erd16vutspr88q6q33wwcfgwwhkymas2g9vzv33m69e9fzpjykdmctxqgk96pn',
      rewards: '2849944508925301',
      mid_rewards: '9214967720614226724'
    },
    {
      address: 'erd1yuhsx3s5gpshp9g9hgv8nxldquxd7x66jhvmzzk4s9k8twcp3u9sj9sz7r',
      rewards: '2835210050366933',
      mid_rewards: '9213856318984876553'
    },
    {
      address: 'erd1cn8nlzdvpxqx2hp3kk78826yu3yvhnzrsrud2njfc3x7ewka4cgsftn0rw',
      rewards: '2822721793090481',
      mid_rewards: '9212914345485829283'
    },
    {
      address: 'erd1pen22yq30vhnz03kgmc9yuye7268d3tn7zts2x45hyqw76dvznnq08hlvm',
      rewards: '2818823971123569',
      mid_rewards: '9212620337689900967'
    },
    {
      address: 'erd1jh6c3hzhnvfkgkz5xrq3kv5y094utp8mlx74k430cxjhpa3we46q3dw8vt',
      rewards: '2737821124592800',
      mid_rewards: '9206510395118229709'
    },
    {
      address: 'erd156r8f3sr9zetcvcsskf5gaqd4cfkakx3u38g0k384yx7rn46estq90dy4c',
      rewards: '2699060802198687',
      mid_rewards: '9203586752875638440'
    },
    {
      address: 'erd155ls8mkphdyadq2qvuevpqdfueav20vzxvz67fyrmf3f683mqjhsxac5c9',
      rewards: '2692236929627830',
      mid_rewards: '9203072036772316051'
    },
    {
      address: 'erd1scx3rs8d2e2l0tvgw57cx0kexyn72h2dq8vp38cwfakkmclzw30sdfrkey',
      rewards: '2675145148512412',
      mid_rewards: '9201782825275000193'
    },
    {
      address: 'erd1lyhxv67f5jrfmavxvwzuqw4pzc0uzk30glxzxqfzng9an8z29e4q0efy5g',
      rewards: '2675028780079606',
      mid_rewards: '9201774047750850718'
    },
    {
      address: 'erd13hs5vc9hqtggsqv6nftd09dr7snjmkpve9j9kwl8qmevzpthtlwqa049w6',
      rewards: '2638406696825701',
      mid_rewards: '9199011690190350320'
    },
    {
      address: 'erd1evqvevnkyshxszdvf225clmdpjl4ahmg6slpq5e7auc02f22ln5sukgew8',
      rewards: '2620895651505523',
      mid_rewards: '9197690854122748923'
    },
    {
      address: 'erd1y5sm5xul9scn4rm4kr6pyqg333qlutg94hsj7f88hd2s35a2ft3qmxhrn9',
      rewards: '2613105892016997',
      mid_rewards: '9197103282387181012'
    },
    {
      address: 'erd1jq2as0emjnfccesfeqn2m0qjqp950wl0at7vx8jqvj95nepjcwwqn839ry',
      rewards: '2569491430498968',
      mid_rewards: '9193813498551395687'
    },
    {
      address: 'erd1yrh0zpyn857thajpf2j5a68m6sw2eyfwg547009vew893zx9cmnq5fdmnn',
      rewards: '2546102703546344',
      mid_rewards: '9192049316369838027'
    },
    {
      address: 'erd1z9zss2tcadxmxmkg2datmklu86ajvt7rp984nkprs47w4cz92uusrjm0gn',
      rewards: '2512241962438877',
      mid_rewards: '9189495243365474343'
    },
    {
      address: 'erd1mjf5333vylx4ujmaqv40fl8vqjpzcsuf2uc8ga8hksu4dwgylk4qwjnrej',
      rewards: '2409368700166098',
      mid_rewards: '9181735642912317428'
    },
    {
      address: 'erd1fu6utqalmvu7m2qyhvu4gaj73vexklzjxc3le896d3vcpprlsxdqsvmu32',
      rewards: '2384959428959438',
      mid_rewards: '9179894482364553335'
    },
    {
      address: 'erd1w8l8lp548fafy67vdhwx4ljdj3c6lgmszysjlc7j068zndqxsjpsmvxnnn',
      rewards: '2384959428959438',
      mid_rewards: '9179894482364553335'
    },
    {
      address: 'erd1kwp3he4zddtmwmkrdcp0hee2zy6v9c2d5nzhzh320sunj3qy7p5qyw9twh',
      rewards: '2384959428959438',
      mid_rewards: '9179894482364553335'
    },
    {
      address: 'erd1fz4qvyzxxc8lyxq0pcj836m9vnraxjlfwu07rntwjq87darpvh9ss50ce4',
      rewards: '2384959428959438',
      mid_rewards: '9179894482364553335'
    },
    {
      address: 'erd1aj0krk5dldk8r2rks04dk643dnv2hlyc44pklgyx6yrazsvmxdgskfd4e6',
      rewards: '2301388450749770',
      mid_rewards: '9173590828858679261'
    },
    {
      address: 'erd13zvld3jladur9j5zeupsg0pelket5tq0mq0ljx7fwx9aveuz4umqzy48jn',
      rewards: '2289935979560520',
      mid_rewards: '9172726983398094645'
    },
    {
      address: 'erd1kqckn27htycwtvalta0acwujq5702ya7936tm0zxjt9gfal0ptrq22yw33',
      rewards: '2279783176850911',
      mid_rewards: '9171961170292086623'
    },
    {
      address: 'erd19y6sjs7pk3ch2g0w4dw0sr5wudx27g6uvaq7sy27z2v3qlnp7y4sgqu6fw',
      rewards: '2248423624325295',
      mid_rewards: '9169595758788528649'
    },
    {
      address: 'erd1vtw3mrvvn6e7c87ptlmy6qua7sqjwwga4wm9nn9ldygelztctd2sezew3r',
      rewards: '2245711445654838',
      mid_rewards: '9169391182571391522'
    },
    {
      address: 'erd1rltf9vaxmk4tx5hkmj35qu3tt2hrh4k2c3xxcpstzexyrmekxltsjmwydr',
      rewards: '2229489348627236',
      mid_rewards: '9168167570248174240'
    },
    {
      address: 'erd1232y444xk86dw4wsy0qsurj83hhsmmkp4u675qsmf2wdf9fyey4qww8fp0',
      rewards: '2216357088874848',
      mid_rewards: '9167177020454434803'
    },
    {
      address: 'erd1jeadud4fv99mxx8hyjxe20fjjep9fv9sev7ecwd490wdhkwy9qmqgadayw',
      rewards: '2215873231759432',
      mid_rewards: '9167140523722348192'
    },
    {
      address: 'erd165hrd3zpstc7x4vwh8rzuhw4saumfhclcpjfes0grzmtkutdp4yqkgywfc',
      rewards: '2202709095125488',
      mid_rewards: '9166147569495628772'
    },
    {
      address: 'erd194pxrkn9yzmva4tw05vm0a40jvp6ergaeaus7vl7e57zhz6044lsdjpr58',
      rewards: '2201444299454236',
      mid_rewards: '9166052167553015401'
    },
    {
      address: 'erd1nsr32vylql9xgh3m0gq86w54drt9tyl8k6cql3rz7fd92utsxzhqjztpjp',
      rewards: '2166755065029875',
      mid_rewards: '9163435602342463469'
    },
    {
      address: 'erd16a5fmdhsjskdxr8kuxw2p5rzhh2rll2kpsxynjxkpd6jhnvrjs3qgsxphx',
      rewards: '2148954144825563',
      mid_rewards: '9162092901377875326'
    },
    {
      address: 'erd1j909ls5p73uhed0wdeec95pg0m06zkz38lygy2e2d7mam94l4auql0jeem',
      rewards: '2146807337488076',
      mid_rewards: '9161930970407467939'
    },
    {
      address: 'erd1v6j03vuc593sag9fejpsln2cz9esmc9e47j9l287hyklwkzjthvsslnlmq',
      rewards: '2117721505152967',
      mid_rewards: '9159737062750787373'
    },
    {
      address: 'erd1vs8cnhg9gfpf2jw8kgd3lcdqqhvmqn0pmf585tj74atk64zj9fkqfppjhr',
      rewards: '2093094005500469',
      mid_rewards: '9157879441506533203'
    },
    {
      address: 'erd1h7evelrl8dw76rwy0vu6hkhvd23yfa5zn3je28lxpvgyyncwe99sauz79g',
      rewards: '2090275001955508',
      mid_rewards: '9157666807623815182'
    },
    {
      address: 'erd1jp7g9zt2j05tdknyn6scwd0em93fppkh6alaelyakdapfflg8fhsru48pp',
      rewards: '2066827873785964',
      mid_rewards: '9155898220312107419'
    },
    {
      address: 'erd14cnumkqwmpzzugjzxn06hnq3a70h3ew6knnmtmqcxynnpcqre44qg0g32y',
      rewards: '2066827873785964',
      mid_rewards: '9155898220312107419'
    },
    {
      address: 'erd152hdm3g05cyn2he96z0daamj0fghl7r8v9fdnq4fgxgmlt4wddase0gcsp',
      rewards: '2066827873785964',
      mid_rewards: '9155898220312107419'
    },
    {
      address: 'erd10l2wfa03hr9m6c84qkyst62c2y0fjjta4aplvl6rjkpstk2gjzlqazyzej',
      rewards: '2066827873785964',
      mid_rewards: '9155898220312107419'
    },
    {
      address: 'erd1m43qkfzylp4en9zcfzg5hwvyv6yucrv4j0mnjf7nywkz874l3vwqajy75d',
      rewards: '2066827873785964',
      mid_rewards: '9155898220312107419'
    },
    {
      address: 'erd192zt549dypafuw6snplwaff96vxe4z362rq4l9wsyet6nxzlam9sdpt6nz',
      rewards: '2066827873785964',
      mid_rewards: '9155898220312107419'
    },
    {
      address: 'erd1977vhc7klzmyumta4yakm5rumza4hyams77juulsd5sdul02lsgsrw0m7w',
      rewards: '2066827873785964',
      mid_rewards: '9155898220312107419'
    },
    {
      address: 'erd1z05853lfutmejusm38qz3zp06yy7apg2z06z0ec7jgxwnqy26vkqp8c2wr',
      rewards: '2063771436945772',
      mid_rewards: '9155667677135326342'
    },
    {
      address: 'erd1dd3cejteyryfec8saka8f588tcjlzg8t36kf0rxxh8rchu5mpxesm5f5lw',
      rewards: '2034209135445681',
      mid_rewards: '9153437830010344420'
    },
    {
      address: 'erd1se06zmvld2a0nc4ud3ts66mntfznj8d860plcuwk5lkde7lpevfq5h0znt',
      rewards: '2010595569818136',
      mid_rewards: '9151656688531052253'
    },
    {
      address: 'erd1zpt7pyrdep86fvnp9d0ctya6m5ku5e4rak946qvkcdsu5c7suzqs4yvjk3',
      rewards: '1936919303442230',
      mid_rewards: '9146099380661865866'
    },
    {
      address: 'erd10vs9d5ydlj4rjtcjxpfswfdj6sfu465p48fqnzzyugrz3t766cmse9ls90',
      rewards: '1902461542613040',
      mid_rewards: '9143500275212716466'
    },
    {
      address: 'erd19tusnzfr7dl0d325k2f6hlzgw83c0qz2hlnwuq2vq52d2awk840q8p6k2r',
      rewards: '1895678494172071',
      mid_rewards: '9142988638422033532'
    },
    {
      address: 'erd1vh5v7f2q2n8252dc4shn29l9mhexme7a9jvhwdpfx9xn3jfp8acql2ytn2',
      rewards: '1859981501111925',
      mid_rewards: '9140296059248337562'
    },
    {
      address: 'erd1kcq5psxhr0kzn7xkes5qtsy9vc7uexsvlxc949et94had43q048qk5w7ax',
      rewards: '1853532593641266',
      mid_rewards: '9139809626289703433'
    },
    {
      address: 'erd1q6pcsxq0d56s0serh328m099sa25s8samkvc07ffues2tfv42qhqmw0f4w',
      rewards: '1849136812480366',
      mid_rewards: '9139478058059684116'
    },
    {
      address: 'erd1r3yechd2ppapafqndxxajt8dkgw2jjd5ny5p5y8s8ck9tthlg20sc4st0n',
      rewards: '1775903418322422',
      mid_rewards: '9133954155483450103'
    },
    {
      address: 'erd1mxrf05vrznearkglds07pqnqnfyn858uza2my9f0guecnvutwxgsr6dq3m',
      rewards: '1752044128216854',
      mid_rewards: '9132154479316631811'
    },
    {
      address: 'erd1zl0ykhj492pktp0y82567sh6jkyg4qlq458vdrnldvuv8jpxhfkspfajhu',
      rewards: '1736673138141715',
      mid_rewards: '9130995064917618634'
    },
    {
      address: 'erd1pmmplnf6ns4u2q0g4v7ut3w85vk089cpng452xragw0k9eyqgvuqfvqlhh',
      rewards: '1724781560112300',
      mid_rewards: '9130098098181780844'
    },
    {
      address: 'erd1m7gl8dxnf8nn5khs4qcfuaajvjhzv2sy2s7wvv58j50rpdystzpqm76r44',
      rewards: '1724781560112300',
      mid_rewards: '9130098098181780844'
    },
    {
      address: 'erd1htdpm3f3vz367vfjxlchdej48hyjkq8hhz7yhk94fscka4enzhrqquazw8',
      rewards: '1724781560112300',
      mid_rewards: '9130098098181780844'
    },
    {
      address: 'erd1rwgc4j69twyfn92ju028ftkptfa7z64gpt0mwf3225uykdmdzsusfkct3e',
      rewards: '1719478354595757',
      mid_rewards: '9129698084076850100'
    },
    {
      address: 'erd1aa0eun32wd47n6a6dhk2suft72vkh0utw6u6ycs8y3r4638yyusqvqk77q',
      rewards: '1719478354595757',
      mid_rewards: '9129698084076850100'
    },
    {
      address: 'erd16rz4zmnewdlrzq4jvaw69vj7hurwa64x4kzve6wgqgweff2rdnxsp83w7a',
      rewards: '1718827857941635',
      mid_rewards: '9129649017934486326'
    },
    {
      address: 'erd1dmqkzqxxevkw83d5sturq7ehls59y6xsg0hvzx2w4yyxs3tat9fqckfzs8',
      rewards: '1714654135209066',
      mid_rewards: '9129334199291707040'
    },
    {
      address: 'erd1qwael920wa8y4ek6neznj0u5cmmqjpetv4qsncp8jvdpxuvvugxqjgudvh',
      rewards: '1702968029278649',
      mid_rewards: '9128452731057202554'
    },
    {
      address: 'erd1j4fmw23stg208ndcyec3czdjrhhx32gl0hekalleqd7v9szkd93qmgjnat',
      rewards: '1681033465891241',
      mid_rewards: '9126798234599712771'
    },
    {
      address: 'erd1yfchjw0nqp64g7r4t9tf67w93nzgp5nlk9fnx2w4v0p8vctu7phqusrfyy',
      rewards: '1654957055965798',
      mid_rewards: '9124831323880602484'
    },
    {
      address: 'erd1j9vfp4qgdkyyx49rnx524ns6e9gplad7axgndm0kwyt94aagy2jsqndrst',
      rewards: '1642884799189070',
      mid_rewards: '9123920728774685321'
    },
    {
      address: 'erd1yuxzkvv8z4scmwdjtlldhny5t9hdfkcjyfum8peus6ddzkdnepvq5a393n',
      rewards: '1614309612708318',
      mid_rewards: '9121765338490889894'
    },
    {
      address: 'erd1nwnmyv2hcpssm0nz4jq84ajua6hv8wj5zzhr7a8w3sjqzj8wddlqgfmsdk',
      rewards: '1565166900264314',
      mid_rewards: '9118058565658715839'
    },
    {
      address: 'erd1qxm2lpd8ce9ej86ck2rffajk75w9s57lp7vj5ykyt4w0l6jar3hqftherz',
      rewards: '1501656465147019',
      mid_rewards: '9113268053622560088'
    },
    {
      address: 'erd1hu6zl04p34cp7gqxmfgx065nvhl4jwc94egzzwq46kmqanzc9t8qqns6sm',
      rewards: '1497171169122088',
      mid_rewards: '9112929733399222455'
    },
    {
      address: 'erd1h828gyu9pjfr56hxafkyxt09d3hk0avuh9kk9qllkn8lk56g56tq8g3e4j',
      rewards: '1487625665934469',
      mid_rewards: '9112209728130371771'
    },
    {
      address: 'erd1y4zleeg659cjhp3h5k8yh4kejhm9efvr96r44makwrgzd8mjgpesmj7eek',
      rewards: '1437057757444242',
      mid_rewards: '9108395454557560314'
    },
    {
      address: 'erd1rvuzre36zv67zl6dnxwp244y4235ppwhkam7rlpd6skkeurapslsedwkkn',
      rewards: '1403476657022905',
      mid_rewards: '9105862474497532950'
    },
    {
      address: 'erd1l9cl454lev8dnycavgk8ccplx74mek4mew3rz6g7m6z0qa2ka35suk9se6',
      rewards: '1403476657022905',
      mid_rewards: '9105862474497532950'
    },
    {
      address: 'erd1fggrgwj6h8p70vgkjdxl7e9aqgz80s49az0q3sdytv8atp9r09ssa0p4sc',
      rewards: '1392406115640008',
      mid_rewards: '9105027437520639582'
    },
    {
      address: 'erd1cghmf4ug8us5jz27yy5kl04p6hk5rkmz9vp32wc8pqqchejcvncsn7g96u',
      rewards: '1392406115640008',
      mid_rewards: '9105027437520639582'
    },
    {
      address: 'erd16vm5spefgq89z6c0sj7q0u20j5yf6hryf6xudzu6mxm6chffx2eqc3j4a8',
      rewards: '1345824953589419',
      mid_rewards: '9101513879204603087'
    },
    {
      address: 'erd1947mg6xa837dc3qncgtv75wsx9z578m8d9j5lc660e580adguyyq77j8rn',
      rewards: '1330012713312011',
      mid_rewards: '9100321181859235946'
    },
    {
      address: 'erd12czqdsnu0hdskash9vajhwqpncssu0gspexw99rssl8nyrlh7ruqm2zrwa',
      rewards: '1283677259981851',
      mid_rewards: '9096826157042150130'
    },
    {
      address: 'erd1gp6ka6rsyykwmzljjsvukv5vqm82pjg9l7rlyeptfm46ah3cq2ysl86ly8',
      rewards: '1280555164670000',
      mid_rewards: '9096590661329645167'
    },
    {
      address: 'erd10kytwdv3lmtd4wnm4zqh5rrdfa4u8mm052pcydx894hhvyjz09fs9v2sd7',
      rewards: '1226060847934547',
      mid_rewards: '9092480223733978603'
    },
    {
      address: 'erd1md8g5m3x73qseccru5h4ggj9trwdwulxffz4jqle6fhuvevh0k3qphzl48',
      rewards: '1196735121422445',
      mid_rewards: '9090268221162026772'
    },
    {
      address: 'erd15v5lk0wvvhtjq8nf03djgpnm8kgqrfeq7hcxk0y93p2auxjfwnkq8urg86',
      rewards: '1190284664297359',
      mid_rewards: '9089781671314913282'
    },
    {
      address: 'erd1arvlu62gmj4nwccr5jj56awtdcd8zpdfe87x5g4plez984duxdds8hxyht',
      rewards: '1189431692208688',
      mid_rewards: '9089717332705836888'
    },
    {
      address: 'erd1hrgy22ek46ugf6ms4lg7gytpwmfv4uyymrp4vuj2wq5gzh99dlrqzt5mtf',
      rewards: '1181789480237276',
      mid_rewards: '9089140890293431919'
    },
    {
      address: 'erd14fzyp5y79emmwqxrgajza0vpfuysu9ggynjwe630ussx9dldrc6qt89nmn',
      rewards: '1164532712493270',
      mid_rewards: '9087839234062764828'
    },
    {
      address: 'erd1n0yajar0k2ncfkt66mcznkncchjjuqpyupgzls0w56wx7hnf3ftsn95qek',
      rewards: '1164532712493270',
      mid_rewards: '9087839234062764828'
    },
    {
      address: 'erd18a7nqte7sddms95j8xwwnlx07kr30ldszyza6ry4p30yyqelx7esaqjfcs',
      rewards: '1164532712493270',
      mid_rewards: '9087839234062764828'
    },
    {
      address: 'erd1gezcqj922lyzcqr0tdlg9a5pqyq4zard543wsmal3n47zd0cf73sw9sycl',
      rewards: '1152258364037948',
      mid_rewards: '9086913395436362827'
    },
    {
      address: 'erd1nhwdfmk0pfz0rsu6p8lh6edwcxjkjm0av3w7f5a8wh4ua4wsarnscrvj8t',
      rewards: '1117394731195203',
      mid_rewards: '9084283675573023332'
    },
    {
      address: 'erd1ex2lusfdvwhh2xwrccts4g22m5623h23kuffgrhpmhpl3kncuf0q4g4vzf',
      rewards: '1109429750428170',
      mid_rewards: '9083682887117366381'
    },
    {
      address: 'erd1zpah5a0d3lmxnp67v4sp2wlukq0mdfu2ruwvtyh2dkpmjtk4wv6qsl7g00',
      rewards: '1080656155272295',
      mid_rewards: '9081512531117393777'
    },
    {
      address: 'erd1renth9faedzkv26yzgavuuzrezx0t6exnvq6lng6n28jnywvegksqt8mv2',
      rewards: '1062618218902403',
      mid_rewards: '9080151952322306165'
    },
    {
      address: 'erd1cr3rrsfpvyfn2tg73z5ycrgfs3l3d4rduzam5cxz90a3elqpx2qs0ld6g5',
      rewards: '1027319554125617',
      mid_rewards: '9077489418548744096'
    },
    {
      address: 'erd1ehe293l4ws3ngt0ntj32ecp4sg5x9cx0ecvrhw3gaclxwzeqez6sxrucu2',
      rewards: '1012739374616900',
      mid_rewards: '9076389653993567874'
    },
    {
      address: 'erd183qzd7ahtk8dyza4cpacdwv0tdcxkqaw49sgv54azrm3xse8wehquxnzv4',
      rewards: '1006066154120877',
      mid_rewards: '9075886301386282494'
    },
    {
      address: 'erd15yvugwengz5mxtxzx2snefck6fu262p37takrplcsmuv793c9swqgf0gca',
      rewards: '910280100003315',
      mid_rewards: '9068661280107518020'
    },
    {
      address: 'erd1jz38vwrn0aea529tvxdppvcc5qnlqh3twym08nc9rdxux728ah8qv4t4tp',
      rewards: '831865475538707',
      mid_rewards: '9062746563862627378'
    },
    {
      address: 'erd1zs3kvfdtjf9sqgpt68lda3yyvy9wdftym06he7rpepxfp6nexwcsphknl5',
      rewards: '831330946932640',
      mid_rewards: '9062706245043896183'
    },
    {
      address: 'erd1dp4hzedame6zzxxa9efhswaa36cqaxxn6x3pxv6z42fxv5s0vdcqrzgyxk',
      rewards: '813026843490631',
      mid_rewards: '9061325589602187430'
    },
    {
      address: 'erd1wey34ytdxpxutyx5g9ees6edgwungllt3kj6y3mau2excmmr5ulq23q5pm',
      rewards: '813026843490631',
      mid_rewards: '9061325589602187430'
    },
    {
      address: 'erd16jfq3jkmnp73cerxh4sk37tyx7fjmgqf2n657fn9nvvlqkmavzjq3eel0a',
      rewards: '813026843490631',
      mid_rewards: '9061325589602187430'
    },
    {
      address: 'erd16hn3v2engc24vcjjc3mzwlak8haf9pydd7326ncpf75a5qnxmhvsmwq9kd',
      rewards: '804977072763002',
      mid_rewards: '9060718405546720304'
    },
    {
      address: 'erd1s9rze7z7z4mfe6d60ynaqlqevcr05cca5j0jqmnyt5qrsme2m3qqh03pmv',
      rewards: '804977072763002',
      mid_rewards: '9060718405546720304'
    },
    {
      address: 'erd1uhqfqvruuwjjjc8mnzlf6k243kndn45tkts3q2ewx55hf2mdddrs6e0eez',
      rewards: '782733162776658',
      mid_rewards: '9059040575465349503'
    },
    {
      address: 'erd1dcrtntx2g3zc3r3xhffsq5lxmw75xu2cslckz96u7yam3aun7gusz4447r',
      rewards: '759171756837804',
      mid_rewards: '9057263368325603505'
    },
    {
      address: 'erd14qp39vxclgf8t3ka82zxzeueep0xjdd7aqs7qg8euyj2um2eakrs0km7h6',
      rewards: '728861054412666',
      mid_rewards: '9054977070262556266'
    },
    {
      address: 'erd17ea5ymq2rvjlus0h4pkrvalghqsv3l620hdacht85k8jvr0scz7q7ncd60',
      rewards: '697772956578652',
      mid_rewards: '9052632134244089658'
    },
    {
      address: 'erd1apeymdkj83dxxshdsnv2pzp32r9fy5fmhk2x2wvx4v442g0vcpcqmrhsj8',
      rewards: '616317483075781',
      mid_rewards: '9046488050590661696'
    },
    {
      address: 'erd13j7qs9rpcvnc6um9lftm63w5fcafakleu3v5s8s2jjpamu8rpsfqq33fp0',
      rewards: '587275673227656',
      mid_rewards: '9044297463494663306'
    },
    {
      address: 'erd183tprjwy9523nmsls48zlnwdzv5e6qz8utfk0d54jjflk2lwf3wq0y6532',
      rewards: '552549784914302',
      mid_rewards: '9041678133527484080'
    },
    {
      address: 'erd1t646juxwxpquug7kwpqrl789z3m7cqmhkz74hdagags6plj2tz3smx0aht',
      rewards: '521613000342398',
      mid_rewards: '9039344610877576972'
    },
    {
      address: 'erd16vdvktvz7753lwa2e33xttl8z8gxmecg7l3jqd6sy6n7zd6d6jlsdzyrt4',
      rewards: '499561226521760',
      mid_rewards: '9037681273384907469'
    },
    {
      address: 'erd16cnzuq3dnmt7qpwv7ckszl9wfr0gkc3ny5w96nvm43aesuv5ldfsdeqwu0',
      rewards: '461091900329560',
      mid_rewards: '9034779580618889070'
    },
    {
      address: 'erd12anhj4ej9r75jdqkchfn5c0kwt5ml9ut9m3pcnyvyarj3xsdf67s9jzgv3',
      rewards: '427126786557820',
      mid_rewards: '9032217634916070053'
    },
    {
      address: 'erd13auq04lz7w9fw5ydtsp9g7h580alefxe94xnc8gk2tsux3rwq6usyttg99',
      rewards: '422897808473090',
      mid_rewards: '9031898648431752595'
    },
    {
      address: 'erd1exemn7urpq3wq2cxaz32rv6megjptnslmtxxva9wq596lnwvk5jqc6gcgz',
      rewards: '422897808473090',
      mid_rewards: '9031898648431752595'
    },
    {
      address: 'erd1cthwa8yurr7vu9hg3fj3kmk2533zt7ravdx23msftd69cuacvucshllv8x',
      rewards: '422897808473090',
      mid_rewards: '9031898648431752595'
    },
    {
      address: 'erd1lf2kw3aec3p7ha9k09lhrf3ge5rhwzvk4c79myk2ufkr73p47v3qnrups0',
      rewards: '420882000023010',
      mid_rewards: '9031746598542236675'
    },
    {
      address: 'erd19p2dmqjhv2tvc5pn7h9nm0g5zwe7mzygqz2nreg2de856pgx09qqzu7uvs',
      rewards: '417893030165785',
      mid_rewards: '9031521144314906970'
    },
    {
      address: 'erd1cjeuc8j3ngya6mzj2vl3230vxghhpmwdpuk4xffaaxmq4j8rsf9q0rfl46',
      rewards: '397229902063679',
      mid_rewards: '9029962550617745997'
    },
    {
      address: 'erd1hyk2073nuwzhm7m8xhe8s30rkmuyv28cs0wyknzdmqy5zl3p9zhqw0r0fw',
      rewards: '391794179108220',
      mid_rewards: '9029552540889498311'
    },
    {
      address: 'erd19kt6gkvwh9mlqgy8x56wvyljq59gl9rhe8pe8x2u8fp4w6gzaqjs45249w',
      rewards: '389022900649116',
      mid_rewards: '9029343506849826590'
    },
    {
      address: 'erd1y2xj5dl24zkt4muewcgdhth6rr7qh7umev6sfy4c8zcrzzfdfzmqhl6evd',
      rewards: '380777808000750',
      mid_rewards: '9028721589908173319'
    },
    {
      address: 'erd1a63s6dq6vwnhvxpt0a055ennnx4xkumae5uwyvccn2emk8jzx9cs4pzwte',
      rewards: '345883737121004',
      mid_rewards: '9026089574142084285'
    },
    {
      address: 'erd17xjq94xun97c6e88m5368dsdg9ql7c0tn0rf5ura8capqvnvne4s274rvs',
      rewards: '340858438120502',
      mid_rewards: '9025710522175226785'
    },
    {
      address: 'erd1jt96lxa2lm00nhcdstzvdsctaa9jy73ewc0zk45fq34hcpradc2q7uh6qn',
      rewards: '340234017443810',
      mid_rewards: '9025663422910959534'
    },
    {
      address: 'erd138dq8n69hjd6ysyw3mdfdle4glarf4p0esyph2r54e5ye7k50cfqqfueaj',
      rewards: '332642663979797',
      mid_rewards: '9025090816691636630'
    },
    {
      address: 'erd1th8693x7tyw4rav0qe66qxla2jr4mxsydhkcxc78m99td3u32sgqyv5w4w',
      rewards: '292906956952318',
      mid_rewards: '9022093602416081147'
    },
    {
      address: 'erd1wp6rnfl0vu3wvl5np4lq93nqvv2vsy5emz4luaw4wk283zk6anzsqrem4y',
      rewards: '257303184766452',
      mid_rewards: '9019408054775383408'
    },
    {
      address: 'erd1mzpusxx6hys07eyg4d8tedxgw0lwu54kjk6y2eh3hlahkpa69f5s7flws4',
      rewards: '173835596912591',
      mid_rewards: '9013112199873675738'
    }
  ]);

  const getStakedTokens = async () => {
    try {
      const response = await axios.get('https://test.mvx.fr/gift');

      if (response.status === 200 && response.data) {
        const tokens = response.data;
        setStakedTokens(tokens);
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
