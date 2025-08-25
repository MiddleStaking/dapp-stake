import { SmartContract, TokenTransfer } from 'lib';
import { signAndSendTransactions } from 'helpers';
import {
  AbiRegistry,
  Address,
  GAS_PRICE,
  SmartContractTransactionsFactory,
  Transaction,
  TransactionsFactoryConfig,
  useGetAccount,
  useGetNetworkConfig,
  useGetAccountInfo
} from 'lib';

import {
  DelegationContractType,
  delegationContractData,
  contractAddressDelegation
} from 'config';

interface TransactionParametersType {
  args: string;
  value: string;
  type: string;
}

const useTransaction = () => {
  const sendTransaction = async ({
    args,
    value,
    type
  }: TransactionParametersType) => {
    const { network } = useGetNetworkConfig();
    const { address } = useGetAccountInfo();

    const sc_address = new Address(contractAddressDelegation);
    const contract = new SmartContract({ address: sc_address });
    const delegable = delegationContractData.find(
      (item: DelegationContractType) => item.name === type
    );

    if (!delegable) {
      throw new Error('The contract for this action is not defined.');
    } else {
      const getFunctionName = (): string =>
        args === '' ? delegable.data : `${delegable.data}${args}`;

      const getGasLimit = (): number => {
        const nodeKeys = args.split('@').slice(1);

        return delegable.data === 'addNodes' && args
          ? delegable.gasLimit * (nodeKeys.length / 2)
          : delegable.gasLimit;
      };

      const transaction = new Transaction({
        value: BigInt(value),
        data: new TextEncoder().encode(getFunctionName()),
        receiver: contract.getAddress().bech32(),
        gasLimit: BigInt(getGasLimit()),

        gasPrice: BigInt(GAS_PRICE),
        chainID: network.chainId,
        sender: new Address(address),
        version: 1
      });

      return await signAndSendTransactions({
        transactions: [transaction]
      });
    }
  };

  return {
    sendTransaction
  };
};

export default useTransaction;
