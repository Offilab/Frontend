import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "./ui/alert-dialog";
  import { AlertCircle } from "lucide-react";
  
  interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    actionLabel?: string;
    cancelLabel?: string;
    onAction?: () => void;
  }
  
  export function ErrorModal({
    isOpen,
    onClose,
    title = "Something went wrong",
    description = "We encountered an error while processing your request. Please try again.",
    actionLabel = "Try Again",
    cancelLabel = "Cancel",
    onAction,
  }: ErrorModalProps) {
    const handleAction = () => {
      if (onAction) {
        onAction();
      }
      onClose();
    };
  
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className="gap-6 max-w-md">
          <AlertDialogHeader className="gap-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <div className="rounded-full bg-destructive/20 p-3">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                {description}
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-2">
            <AlertDialogCancel onClick={onClose} className="min-w-[100px]">
              {cancelLabel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleAction} className="min-w-[100px]">
              {actionLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }