// dllmain.cpp : The entry of the dll program.
#include "MpegPyd.h"

/*****************************************************************************
* The initialization of the module. Would be invoked when using import.
*****************************************************************************/
PyMODINIT_FUNC           // == __decslpec(dllexport) PyObject*, Define the exported main function.
PyInit_mpegCoder(void) {       // The external module name is: --CppClass
    import_array();
    /* Initialize libavcodec, and register all codecs and formats. */
    // Register everything
    #ifndef FFMPG3_4
    av_register_all();
    #endif
    #ifndef FFMPG4_0
    avformat_network_init();
    #endif

    PyObject* pReturn = 0;
    // Configure the __new__ method as the default method. This method is used for building the instances.
    C_MPDC_ClassInfo.tp_new = PyType_GenericNew;
    C_MPEC_ClassInfo.tp_new = PyType_GenericNew;
    C_MPCT_ClassInfo.tp_new = PyType_GenericNew;
    C_MPSV_ClassInfo.tp_new = PyType_GenericNew;

    /* Finish the initialization, including the derivations.
     * When success, return 0; Otherwise, return -1 and throw errors. */
    if (PyType_Ready(&C_MPDC_ClassInfo) < 0)
        return nullptr;
    if (PyType_Ready(&C_MPEC_ClassInfo) < 0)
        return nullptr;
    if (PyType_Ready(&C_MPCT_ClassInfo) < 0)
        return nullptr;
    if (PyType_Ready(&C_MPSV_ClassInfo) < 0)
        return nullptr;

    pReturn = PyModule_Create(&ModuleInfo);  // Create the module according to the module info.
    if (pReturn == 0)
        return nullptr;

    Py_INCREF(&ModuleInfo);  // Because the module is not registered to the python counter, Py_INCREF is required to be invoked.
    PyModule_AddFunctions(pReturn, C_MPC_MethodMembers);  // Add the global method members.
    PyModule_AddObject(pReturn, "MpegDecoder", (PyObject*)&C_MPDC_ClassInfo);  // Add the class as one module member.
    PyModule_AddObject(pReturn, "MpegEncoder", (PyObject*)&C_MPEC_ClassInfo);
    PyModule_AddObject(pReturn, "MpegClient", (PyObject*)&C_MPCT_ClassInfo);
    PyModule_AddObject(pReturn, "MpegServer", (PyObject*)&C_MPSV_ClassInfo);
    return pReturn;
}
