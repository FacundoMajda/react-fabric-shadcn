import { Loader2, UploadCloud } from "lucide-react";
import { useCallback } from "react";
import { useDropzone, type Accept } from "react-dropzone";
import { cn } from "@/lib/utils";
import { ACCEPTED_FILE_TYPES } from "@/app/constants";

interface GenericFileUploadProps {
    onFileSelect: (file: File) => void;
    isUploading: boolean;
    acceptedFileTypes?: Accept;
    uploadMessage?: string;
    uploadingMessage?: string;
    fileTypeHint?: string;
}

export function GenericFileUpload({
    onFileSelect,
    isUploading,
    acceptedFileTypes = ACCEPTED_FILE_TYPES,
    uploadMessage = "Sube o selecciona un archivo",
    uploadingMessage = "Subiendo...",
    fileTypeHint = "Tipos de archivo soportados: PDF, TXT, Markdown.",
}: GenericFileUploadProps) {
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        onFileSelect(file);
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        disabled: isUploading,
        accept: acceptedFileTypes,
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "border-2 border-dashed border-border rounded-lg p-12 text-center transition-colors",
                isUploading ? 'cursor-not-allowed bg-muted/50' : 'cursor-pointer hover:border-primary',
                isDragActive ? 'border-primary bg-primary/10' : ''
            )}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    {isUploading ? <Loader2 className="size-6 animate-spin" /> : <UploadCloud className="size-6" />}
                </div>

                {isUploading ? (
                    <p className="text-lg font-semibold text-foreground">{uploadingMessage}</p>
                ) : (
                    <>
                        <p className="text-lg font-semibold text-foreground">{uploadMessage}</p>
                        <p className="text-muted-foreground">
                            {isDragActive ? "Suelta el archivo aquí..." : "Arrastra y suelta o haz clic para seleccionar"}
                        </p>
                    </>
                )}
            </div>
            {!isUploading && fileTypeHint && (
                <p className="text-xs text-muted-foreground mt-6">
                    {fileTypeHint}
                </p>
            )}
        </div>
    );
}