import { create } from 'zustand';

interface TokenState {
    signUpToken: string | null;
    setSignUpToken: (token: string) => void;
    deleteSignUpToken: () => void;
}

const useTokenStore = create<TokenState>((set) => ({
    signUpToken: null,
    setSignUpToken: (token) => set({signUpToken: token}),
    deleteSignUpToken: () => set({signUpToken: null})
}))

export default useTokenStore;

