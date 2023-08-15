package ws.zcloud.zcloudspringbootapp;

import java.util.Random;

public class Utils {
    static final int MB = 1024 * 1024;
    static final String dataByte;

    static {
        Random rd = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < MB; i++) {
            sb.append((byte) rd.nextInt(0, 255));
        }
        dataByte = sb.toString();
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

        Thread th = new Thread(() -> {
            try {
                StringBuilder data = new StringBuilder();
                printMemoryInfo();
                long totalMemory = usedMemoryInMB();
                while (totalMemory < sizeMb) {
                    data.append(dataByte);
                    totalMemory = usedMemoryInMB();
                }
                System.out.printf("Count chars %d \n", data.length());
                printMemoryInfo();
                Thread.sleep(waitMillis);
                printMemoryInfo();
                data.delete(0, data.length() -1);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
        th.start();
        synchronized (th) {
            try {
                th.wait();
                System.out.println("GC");
                System.gc();
                printMemoryInfo();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
