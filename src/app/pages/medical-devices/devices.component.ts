import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { AddDevicePayload, Device } from '../../core/interfaces/devices';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { DevicesService } from '../../core/services/devices/devices.service';
import { ModalService } from '../../core/services/modal-service/modal.service';
import { DeviceFormComponent } from '../../components/devices/device-form/device-form.component';
import { DeviceTableComponent } from '../../components/devices/device-table/device-table.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-devices',
  imports: [SearchBarComponent, DeviceFormComponent, DeviceTableComponent, MatButtonModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css',
})
export class DevicesComponent {
  columns = ['deviceName', 'description', 'deviceType', 'brand', 'model', 'status', 'actions'];
  dataSource = new MatTableDataSource<Device>([]);
  @ViewChild('editModal') editModalContent!: TemplateRef<any>;

  private fb = inject(FormBuilder);
  private modal = inject(ModalService);
  private confirmService = inject(ConfirmationModalService);
  private devicesService = inject(DevicesService);
  private toastr = inject(ToastrService);

  deviceForm = this.fb.group({
    deviceName: ['', Validators.required],
    description: ['', Validators.required],
    deviceType: ['', Validators.required],
    brand: [''],
    model: [''],
  });

  editDeviceForm = this.fb.group({
    deviceName: ['', Validators.required],
    description: ['', Validators.required],
    deviceType: ['', Validators.required],
    brand: [''],
    model: [''],
  });

  ngOnInit() {
    this.loadDevices();
  }

  loadDevices() {
    this.devicesService.getAll().subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
      },
      error: (err) => {
        console.log('Error fetching devices', err);
      },
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openEditModal(device: Device) {
    this.editDeviceForm.patchValue(device);
    const ref = this.modal.open('Edit Device', this.editModalContent, true, false);

    ref.componentInstance.save.subscribe(() => {
      if (this.editDeviceForm.invalid) {
        this.editDeviceForm.markAllAsTouched();
        return;
      }

      this.editDevice(device, ref);
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  private editDevice(device: Device, ref: any) {
    const formValues = this.editDeviceForm.value;
    const payload: AddDevicePayload = {
      deviceName: formValues.deviceName ?? '',
      description: formValues.description ?? '',
      deviceType: formValues.deviceType ?? '',
      brand: formValues.brand ?? '',
      model: formValues.model ?? '',
      status: device.status,
    };

    ref.componentInstance.setLoading(true);

    this.devicesService.update(device._id, payload).subscribe({
      next: (data) => {
        if (data.success) {
          ref.componentInstance.setLoading(false);
          this.toastr.success('Device Updated successfully.');
          this.loadDevices();
          ref.close();
        }
      },
      error: () => {
        ref.componentInstance.setLoading(false);
        this.toastr.error('Failed to update device.');
      },
    });
  }

  openDeleteConfirmationModal(device: Device) {
    this.confirmService
      .open({
        title: 'Delete Device',
        description: 'Are you sure you want to delete this device?',
        type: 'danger',
      })
      .subscribe((result) => {
        if (result) this.deleteDevice(device);
      });
  }

  private deleteDevice(device: Device) {
    this.devicesService.delete(device._id).subscribe({
      next: (data) => {
        if (data.success) {
          this.toastr.success('Device deleted successfully.');
          this.loadDevices();
        }
      },
      error: () => {
        this.toastr.error('Failed to delete device.');
      },
    });
  }

  addDevice() {
    if (this.deviceForm.invalid) {
      this.deviceForm.markAllAsTouched();
      return;
    }

    const formValues = this.deviceForm.value;

    const payload: AddDevicePayload = {
      deviceName: formValues.deviceName ?? '',
      description: formValues.description ?? '',
      deviceType: formValues.deviceType ?? '',
      brand: formValues.brand ?? '',
      model: formValues.model ?? '',
      status: 'active',
    };

    this.deviceForm.disable();

    this.devicesService
      .add(payload)
      .pipe(
        finalize(() => {
          this.deviceForm.enable();
        }),
      )
      .subscribe({
        next: (data) => {
          if (data.success) {
            this.toastr.success(data?.message || 'Device added successfully.');
            this.deviceForm.reset();
            this.loadDevices();
          }
        },
        error: (err) => {
          const message = err?.message || 'Failed to add device.';
          this.toastr.error(message);
        },
      });
  }
}
