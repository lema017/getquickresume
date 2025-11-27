import { useState, useCallback } from 'react';
import { ConfirmationVariant } from '@/components/ConfirmationDialog';

interface ConfirmationOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmationVariant;
}

interface ConfirmationState extends ConfirmationOptions {
  isOpen: boolean;
  resolve: ((value: boolean) => void) | null;
}

export function useConfirmation() {
  const [state, setState] = useState<ConfirmationState>({
    isOpen: false,
    message: '',
    resolve: null,
  });

  const confirm = useCallback((options: ConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        title: options.title || 'Confirmar acción',
        message: options.message,
        confirmText: options.confirmText,
        cancelText: options.cancelText,
        variant: options.variant || 'info',
        resolve,
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (state.resolve) {
      state.resolve(true);
    }
    setState({
      isOpen: false,
      message: '',
      resolve: null,
    });
  }, [state.resolve]);

  const handleCancel = useCallback(() => {
    if (state.resolve) {
      state.resolve(false);
    }
    setState({
      isOpen: false,
      message: '',
      resolve: null,
    });
  }, [state.resolve]);

  return {
    confirm,
    isOpen: state.isOpen,
    title: state.title,
    message: state.message,
    confirmText: state.confirmText,
    cancelText: state.cancelText,
    variant: state.variant,
    onConfirm: handleConfirm,
    onCancel: handleCancel,
  };
}

