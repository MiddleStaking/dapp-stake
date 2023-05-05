// import {
//   getChainID,
//   transactionServices,
//   useGetAccountInfo
// } from '@elrondnetwork/dapp-core';
// import {
//   ContractFunction,
//   Transaction,
//   TransactionPayload,
//   Balance,
//   GasLimit,
//   ChainID,
//   Address,
//   Nonce,
//   SmartContract
// } from '@elrondnetwork/erdjs';

import { getLatestNonce } from '@multiversx/sdk-dapp/utils/account';

import {
  Address,
  ContractFunction,
  SmartContract,
  TokenPayment,
  TransactionPayload
} from '@multiversx/sdk-core/out';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { getChainID } from '@multiversx/sdk-dapp/utils';
import {
  network,
  DelegationContractType,
  delegationContractData
} from 'config';

interface TransactionParametersType {
  args: string;
  value: string;
  type: string;
}

const useTransaction = () => {
  const { account } = useGetAccountInfo();
  const chainID = getChainID();

  const sendTransaction = async ({
    args,
    value,
    type
  }: TransactionParametersType) => {
    const address = new Address(network.delegationContract);
    const contract = new SmartContract({ address });
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

      const data = TransactionPayload.contractCall()
        .setFunction(new ContractFunction(getFunctionName()))
        .build();

      // const { sessionId, error } = await sendTransactions({
      //   transactions: [
      //       {
      //         value: '1000000000000000000',
      //         data: 'ping',
      //         receiver: contractAddress
      //       },
      //     ],
      //   callbackRoute?: string // (optional, defaults to window.location.pathname) the route to be redirected to after signing. Will not redirect if the user is already on the specified route;
      //   transactionsDisplayInfo: TransactionsDisplayInfoType // (optional, default to null) custom message for toasts texts;
      //   minGasLimit?: number (optional, defaults to 50_000);
      //   sessionInformation?: any (optional, defaults to null) extra sessionInformation that will be passed back to you via getSignedTransactions hook;
      //   signWithoutSending?: boolean // (optional, defaults to false), the transaction will be signed without being sent to the blockchain;
      //   completedTransactionsDelay?: number // delay the transaction status from going into "successful" state;
      //   redirectAfterSigning?: boolean // (optional, defaults to true), whether to redirect to the provided callbackRoute;
      //   });

      // nonce?: INonce;
      // value?: ITransactionValue;
      // receiver: IAddress;
      // sender: IAddress;
      // gasPrice?: IGasPrice;
      // gasLimit: IGasLimit;
      // data?: ITransactionPayload;
      // chainID: IChainID;
      // version?: TransactionVersion;
      // options?: TransactionOptions;

      // const transaction = new Transaction({
      //   data,
      //   nonce: undefined,
      //   value: TokenPayment.egldFromAmount(value),
      //   receiver: contract.getAddress()
      //   // chainID: new ChainID(chainID.valueOf()),
      //   // receiver: contract.getAddress(),
      //   // value: Balance.egld(value),
      //   // gasLimit: new GasLimit(getGasLimit()),
      //   // nonce: new Nonce(account?.nonce)
      // });

      // chainID: new ChainID(chainID.valueOf()),
      // receiver: contract.getAddress(),
      // value: Balance.egld(value),
      // gasLimit: new GasLimit(getGasLimit()),
      // nonce: new Nonce(account?.nonce)

      return await sendTransactions({
        transactions: {
          data,
          nonce: getLatestNonce,
          gasLimit: getGasLimit(),
          value: TokenPayment.egldFromAmount(value),
          receiver: contract.getAddress()
        }
      });
    }
  };

  const sendTransactionAdmin = async ({
    args,
    value,
    type
  }: TransactionParametersType) => {
    const address = new Address(network.delegationContract);
    const contract = new SmartContract({ address });
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

      const transaction = {
        value: TokenPayment.egldFromAmount(value),
        data: getFunctionName(),
        receiver: contract.getAddress().bech32(),
        gasLimit: getGasLimit()
      };

      return await sendTransactions({
        transactions: [transaction]
      });
    }
  };

  return {
    sendTransaction,
    sendTransactionAdmin
  };
};

export default useTransaction;
