package br.com.yanivilasboas.clinica.util;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

public class FileManager {

    private static final String FILE_KEY_SEPARATOR = "_";

    private static final String tempFolderSeparator = "/tmp/";

    private static FileManager instance;

    public FileManager() {

        if (tempFolderSeparator == null || tempFolderSeparator.trim().equals("")) {
            throw new IllegalStateException(
                    "Erro ao inicializar o FileManager. A pasta temporária não foi especificada");
        }

        File tempFileFolder = new File(tempFolderSeparator);

        if (!tempFileFolder.exists()) {
            if (!tempFileFolder.mkdirs()) {
                throw new IllegalStateException(
                        "Erro ao inicializar o FileManager. A pasta temporária não foi encontrada: "
                                + tempFolderSeparator);
            }
        }

        if (!tempFileFolder.isDirectory()) {
            throw new IllegalStateException("Erro ao inicializar o FileManager. A pasta temporária não é um diretório: "
                    + tempFolderSeparator);
        }

        if (!tempFileFolder.canWrite()) {
            throw new IllegalStateException(
                    "Erro ao inicializar o FileManager. Sem permissão de escrita para a pasta temporária: "
                            + tempFolderSeparator);
        }

        File tempFolderUploads = new File(tempFolderSeparator);

        if (!tempFolderUploads.exists()) {
            if (!tempFolderUploads.mkdirs()) {
                throw new IllegalStateException(
                        "Erro ao inicializar o FileManager. Sem permissão de escrita para a pasta temporária: "
                                + tempFolderSeparator);
            }
        }

    }

    public static FileManager getInstance() {

        if (instance == null) {
            instance = new FileManager();
        }

        return instance;
    }

    public String createFile(byte[] fileBytes, String extension) throws IOException {

        String fileName = generateFileName(extension);
        String folderName = getFolderName();

        File file = new File(tempFolderSeparator + folderName, fileName);
        writeFile(file, fileBytes);

        return generateFileKey(fileName, folderName);
    }

    private void writeFile(File file, byte[] fileBytes) throws IOException {

        BufferedOutputStream stream = null;

        try {
            stream = new BufferedOutputStream(new FileOutputStream(file));
            stream.write(fileBytes);
        } catch (Exception e) {

        } finally {
            if (stream != null) stream.close();
        }
    }

    public File createTempFile(String filename) {
        return new File(tempFolderSeparator + filename);
    }

    public String removerExtension(String fileName) {

        return fileName.substring(0, fileName.lastIndexOf("."));
    }

    public File getFile(String fileKey) {
        return getFile(fileKey, tempFolderSeparator);
    }

    public File getFile(String fileKey, Boolean isFormatKey) {

        return getFile(fileKey, tempFolderSeparator, isFormatKey);
    }

    public String getFileNameByKey(String key) {

        try {
            return key.substring(key.indexOf(FILE_KEY_SEPARATOR) + FILE_KEY_SEPARATOR.length());
        } catch (Exception e) {
            return null;
        }
    }

    private String getFolderNameByKey(String key, String diretorio) {

        try {
            return diretorio + key.substring(0, key.indexOf(FILE_KEY_SEPARATOR));
        } catch (Exception e) {
            return null;
        }
    }

    public File getFile(String fileKey, String diretorio) {
        return getFile(fileKey, diretorio, false);
    }

    public File getFile(String fileKey, String diretorio, Boolean isFormatKey) {

        File file;

        if (isFormatKey) {

            String fileName = getFileNameByKey(fileKey);
            String folderName = getFolderNameByKey(fileKey, diretorio);

            if (fileName == null || folderName == null)
                return null;

            file = new File(folderName, fileName);

        } else {

            file = new File(diretorio, fileKey);

        }

        if (file.exists())
            return file;

        return null;
    }

    public byte[] getFileBytes(String fileKey) {

        try {

            String diretorio = "/temp";

            File file = getFile(fileKey, diretorio);

            if (file != null) {
                return getFileBytes(file);
            } else {
                return null;
            }

        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }

    public String generateFileKey(String fileName, String folderName) {
        return folderName + FILE_KEY_SEPARATOR + fileName;
    }

    public String generateFileName(String extension) {

        return UUID.randomUUID().toString() + ((extension != null) ? "." + extension : "");
    }

    public String getFolderName() throws IOException {

        String folderName = UUID.randomUUID().toString();
        File folder = new File(tempFolderSeparator + folderName);

        this.createFolderIfNotExists(folder);

        return folderName;
    }

    private void createFolderIfNotExists(File folder) throws IOException {

        if (!folder.exists() && !folder.mkdir()) {
            throw new IOException(String.format("Não foi possível criar a pasta temporária. %s", folder.getAbsolutePath()));
        }
    }

    public byte[] getFileBytes(File file) throws IOException {

        ByteArrayOutputStream ous = null;
        InputStream ios = null;

        try {

            byte[] buffer = new byte[4096];
            ous = new ByteArrayOutputStream();
            ios = new FileInputStream(file);
            int read = 0;

            while ((read = ios.read(buffer)) != -1) {
                ous.write(buffer, 0, read);
            }

        } finally {

            try {

                if (ous != null) {
                    ous.close();
                }
            } catch (IOException e) {

            }

            try {

                if (ios != null) {
                    ios.close();
                }
            } catch (IOException e) {

            }
        }

        return ous.toByteArray();
    }

    public String getFileExtention(String completeName) {

        int dotIndex = completeName.lastIndexOf(".");

        if (dotIndex > 0) {

            return completeName.substring(dotIndex + 1);

        } else {

            return "";
        }
    }

    public void createFolder(String path) {
        File folder = new File(path);

        if (!folder.exists()) {
            folder.mkdirs();
        }
    }

    public void copyFile(String fileKey, String destino) throws IOException {
        File arquivo = this.getFile(fileKey);

        File arquivoDestino = new File(destino);

        Files.copy(arquivo.toPath(), arquivoDestino.toPath(), StandardCopyOption.REPLACE_EXISTING);
    }

    public void copyFilePaths(String caminhoArquivo, String caminhoArquivoDestino) throws IOException {
        File arquivo = new File(caminhoArquivo);

        File arquivoDestino = new File(caminhoArquivoDestino);

        Files.copy(arquivo.toPath(), arquivoDestino.toPath(), StandardCopyOption.REPLACE_EXISTING);
    }

    public void deleteFile(String caminho) {
        File arquivo = new File(caminho);

        arquivo.deleteOnExit();
    }

    public byte[] getFileBytesByPath(String path) {

        try {

            File file = new File(path);

            if (file != null) {
                return getFileBytes(file);
            } else {
                return null;
            }

        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
}
