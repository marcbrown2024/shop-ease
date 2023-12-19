// zustand components
import { create } from "zustand";

// firebase components
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../config/Firebase";

// export components
import { router } from "expo-router";

// Popup store
interface PopUpProps {
  visible: boolean;
  typeMessage: string;
  title: string;
  message: string;
}

interface PopUpStore {
  popUpProps: PopUpProps;
  setPopUpProps: (newProps: Partial<PopUpProps>) => void;
}

export const usePopUpStore = create<PopUpStore>((set) => ({
  popUpProps: {
    visible: false,
    typeMessage: "",
    title: "",
    message: "",
  },
  setPopUpProps: (newProps) =>
    set((state) => ({ popUpProps: { ...state.popUpProps, ...newProps } })),
}));

// loading store
interface LoadingStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

// Auth store
interface AuthStoreState {
  isLoggedIn: boolean;
  initialized: boolean;
  user: User | null;
}

interface AuthStoreActions {
  appSignIn: (
    email: string,
    password: string,
  ) => Promise<void>;
  appSignOut: (
  ) => Promise<void>;
  appSignUp: (
    email: string,
    password: string,
    // displayName: string,
  ) => Promise<void>;
}

export const useAuthStore = create<AuthStoreState & AuthStoreActions>(
  (set) => ({
    isLoggedIn: false,
    initialized: false,
    user: null,
    appSignIn: async (email, password) => {
      try {
        const resp = await signInWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          password
        );
        usePopUpStore.getState().setPopUpProps({
          visible: true,
          typeMessage: "success",
          title: "Success",
          message: "Successfully signed in",
        });
        useLoadingStore.getState().setLoading(true);
        set((state: AuthStoreState) => ({
          user: resp.user,
          isLoggedIn: resp.user ? true : false,
        }));
      } catch (e) {
        usePopUpStore.getState().setPopUpProps({
          visible: true,
          typeMessage: "error",
          title: "Unsuccessful sign in",
          message: "Sign in failed. Try again.",
        });
      } finally {
        useLoadingStore.getState().setLoading(false);
        router.replace("/(auth)/home");
      }
    },
    appSignOut: async (): Promise<void> => {
      try {
        await signOut(FIREBASE_AUTH);
        usePopUpStore.getState().setPopUpProps({
          visible: true,
          typeMessage: "success",
          title: "Success",
          message: "Successfully signed out",
        });
        useLoadingStore.getState().setLoading(true);
        set((state: AuthStoreState) => ({
          user: null,
          isLoggedIn: false,
        }));
      } catch (e) {
        usePopUpStore.getState().setPopUpProps({
          visible: true,
          typeMessage: "error",
          title: "Unsuccessful sign out",
          message: "Sign out failed. Try again.",
        });
        useLoadingStore.getState().setLoading(true);
      } finally {
        useLoadingStore.getState().setLoading(false);
        router.replace("/(public)/signIn");
      }
    },
    appSignUp: async (email, password) => {
      try {
        const resp = await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          password
        );
        usePopUpStore.getState().setPopUpProps({
          visible: true,
          typeMessage: "success",
          title: "Success",
          message: "Successfully registration",
        });
        useLoadingStore.getState().setLoading(true);
      } catch (e) {
        usePopUpStore.getState().setPopUpProps({
          visible: true,
          typeMessage: "error",
          title: "Registration Failed",
          message: "Please try again",
        });
        useLoadingStore.getState().setLoading(true);
      } finally {
        useLoadingStore.getState().setLoading(false);
      }
    },
  })
);

// Initialize the auth store using onAuthStateChanged
const unsub = onAuthStateChanged(FIREBASE_AUTH, (user) => {
  useAuthStore.setState((state: AuthStoreState) => ({
    user,
    isLoggedIn: user ? true : false,
    initialized: true,
  }));
});

interface ShoppingListStore {
  isAddListVisible: boolean,
  isCollaboratorsVisible: boolean,
  isAddItemVisible: boolean,
  setAddListVisible: (loading: boolean) => void;
  setCollaboratorsVisible: (loading: boolean) => void;
  setAddItemVisible: (loading: boolean) => void;
}

export const shoppingListState = create<ShoppingListStore>((set) => ({
  isAddListVisible: false,
  isCollaboratorsVisible: false,
  isAddItemVisible: false,

  // Actions to update the state
  setAddListVisible: (isAddListVisible) => set({ isAddListVisible }),
  setCollaboratorsVisible: (isCollaboratorsVisible) => set({ isCollaboratorsVisible }),
  setAddItemVisible: (isAddItemVisible) => set({ isAddItemVisible }),
}));
