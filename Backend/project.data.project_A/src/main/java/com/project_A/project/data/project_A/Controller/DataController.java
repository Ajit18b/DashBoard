package com.project_A.project.data.project_A.Controller;

import com.project_A.project.data.project_A.Entity.DataPoint;
import com.project_A.project.data.project_A.Repository.DataPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/data")
public class DataController {

    @Autowired
    private DataPointRepository dataPointRepository;

    @GetMapping
    public List<DataPoint> getData() {
        return dataPointRepository.findAll();
    }

    @PostMapping
    public DataPoint addData(@RequestBody DataPoint dataPoint) {
        return dataPointRepository.save(dataPoint);
    }

    @DeleteMapping("/{id}")
    public void deleteData(@PathVariable Long id) {
        dataPointRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public DataPoint updateData(@PathVariable Long id, @RequestBody DataPoint updatedDataPoint) throws Exception {
        if (!dataPointRepository.existsById(id)) {
            throw new Exception("DataPoint with id " + id + " not found.");
        }
        updatedDataPoint.setId(id);
        return dataPointRepository.save(updatedDataPoint);
    }

}
