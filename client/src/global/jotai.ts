import { atomWithStorage } from 'jotai/utils';

export const walletAtom = atomWithStorage('wallet', {
  isConnect: false,
  walletProvider: '',
});

export const userDataAtom = atomWithStorage('userData', {
  address: '',
  name: '',
});

export const listUsernameAtom = atomWithStorage<Record<string, string>>('listUserName', {});
