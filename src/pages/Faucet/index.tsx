import * as React from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';

const Faucet = () => {
  const address = useGetAccountInfo().address;
  const { network } = useGetNetworkConfig();
  const [faddress, setAddress] = React.useState(
    address === null ? '' : address
  );
  const [amount, setAmount] = React.useState(1);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  React.useEffect(() => {
    setAddress(address === null ? '' : address);
  }, [address]);

  //States de l'application faucet (deprecié par moi )
  const [state, setState] = React.useState({
    urls: [
      { network: 'T', explorer: 'https://testnet-explorer.elrond.com/' },
      { network: 'D', explorer: 'https://devnet-explorer.elrond.com/' }
    ],
    tokens: [
      { id: '1', identifier: 'xEGLD', network: 'T', balance: 0, decimals: 18 },
      { id: '2', identifier: 'dEGLD', network: 'D', balance: 0, decimals: 18 }
    ],
    transactions: [
      {
        amount: 0,
        address: '',
        decimals: 18,
        identifier: 'xEGLD',
        network: 'T',
        tx_result: ''
      }
    ],
    network: 'D',
    token_id: '2'
  });
  //Tableau des tokens du faucet
  const [tokens, setTokens] = React.useState({
    tokens: [
      {
        id: '1',
        identifier: 'xEGLD',
        network: 'T',
        balance: 0,
        decimals: 18,
        max: 1
      },
      {
        id: '2',
        identifier: 'dEGLD',
        network: 'D',
        balance: 0,
        decimals: 18,
        max: 1
      }
    ]
  });
  //Tableau des transactions du faucet
  const [transactions, setTransactions] = React.useState({
    transactions: [
      {
        amount: 0,
        address: '',
        decimals: 18,
        identifier: 'xEGLD',
        network: 'T',
        tx_result: '',
        age: 0,
        status: '?'
      }
    ]
  });
  //Network selectionné
  const [cnetwork, setNetwork] = React.useState({
    network: network?.chainId ? network?.chainId : 'T'
  });

  //Token selectionné
  const [ctoken, setToken] = React.useState({
    token_id: '2',
    token_index: 0
  });

  function secondsToHms(d: number) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
  }

  function setNetworkID(e: React.ChangeEvent<any>) {
    setNetwork({
      network: e.target.value
    });
    let tmp = '0';
    if (e.target.value === 'T') {
      tmp = '1';
    } else if (e.target.value === 'D') {
      tmp = '2';
    }
    const index = tokens.tokens
      .filter(({ network }) => network === e.target.value)
      .findIndex((tkp) => tkp.id === tmp);
    setToken({
      token_id: tmp,
      token_index: index
    });
    setAmount(
      tokens.tokens.filter(({ network }) => network === e.target.value)[index]
        .max
    );
    setError('');
    setSuccess('');
  }
  function setTokenID(e: React.ChangeEvent<any>) {
    const index = tokens.tokens
      .filter(({ network }) => network === cnetwork.network)
      .findIndex((tokens) => tokens.id === e.target.value);
    setToken({
      token_id: e.target.value,
      token_index: index
    });
    setAmount(
      tokens.tokens.filter(({ network }) => network === cnetwork.network)[index]
        .max
    );
    setError('');
    setSuccess('');
  }
  //Liste des tokens via API
  React.useEffect(() => {
    const fetchTokenList = async () => {
      const { data } = await axios('https://api.r3d4.fr/faucet/tokens');
      setTokens({
        tokens: data
      });
    };
    fetchTokenList();
    //refresh 60 sec
    const interval = setInterval(() => {
      fetchTokenList();
    }, 60000);
    return () => clearInterval(interval);
  }, [setState]);
  //Liste des TX via API
  React.useEffect(() => {
    const fetchTransactionList = async () => {
      //Si connecté, permet d'avoir plus d'historique... si connecté...
      let fetchurl = 'https://api.r3d4.fr/faucet/list';
      if (faddress != '') {
        fetchurl = 'https://api.r3d4.fr/faucet/list/A/address/' + faddress;
      }
      const { data } = await axios(fetchurl);
      setTransactions({
        transactions: data
      });
    };
    fetchTransactionList();
    //refresh 10 sec
    const interval = setInterval(() => {
      fetchTransactionList();
    }, 10000);
    return () => clearInterval(interval);
  }, [setState]);

  function handleAddressChange(e: React.ChangeEvent<any>) {
    setAddress(e.target.value);
    setError('');
    setSuccess('');
  }
  function handleAmountChange(e: React.ChangeEvent<any>) {
    setAmount(e.target.value);
    setError('');
    setSuccess('');
  }

  function handleSubmit() {
    const formdata = {
      network: cnetwork.network,
      token: ctoken.token_id,
      address: faddress,
      amount: amount
    };
    axios.post('https://api.r3d4.fr/faucet/list', { formdata }).then((res) => {
      setError(res.data.error);
      setSuccess(res.data.success);
    });
  }

  return (
    <div className='container py-4 text-white'>
      <p>
        <a
          href='https://r3d4.fr/faucet'
          target={'_blank'}
          rel={'noreferrer'}
          className='text-white'
        >
          {' '}
        </a>
        This faucet is provided by{' '}
        <a
          href='https://r3d4.fr/faucet'
          target={'_blank'}
          rel={'noreferrer'}
          className='text-white'
        >
          r3d4.fr{' '}
        </a>{' '}
        and deliver{' '}
        {cnetwork.network === 'T' && 'xEGLD and ESDT for the Testnet'}
        {cnetwork.network === 'D' &&
          'dEGLD and ESDT tokens for the Devnet'}{' '}
        network.
        <br />
        <br /> Use the form below to receive{' '}
        {cnetwork.network === 'T' && 'xEGLD'}
        {cnetwork.network === 'D' && 'dEGLD'} or ESDT.
        <br />
        <br /> Only one claim per token type for a 24 hour period.
      </p>

      <Form>
        <Row className='mb-3'>
          <Form.Group as={Col} md='6' controlId='network'>
            <Form.Label>Network</Form.Label>
            <Form.Control
              as='select'
              onChange={setNetworkID}
              defaultValue={network.chainId}
              disabled={true}
            >
              <option value='T'>Testnet</option>
              <option value='D'>Devnet</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} md='6' controlId='asset'>
            <Form.Label>Asset</Form.Label>
            <Form.Control
              as='select'
              onChange={setTokenID}
              value={ctoken.token_id}
            >
              {tokens.tokens &&
                tokens.tokens
                  .filter(({ network }) => network === cnetwork.network)
                  .map((item, index) => (
                    <option
                      key={index}
                      value={item.id}
                      disabled={item.balance / Math.pow(10, item.decimals) < 1}
                    >
                      {item.identifier} (
                      {(item.balance / Math.pow(10, item.decimals)).toFixed(0)})
                    </option>
                  ))}
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group
            as={Col}
            md='6'
            controlId='walletAddress'
            onChange={handleAddressChange}
          >
            <Form.Label>Wallet Address</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='erd1'
              value={faddress}
              disabled={true}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md='6'
            controlId='faucetAmount'
            onChange={handleAmountChange}
          >
            <Form.Label>
              {tokens.tokens.filter(
                ({ network }) => network === cnetwork.network
              )[ctoken.token_index].identifier +
                ' amount (Max ' +
                tokens.tokens.filter(
                  ({ network }) => network === cnetwork.network
                )[ctoken.token_index].max +
                ' of ' +
                (
                  tokens.tokens.filter(
                    ({ network }) => network === cnetwork.network
                  )[ctoken.token_index].balance /
                  Math.pow(
                    10,
                    tokens.tokens.filter(
                      ({ network }) => network === cnetwork.network
                    )[ctoken.token_index].decimals
                  )
                ).toFixed(2) +
                ') (' +
                tokens.tokens.filter(
                  ({ network }) => network === cnetwork.network
                )[ctoken.token_index].decimals +
                ' decimals)'}
            </Form.Label>
            <Form.Control
              required
              type='number'
              placeholder=''
              defaultValue='1'
              value={amount}
            />
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col}>
            <Button variant='primary' onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Group>
        </Row>
      </Form>

      {error && (
        <div className='alert alert-warning' role='alert'>
          {error}
        </div>
      )}
      {success && (
        <div className='alert alert-success' role='alert'>
          {success}
        </div>
      )}

      <p>
        Awaiting and closed transactions{' '}
        <i className='fa fa-spinner fa-spin'></i> :
      </p>
      <table className='table table-striped text-white'>
        <tr>
          <th>Address</th>
          <th>Token</th>
          <th>Amount</th>
          <th>Hash</th>
          <th>Age</th>
          <th>Status</th>
        </tr>
        {transactions.transactions &&
          transactions.transactions
            .filter(({ network }) => network === cnetwork.network)
            .filter(
              ({ address }) =>
                address === faddress || faddress.length != 62 || faddress == ''
            )
            .map((item, index) => (
              <tr key={index}>
                <td>
                  {item.address.substring(0, 9) +
                    '....' +
                    item.address.substring(57, 62)}
                </td>
                <td>{item.identifier}</td>
                <td>{item.amount / Math.pow(10, item.decimals)}</td>

                <td>
                  <a
                    className='text-white'
                    href={
                      state.urls.filter(
                        ({ network }) => network === cnetwork.network
                      )[0].explorer +
                      'transactions/' +
                      item.tx_result
                    }
                    target='_BLANK'
                    rel='noreferrer'
                  >
                    {item.tx_result.substring(0, 5)}
                  </a>
                </td>
                <td>{secondsToHms(item.age)}</td>
                <td>{item.status}</td>
              </tr>
            ))}
      </table>
    </div>
  );
};

export default Faucet;
