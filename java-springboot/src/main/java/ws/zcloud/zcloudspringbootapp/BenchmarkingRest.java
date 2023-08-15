package ws.zcloud.zcloudspringbootapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BenchmarkingRest {

    @GetMapping("/benchmarking/memory/{mb}/{time}")
    public ResponseResult memory(@PathVariable(name = "mb") int mb,
                                 @PathVariable(name = "time") int time) {
        Utils.memoryAllocation(mb, time * 1000L);
        return new ResponseResult(String.format("Allocated memory %dmb for %d seconds.", mb, time));
    }
}
