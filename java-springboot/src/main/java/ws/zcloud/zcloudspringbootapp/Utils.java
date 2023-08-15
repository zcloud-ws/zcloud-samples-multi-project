package ws.zcloud.zcloudspringbootapp;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Utils {
    static final int MB = 1024*1024;
    static final byte[] dataByte;

    static {
        Random rd = new Random();
        dataByte = new byte[MB];
        for (int i = 0; i < MB; i++) {
            dataByte[i] = (byte) rd.nextInt(0, 255);
        }
    }

    public static long usedMemoryInMB() {
        return (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / MB;
    }

    public static void printMemoryInfo() {
        System.out.println("==============================");
        System.out.printf("Usage memory: %d\n", (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / MB);
        System.out.printf("Free  memory: %d\n", Runtime.getRuntime().freeMemory() / MB);
        System.out.printf("Total memory: %d\n", Runtime.getRuntime().totalMemory() / MB);
        System.out.printf("Max   memory: %d\n", Runtime.getRuntime().maxMemory() / MB);
        System.out.println("==============================");
    }

    public static void memoryAllocation(int sizeMb, long waitMillis) {
        List<byte[]> data = new ArrayList<>();
        printMemoryInfo();
        long totalMemory = usedMemoryInMB();
        while (totalMemory < sizeMb) {
            data.add(dataByte);
            totalMemory = usedMemoryInMB();
        }

        Thread th = new Thread(() -> {
            try {
                printMemoryInfo();
                Thread.sleep(waitMillis);
                printMemoryInfo();
                data.clear();
                System.out.println("GC");
                System.gc();
                printMemoryInfo();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
        th.start();
        synchronized (th) {
            try {
                th.wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
