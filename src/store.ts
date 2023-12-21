// zustand components
import { create } from "zustand";

// firebase components
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../config/Firebase";

// export components
import { router } from "expo-router";

// global store
interface PopUpProps {
  visible: boolean;
  typeMessage: string;
  title: string;
  message: string;
}

interface globalStateStore {
  isTermsVisble: boolean;
  isChecked: boolean;
  isAddListVisible: boolean;
  isCollaboratorsVisible: boolean;
  isAddItemVisible: boolean;
  loading: boolean;
  popUpProps: PopUpProps;
  setIsTermsVisble: (isTermsVisble: boolean) => void;
  setChecked: (isChecked: boolean) => void;
  setAddListVisible: (isAddListVisible: boolean) => void;
  setCollaboratorsVisible: (isCollaboratorsVisible: boolean) => void;
  setAddItemVisible: (isAddItemVisible: boolean) => void;
  setLoading: (loading: boolean) => void;
  setPopUpProps: (newProps: Partial<PopUpProps>) => void;
}

// global store
export const globalState = create<globalStateStore>((set) => ({
  isTermsVisble: false,
  isChecked: false,
  isAddListVisible: false,
  isCollaboratorsVisible: false,
  isAddItemVisible: false,
  loading: false,
  popUpProps: {
    visible: false,
    typeMessage: "",
    title: "",
    message: "",
  },

  // Actions to update the state
  setIsTermsVisble: (isTermsVisble) => set({ isTermsVisble }),
  setChecked: (isChecked) => set({ isChecked }),
  setAddListVisible: (isAddListVisible) => set({ isAddListVisible }),
  setCollaboratorsVisible: (isCollaboratorsVisible) =>
    set({ isCollaboratorsVisible }),
  setAddItemVisible: (isAddItemVisible) => set({ isAddItemVisible }),
  setLoading: (loading) => set({ loading }),
  setPopUpProps: (newProps) =>
    set((state) => ({ popUpProps: { ...state.popUpProps, ...newProps } })),
}));

// Auth store
interface AuthStoreState {
  isLoggedIn: boolean;
  initialized: boolean;
  user: User | null;
}

interface AuthStoreActions {
  appSignIn: (email: string, password: string) => Promise<void>;
  appForgetPassword: (
    email: string,
    setCheckEmailModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  appSignOut: () => Promise<void>;
  appSignUp: (
    email: string,
    password: string
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
        // Check if the user is successfully signed in
        if (resp.user) {
          globalState.getState().setPopUpProps({
            visible: true,
            typeMessage: "success",
            title: "Success",
            message: "Successfully signed in",
          });

          set((state: AuthStoreState) => ({
            user: resp.user,
            isLoggedIn: true,
          }));
          router.replace("/(drawer)/(auth)/home");
        }
      } catch (e) {
        globalState.getState().setPopUpProps({
          visible: true,
          typeMessage: "error",
          title: "Unsuccessful sign in",
          message: "Incorrect email or password. Try again..",
        });
        globalState.getState().setLoading(true);
      } finally {
        globalState.getState().setLoading(false);
      }
    },

    appForgetPassword: async (email, setCheckEmailModal): Promise<void> => {
      try {
        await sendPasswordResetEmail(FIREBASE_AUTH, email);
        setCheckEmailModal(true);
      } catch (err) {
        globalState.getState().setPopUpProps({
          visible: true,
          typeMessage: "error",
          title: "Unsuccessful",
          message: "Check email and please try again.",
        });
      } finally {
        globalState.getState().setLoading(false);
      }
    },

    appSignOut: async (): Promise<void> => {
      try {
        await signOut(FIREBASE_AUTH);
        globalState.getState().setPopUpProps({
          visible: true,
          typeMessage: "success",
          title: "Success",
          message: "Successfully signed out",
        });
        set((state: AuthStoreState) => ({
          user: null,
          isLoggedIn: false,
        }));
        router.replace("/(public)/signIn");
      } catch (e) {
        globalState.getState().setPopUpProps({
          visible: true,
          typeMessage: "error",
          title: "Unsuccessful sign out",
          message: "Sign out failed. Try again.",
        });
      }
    },
    appSignUp: async (email, password) => {
      try {
        globalState.getState().setLoading(true);

        // Attempt to create a user
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

        // If registration is successful
        globalState.getState().setPopUpProps({
          visible: true,
          typeMessage: "success",
          title: "Success",
          message: "Successfully registered",
        });
      } catch (e) {
        // Handle specific errors
        if ((e as any).code === "auth/email-already-in-use") {
          globalState.getState().setPopUpProps({
            visible: true,
            typeMessage: "error",
            title: "Registration Failed",
            message: "Email is already in use. Please use a different email.",
          });
        } else {
          // Handle other errors
          console.error("Registration error:", e);
          globalState.getState().setPopUpProps({
            visible: true,
            typeMessage: "error",
            title: "Registration Failed",
            message: "An error occurred during registration. Please try again.",
          });
        }
      } finally {
        globalState.getState().setLoading(false);
        router.replace("/(public)/signIn");
      }
    },
  })
);

// Initialize the auth store using onAuthStateChanged
onAuthStateChanged(FIREBASE_AUTH, (user) => {
  useAuthStore.setState((state: AuthStoreState) => ({
    user,
    isLoggedIn: user ? true : false,
    initialized: true,
  }));
});
